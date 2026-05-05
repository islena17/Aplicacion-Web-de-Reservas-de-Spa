import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import useCalendar from "@/hooks/Admin/useCalendar";
import { useNavigate } from "react-router-dom";


export default function ReservationCalendar() {
    const { events, loading, error } = useCalendar();

    if (loading) return <p>Cargando reservas...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">
                Calendario de reservas
            </h2>

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={esLocale}
                height="auto"
                events={events}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                buttonText={{
                    today: "Hoy",
                    month: "Mes",
                    week: "Semana",
                    day: "Día",
                }}
                eventContent={(eventInfo) => {
                     const r = eventInfo.event.extendedProps;
    const color = eventInfo.event.backgroundColor;

                    return (
                        <div className="w-full rounded-md px-2 py-1 text-white shadow-sm overflow-hidden" style={{ backgroundColor: color }}>
                            <div className="text-xs font-semibold truncate" 
>
                                {eventInfo.timeText} · {r.servicio}
                            </div>

                            <div className="text-[11px] truncate opacity-90">
                                Cliente: {r.cliente}
                            </div>

                            <div className="text-[11px] truncate opacity-90">
                                Empleado: {r.empleado}
                            </div>
                        </div>
                    );
                }}
            />
        </div>
    );
}