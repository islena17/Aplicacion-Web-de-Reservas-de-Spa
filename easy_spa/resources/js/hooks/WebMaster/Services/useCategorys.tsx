import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import type { ServiceCategory } from '@/types';

export function useServiceCategory(slug?: string) {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchServiceCategory = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.get(`/api/webmaster/spas/${slug}/categories`, {
        params: { page },
      });

      const data = response.data;

      const categoriesArray = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
          ? data.data
          : Array.isArray(data.categories)
            ? data.categories
            : [];

      setCategories(categoriesArray);
      setLastPage(data.last_page ?? 1);
    } catch {
      setError('No se han podido cargar las categorías.');
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (categorySlug: string) => {
    if (!slug) return;

    const confirmDelete = window.confirm(
      '¿Seguro que quieres eliminar esta categoría?'
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/webmaster/spas/${slug}/categories/${categorySlug}`);

      setCategories((prev) =>
        prev.filter((category) => category.slug !== categorySlug)
      );
    } catch (error: any) {
      if (error.response?.status === 409) {
        setError(error.response.data.message);
        return;
      }

      setError('No se ha podido eliminar la categoría.');
    }
  };

  useEffect(() => {
    fetchServiceCategory();
  }, [page, slug]);

  return {
    categories,
    loading,
    error,
    page,
    setPage,
    lastPage,
    refetch: fetchServiceCategory,
    deleteCategory,
  };
}