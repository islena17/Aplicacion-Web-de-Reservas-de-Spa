import api from "@/lib/axios";

import { useEffect, useState } from "react";
import  {User, Reservation, Client} from "@/types";

export function useProfile() {
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchClient = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/api/client/profile");
            setClient(response.data.data);
        } catch (error: any) {
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
    }, []);

    return {
        client,
        loading,
        error,
        refetch: fetchClient,
    };
}