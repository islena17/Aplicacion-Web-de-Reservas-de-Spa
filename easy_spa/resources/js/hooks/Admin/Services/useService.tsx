import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/lib/axios';

export default function useService() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await api.get(`/api/admin/services/${serviceSlug}`);
        setService(res.data.data ?? res.data);
      } catch (error) {
        console.error(error);
        setError('No se pudo cargar el servicio.');
      } finally {
        setLoading(false);
      }
    };

    if (serviceSlug) {
      fetchService();
    }
  }, [serviceSlug]);

  return { service, loading, error };
}