// src/hooks/useSpa.ts
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export type SpaResponse = {
  id: number;
  name: string;
  slug: string | null;
  description: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  phone: string | null;
  email: string | null;
  opening_time: string | null;
  closing_time: string | null;
  logo: string | null;
  is_active: boolean;
};

const normalizeTime = (value: string | null) => {
  if (!value) return '';
  return value.length >= 5 ? value.slice(0, 5) : value;
};

export function useSpa(slug?: string) {
  const [spa, setSpa] = useState<SpaResponse | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;

    const fetchSpa = async () => {
      try {
        setLoadingData(true);

        const response = await api.get(`/api/webmaster/spas/${slug}`);
        const data = response.data.data ?? response.data;

        setSpa({
          ...data,
          opening_time: normalizeTime(data.opening_time),
          closing_time: normalizeTime(data.closing_time),
        });
      } catch {
        setError('No se ha podido cargar la información del spa.');
      } finally {
        setLoadingData(false);
      }
    };

    fetchSpa();
  }, [slug]);

  return { spa, loadingData, error };
}