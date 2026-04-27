import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';

type Option = {
    id: number;
    name: string;
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

export function useReservationForm(spaSlug?: string) {
    const navigate = useNavigate();

    const [form, setForm] = useState<ReservationForm>(initialForm);
    const [clients, setClients] = useState<Option[]>([]);
    const [services, setServices] = useState<Option[]>([]);
    const [employees, setEmployees] = useState<Option[]>([]);
    const [errors, setErrors] = useState<ReservationErrors>({});
    const [loading, setLoading] = useState(false);
    const [loadingOptions, setLoadingOptions] = useState(true);

    useEffect(() => {
        if (!spaSlug) return;

        const fetchOptions = async () => {
            try {
                setLoadingOptions(true);

                const [clientsRes, servicesRes, employeesRes] = await Promise.all([
                    api.get('/api/webmaster/clients'),
                    api.get('/api/webmaster/services'),
                    api.get('/api/webmaster/employees'),
                ]);

                setClients(clientsRes.data.data ?? clientsRes.data);
                setServices(servicesRes.data.data ?? servicesRes.data);
                setEmployees(employeesRes.data.data ?? employeesRes.data);
            } catch {
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

    const createReservation = async (e: FormEvent) => {
        e.preventDefault();

        if (!spaSlug) return;

        setLoading(true);
        setErrors({});

        try {
            await api.post('/api/webmaster/reservations', {
                client_id: form.client_id,
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
    };
}