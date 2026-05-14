import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { ServiceCategory } from '@/types';

export default function useCategories() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados para la paginación
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await api.get('/api/admin/categories');

      setCategories(res.data.data ?? res.data);
      setLastPage(res.data.last_page ?? 1);
    } catch (error) {
      setError('No se pudieron cargar las reservas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    lastPage,
    setPage,
    page,
  };
}