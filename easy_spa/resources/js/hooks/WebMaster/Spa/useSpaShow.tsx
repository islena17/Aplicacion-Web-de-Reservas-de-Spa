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
  employees: Employee[];
  clients: Client[];
  categories: ServiceCategory[];
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

export type Employee = {
  id: number;
  name: string;
  surname: string;
  gender: string | null;
  email: string | null;
  telephone: string | null;
  is_active: boolean;
  user?: {
    id: number;

  } | null;

}
export type Client = {
  id: number;
  name: string;
  surname: string;
  email?: string | null;
  telephone?: string | null;
  user?: {
    id: number;
  } | null;
  last_reservation_date: string | null;

}

export type ServiceCategory = {
  id: number;
  name: string;
  slug: string,
  description?: string | null;
  is_active: boolean;
  order: number;
}

export function useSpaShow(slug?: string) {
  const [spa, setSpa] = useState<SpaShow | null>(null);
  const [activeTab, setActiveTab] = useState<'datos' | 'reservas' | 'categorias' | 'servicios' | 'empleados' | 'clientes'>('datos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //constante para cargar datos del spa
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

  //constantes para eliminar datos:
  //reservas
  const deleteReservation = async (reservationId: number) => {
    const confirmDelete = window.confirm(
      '¿Seguro que quieres eliminar esta reserva?'
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/webmaster/reservations/${reservationId}`);

      setSpa((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          reservations: prev.reservations.filter(
            (reservation) => reservation.id !== reservationId
          ),
        };
      });
    } catch {
      setError('No se ha podido eliminar la reserva.');
    }
  };

// eliminar servicio
const deleteService = async (serviceSlug: string) => {
  const confirmDelete = window.confirm(
    '¿Seguro que quieres eliminar este servicio?'
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/api/webmaster/services/${serviceSlug}`);

    setSpa((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        services: prev.services.filter(
          (service) => service.slug !== serviceSlug
        ),
      };
    });
  } catch {
    setError('No se ha podido eliminar el servicio.');
  }
};

// eliminar categoría
const deleteCategory = async (categorySlug: string) => {
  const confirmDelete = window.confirm(
    '¿Seguro que quieres eliminar esta categoría?'
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/api/webmaster/spas/${slug}/categories/${categorySlug}`);

    setSpa((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        categories: prev.categories.filter(
          (category) => category.slug !== categorySlug
        ),
      };
    });

    setSelectedCategory('');
  } catch (error: any) {
    if (error.response?.status === 409) {
      setError(error.response.data.message);
      return;
    }

    setError('No se ha podido eliminar la categoría.');
  }
}

  //filtro de servicios por categorias

  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredServices = selectedCategory
    ? spa?.services?.filter(
      (service) => service.category?.id === Number(selectedCategory)
    ) ?? []
    : spa?.services ?? [];

  const categories = spa?.categories ?? [];
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
    deleteReservation,
    selectedCategory,
    setSelectedCategory,
    filteredServices,
    categories,
    deleteCategory,
    deleteService
  };
}