import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export interface Employee {
  id: number;
  name: string;
  surname: string;
  gender?: string;
  email?: string;
  telephone?: string;
  is_active: boolean;
}

export default function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados para la paginación
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await api.get(`/api/admin/employees?page=${page}`);
      setEmployees(res.data.data ?? res.data);
      setLastPage(res.data.last_page);
    } catch (error) {
      setError('No se pudieron cargar las reservas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [page]);

  return {
    employees,
    loading,
    error,
    refetch: fetchEmployees,
    setLastPage,
    lastPage,
    setPage,
    page,
  };
}