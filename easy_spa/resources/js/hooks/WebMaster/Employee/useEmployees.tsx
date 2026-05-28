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

      // Obtiene los empleados del spa seleccionado con paginación.
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
    // Evita hacer la petición si no hay spa seleccionado.
    if (!slug) {
      setEmployees([]);
      setLoading(false);
      return;
    }

    fetchEmployees();
  }, [page, slug]);

  const deleteEmployee = async (employeeId: number) => {
    const confirmDelete = window.confirm(
      '¿Seguro que quieres eliminar este empleado?'
    );

    if (!confirmDelete) return false;

    try {
      // Elimina el empleado seleccionado.
      await api.delete(`/api/webmaster/employees/${employeeId}`);

      // Actualiza la lista local sin volver a pedir todos los datos.
      setEmployees((prev) =>
        prev.filter((employee) => employee.id !== employeeId)
      );

      return true;
    } catch {
      setError('No se ha podido eliminar el empleado.');
      return false;
    }
  };

  return {
    employees,
    loading,
    error,
    refetch: fetchEmployees,
    lastPage,
    setPage,
    page,
    deleteEmployee,
  };
}