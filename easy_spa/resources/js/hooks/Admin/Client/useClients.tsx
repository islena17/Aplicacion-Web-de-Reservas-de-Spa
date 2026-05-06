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

    const fetchClients = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await api.get("/api/admin/clients");

            setClients(res.data.data ?? res.data);
        } catch (err) {
            console.error(err);
            setError("No se pudieron cargar los clientes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return { clients, loading, error, refetch: fetchClients };
}