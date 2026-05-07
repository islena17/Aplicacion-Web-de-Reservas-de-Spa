// hooks/Site/useSpas.ts
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export type Spa = {
  id: number;
  name: string;
  description:string;
  slug: string;
  city: string;
  logo: string;
  logo_url: string;
};

export function useSpas() {
  const [spas, setSpas] = useState<Spa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSpas = async () => {
      try {
        setLoading(true);

        const response = await api.get('/api/public/spas');

        setSpas(response.data.data?.data ?? response.data.data ?? response.data ?? []);
      } catch (error) {
        console.error(error);
        setError('No se pudieron cargar los spas.');
      } finally {
        setLoading(false);
      }
    };

    fetchSpas();
  }, []);

  return { spas, loading, error };
}