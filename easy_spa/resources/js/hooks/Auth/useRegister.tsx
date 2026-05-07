import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';

type RegisterForm = {
  name: string;
  surname: string;
  telephone: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type RegisterErrors = Partial<
  Record<keyof RegisterForm, string[]>
> & {
  general?: string;
};

const initialForm: RegisterForm = {
  name: '',
  surname: '',
  telephone: '',
  email: '',
  password: '',
  password_confirmation: '',
};

export function useRegister() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState<RegisterForm>(initialForm);

  const [errors, setErrors] =
    useState<RegisterErrors>({});

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const register = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    try {
      await api.get('/sanctum/csrf-cookie');

      await api.post('/api/auth/register', {
        ...form
      });

      navigate('/login');
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general:
            'Ha ocurrido un error durante el registro.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fieldError = (field?: string[]) =>
    field?.[0];

  return {
    form,
    errors,
    loading,
    handleChange,
    register,
    fieldError,
  };
}