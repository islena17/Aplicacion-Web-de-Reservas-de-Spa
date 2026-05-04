import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export function useSpa() {
  const [spa, setSpa] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getSpa = async () => {
      try {
        setLoadingData(true);
        setError('');

        const res = await api.get('/api/admin/spa-profile');

        setSpa(res.data.data);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar el spa.');
      } finally {
        setLoadingData(false);
      }
    };

    getSpa();
  }, []);

  return { spa, loadingData, error };
}