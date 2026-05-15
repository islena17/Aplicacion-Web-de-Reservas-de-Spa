import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import {Reservation} from "@/types";


interface ApiReservationResponse {
  data: Reservation;
}

// --- HOOK ADAPTADO PARA ADMIN ---
export function useReservation(id?: string) {
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
      setError(null);

      const res = await api.get<ApiReservationResponse>(
        `/api/admin/reservations/${id}`
      );

      console.log('ADMIN RESERVATION DETAIL:', res.data);


      setReservation(res.data.data ?? res.data);
      
    } catch (err: any) {
      console.error('Error fetching reservation:', err);
      setError('No se ha podido cargar la información de la reserva.');
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
    getReservation,
  };
}