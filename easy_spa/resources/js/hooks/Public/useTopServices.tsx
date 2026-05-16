import { useEffect, useState, useMemo } from 'react';
import api from '@/lib/axios';
import { Service } from '@/types';

export function useTopServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/public/services')
      .then(res => {
        const data = res.data.data?.data ?? res.data.data ?? res.data ?? [];
        setServices(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const topServices = useMemo(() => {
    return [...services]
      .sort((a, b) => (b.reservations_count || 0) - (a.reservations_count || 0))
      .slice(0, 5);
  }, [services]);

  return { topServices, loading };
}