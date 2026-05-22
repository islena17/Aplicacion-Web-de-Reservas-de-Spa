import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';
import { Service } from '@/types';

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
    number_of_people: string;
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
    number_of_people: '1',
    start_time: '',
    end_time: '',
    status: 'pending',
    final_price: '',
    observations: '',
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
    const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]); //para ver la disponibilidad
    const [loadingSlots, setLoadingSlots] = useState(false);



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

    //cargar los datos del update
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
                             capacity: Number(s.capacity),
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
                    try {
                        const reservationRes = await api.get(`/api/webmaster/reservations/${reservationId}`);
                        const reservation = reservationRes.data.data ?? reservationRes.data;

                        console.log("Datos recibidos de la API:", reservation); // Mira la consola para ver qué llega

                        setForm({
                            // Buscamos el ID en reservation.client_id O en reservation.client.id
                            client_id: String(reservation.client_id ?? reservation.client?.id ?? ''),
                            service_id: String(reservation.service_id ?? reservation.service?.id ?? ''),
                            employee_id: String(reservation.employee_id ?? reservation.employee?.id ?? ''),
                            reservation_date: reservation.reservation_date ?? '',
                            number_of_people: reservation.number_of_people ?? '',
                            start_time: reservation.start_time ? reservation.start_time.slice(0, 5) : '',
                            end_time: reservation.end_time ? reservation.end_time.slice(0, 5) : '',
                            status: reservation.status ?? 'pending',
                            final_price: reservation.final_price ? String(reservation.final_price) : '',
                            observations: reservation.observations ?? '',
                        });
                    } catch (err) {
                        console.error("Error cargando la reserva específica:", err);
                    }
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
    }, [spaSlug, reservationId]);

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
                    const peopleCount = Number(updatedForm.number_of_people || 1);

                    updatedForm.final_price = String(
                        Number(selectedService.price) * peopleCount
                    );

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

                    updatedForm.final_price = String(
                        Number(selectedService.price) * Number(updatedForm.number_of_people || 1)
                    );
                }
            }

            if (name === 'number_of_people') {
                const selectedService = services.find(
                    (service) => service.id === Number(prev.service_id)
                );

                if (selectedService) {
                    updatedForm.final_price = String(
                        Number(selectedService.price) * Number(value || 1)
                    );
                }
            }

            return updatedForm;
        });
    };

    //seleccionar slots libres
    const selectSlot = (slot: AvailableSlot) => {
        setForm((prev) => ({
            ...prev,
            start_time: slot.start_time,
            end_time: slot.end_time,
            // Si el slot trae un empleado, lo asignamos automáticamente
            employee_id: slot.employee_id ? String(slot.employee_id) : prev.employee_id,
        }));
    };
    useEffect(() => { //use effect para la disponibilidad
        const fetchAvailableSlots = async () => {
            if (!form.service_id || !form.reservation_date || !spaId) {
                setAvailableSlots([]);
                return;
            }



            try {

                setLoadingSlots(true);
                const res = await api.get('/api/webmaster/availability', {
                    params: {
                        service_id: form.service_id,
                        date: form.reservation_date,
                        employee_id: form.employee_id || undefined,
                        spa_id: spaId,
                    },
                });

                const slots = res.data.data ?? res.data ?? [];
                setAvailableSlots(Array.isArray(slots) ? slots : []);
            } catch (error) {
                console.error(error);
                setAvailableSlots([]);
            } finally {
                setLoadingSlots(false);
            }
        };

        fetchAvailableSlots();
    }, [form.service_id, form.reservation_date, form.employee_id, spaId]);

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
                number_of_people: form.number_of_people,
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
                number_of_people: form.number_of_people,
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
        availableSlots,
        loadingSlots,
        selectSlot,
    };
}