import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function useReservations() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await api.get('/api/admin/reservations');

      //  manejar paginación de Laravel
      const data = res.data.data?.data ?? res.data.data ?? res.data ?? [];
      setReservations(data);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar las reservas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return { reservations, loading, error, refetch: fetchReservations };
}