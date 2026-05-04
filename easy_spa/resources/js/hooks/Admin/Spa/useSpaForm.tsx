import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';

export function useSpaForm(spa: any) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    address: '',
    city: '',
    postal_code: '',
    phone: '',
    email: '',
    opening_time: '',
    closing_time: '',
    logo: null as File | null,
  });

  const [currentLogo, setCurrentLogo] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (spa) {
      setForm({
        name: spa.name ?? '',
        slug: spa.slug ?? '',
        description: spa.description ?? '',
        address: spa.address ?? '',
        city: spa.city ?? '',
        postal_code: spa.postal_code ?? '',
        phone: spa.phone ?? '',
        email: spa.email ?? '',
        opening_time: spa.opening_time?.slice(0, 5) ?? '',
        closing_time: spa.closing_time?.slice(0, 5) ?? '',
        logo: null,
      });

      setCurrentLogo(spa.logo ?? '');
    }
  }, [spa]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;

    if (target.type === 'file') {
      setForm({ ...form, [target.name]: target.files?.[0] ?? null });
      return;
    }

    setForm({ ...form, [target.name]: target.value });
  };

  const fieldError = (error: any) => {
    return Array.isArray(error) ? error[0] : error;
  };

  const updateSpa = async (e: React.FormEvent, slug?: string) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          formData.append(key, value as any);
        }
      });

      formData.append('_method', 'PUT');

      const url = slug
        ? `/api/admin/spas/${slug}`
        : `/api/admin/spa`;

      await api.post('/api/admin/spa-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate(-1);
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general: 'No se pudo actualizar el spa.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    currentLogo,
    handleChange,
    updateSpa,
    fieldError,
  };
}