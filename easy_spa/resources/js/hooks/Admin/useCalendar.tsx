import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function useCalendar() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchEvents = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await api.get("/api/admin/reservations/calendar");
            setEvents(res.data);
        } catch (err) {
            console.error(err);
            setError("No se pudieron cargar las reservas.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return { events, loading, error };
}