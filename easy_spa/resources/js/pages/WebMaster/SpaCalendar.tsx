import { useParams } from "react-router-dom";

import ReservationCalendar from "@/components/ReservationCalendar";
import DashboardLayout from "@/components/layouts/WMLayout";
import useSpaCalendar from "@/hooks/WebMaster/useCalendar";

export default function SpaCalendar() {
    const { slug } = useParams<{ slug: string }>();

    const { events, loading, error } = useSpaCalendar(slug);

    if (loading) return <DashboardLayout><p>Cargando calendario...</p></DashboardLayout>;

    if (error) {
        return <DashboardLayout><p className="text-danger">{error}</p></DashboardLayout>;
    }

    return (
        <DashboardLayout>
            <div
                style={{
                    backgroundColor: "#F7F7F7",
                    minHeight: "100vh",
                    padding: "32px",
                }}
            >
                <div className="mb-4">
                    <h1 className="fw-bold mb-1">
                        Calendario del spa
                    </h1>

                    <p className="text-muted mb-0">
                        Consulta las reservas del spa.
                    </p>
                </div>

                <ReservationCalendar events={events} />
            </div>
        </DashboardLayout>
    );
}