import { useEffect, useState } from 'react';
import api from '@/lib/axios';

interface Role {
  name: string;
}

interface Spa {
  name: string;
}

interface Service {
  name: string;
  price: number;
  spa?: Spa;
}

interface Reservation {
  id: number;
  reservation_date: string;
  service?: Service;
}

interface Client {
  id: number;
  name: string;
  surname: string;
  phone: string;
  reservations?: Reservation[];
}

export interface User {
  id: number;
  email: string;
  role?: Role;
  client?: Client | null;
}

export function useUser(id?: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUser = async () => {
    if (!id) return;

    try {
      setLoading(true);

      const res = await api.get<User>(`/api/webmaster/users/${id}`);

      setUser(res.data);
      setError(null);
    } catch {
      setError('Error al cargar el usuario');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  return {
    user,
    loading,
    error,
    getUser,
  };
}