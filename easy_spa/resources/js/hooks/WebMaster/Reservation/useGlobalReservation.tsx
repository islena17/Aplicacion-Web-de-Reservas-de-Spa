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
      // Carga los spas disponibles para el filtro.
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

      // Obtiene las reservas aplicando filtros y paginación.
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
      // Elimina la reserva seleccionada.
      await axios.delete(`/api/webmaster/reservations/${id}`);

      // Actualiza la lista local sin recargar todas las reservas.
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

    // Reinicia la paginación al cambiar cualquier filtro.
    setPage(1);

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    // Limpia todos los filtros y vuelve a la primera página.
    setPage(1);

    setFilters({
      search: '',
      status: '',
      spa: '',
      date: '',
    });
  };

  const fieldStatus = (status: string) => {
    // Traduce el estado interno de la reserva a texto visible.
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
    // Devuelve la clase visual correspondiente a cada estado.
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

  // Cuenta reservas por estado para el dashboard.
  const totalReservationP = reservations.filter(
    (r) => r.status === 'pending'
  ).length;

  const totalReservationC = reservations.filter(
    (r) => r.status === 'confirmed'
  ).length;

  const totalReservationCd = reservations.filter(
    (r) => r.status === 'cancelled'
  ).length;

  const totalReservationNS = reservations.filter(
    (r) => r.status === 'no_show'
  ).length;

  // Obtiene las últimas 5 reservas para mostrar en el dashboard.
  const lastReservations = [...reservations]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

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