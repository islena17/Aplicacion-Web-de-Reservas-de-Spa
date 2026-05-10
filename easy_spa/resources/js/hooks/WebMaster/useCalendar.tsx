import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function useSpaCalendar(slug?: string) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!slug) {
            setError("Falta el spa en la URL.");
            setLoading(false);
            return;
        }

        const fetchCalendar = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await api.get(`/api/webmaster/spas/${slug}/calendar`);

                setEvents(res.data.data ?? res.data);
            } catch (err) {
                console.error(err);
                setError("No se pudo cargar el calendario del spa.");
            } finally {
                setLoading(false);
            }
        };

        fetchCalendar();
    }, [slug]);

    return { events, loading, error };
}