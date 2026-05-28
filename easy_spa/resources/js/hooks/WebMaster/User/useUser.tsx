import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import type { User } from '@/types';

interface ApiUserResponse {
  data: User;
}

export function useUser(id?: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUser = async () => {
    // Evita hacer la petición si no se ha recibido un identificador.
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await api.get<ApiUserResponse>(`/api/webmaster/users/${id}`);

      // Guarda el usuario devuelto por la API.
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