import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import type { Spa } from '@/types';

export function useSpaShow(slug?: string) {
  const [spa, setSpa] = useState<Spa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSpa = async () => {
    if (!slug) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await api.get(`/api/webmaster/spas/${slug}`);

      setSpa(response.data.data ?? response.data);
    } catch {
      setError('No se ha podido cargar la información del spa.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpa();
  }, [slug]);

  //borrar spa
  const deleteSpa = async () => {
  if (!slug) return false;

  const confirmDelete = window.confirm(
    '¿Seguro que quieres eliminar este spa? Se eliminarán también sus servicios, empleados, reservas y demás datos relacionados.'
  );

  if (!confirmDelete) return false;

  try {
    await api.delete(`/api/webmaster/spas/${slug}`);

    return true;
  } catch {
    setError('No se pudo eliminar el spa.');
    return false;
  }
};

  return {
    deleteSpa,
    spa,
    loading,
    error,
    refetch: fetchSpa,
  };
}