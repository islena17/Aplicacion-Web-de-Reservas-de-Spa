import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  is_active: boolean;
  order: number;
  services_count?: number;
  services?: any[];
}

export default function useCategories() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await api.get('/api/admin/categories');

      setCategories(res.data.data ?? res.data);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar las categorías.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
}