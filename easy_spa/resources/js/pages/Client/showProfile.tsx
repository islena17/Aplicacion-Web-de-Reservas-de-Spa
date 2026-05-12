import Navbar from "@/components/layouts/Navbar";
import { useProfile } from "@/hooks/Client/useProfile";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Profile() {
    const { client, loading, error } = useProfile();

    const statusClass = (status?: string) => {
        const classes: Record<string, string> = {
            pending: "bg-warning text-dark",
            confirmed: "bg-success",
            cancelled: "bg-danger",
            completed: "bg-primary",
            no_show: "bg-secondary",
        };

        return classes[status ?? ""] ?? "bg-secondary";
    };

    const statusText = (status?: string) => {
        const statuses: Record<string, string> = {
            pending: "Pendiente",
            confirmed: "Confirmada",
            cancelled: "Cancelada",
            completed: "Completada",
            no_show: "No presentado",
        };

        return statuses[status ?? ""] ?? "Sin estado";
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container py-5 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </>
        );
    }

    if (error || !client) {
        return (
            <>
                <Navbar />
                <div className="container py-5">
                    <div className="alert alert-danger border-0 shadow-sm">
                        {error || "No se pudo cargar el perfil."}
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="container py-5">
                <div className="row g-4">

                    <div className="col-12">
                        <div
                            className="card border-0 shadow-sm p-4"
                            style={{ borderRadius: "24px" }}
                        >
                            <div className="d-flex align-items-center gap-4 flex-wrap">
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg, var(--color-main), var(--color-secondary))",
                                        color: "#fff",
                                        fontSize: "2rem",
                                        fontWeight: 800,
                                    }}
                                >
                                    {client.name.charAt(0)}
                                    {client.surname.charAt(0)}
                                </div>

                                <div>
                                    <h2 className="fw-bold mb-1">
                                        {client.name} {client.surname}
                                    </h2>

                                    <p className="text-muted mb-0">
                                        Cliente EasySpa
                                    </p>
                                </div>
                                <div className="ms-auto">
                                    <Link 
                                    to="edit" 
                                    className="btn btn-sm text-white"
                                    style={{
                                        background: 'var(--color-secondary)',
                                        borderRadius: '10px',
                                        fontWeight: '600'

                                    }} >Editar Perfil</Link>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div
                            className="card border-0 shadow-sm p-4 h-100"
                            style={{ borderRadius: "24px" }}
                        >
                            <h5 className="fw-bold mb-4">
                                Datos personales
                            </h5>

                            <div className="mb-3">
                                <small className="text-muted">Nombre</small>
                                <div className="fw-semibold">
                                    {client.name} {client.surname}
                                </div>
                            </div>

                            <div className="mb-3">
                                <small className="text-muted">Email</small>
                                <div className="fw-semibold">
                                    {client.email ?? "No disponible"}
                                </div>
                            </div>

                            <div className="mb-3">
                                <small className="text-muted">Teléfono</small>
                                <div className="fw-semibold">
                                    {client.telephone ?? "No disponible"}
                                </div>
                            </div>

                            <div>
                                <small className="text-muted">Estado de cuenta</small>
                                <div>
                                    {client.user?.is_active ? (
                                        <span className="badge bg-success">
                                            Activa
                                        </span>
                                    ) : (
                                        <span className="badge bg-secondary">
                                            Inactiva
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-8">
                        <div
                            className="card border-0 shadow-sm p-4 h-100"
                            style={{ borderRadius: "24px" }}
                        >
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h5 className="fw-bold mb-1">
                                        Mis reservas
                                    </h5>
                                    <p className="text-muted mb-0">
                                        Historial de reservas realizadas
                                    </p>
                                </div>

                                <span className="badge bg-dark">
                                    {client.reservations?.length ?? 0} reservas
                                </span>
                            </div>

                            {!client.reservations || client.reservations.length === 0 ? (
                                <div className="text-center py-5">
                                    <i
                                        className="bi bi-calendar-x"
                                        style={{
                                            fontSize: "3rem",
                                            color: "#E0C38D",
                                        }}
                                    ></i>

                                    <h5 className="fw-semibold mt-3">
                                        No tienes reservas todavía
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Cuando reserves un servicio, aparecerá aquí.
                                    </p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table align-middle">
                                        <thead>
                                            <tr>
                                                <th>Servicio</th>
                                                <th>Fecha</th>
                                                <th>Hora</th>
                                                <th>Empleado</th>
                                                <th>Estado</th>
                                                <th className="text-end">Precio</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {client.reservations.map((reservation) => (
                                                <tr key={reservation.id}>
                                                    <td className="fw-semibold">
                                                        {reservation.service?.name ?? "Servicio no disponible"}
                                                    </td>

                                                    <td>
                                                        {reservation.reservation_date}
                                                    </td>

                                                    <td>
                                                        {reservation.start_time ?? "--"} - {reservation.end_time ?? "--"}
                                                    </td>

                                                    <td>
                                                        {reservation.employee?.name ?? "Sin asignar"}
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`badge ${statusClass(reservation.status)}`}
                                                        >
                                                            {statusText(reservation.status)}
                                                        </span>
                                                    </td>

                                                    <td className="text-end fw-bold">
                                                        {reservation.service?.price
                                                            ? `${Number(reservation.service.price).toFixed(2)} €`
                                                            : "--"}
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
            </main>
        </>
    );
}