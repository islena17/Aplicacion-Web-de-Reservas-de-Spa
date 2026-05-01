import { useState } from 'react';
import api from '@/lib/axios';

interface CreateUserData {
  role_id: number;
  email: string;
  password: string;
}

export function useCreateUser() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const createUser = async (data: CreateUserData) => {
    try {
      setLoading(true);
      setErrors({});

      const res = await api.post('/api/webmaster/users', data);

      return res.data;
    } catch (err: any) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        alert('Error al crear usuario');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createUser,
    loading,
    errors,
  };
}