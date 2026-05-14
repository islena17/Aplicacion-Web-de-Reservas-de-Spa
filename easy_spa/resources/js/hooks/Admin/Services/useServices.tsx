import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function useServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados para la paginación
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await api.get('/api/admin/services');
      setServices(res.data.data ?? res.data);
      setLastPage(res.data.last_page ?? 1);
    } catch (error) {
      setError('No se pudieron cargar las reservas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [page]);

  return {
    services,
    loading,
    error,
    refetch: fetchServices,
    lastPage,
    setPage,
    page,
  };
}