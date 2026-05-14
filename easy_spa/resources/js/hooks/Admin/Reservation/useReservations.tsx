import { useEffect, useState } from 'react';
import api from '@/lib/axios';



export default function useReservations() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados para la paginación
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.get(`/api/admin/reservations?page=${page}`);

      //  manejar paginación de Laravel
      setReservations(response.data.data ?? response.data);
      setLastPage(response.data.last_page);
    } catch (error) {
      setError('No se pudieron cargar las reservas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [page]);

  return {
    reservations,
    loading,
    error,
    refetch: fetchReservations,
    setLastPage,
    lastPage,
    setPage,
    page,
  };
}