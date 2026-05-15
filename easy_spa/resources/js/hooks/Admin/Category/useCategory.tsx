import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { useParams } from 'react-router-dom';
import { ServiceCategory } from '@/types';


interface ApiCategoryResponse {
  data: ServiceCategory;
}

export function useCategory() {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const [category, setCategory] = useState<ServiceCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCategory = async () => {
    if (!categorySlug) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await api.get<ApiCategoryResponse>(
        `/api/admin/categories/${categorySlug}`
      );

      setCategory(res.data.data ?? res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error al cargar la categoría');
      setCategory(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, [categorySlug]);

  return {
    category,
    loading,
    error,
    getCategory,
  };
}