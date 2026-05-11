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

  //para contar los spas en el dashboard
  const totalSpas = spas.length;
  const activeSpasCount = spas.filter(spa => spa.is_active).length;

  //spa con mas reservas
  const spaTop = [...spas].sort((a, b) => {
    const countA = (a as any).reservations?.length ?? 0;
    const countB = (b as any).reservations?.length ?? 0;
    return countB - countA; 
  })[0];
  return { spas, loading, error, totalSpas, spaTop, activeSpasCount };
}