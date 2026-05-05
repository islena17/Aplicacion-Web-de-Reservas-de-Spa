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

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await api.get('/api/admin/employees');
      setEmployees(res.data.data ?? res.data);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar los empleados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
    refetch: fetchEmployees,
  };
}