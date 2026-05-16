import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';

type LoginErrors = {
  email?: string | string[];
  password?: string | string[];
  general?: string;
};

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  const from = location.state?.from;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    try {
      await api.get('/sanctum/csrf-cookie');

      await api.post('/login', {
        email,
        password,
        remember,
      });

      const userResponse = await api.get('/api/user');
      const user = userResponse.data;

      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      if (from) {
        navigate(from, { replace: true });
        return;
      }

      if (user.role?.name === 'WebMaster') {
        navigate('/dashboard');
      } else if (user.role?.name === 'Admin') {
        navigate('/admin');
      } else if (user.role?.name === 'Client') {
        navigate('/');
      }
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else if (error.response?.status === 419) {
        setErrors({
          general:
            'La sesión CSRF ha fallado. Recarga la página e inténtalo de nuevo.',
        });
      } else if (error.response?.status === 401) {
        setErrors({
          general: 'Credenciales incorrectas.',
        });
      } else {
        setErrors({
          general: 'Ha ocurrido un error al iniciar sesión.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fieldError = (field?: string | string[]) => {
    if (Array.isArray(field)) return field[0];
    return field;
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    remember,
    setRemember,
    loading,
    errors,
    handleSubmit,
    fieldError,
  };
}