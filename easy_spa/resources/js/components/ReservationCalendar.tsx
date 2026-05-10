import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

type Props = {
    events: any[];
};

export default function ReservationCalendar({ events}: Props) {
    return (
        <div
            className="card border-0 shadow-sm"
            style={{ borderRadius: "20px" }}
        >
            <div className="card-body p-4">
                <FullCalendar
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                    ]}
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
                    eventClassNames={() => [
                        "border-0",
                        "rounded-md",
                    ]}
                    eventContent={(eventInfo) => {
                        const r = eventInfo.event.extendedProps;

                        const color =
                            eventInfo.event.backgroundColor ||
                            eventInfo.event.borderColor ||
                            "#3788d8";

                        return (
                            <div
                                className="w-100 rounded px-2 py-1 text-white shadow-sm overflow-hidden"
                                style={{
                                    backgroundColor: color,
                                }}
                            >
                                <div
                                    className="fw-semibold text-truncate"
                                    style={{ fontSize: "12px" }}
                                >
                                    {eventInfo.timeText} · {r.servicio}
                                </div>

                                <div
                                    className="text-truncate"
                                    style={{
                                        fontSize: "11px",
                                        opacity: 0.9,
                                    }}
                                >
                                    Cliente: {r.cliente}
                                </div>

                                <div
                                    className="text-truncate"
                                    style={{
                                        fontSize: "11px",
                                        opacity: 0.85,
                                    }}
                                >
                                    Empleado: {r.empleado}
                                </div>
                            </div>
                        );
                    }}
                />
            </div>
        </div>
    );
}