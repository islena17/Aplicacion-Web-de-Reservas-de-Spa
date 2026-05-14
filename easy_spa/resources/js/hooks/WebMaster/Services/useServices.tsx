import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function useServices(slug?: string) {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchServices = async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError('');

      const res = await api.get(`/api/webmaster/services`, {
        params: { page,
           spa: slug,
        },
      });

      setServices(res.data.data ?? res.data);
      setLastPage(res.data.last_page ?? 1);
    } catch {
      setError('No se pudieron cargar los servicios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [page, slug]);

  const deleteService = async (serviceSlug: string) => {
    const confirmDelete = window.confirm(
      '¿Seguro que quieres eliminar este servicio?'
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/webmaster/services/${serviceSlug}`);

      setServices((prev) =>
        prev.filter((service) => service.slug !== serviceSlug)
      );
    } catch {
      setError('No se ha podido eliminar el servicio.');
    }
  };

  return {
    services,
    loading,
    error,
    refetch: fetchServices,
    lastPage,
    setPage,
    page,
    deleteService,
  };
}