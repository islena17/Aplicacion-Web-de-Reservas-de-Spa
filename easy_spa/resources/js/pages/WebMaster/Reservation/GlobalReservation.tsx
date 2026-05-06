import { useNavigate } from 'react-router-dom';
import DashboardLayout from "../../../components/layouts/WMLayout";
import { useGlobalReservation } from '@/hooks/WebMaster/Reservation/useGlobalReservation';

export default function GlobalReservations() {
  const navigate = useNavigate();

  const {
    filteredReservations,
    spas,
    filters,
    loading,
    errors,
    handleFilterChange,
    clearFilters,
    deleteReservation,
    fieldStatus,
    statusClass,
  } = useGlobalReservation();

  if (loading) {
    return (
      <DashboardLayout>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: '100vh', backgroundColor: '#F7F7F7' }}
        >
          <div className="text-center">
            <div className="spinner-border mb-3" style={{ color: '#E0C38D' }} />
            <p className="mb-0 text-muted">Cargando reservas...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
        <div className="container py-4 py-lg-5">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h1 className="fw-bold mb-1" style={{ color: '#2f2f2f' }}>
                Reservas globales
              </h1>
              <p className="text-muted mb-0">
                Consulta todas las reservas registradas en todos los spas.
              </p>
            </div>

            <button
              type="button"
              className="btn"
              onClick={() => navigate(-1)}
              style={{
                backgroundColor: '#F2E6D0',
                color: '#7a6440',
                borderRadius: '12px',
                padding: '10px 18px',
                fontWeight: 600,
              }}
            >
              <i className="bi bi-arrow-left"></i>  Volver
            </button>
          </div>

          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}

          <div
            className="card border-0 shadow-sm mb-4"
            style={{ borderRadius: '20px' }}
          >
            <div className="card-body p-4" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold">Buscar</label>
                  <input
                    type="text"
                    name="search"
                    className="form-control"
                    placeholder="Cliente, servicio o spa..."
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                </div>

                <div className="col-12 col-md-3">
                  <label className="form-label fw-semibold">Spa</label>
                  <select
                    name="spa"
                    className="form-select"
                    value={filters.spa}
                    onChange={handleFilterChange}
                  >
                    <option value="">Todos los spas</option>
                    {spas.map((spa) => (
                      <option key={spa.id} value={spa.slug}>
                        {spa.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12 col-md-3">
                  <label className="form-label fw-semibold">Estado</label>
                  <select
                    name="status"
                    className="form-select"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">Todos</option>
                    <option value="pending">Pendiente</option>
                    <option value="confirmed">Confirmada</option>
                    <option value="cancelled">Cancelada</option>
                    <option value="completed">Completada</option>
                    <option value="no_show">No presentado</option>
                  </select>
                </div>

                <div className="col-12 col-md-2">
                  <label className="form-label fw-semibold">Fecha</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={filters.date}
                    onChange={handleFilterChange}
                  />
                </div>

                <div className="col-12 d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn"
                    onClick={clearFilters}
                    style={{
                      backgroundColor: '#F2E6D0',
                      color: '#7a6440',
                      borderRadius: '12px',
                      padding: '9px 18px',
                      fontWeight: 600,
                    }}
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="card border-0 shadow-sm"
            style={{ borderRadius: '20px', overflow: 'hidden' }}
          >
            <div
              className="card-header border-0 py-3 px-4 d-flex justify-content-between align-items-center"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <h5 className="mb-0 fw-bold">Listado de reservas</h5>

              <span className="badge rounded-pill bg-light text-dark">
                {filteredReservations.length} reservas
              </span>
            </div>

            <div className="card-body p-0" style={{ backgroundColor: '#FFFFFF' }}>
              {filteredReservations.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted mb-0">
                    No hay reservas que coincidan con los filtros.
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead style={{ backgroundColor: '#F7F7F7' }}>
                      <tr>
                        <th className="px-4 py-3">Spa</th>
                        <th className="px-4 py-3">Cliente</th>
                        <th className="px-4 py-3">Servicio</th>
                        <th className="px-4 py-3">Fecha</th>
                        <th className="px-4 py-3">Hora</th>
                        <th className="px-4 py-3">Estado</th>
                        <th className="px-4 py-3">Precio</th>
                        <th className="px-4 py-3 text-end">Acciones</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredReservations.map((reservation) => (
                        <tr key={reservation.id}>
                          <td className="px-4 py-3 fw-semibold">
                            {reservation.spa?.name ?? 'Sin spa'}
                          </td>

                          <td className="px-4 py-3">
                            <div className="fw-semibold">
                              {reservation.client?.name}{' '}
                              {reservation.client?.surname}
                            </div>
                            <small className="text-muted">
                              {reservation.client?.email ?? 'Sin email'}
                            </small>
                          </td>

                          <td className="px-4 py-3">
                            {reservation.service?.name ?? 'Sin servicio'}
                          </td>

                          <td className="px-4 py-3">
                            {reservation.reservation_date}
                          </td>

                          <td className="px-4 py-3">
                            {reservation.start_time} - {reservation.end_time}
                          </td>

                          <td className="px-4 py-3">
                            <span
                              className={`badge rounded-pill ${statusClass(
                                reservation.status
                              )}`}
                            >
                              {fieldStatus(reservation.status)}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            {reservation.final_price
                              ? `${reservation.final_price} €`
                              : '-'}
                          </td>

                          <td className="px-4 py-3 text-end">
                            <div className="d-flex justify-content-end gap-2">
                              {reservation.spa?.slug && (
                                <button
                                  type="button"
                                  className="btn btn-sm"
                                  onClick={() =>
                                    navigate(
                                      `/dashboard/spas/${reservation.spa?.slug}/reservations/${reservation.id}`
                                    )
                                  }
                                  style={{
                                    backgroundColor: '#F2E6D0',
                                    color: '#7a6440',
                                    borderRadius: '10px',
                                    fontWeight: 600,
                                  }}
                                >
                                  Ver
                                </button>
                              )}

                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  deleteReservation(reservation.id)
                                }
                                style={{
                                  borderRadius: '10px',
                                  fontWeight: 600,
                                }}
                              >
                                Eliminar
                              </button>
                            </div>
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
    </DashboardLayout>
  );
}