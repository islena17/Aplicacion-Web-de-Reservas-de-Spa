import { useEffect, useState } from 'react';
import api from '@/lib/axios';

interface Spa {
  name: string;
  slug: string;
}

interface ServiceCategory {
  id: number;
  name: string;
}

interface Service {
  id: number;
  name: string;
  price: number;
  length_minutes?: number;
  spa?: Spa;
  category?: ServiceCategory;
}

interface Client {
  id: number;
  name: string;
  surname: string;
  telephone?: string;
  user?: {
    id: number;
    email: string;
  };
}

interface Employee {
  id: number;
  name: string;
  surname: string;
  user?: {
    id: number;
    email: string;
  };
}

export interface Reservation {
  id: number;
  reservation_date: string;
  start_time: string;
  end_time: string;
  final_price: string;
  observations?: string | null;
  status?: string;
  client?: Client | null;
  service?: Service | null;
  employee?: Employee | null;
  spa?: Spa |null;
}

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