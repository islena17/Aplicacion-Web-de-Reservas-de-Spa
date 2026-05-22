import { useNavigate, useParams } from "react-router-dom";

import ReservationCalendar from "@/components/ReservationCalendar";
import DashboardLayout from "@/components/layouts/WMLayout";
import useSpaCalendar from "@/hooks/WebMaster/useCalendar";

export default function SpaCalendar() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate()

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
                
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                        <div>
                            <h1 className="fw-bold mb-1">
                            Calendario del spa
                        </h1>

                        <p className="text-muted mb-0">
                            Consulta las reservas del spa.
                        </p>
                    </div>
                    <button
                        className="btn"
                        onClick={() => navigate(`/dashboard/spas/${slug}/`)}
                        style={{
                            backgroundColor: '#F2E6D0',
                            color: '#7a6440',
                            borderRadius: '12px',
                            fontWeight: 700,
                            padding: '6px 14px',
                        }}
                    >
                        <i className="bi bi-arrow-left"></i>  Volver
                    </button>
        

            </div>

            <ReservationCalendar events={events} />
        </div>
        </DashboardLayout >
    );
}