import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Client } from "@/types";


export function useClient(clientId?: string) {
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!clientId) {
            setError("Falta el ID del cliente.");
            setLoading(false);
            return;
        }

        const fetchClient = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(`/api/admin/clients/${clientId}`);
                setClient(response.data.data ?? response.data);
            } catch (error: any) {
                console.error(error);
                setError(
                    error.response?.data?.message ||
                    "No se pudo cargar el cliente."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [clientId]);

    return { client, loading, error };
}