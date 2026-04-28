import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';

type Option = {
    id: number;
    name: string;
    spa_id?: number;
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

const getList = (response: any) => {
    return response.data.data?.data ?? response.data.data ?? response.data ?? [];
};

export function useReservationForm(spaSlug?: string) {
    const navigate = useNavigate();

    const [spaId, setSpaId] = useState<number | null>(null);
    const [form, setForm] = useState<ReservationForm>(initialForm);
    const [clients, setClients] = useState<Option[]>([]);
    const [services, setServices] = useState<Option[]>([]);
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

    useEffect(() => {
        if (!spaSlug) {
            setLoadingOptions(false);
            return;
        }

        const fetchOptions = async () => {
            try {
                setLoadingOptions(true);

                const [spaRes, clientsRes, servicesRes, employeesRes] = await Promise.all([
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
                    getList(servicesRes).map((s: any) => ({
                        id: s.id,
                        name: s.name,
                        spa_id: s.spa_id,
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
        const { name, value } = e.currentTarget;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClientChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.currentTarget;

        setClientForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
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
            await api.post('/api/webmaster/reservations', {
                client_id: form.client_id,
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
            console.error(error);

            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                setErrors({
                    general: 'Ha ocurrido un error al crear la reserva.',
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
        fieldError,
        showClientForm,
        setShowClientForm,
        clientForm,
        handleClientChange,
    };
}