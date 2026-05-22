import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Spa, Service, ServiceCategory, Client, Employee, Reservation } from '@/types';

interface ApiReservationResponse {
  data: Reservation;
}

export function useReservation(id?: string, spaSlug?: string) {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getReservation = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await api.get<ApiReservationResponse>(
        `/api/webmaster/reservations/${id}`
      );

      console.log('RESERVATION SHOW:', res.data);

      setReservation(res.data.data);
      setError(null);
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
  }, [id,spaSlug]);

  return {
    reservation,
    loading,
    error,
    getReservation,
  };
}