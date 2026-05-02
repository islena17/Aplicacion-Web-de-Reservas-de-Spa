import { useEffect, useState } from "react";
import axios from "@/lib/axios";

type User = {
    id: number;
    email: string;
    role_id?: number;
    is_active?: boolean;
};

type Reservation = {
    id: number;
    reservation_date: string;
    start_time?: string;
    end_time?: string;
    status?: string;
    service?: {
        id: number;
        name: string;
        price?: number;
        length_minutes?: number;
    };
    employee?: {
        id: number;
        name?: string;
        surname?: string;
        user?: User;
    };
};

type Client = {
    id: number;
    user_id?: number;
    name: string;
    surname: string;
    email: string;
    telephone?: string;
    is_active?: boolean;
    user?: User | null;
    reservations?: Reservation[];
};

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