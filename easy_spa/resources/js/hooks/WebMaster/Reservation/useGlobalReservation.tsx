import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { Reservation, Spa } from '@/types';

type Errors = {
  general?: string;
};

export function useGlobalReservation() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState(1);
  const [spas, setSpas] = useState<Spa[]>([]);

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    spa: '',
    date: '',
  });

 const getSpas = async () => {
  try {
    const response = await axios.get('/api/webmaster/reservations/spas');
    setSpas(response.data);
  } catch (error) {
    setErrors({
      general: 'No se pudieron cargar los spas.',
    });
  }
};

  const getReservations = async () => {
    try {
      setLoading(true);
      setErrors({});

      const response = await axios.get('/api/webmaster/reservations/filter', {
        params: {
          page,
          search: filters.search || undefined,
          status: filters.status || undefined,
          spa: filters.spa || undefined,
          date: filters.date || undefined,
        },
      });

      setReservations(response.data.data ?? response.data);
      setLastPage(response.data.last_page ?? 1);
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

    setPage(1);

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setPage(1);

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
  }, [filters, page]);


  useEffect(() => {
    getSpas();
  }, []);


  //contar reservas para el home dashboard
  const totalReservationP = reservations.filter(r => r.status === 'pending').length;
  const totalReservationC = reservations.filter(r => r.status === 'confirmed').length;
  const totalReservationCd = reservations.filter(r => r.status === 'cancelled').length;
  const totalReservationNS = reservations.filter(r => r.status === 'no_show').length;

  //ultimas 5 reservas para home
  const lastReservations = [...reservations]
    .sort((a, b) => b.id - a.id) // Ordenamos por ID de mayor a menor
    .slice(0, 5); // Tomamos solo las primeras 5

  return {
    reservations,
    filteredReservations: reservations,
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