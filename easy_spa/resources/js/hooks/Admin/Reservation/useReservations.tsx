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

  
  //contar reservas para el home dashboard
  const totalReservationP = reservations.filter(r => r.status === 'pending').length;
  const totalReservationC = reservations.filter(r => r.status === 'confirmed').length;
  const totalReservationCd = reservations.filter(r => r.status === 'cancelled').length;
  const totalReservationNS = reservations.filter(r => r.status === 'no_show').length;

  //ultimas 5 reservas para home
  const lastReservations = [...reservations]
    .sort((a, b) => b.id - a.id) // Ordenamos por ID de mayor a menor
    .slice(0, 5); // Tomamos solo las primeras 5
  return {
    reservations,
    lastReservations,
    totalReservationP,
    totalReservationC,
    totalReservationCd,
    totalReservationNS,
    loading,
    error,
    refetch: fetchReservations,
    setLastPage,
    lastPage,
    setPage,
    page,
  };
}