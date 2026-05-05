import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { useParams } from 'react-router-dom';

interface Service {
  id: number;
  name: string;
  slug: string;
  price: number;
  length_minutes: number;
  is_active?: boolean;
}

export interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  is_active: boolean;
  order: number;
  services?: Service[];
}

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