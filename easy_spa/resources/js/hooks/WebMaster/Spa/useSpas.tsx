// src/hooks/useSpas.ts
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export type Spa = {
  id: number;
  name: string;
  slug: string;
  city?: string;
  phone?: string;
  email?: string;
  opening_time?: string;
  closing_time?: string;
  is_active: boolean;
};

export function useSpas() {
  const [spas, setSpas] = useState<Spa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSpas = async () => {
      try {
        const response = await api.get('/api/webmaster/spas');
        setSpas(response.data.data ?? response.data);
      } catch {
        setError('Ha ocurrido un error al cargar los spas.');
      } finally {
        setLoading(false);
      }
    };

    fetchSpas();
  }, []);

  return { spas, loading, error };
}