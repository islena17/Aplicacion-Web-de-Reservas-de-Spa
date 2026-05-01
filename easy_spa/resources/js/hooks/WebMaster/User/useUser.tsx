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
  telephone: string;
  reservations?: Reservation[];
}

interface Employee {
  id: number;
  name: string;
  surname: string;
  telephone: string;
  reservations?: Reservation[];
  spa?: Spa
}

export interface User {
  id: number;
  email: string;
  role?: Role;
  client?: Client | null;
  employee?: Employee | null;
}

interface ApiUserResponse {
  data: User;
}

export function useUser(id?: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const getUser = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await api.get<ApiUserResponse>(`/api/webmaster/users/${id}`);
      console.log('USER SHOW:', res.data);

      setUser(res.data.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Error al cargar el usuario');
      setUser(null);
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