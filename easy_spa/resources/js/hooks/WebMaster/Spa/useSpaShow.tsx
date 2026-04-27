import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export type SpaShow = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  address?: string | null;
  city?: string | null;
  postal_code?: string | null;
  phone?: string | null;
  email?: string | null;
  opening_time?: string | null;
  closing_time?: string | null;
  logo?: string | null;
  is_active: boolean;
  reservations: Reservation[];
  services: Service[];
};

export type Reservation = {
  id: number;
  reservation_date: string;
  start_time: string;
  end_time: string;
  status: string;
  final_price?: string | number | null;
  client?: {
    id: number;
    name: string;
  } | null;
  service?: {
    id: number;
    name: string;
  } | null;
  employee?: {
    id: number;
    name: string;
  } | null;
};

export type Service = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  length_minutes: number;
  price: string | number;
  capacity: number;
  requires_employee: boolean;
  is_active: boolean;
  category?: {
    id: number;
    name: string;
  } | null;
};

export function useSpaShow(slug?: string) {
  const [spa, setSpa] = useState<SpaShow | null>(null);
  const [activeTab, setActiveTab] = useState<'datos' | 'reservas' | 'servicios'>('datos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSpa = async () => {
    if (!slug) return;

    try {
      setLoading(true);

      const response = await api.get(`/api/webmaster/spas/${slug}`);

      setSpa(response.data.data ?? response.data);
    } catch {
      setError('No se ha podido cargar la información del spa.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpa();
  }, [slug]);

  return {
    spa,
    activeTab,
    setActiveTab,
    loading,
    error,
    refetch: fetchSpa,
  };
}