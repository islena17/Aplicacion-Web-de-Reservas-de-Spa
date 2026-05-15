import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { ServiceCategory } from '@/types';

interface ApiCategoryResponse {
  data: ServiceCategory;
}

export function useCategory(spaSlug?: string, categorySlug?: string) {
  const [category, setCategory] = useState<ServiceCategory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getCategory = async () => {
    if (!spaSlug || !categorySlug) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await api.get<ApiCategoryResponse>(
        `/api/webmaster/spas/${spaSlug}/categories/${categorySlug}`
      );

      console.log('CATEGORY SHOW:', res.data);

      setCategory(res.data.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Error al cargar la categoría');
      setCategory(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, [spaSlug, categorySlug]);

  return {
    category,
    loading,
    error,
    getCategory,
  };
}