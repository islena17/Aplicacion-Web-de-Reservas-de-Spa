import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Client, User, Reservation } from "@/types";



export function useClient(slug?: string, clientId?: string) {
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchClient = async () => {
        if (!slug || !clientId) {
            setError("Faltan datos en la URL.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`/api/webmaster/spas/${slug}/clients/${clientId}`);
            setClient(response.data.data);
        } catch (error: any) {
            console.error("Error completo:", error);
            console.error("Status:", error.response?.status);
            console.error("Data:", error.response?.data);

            setError(
                error.response?.data?.message ||
                "No se pudo cargar el cliente."
            );
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchClient();
    }, [slug, clientId]);

    return {
        client,
        loading,
        error,
        refetch: fetchClient,
    };
}