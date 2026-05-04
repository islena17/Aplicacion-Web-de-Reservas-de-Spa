import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function useServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await api.get('/api/admin/services');
      setServices(res.data.data ?? res.data);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar los servicios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return { services, loading, error, refetch: fetchServices };
}