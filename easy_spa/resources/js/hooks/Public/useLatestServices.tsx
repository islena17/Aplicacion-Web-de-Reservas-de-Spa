import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Service } from '@/types'; 

export function useLatestServices() {
  const [latestServices, setLatestServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  api.get('/api/public/services/latest')
    .then(res => {
      const rawData = res.data;
      
      const arrayFinal = rawData.data?.data || rawData.data || rawData || [];
      
      setLatestServices(Array.isArray(arrayFinal) ? arrayFinal : []);
    })
    .catch(() => {
      setLatestServices([]); // Si hay error, inicializamos como array vacío
    })
    .finally(() => setLoading(false));
}, []);

  return { latestServices, loading };
}