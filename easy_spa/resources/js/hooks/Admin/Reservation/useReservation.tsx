import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export function useReservation(id?: string) {
  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getReservation = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const res = await api.get(`/api/admin/reservations/${id}`);
      setReservation(res.data.data ?? res.data);
    } catch (error) {
      console.error(error);
      setError('Error al cargar la reserva');
      setReservation(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReservation();
  }, [id]);



  return {
    reservation,
    loading,
    error,
    getReservation
}

}