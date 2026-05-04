import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../../components/forms/layouts/WMLayout";
import { useClient } from "@/hooks/WebMaster/Client/useClient";

export default function ShowClient() {
  const navigate = useNavigate();
  const { slug, clientId } = useParams<{ slug: string; clientId: string }>();

  const { client, loading, error } = useClient(slug, clientId);

  if (loading) {
    return (
      <DashboardLayout>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh", backgroundColor: "#F7F7F7" }}
        >
          <div className="text-center">
            <div className="spinner-border mb-3" style={{ color: "#E0C38D" }} />
            <p className="text-muted mb-0">Cargando cliente...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !client) {
    return (
      <DashboardLayout>
        <div style={{ minHeight: "100vh", backgroundColor: "#F7F7F7", padding: "32px" }}>
          <div className="alert alert-danger">{error || "Cliente no encontrado."}</div>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={{ minHeight: "100vh", backgroundColor: "#F7F7F7", padding: "32px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">
              {client.name} {client.surname}
            </h2>
            <p className="text-muted mb-0">Detalle del cliente</p>
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-light border"
              style={{ borderRadius: "12px" }}
              onClick={() => navigate(-1)}
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
              onClick={() => navigate(`/dashboard/spas/${slug}/clients/${clientId}/edit`)}
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
                <Info label="Email cliente" value={client.email} />
                <Info label="Teléfono" value={client.telephone || "-"} />
                <Info label="Estado" value={client.is_active === false ? "Inactivo" : "Activo"} />
              </div>
            </div>

            <div className="card border-0 shadow-sm mt-4" style={{ borderRadius: "20px" }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">Usuario asociado</h5>

                {client.user ? (
                  <>
                    <Info label="ID usuario" value={client.user.id} />
                    <Info label="Email login" value={client.user.email} />
                    <Info
                      label="Estado usuario"
                      value={client.user.is_active === false ? "Inactivo" : "Activo"}
                    />
                  </>
                ) : (
                  <p className="text-muted mb-0">Este cliente no tiene usuario asociado.</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-8">
            <div className="card border-0 shadow-sm" style={{ borderRadius: "20px" }}>
              <div className="card-body p-0">
                <div className="p-4 border-bottom">
                  <h5 className="fw-bold mb-0">Reservas del cliente</h5>
                </div>

                {!client.reservations || client.reservations.length === 0 ? (
                  <div className="p-4 text-muted">Este cliente no tiene reservas en este spa.</div>
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
                        </tr>
                      </thead>

                      <tbody>
                        {client.reservations.map((reservation) => (
                          <tr key={reservation.id}>
                            <td className="px-4 py-3">{reservation.reservation_date}</td>
                            <td className="px-4 py-3">
                              {reservation.start_time || "-"}
                              {reservation.end_time ? ` - ${reservation.end_time}` : ""}
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
                              <span className="badge bg-light text-dark border">
                                {reservation.status || "Pendiente"}
                              </span>
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
    </DashboardLayout>
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