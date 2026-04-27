// src/hooks/useSpaForm.ts
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';
import { SpaResponse } from './useSpa';

export type SpaFormData = {
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  postal_code: string;
  phone: string;
  email: string;
  opening_time: string;
  closing_time: string;
  logo: File | null;
  is_active: boolean;
};

export type SpaErrors = {
  name?: string[];
  slug?: string[];
  description?: string[];
  address?: string[];
  city?: string[];
  postal_code?: string[];
  phone?: string[];
  email?: string[];
  opening_time?: string[];
  closing_time?: string[];
  logo?: string[];
  is_active?: string[];
  general?: string;
};

const initialForm: SpaFormData = {
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
  logo: null,
  is_active: true,
};

export function useSpaForm(spa?: SpaResponse | null) {
  const navigate = useNavigate();

  const [form, setForm] = useState<SpaFormData>(initialForm);
  const [errors, setErrors] = useState<SpaErrors>({});
  const [loading, setLoading] = useState(false);
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);

  useEffect(() => {
    if (!spa) return;

    setForm({
      name: spa.name ?? '',
      slug: spa.slug ?? '',
      description: spa.description ?? '',
      address: spa.address ?? '',
      city: spa.city ?? '',
      postal_code: spa.postal_code ?? '',
      phone: spa.phone ?? '',
      email: spa.email ?? '',
      opening_time: spa.opening_time ?? '',
      closing_time: spa.closing_time ?? '',
      logo: null,
      is_active: Boolean(spa.is_active),
    });

    setCurrentLogo(spa.logo ?? null);
  }, [spa]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.currentTarget;
    const { name, value } = target;

    if (target instanceof HTMLInputElement) {
      if (target.type === 'checkbox') {
        setForm((prev) => ({
          ...prev,
          [name]: target.checked,
        }));
        return;
      }

      if (target.type === 'file') {
        setForm((prev) => ({
          ...prev,
          [name]: target.files?.[0] || null,
        }));
        return;
      }
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const buildFormData = () => {
    const formData = new FormData();

    formData.append('name', form.name);
    formData.append('slug', form.slug);
    formData.append('description', form.description);
    formData.append('address', form.address);
    formData.append('city', form.city);
    formData.append('postal_code', form.postal_code);
    formData.append('phone', form.phone);
    formData.append('email', form.email);
    formData.append('opening_time', form.opening_time);
    formData.append('closing_time', form.closing_time);
    formData.append('is_active', form.is_active ? '1' : '0');

    if (form.logo) {
      formData.append('logo', form.logo);
    }

    return formData;
  };

  const createSpa = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await api.post('/api/webmaster/spas', buildFormData(), {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/dashboard/spas');
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        setErrors({ general: 'Ha ocurrido un error al crear el spa.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const updateSpa = async (e: FormEvent, slug?: string) => {
    e.preventDefault();
    if (!slug) return;

    setLoading(true);
    setErrors({});

    try {
      const formData = buildFormData();
      formData.append('_method', 'PUT');

      await api.post(`/api/webmaster/spas/${slug}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/dashboard/spas');
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        setErrors({ general: 'Ha ocurrido un error al actualizar el spa.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const fieldError = (field?: string[]) => field?.[0];

  return {
    form,
    errors,
    loading,
    currentLogo,
    handleChange,
    createSpa,
    updateSpa,
    fieldError,
  };
}