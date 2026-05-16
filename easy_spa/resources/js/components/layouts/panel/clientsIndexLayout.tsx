// components/layouts/panel/clientsLayout.tsx

import { useNavigate } from "react-router-dom";
import Pagination from "@/components/layouts/Pagination";
import type { Client } from "@/types";

interface Props {
  title?: string;
  description?: string;
  clients: Client[];
  loading: boolean;
  error: string;
  page: number;
  lastPage: number;
  setPage: (page: number) => void;
  getShowPath: (client: Client) => string;
  getEditPath?: (client: Client) => string;
  onDelete?: (clientId: number) => void;
  showBackButton?: boolean;
}

export default function ClientsIndexLayout({
  title = "Clientes",
  description = "Gestiona los clientes de tu spa.",
  clients,
  loading,
  error,
  page,
  lastPage,
  setPage,
  getShowPath,
  getEditPath,
  onDelete,
  showBackButton = true,
}: Props) {
  const navigate = useNavigate();
  const safeClients = Array.isArray(clients) ? clients : [];

  return (
    <div style={{ backgroundColor: "#F7F7F7", minHeight: "100vh" }}>
      <div className="container py-4 py-lg-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h1 className="fw-bold mb-1" style={{ color: "#2f2f2f" }}>
              {title}
            </h1>
            <p className="text-muted mb-0">{description}</p>
          </div>

          {showBackButton && (
            <button
              className="btn d-flex align-items-center gap-2"
              onClick={() => navigate(-1)}
              style={{
                backgroundColor: "#F2E6D0",
                color: "#7a6440",
                borderRadius: "12px",
                padding: "10px 16px",
                fontWeight: 600,
                border: "none",
              }}
            >
              <i className="bi bi-arrow-left"></i>
              Volver
            </button>
          )}
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <div className="text-center py-5">Cargando clientes...</div>
        ) : safeClients.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No hay clientes registrados.
          </div>
        ) : (
          <div className="card border-0 shadow-sm" style={{ borderRadius: 20 }}>
            <div className="card-body p-4">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th className="px-4 py-3">Cliente</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Teléfono</th>
                      <th className="px-4 py-3">Reservas</th>
                      <th className="text-end px-4">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {safeClients.map((client) => (
                      <tr key={client.id}>
                        <td className="px-4 py-3">
                          {client.name} {client.surname}
                        </td>
                        <td className="px-4 py-3">{client.email || "-"}</td>
                        <td className="px-4 py-3">{client.telephone || "-"}</td>
                        <td className="px-4 py-3">
                          {client.reservations_count ?? 0}
                        </td>

                        <td className="text-end px-4">
                          <div className="d-flex justify-content-end gap-2">
                            <button
                              className="btn btn-sm"
                              onClick={() => navigate(getShowPath(client))}
                              style={{
                                backgroundColor: "#F2E6D0",
                                color: "#7a6440",
                                borderRadius: "10px",
                              }}
                            >
                              Ver
                            </button>

                            {getEditPath && (
                              <button
                                className="btn btn-sm"
                                onClick={() => navigate(getEditPath(client))}
                                style={{
                                  backgroundColor: "#E0C38D",
                                  color: "#fff",
                                  borderRadius: "10px",
                                }}
                              >
                                Editar
                              </button>
                            )}

                            {onDelete && (
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => onDelete(client.id)}
                                style={{ borderRadius: '10px' }}
                              >
                                Eliminar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <Pagination
          currentPage={page}
          lastPage={lastPage}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}