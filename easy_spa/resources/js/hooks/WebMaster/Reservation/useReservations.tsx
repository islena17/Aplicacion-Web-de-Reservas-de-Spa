import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import type { Reservation} from '@/types';


export function useReservations(slug?: string) {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchReservations = async () => {
        if (!slug) return;

        try {
            setLoading(true);
            setError('');

            const response = await api.get('/api/webmaster/reservations', {
                params: {
                    page,
                    spa: slug,
                },
            });

            setReservations(response.data.data ?? []);
            setLastPage(response.data.last_page ?? 1);
        } catch {
            setError('No se han podido cargar las reservas.');
        } finally {
            setLoading(false);
        }
    };

    const deleteReservation = async (reservationId: number) => {
        const confirmDelete = window.confirm('¿Seguro que quieres eliminar esta reserva?');

        if (!confirmDelete) return;

        try {
            await api.delete(`/api/webmaster/reservations/${reservationId}`);

            setReservations((prev) =>
                prev.filter((reservation) => reservation.id !== reservationId)
            );
        } catch {
            setError('No se ha podido eliminar la reserva.');
        }
    };

    useEffect(() => {
        fetchReservations();
    }, [slug, page]);

    return {
        reservations,
        loading,
        error,
        page,
        setPage,
        lastPage,
        refetch: fetchReservations,
        deleteReservation,
    };
}