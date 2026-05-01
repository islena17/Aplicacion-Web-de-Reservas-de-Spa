import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { AxiosError } from 'axios';

export interface Role {
  name: string;
}

export interface User {
  id: number;
  email: string;
  role?: Role;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUsers = async (): Promise<void> => {
    try {
      setLoading(true);

      const res = await api.get<{ data?: User[] } | User[]>(
        '/api/webmaster/users'
      );

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data ?? [];

      setUsers(data);
      setError(null);
    } catch (err: unknown) {
      const error = err as AxiosError;
      console.error(error);
      setError('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id: number): Promise<void> => {
    if (!window.confirm('¿Eliminar usuario?')) return;

    try {
      await api.delete(`/api/webmaster/users/${id}`);

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err: unknown) {
      console.error(err);
      alert('Error al eliminar');
    }
  };

  return {
    users,
    loading,
    error,
    getUsers,
    deleteUser,
  };
}