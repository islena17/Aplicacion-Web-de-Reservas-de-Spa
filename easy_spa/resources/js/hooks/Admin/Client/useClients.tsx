import { useEffect, useState } from "react";
import api from "@/lib/axios";

export type AdminClient = {
    id: number;
    name: string;
    surname: string;
    email?: string;
    telephone?: string;
    reservations_count?: number;
};

export default function useClients() {
    const [clients, setClients] = useState<AdminClient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Estados para la paginación
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchClients = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await api.get(`/api/admin/clients?page=${page}`);

            setClients(res.data.data ?? res.data);
            setLastPage(res.data.last_page ?? 1);
        } catch (error) {
            setError('No se pudieron cargar las reservas.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, [page]);

    return {
        clients,
        loading,
        error,
        refetch: fetchClients,
        setLastPage,
        lastPage,
        setPage,
        page,
    };
}