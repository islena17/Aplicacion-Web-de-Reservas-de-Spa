import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';

type CategoryForm = {
   id?: number;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  order: number;
};

type CategoryErrors = Partial<Record<keyof CategoryForm, string[]>> & {
  general?: string;
};

const initialForm: CategoryForm = {
  name: '',
  slug: '',
  description: '',
  is_active: true,
  order: 0,
};

export function useCategoryForm(categorySlug?: string) {
  const navigate = useNavigate();

  const [form, setForm] = useState<CategoryForm>(initialForm);
  const [errors, setErrors] = useState<CategoryErrors>({});
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  //  cargar categoría si es edit
  useEffect(() => {
    console.log('CATEGORY ID:', categorySlug);

    if (!categorySlug) {
      console.log('No hay categorySlug, no se cargan datos');
      return;
    }

    const fetchCategory = async () => {
      try {
        setLoadingData(true);

        const res = await api.get(`/api/admin/categories/${categorySlug}`);

        console.log('RESPUESTA CATEGORY:', res.data);

        const category = res.data.data ?? res.data;

        setForm({
           id: category.id,
          name: category.name ?? '',
          slug: category.slug ?? '',
          description: category.description ?? '',
          is_active: Boolean(category.is_active),
          order: category.order ?? 0,
        });
      } catch (error: any) {
        console.error('ERROR CATEGORY:', error.response?.status, error.response?.data);

        setErrors({ general: 'No se pudo cargar la categoría.' });
      } finally {
        setLoadingData(false);
      }
    };

    fetchCategory();
  }, [categorySlug]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;

      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: name === 'order' ? Number(value) : value,
    }));
  };

  //  CREATE
  const createCategory = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    try {
      await api.post('/api/admin/categories', form);

      navigate('/admin/categories');
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general: 'Error al crear la categoría.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // UPDATE
  const updateCategory = async (e: FormEvent) => {
    e.preventDefault();

    if (!categorySlug) return;

    setLoading(true);
    setErrors({});

    try {
     await api.put(`/api/admin/categories/${categorySlug}`, form);

      navigate('/admin/categories');
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general: 'Error al actualizar la categoría.',
        });
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
    loadingData,
    handleChange,
    createCategory,
    updateCategory,
    fieldError,
  };
}