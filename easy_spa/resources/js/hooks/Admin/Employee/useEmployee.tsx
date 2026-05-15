import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Employee } from '@/types';
export default function useEmployee(employeeId?: string) {

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!employeeId) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await api.get(`/api/admin/employees/${employeeId}`);

        if (isMounted) {
          setEmployee(res.data.data ?? res.data);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError('No se pudo cargar el empleado.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchEmployee();

    return () => {
      isMounted = false;
    };
  }, [employeeId]);

  return {
    employee,
    loading,
    error,
  };
}