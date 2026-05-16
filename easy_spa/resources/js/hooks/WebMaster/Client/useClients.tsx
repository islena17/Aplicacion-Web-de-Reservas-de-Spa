import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Client } from "@/types";

export default function useClients(slug?: string) {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchClients = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await api.get("/api/webmaster/clients", {
                params: {
                    page,
                    spa: slug,
                },
            });

            setClients(res.data.data ?? res.data);
            setLastPage(res.data.last_page ?? 1);
        } catch {
            setError("No se pudieron cargar los clientes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!slug) {
            setClients([]);
            setLoading(false);
            return;
        }

        fetchClients();
    }, [page, slug]);

    const deleteClient = async (clientId: number) => {
        const confirmDelete = window.confirm(
            '¿Seguro que quieres eliminar este cliente?'
        );

        if (!confirmDelete) return false;

        try {
            await api.delete(`/api/webmaster/clients/${clientId}`);

            setClients((prev) =>
                prev.filter((client) => client.id !== clientId)
            );

            return true;
        } catch {
            setError('No se pudo eliminar el cliente.');
            return false;
        }
    };

    return {
        clients,
        loading,
        error,
        refetch: fetchClients,
        lastPage,
        setPage,
        page,
        deleteClient
    };
}