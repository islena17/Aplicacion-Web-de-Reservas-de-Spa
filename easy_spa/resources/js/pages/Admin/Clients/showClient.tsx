import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/forms/layouts/AdminLayout";
import { useClient } from "@/hooks/Admin/Client/useClient";


export default function AdminClientShow() {
    const navigate = useNavigate();
    const { clientId } = useParams<{ clientId: string }>();

    const { client, loading, error } = useClient(clientId);

    if (loading) {
        return (
            <AdminLayout>
                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "100vh", backgroundColor: "#F7F7F7" }}
                >
                    <div className="text-center">
                        <div className="spinner-border mb-3" style={{ color: "#E0C38D" }} />
                        <p className="text-muted mb-0">Cargando cliente...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (error || !client) {
        return (
            <AdminLayout>
                <div style={{ minHeight: "100vh", backgroundColor: "#F7F7F7", padding: "32px" }}>
                    <div className="alert alert-danger">
                        {error || "Cliente no encontrado."}
                    </div>

                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                        Volver
                    </button>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div style={{ minHeight: "100vh", backgroundColor: "#F7F7F7", padding: "32px" }}>
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <div>
                        <h2 className="fw-bold mb-1" style={{ color: "#2f2f2f" }}>
                            {client.name} {client.surname}
                        </h2>
                        <p className="text-muted mb-0">
                            Detalle del cliente del spa.
                        </p>
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-light border"
                            style={{ borderRadius: "12px" }}
                            onClick={() => navigate("/admin/clients")}
                        >
                            Volver
                        </button>

                        <button
                            className="btn fw-semibold"
                            style={{
                                backgroundColor: "#E0C38D",
                                color: "#fff",
                                borderRadius: "12px",
                            }}
                            onClick={() => navigate(`/admin/clients/${clientId}/edit`)}
                        >
                            Editar cliente
                        </button>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-12 col-xl-4">
                        <div className="card border-0 shadow-sm" style={{ borderRadius: "20px" }}>
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-4">Información personal</h5>

                                <Info label="ID cliente" value={client.id} />
                                <Info label="Nombre" value={`${client.name} ${client.surname}`} />
                                <Info label="Email cliente" value={client.email || "-"} />
                                <Info label="Teléfono" value={client.telephone || "-"} />
                                
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm mt-4" style={{ borderRadius: "20px" }}>
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-4">Resumen</h5>

                                <Info
                                    label="Total de reservas"
                                    value={client.reservations?.length ?? 0}
                                />

                                <Info
                                    label="Última reserva"
                                    value={
                                        client.reservations?.[0]?.reservation_date
                                            ? client.reservations[0].reservation_date
                                            : "-"
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-xl-8">
                        <div className="card border-0 shadow-sm" style={{ borderRadius: "20px" }}>
                            <div className="card-body p-0">
                                <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                                    <h5 className="fw-bold mb-0">Reservas del cliente</h5>

                                    <span className="badge bg-light text-dark border">
                                        {client.reservations?.length ?? 0} reservas
                                    </span>
                                </div>

                                {!client.reservations || client.reservations.length === 0 ? (
                                    <div className="p-4 text-muted">
                                        Este cliente no tiene reservas en este spa.
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table mb-0 align-middle">
                                            <thead style={{ backgroundColor: "#F7F7F7" }}>
                                                <tr>
                                                    <th className="px-4 py-3">Fecha</th>
                                                    <th className="px-4 py-3">Hora</th>
                                                    <th className="px-4 py-3">Servicio</th>
                                                    <th className="px-4 py-3">Empleado</th>
                                                    <th className="px-4 py-3">Estado</th>
                                                    <th className="px-4 py-3">Precio</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {client.reservations.map((reservation) => (
                                                    <tr key={reservation.id}>
                                                        <td className="px-4 py-3">
                                                            {reservation.reservation_date}
                                                        </td>

                                                        <td className="px-4 py-3">
                                                            {reservation.start_time || "-"}
                                                            {reservation.end_time
                                                                ? ` - ${reservation.end_time}`
                                                                : ""}
                                                        </td>

                                                        <td className="px-4 py-3">
                                                            {reservation.service?.name || "-"}
                                                        </td>

                                                        <td className="px-4 py-3">
                                                            {reservation.employee
                                                                ? `${reservation.employee.name ?? ""} ${
                                                                      reservation.employee.surname ?? ""
                                                                  }`
                                                                : "-"}
                                                        </td>

                                                        <td className="px-4 py-3">
                                                            <span
                                                                className="badge border"
                                                                style={{
                                                                    backgroundColor: getStatusBackground(
                                                                        reservation.status
                                                                    ),
                                                                    color: getStatusColor(reservation.status),
                                                                }}
                                                            >
                                                                {reservation.status || "Pendiente"}
                                                            </span>
                                                        </td>

                                                        <td className="px-4 py-3">
                                                            {reservation.final_price
                                                                ? `${reservation.final_price} €`
                                                                : "-"}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function Info({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="mb-3">
            <small className="text-muted d-block">{label}</small>
            <span className="fw-semibold">{value}</span>
        </div>
    );
}

function getStatusBackground(status?: string) {
    switch (status) {
        case "confirmed":
            return "#E8F6EF";
        case "cancelled":
            return "#FDECEC";
        case "completed":
            return "#EEF2FF";
        case "pending":
        default:
            return "#FFF8E8";
    }
}

function getStatusColor(status?: string) {
    switch (status) {
        case "confirmed":
            return "#227A4E";
        case "cancelled":
            return "#B42318";
        case "completed":
            return "#3538CD";
        case "pending":
        default:
            return "#9A6700";
    }
}