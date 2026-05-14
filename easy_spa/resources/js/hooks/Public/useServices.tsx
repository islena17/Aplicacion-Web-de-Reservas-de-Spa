import { useEffect, useState, useCallback } from "react";
import api from "@/lib/axios";
import { Service } from "@/types";

export default function useServices(spaSlug?: string, page: number = 1) {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [lastPage, setLastPage] = useState(1);

    const fetchServices = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const res = await api.get("/api/public/services", {
                params: {
                    page,
                    spa_slug: spaSlug,
                },
            });

            setServices(res.data.data);
            setLastPage(res.data.last_page);
        } catch (err) {
            console.error(err);
            setError("No se pudieron cargar los servicios.");
        } finally {
            setLoading(false);
        }
    }, [spaSlug, page]);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    return {
        services,
        loading,
        error,
        lastPage,
        refetch: fetchServices,
    };
}