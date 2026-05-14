import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import type { Employee } from '@/types';

export default function useEmployees(slug?: string) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            setError('');
            const res = await api.get('/api/webmaster/employees', {
                params: {
                    page,
                    spa: slug,
                },
            });

            setEmployees(res.data.data ?? res.data);
            setLastPage(res.data.last_page ?? 1);
        } catch {
            setError('No se pudieron cargar los empleados.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!slug) {
            setEmployees([]);
            setLoading(false);
            return;
        }

        fetchEmployees();
    }, [page, slug]);

    return {
        employees,
        loading,
        error,
        refetch: fetchEmployees,
        lastPage,
        setPage,
        page,
    };
}