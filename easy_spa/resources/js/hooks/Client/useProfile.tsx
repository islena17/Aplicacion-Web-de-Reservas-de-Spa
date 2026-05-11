import api from "@/lib/axios";

import { useEffect, useState } from "react";

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
    };
};

type Client={
    id: number;
    name: string;
    surname: string;
    telephone?: string | null;
    email: string | null;
    user?: User;
    reservations?: Reservation[];
}


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