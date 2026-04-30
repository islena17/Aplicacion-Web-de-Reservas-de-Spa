import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';

type Option = {
    id: number;
    name: string;
    spa_id?: number;
    reservation_id?: number;
};

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

type ReservationErrors = Partial<Record<keyof ReservationForm, string[]>> & {
    general?: string;
};

type ClientForm = {
    name: string;
    surname: string;
    email: string;
    telephone: string;
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
type Service = {
    id: number;
    name: string;
    spa_id?: number;
    length_minutes: number;
    price: string;
};

const getList = (response: any) => {
    return response.data.data?.data ?? response.data.data ?? response.data ?? [];
};



export function useReservationForm(spaSlug?: string, reservationId?: string) {

    //constantes del formulario de reserva de spa

    const navigate = useNavigate();
    const [spaId, setSpaId] = useState<number | null>(null);
    const [form, setForm] = useState<ReservationForm>(initialForm);
    const [clients, setClients] = useState<Option[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [employees, setEmployees] = useState<Option[]>([]);
    const [errors, setErrors] = useState<ReservationErrors>({});
    const [loading, setLoading] = useState(false);
    const [loadingOptions, setLoadingOptions] = useState(true);
    const [showClientForm, setShowClientForm] = useState(false);
  


    const [clientForm, setClientForm] = useState<ClientForm>({
        name: '',
        surname: '',
        email: '',
        telephone: '',
    });

    //esta constante es para calcular la hora fin de los servicios 
    const calculateEndTime = (startTime: string, minutes: number) => {
        if (!startTime || !minutes) return '';

        const [hours, mins] = startTime.split(':').map(Number);

        const date = new Date();
        date.setHours(hours);
        date.setMinutes(mins + minutes);

        return date.toTimeString().slice(0, 5);
    };

    useEffect(() => {
        if (!spaSlug) {
            setLoadingOptions(false);
            return;
        }

        const fetchOptions = async () => {
            try {
                setLoadingOptions(true);

                const [spaRes, clientsRes, servicesRes, employeesRes] =
                    await Promise.all([
                        api.get(`/api/webmaster/spas/${spaSlug}`),
                        api.get('/api/webmaster/clients'),
                        api.get('/api/webmaster/services'),
                        api.get('/api/webmaster/employees'),
                    ]);

                const spa = spaRes.data.data ?? spaRes.data;
                const currentSpaId = spa.id;

                setSpaId(currentSpaId);

                setClients(getList(clientsRes));

                setServices(
                    getList(servicesRes)
                        .filter((service: any) => service.spa_id === currentSpaId)
                        .map((s: any) => ({
                            id: s.id,
                            name: s.name,
                            spa_id: s.spa_id,
                            length_minutes: Number(s.length_minutes),
                            price: String(s.price),
                        }))
                );

                setEmployees(
                    getList(employeesRes)
                        .filter((employee: any) => employee.spa_id === currentSpaId)
                        .map((employee: any) => ({
                            id: employee.id,
                            name: `${employee.name} ${employee.surname}`,
                            spa_id: employee.spa_id,
                        }))
                );

                //  Cargar reserva SOLO si estamos en edit
                if (reservationId) {
                    const reservationRes = await api.get(
                        `/api/webmaster/reservations/${reservationId}`
                    );

                    const reservation =
                        reservationRes.data.data ?? reservationRes.data;

                    setForm({
                        client_id: String(reservation.client_id ?? ''),
                        service_id: String(reservation.service_id ?? ''),
                        employee_id: reservation.employee_id
                            ? String(reservation.employee_id)
                            : '',
                        reservation_date: reservation.reservation_date ?? '',
                        start_time: reservation.start_time?.slice(0, 5) ?? '',
                        end_time: reservation.end_time?.slice(0, 5) ?? '',
                        status: reservation.status ?? 'pending',
                        final_price: reservation.final_price
                            ? String(reservation.final_price)
                            : '',
                        observations: reservation.observations ?? '',
                    });
                }
            } catch (error) {
                console.error(error);
                setErrors({
                    general: 'No se han podido cargar los datos necesarios.',
                });
            } finally {
                setLoadingOptions(false);
            }
        };
        fetchOptions();
    }, [spaSlug]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => {
            let updatedForm = {
                ...prev,
                [name]: value,
            };

            // Cuando selecciona servicio
            if (name === 'service_id') {
                const selectedService = services.find(
                    (service) => service.id === Number(value)
                );

                if (selectedService) {
                    updatedForm.final_price = selectedService.price;

                    if (prev.start_time) {
                        updatedForm.end_time = calculateEndTime(
                            prev.start_time,
                            selectedService.length_minutes
                        );
                    }
                }
            }

            // Cuando cambia la hora de inicio
            if (name === 'start_time') {
                const selectedService = services.find(
                    (service) => service.id === Number(prev.service_id)
                );

                if (selectedService) {
                    updatedForm.end_time = calculateEndTime(
                        value,
                        selectedService.length_minutes
                    );

                    updatedForm.final_price = selectedService.price;
                }
            }

            return updatedForm;
        });
    };

    const handleClientChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setClientForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //constantes de las acciones del formulario 
    //constante para crear la reserva
    const createReservation = async (e: FormEvent) => {
        e.preventDefault();

        if (!spaId) {
            setErrors({
                general: 'No se ha podido identificar el spa.',
            });
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            let clientId = form.client_id;

            if (showClientForm) {
                const clientRes = await api.post('/api/webmaster/clients', {
                    name: clientForm.name,
                    surname: clientForm.surname,
                    email: clientForm.email || null,
                    telephone: clientForm.telephone || null,
                });

                const newClient = clientRes.data.data ?? clientRes.data;
                clientId = String(newClient.id);
            }

            await api.post('/api/webmaster/reservations', {
                client_id: clientId,
                spa_id: spaId,
                service_id: form.service_id,
                employee_id: form.employee_id || null,
                reservation_date: form.reservation_date,
                start_time: form.start_time,
                end_time: form.end_time,
                status: form.status,
                final_price: form.final_price || null,
                observations: form.observations,
            });

            navigate(`/dashboard/spas/${spaSlug}`);
        } catch (error: any) {
            console.log('STATUS:', error.response?.status);
            console.log('ERRORES:', error.response?.data);

            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {
                    general: error.response.data.message,
                });
            } else {
                setErrors({
                    general: 'Ha ocurrido un error al crear la reserva.',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    //constante para actualizar los datos de la reserva
    const updateReservation = async (e: FormEvent) => {
        e.preventDefault();

        if (!spaId) {
            setErrors({
                general: 'No se ha podido identificar el spa.',
            });
            return;
        }

        if (!reservationId) {
            setErrors({
                general: 'No se ha podido identificar la reserva.',
            });
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            let clientId = form.client_id;

            if (showClientForm) {
                const clientRes = await api.post('/api/webmaster/clients', {
                    name: clientForm.name,
                    surname: clientForm.surname,
                    email: clientForm.email || null,
                    telephone: clientForm.telephone || null,
                });

                const newClient = clientRes.data.data ?? clientRes.data;
                clientId = String(newClient.id);
            }

            await api.put(`/api/webmaster/reservations/${reservationId}`, {
                client_id: clientId,
                spa_id: spaId,
                service_id: form.service_id,
                employee_id: form.employee_id || null,
                reservation_date: form.reservation_date,
                start_time: form.start_time,
                end_time: form.end_time,
                status: form.status,
                final_price: form.final_price || null,
                observations: form.observations,
            });

            navigate(`/dashboard/spas/${spaSlug}`);
        } catch (error: any) {
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
                    general: 'Ha ocurrido un error al actualizar la reserva.',
                });
            }
        } finally {
            setLoading(false);
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
        handleChange,
        createReservation,
        updateReservation,
        fieldError,
        showClientForm,
        setShowClientForm,
        clientForm,
        handleClientChange,
    };
}