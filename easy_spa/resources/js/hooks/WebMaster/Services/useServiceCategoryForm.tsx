import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useNavigate } from 'react-router-dom';

export function useServiceCategoryForm(slug?: string, categorySlug?: string) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    is_active: true,
    order: 0,
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  //constantes del formulario:
  // crear categoria:
  const createCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrors({});

      await axios.post(`/api/webmaster/spas/${slug}/categories`, form);

      navigate(`/dashboard/spas/${slug}?tab=categorias`);;
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

  //actualizar categoria:

useEffect(() => {
  if (!slug || !categorySlug) return;

  const getCategory = async () => {
    try {
      setLoadingOptions(true);
      setErrors({});

      const response = await axios.get(
        `/api/webmaster/spas/${slug}/categories/${categorySlug}`
      );

      const category = response.data;

      setForm({
        name: category.name ?? '',
        slug: category.slug ?? '',
        description: category.description ?? '',
        is_active: Boolean(category.is_active),
        order: category.order ?? 0,
      });
    } catch (error) {
      setErrors({
        general: 'Error al cargar la categoría.',
      });
    } finally {
      setLoadingOptions(false);
    }
  };

  getCategory();
}, [slug, categorySlug]);

const updateCategory = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!slug || !categorySlug) return;

  try {
    setLoading(true);
    setErrors({});

    await axios.put(
      `/api/webmaster/spas/${slug}/categories/${categorySlug}`,
      form
    );

    navigate(`/dashboard/spas/${slug}?tab=categorias`);
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

  const fieldError = (error: any) => {
    if (Array.isArray(error)) return error[0];
    return error;
  };

  

  return {
    form,
    errors,
    loading,
    loadingOptions,
    handleChange,
    createCategory,
    updateCategory,
    fieldError,
  };
}