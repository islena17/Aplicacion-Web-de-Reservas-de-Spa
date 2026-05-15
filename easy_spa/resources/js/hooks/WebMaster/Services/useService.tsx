import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/lib/axios';
import type { Service } from '@/types';

export default function useService() {
  const { serviceSlug } = useParams<{
    serviceSlug: string;
  }>();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      if (!serviceSlug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const res = await api.get(
          `/api/webmaster/services/${serviceSlug}`
        );

        setService(res.data.data ?? res.data);
      } catch {
        setError('No se pudo cargar el servicio.');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceSlug]);

  return { service, loading, error };
}