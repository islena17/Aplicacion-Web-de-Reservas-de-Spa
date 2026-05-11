import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

type Spa = {
  id: number;
  name: string;
  slug: string;
};

type Client = {
  id: number;
  name: string;
  surname?: string;
  email?: string;
  telephone?: string;
};

type Service = {
  id: number;
  name: string;
};

type Employee = {
  id: number;
  name?: string;
  user?: {
    name: string;
  };
};

export type Reservation = {
  id: number;
  spa?: Spa;
  client?: Client;
  service?: Service;
  employee?: Employee | null;
  reservation_date: string;
  start_time: string;
  end_time: string;
  status: string;
  final_price?: string | number | null;
  observations?: string | null;
};

type Errors = {
  general?: string;
};

export function useGlobalReservation() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [lastPage, setLastPage] = useState(1);
   const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    spa: '',
    date: '',
  });

  const getReservations = async () => {
    try {
      setLoading(true);
      setErrors({});

      const response = await axios.get('/api/webmaster/reservations',{

        params: {
          page,
        },
      });

      setReservations(response.data.data ?? response.data);
      setLastPage(response.data.last_page);
    } catch (error) {
      setErrors({
        general: 'No se pudieron cargar las reservas.',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteReservation = async (id: number) => {
    const confirmDelete = window.confirm(
      '¿Seguro que quieres eliminar esta reserva?'
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/webmaster/reservations/${id}`);

      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== id)
      );
    } catch (error) {
      setErrors({
        general: 'No se pudo eliminar la reserva.',
      });
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      spa: '',
      date: '',
    });
  };

  const fieldStatus = (status: string) => {
    const statuses: Record<string, string> = {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      cancelled: 'Cancelada',
      completed: 'Completada',
      no_show: 'No presentado',
    };

    return statuses[status] ?? status;
  };

  const statusClass = (status: string) => {
    const classes: Record<string, string> = {
      pending: 'bg-warning text-dark',
      confirmed: 'bg-success',
      cancelled: 'bg-danger',
      completed: 'bg-primary',
      no_show: 'bg-secondary',
    };

    return classes[status] ?? 'bg-secondary';
  };

  useEffect(() => {
    getReservations();
  }, [page]);

  useEffect(() => {
    let result = [...reservations];

    if (filters.search) {
      const search = filters.search.toLowerCase();

      result = result.filter((reservation) => {
        const clientName = `${reservation.client?.name ?? ''} ${
          reservation.client?.surname ?? ''
        }`.toLowerCase();

        const serviceName = reservation.service?.name?.toLowerCase() ?? '';
        const spaName = reservation.spa?.name?.toLowerCase() ?? '';

        return (
          clientName.includes(search) ||
          serviceName.includes(search) ||
          spaName.includes(search)
        );
      });
    }

    if (filters.status) {
      result = result.filter(
        (reservation) => reservation.status === filters.status
      );
    }

    if (filters.spa) {
      result = result.filter(
        (reservation) => reservation.spa?.slug === filters.spa
      );
    }

    if (filters.date) {
      result = result.filter(
        (reservation) => reservation.reservation_date === filters.date
      );
    }

    setFilteredReservations(result);
  }, [filters, reservations]);

  const spas = Array.from(
    new Map(
      reservations
        .filter((reservation) => reservation.spa)
        .map((reservation) => [
          reservation.spa!.slug,
          reservation.spa!,
        ])
    ).values()
  );
//contar reservas para el home dashboard
const totalReservationP = reservations.filter(r => r.status === 'pending').length;
const totalReservationC = reservations.filter(r => r.status === 'confirmed').length;
const totalReservationCd = reservations.filter(r=> r.status === 'cancelled').length;
const totalReservationNS = reservations.filter(r=> r.status === 'no_show').length;

//ultimas 5 reservas para home
const lastReservations = [...reservations]
    .sort((a, b) => b.id - a.id) // Ordenamos por ID de mayor a menor
    .slice(0, 5); // Tomamos solo las primeras 5

  return {
    reservations,
    filteredReservations,
    totalReservationP,
    totalReservationC,
    totalReservationCd,
    totalReservationNS,
    lastReservations,
    spas,
    filters,
    loading,
    errors,
    handleFilterChange,
    clearFilters,
    deleteReservation,
    fieldStatus,
    statusClass,
    getReservations,
    setLastPage,
    lastPage,
    setPage,
    page,
  };
}