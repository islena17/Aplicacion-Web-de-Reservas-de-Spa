// src/hooks/useSpas.ts
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import {Spa} from '@/types';


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


  const deleteSpa = async (spaSlug: string) => {
    const confirmDelete = window.confirm(
      '¿Seguro que quieres eliminar este spa?'
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/webmaster/spas/${spaSlug}`);

      setSpas((prev) =>
        prev.filter((spa) => spa.slug !== spaSlug)
      );
    } catch {
      setError('No se ha podido eliminar el spa');
    }
  };

  //para contar los spas en el dashboard
  const totalSpas = spas.length;
  const activeSpasCount = spas.filter(spa => spa.is_active).length;

  //spa con mas reservas
  const spaTop = [...spas].sort((a, b) => {
    const countA = (a as any).reservations?.length ?? 0;
    const countB = (b as any).reservations?.length ?? 0;
    return countB - countA; 
  })[0];
  return { spas, loading, error, totalSpas, spaTop, activeSpasCount, deleteSpa };
}