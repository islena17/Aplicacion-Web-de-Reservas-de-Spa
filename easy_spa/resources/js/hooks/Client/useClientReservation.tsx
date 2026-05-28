import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';
import { Employee } from '@/types';

type Slot = {
  employee_id: number | null;
  start_time: string;
  end_time: string;
};

export function useClientReservation(spaSlug?: string, serviceSlug?: string) {
  const navigate = useNavigate();

  const [spa, setSpa] = useState<any>(null);
  const [service, setService] = useState<any>(null);
  const [client, setClient] = useState<any>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);

  const [form, setForm] = useState({
    employee_id: '',
    reservation_date: '',
    start_time: '',
    end_time: '',
    number_of_people: '',
    observations: '',
  });

  const [loading, setLoading] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Carga los datos necesarios para preparar la reserva.
        const response = await api.get(
          `/api/client/reservation-data/${spaSlug}/${serviceSlug}`
        );

        setSpa(response.data.spa);
        setService(response.data.service);
        setClient(response.data.client);
        setEmployees(response.data.employees ?? []);
      } catch (error: any) {
        console.log('ERROR RESERVATION DATA:', error.response?.status);
        console.log(error.response?.data);

        setErrors({
          general:
            error.response?.data?.message ||
            'No se pudieron cargar los datos de la reserva.',
        });
      } finally {
        setLoading(false);
      }
    };

    // Solo realiza la petición si existen el spa y el servicio en la URL.
    if (spaSlug && serviceSlug) {
      fetchData();
    }
  }, [spaSlug, serviceSlug, navigate]);

  useEffect(() => {
    const fetchSlots = async () => {
      // Evita buscar disponibilidad hasta tener los datos mínimos necesarios.
      if (!spa?.id || !service?.id || !form.reservation_date) return;

      try {
        setLoadingSlots(true);
        setSlots([]);

        // Obtiene las franjas disponibles para la fecha seleccionada.
        const response = await api.get('/api/client/availability', {
          params: {
            spa_id: spa.id,
            service_id: service.id,
            date: form.reservation_date,
            employee_id: form.employee_id || undefined,
          },
        });

        setSlots(response.data);
      } catch (error: any) {
        console.log('ERROR AVAILABILITY:', error.response?.status);
        console.log(error.response?.data);

        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [spa?.id, service?.id, form.reservation_date, form.employee_id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Actualiza el campo modificado del formulario.
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectSlot = (slot: Slot) => {
    // Guarda la franja horaria seleccionada en el formulario.
    setForm((prev) => ({
      ...prev,
      employee_id: slot.employee_id
        ? String(slot.employee_id)
        : prev.employee_id,
      start_time: slot.start_time,
      end_time: slot.end_time,
    }));
  };

  const submitReservation = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoadingSubmit(true);
    setErrors({});

    try {
      // Envía los datos de la reserva al backend.
      await api.post('/api/client/reservations', {
        service_id: service.id,
        client_id: client.id,
        employee_id: form.employee_id || null,
        reservation_date: form.reservation_date,
        start_time: form.start_time,
        end_time: form.end_time,
        number_of_people: form.number_of_people,
        observations: form.observations || null,
        final_price: Number(service.price) * Number(form.number_of_people || 1),
      });

      navigate(`/spas/${spaSlug}`);
    } catch (error: any) {
      console.log('ERROR CREATE RESERVATION:', error.response?.status);
      console.log(error.response?.data);

      // Guarda los errores de validación devueltos por Laravel.
      if (error.response?.status === 422) {
        setErrors(
          error.response.data.errors || {
            general: error.response.data.message,
          }
        );
      } else {
        setErrors({
          general: 'No se pudo crear la reserva.',
        });
      }
    } finally {
      setLoadingSubmit(false);
    }
  };

  return {
    spa,
    service,
    client,
    employees,
    slots,
    form,
    loading,
    loadingSlots,
    loadingSubmit,
    errors,
    handleChange,
    selectSlot,
    submitReservation,
  };
}