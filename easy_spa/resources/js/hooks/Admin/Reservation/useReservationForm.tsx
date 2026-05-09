import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';

type ReservationForm = {
  client_id: string;
  service_id: string;
  employee_id: string;
  reservation_date: string;
  start_time: string;
  end_time: string;
  status: string;
  final_price: string;
  observations: string;
};

type AvailableSlot = {
  employee_id: number | null;
  start_time: string;
  end_time: string;
};

type ClientForm = {
  name: string;
  surname: string;
  email: string;
  telephone: string;
};

type Errors = Partial<Record<keyof ReservationForm, string[]>> & {
  general?: string;
};

const initialForm: ReservationForm = {
  client_id: '',
  service_id: '',
  employee_id: '',
  reservation_date: '',
  start_time: '',
  end_time: '',
  status: 'pending',
  final_price: '',
  observations: '',
};

const initialClientForm: ClientForm = {
  name: '',
  surname: '',
  email: '',
  telephone: '',
};

export function useReservationForm(reservationId?: string) {
  const navigate = useNavigate();

  const [form, setForm] = useState<ReservationForm>(initialForm);
  const [clientForm, setClientForm] = useState<ClientForm>(initialClientForm);

  const [clients, setClients] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);

  const [showClientForm, setShowClientForm] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const getList = (res: any) => {
    return res.data.data?.data ?? res.data.data ?? res.data ?? [];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingOptions(true);

        const [clientsRes, servicesRes, employeesRes] = await Promise.all([
          api.get('/api/admin/clients'),
          api.get('/api/admin/services'),
          api.get('/api/admin/employees'),
        ]);

        setClients(getList(clientsRes));
        setServices(getList(servicesRes));
        setEmployees(getList(employeesRes));

        if (reservationId) {
          const reservationRes = await api.get(
            `/api/admin/reservations/${reservationId}`
          );

          const reservation = reservationRes.data.data ?? reservationRes.data;

          setForm({
            client_id: String(reservation.client?.id ?? reservation.client_id ?? ''),
            service_id: String(reservation.service?.id ?? reservation.service_id ?? ''),
            employee_id: String(
              reservation.employee?.id ?? reservation.employee_id ?? ''
            ),
            reservation_date: reservation.reservation_date ?? '',
            start_time: reservation.start_time?.slice(0, 5) ?? '',
            end_time: reservation.end_time?.slice(0, 5) ?? '',
            status: reservation.status ?? 'pending',
            final_price: String(reservation.final_price ?? ''),
            observations: reservation.observations ?? '',
          });
        }
      } catch (error) {
        console.error(error);
        setErrors({
          general: 'No se pudieron cargar los datos necesarios.',
        });
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchData();
  }, [reservationId]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!form.service_id || !form.reservation_date) {
        setAvailableSlots([]);
        return;
      }

      try {
        setLoadingSlots(true);

        const res = await api.get('/api/admin/availability', {
          params: {
            service_id: form.service_id,
            date: form.reservation_date,
            employee_id: form.employee_id || undefined,
          },
        });

        const slots = res.data.data ?? res.data ?? [];

        setAvailableSlots(slots);
      } catch (error) {
        console.error(error);
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchAvailableSlots();
  }, [form.service_id, form.reservation_date, form.employee_id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const updatedForm: ReservationForm = {
        ...prev,
        [name]: value,
      };

      if (name === 'service_id') {
        const service = services.find((s) => String(s.id) === value);

        updatedForm.start_time = '';
        updatedForm.end_time = '';

        if (service) {
          updatedForm.final_price = String(service.price ?? '');
        }
      }

      if (name === 'reservation_date') {
        updatedForm.start_time = '';
        updatedForm.end_time = '';
      }

      if (name === 'employee_id') {
        updatedForm.start_time = '';
        updatedForm.end_time = '';
      }

      if (name === 'start_time') {
        const selectedSlot = availableSlots.find(
          (slot) => slot.start_time === value
        );

        if (selectedSlot) {
          updatedForm.end_time = selectedSlot.end_time;

          if (selectedSlot.employee_id) {
            updatedForm.employee_id = String(selectedSlot.employee_id);
          }
        } else {
          const service = services.find(
            (s) => String(s.id) === updatedForm.service_id
          );

          if (service?.length_minutes) {
            updatedForm.end_time = calculateEndTime(
              value,
              Number(service.length_minutes)
            );
          }
        }
      }

      return updatedForm;
    });
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setClientForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const buildPayload = (clientId: string = form.client_id) => {
    return {
      client_id: clientId,
      service_id: form.service_id,
      employee_id: form.employee_id || null,
      reservation_date: form.reservation_date,
      start_time: form.start_time,
      end_time: form.end_time,
      status: form.status,
      final_price: form.final_price || null,
      observations: form.observations || null,
    };
  };

  const createReservation = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    try {
      let clientId = form.client_id;

      if (showClientForm) {
        const clientRes = await api.post('/api/admin/clients', {
          name: clientForm.name,
          surname: clientForm.surname,
          email: clientForm.email || null,
          telephone: clientForm.telephone || null,
        });

        const newClient = clientRes.data.data ?? clientRes.data;
        clientId = String(newClient.id);
      }

      await api.post('/api/admin/reservations', buildPayload(clientId));

      navigate('/admin/reservations');
    } catch (error: any) {
      handleRequestError(error, 'Ha ocurrido un error al crear la reserva.');
    } finally {
      setLoading(false);
    }
  };

  const updateReservation = async (e: FormEvent) => {
    e.preventDefault();

    if (!reservationId) {
      setErrors({
        general: 'No se ha podido identificar la reserva.',
      });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await api.put(`/api/admin/reservations/${reservationId}`, buildPayload());

      navigate('/admin/reservations');
    } catch (error: any) {
      handleRequestError(error, 'Ha ocurrido un error al actualizar la reserva.');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestError = (error: any, fallback: string) => {
    console.log('STATUS:', error.response?.status);
    console.log('ERRORES:', error.response?.data);

    if (error.response?.status === 422) {
      setErrors(
        error.response.data.errors || {
          general: error.response.data.message,
        }
      );
    } else {
      setErrors({
        general: fallback,
      });
    }
  };

  const fieldError = (field?: string[]) => field?.[0];

  return {
    form,
    clients,
    services,
    employees,
    errors,
    loading,
    loadingOptions,
    showClientForm,
    setShowClientForm,
    clientForm,
    availableSlots,
    loadingSlots,
    handleChange,
    handleClientChange,
    createReservation,
    updateReservation,
    fieldError,
  };
}

function calculateEndTime(startTime: string, minutes: number) {
  if (!startTime || !minutes) return '';

  const [hours, mins] = startTime.split(':').map(Number);

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(mins + minutes);

  return date.toTimeString().slice(0, 5);
}