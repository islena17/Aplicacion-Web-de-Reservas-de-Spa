import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useSpaShow } from '@/hooks/WebMaster/Spa/useSpaShow';

export default function ShowSpa() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const {
    spa,
    activeTab,
    setActiveTab,
    loading,
    error,
     deleteReservation,
  } = useSpaShow(slug);

  if (loading) {
    return (
      <DashboardLayout>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: '100vh', backgroundColor: '#F7F7F7' }}
        >
          <div className="text-center">
            <div className="spinner-border mb-3" style={{ color: '#E0C38D' }} />
            <p className="mb-0 text-muted">Cargando spa...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!spa) {
    return (
      <DashboardLayout>
        <div className="container py-5">
          <div className="alert alert-danger">
            {error || 'No se ha encontrado el spa.'}
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
                {spa.name}
              </h1>

              <p className="text-muted mb-0">
                Panel de gestión del spa.
              </p>
            </div>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn"
                onClick={() => navigate(`/dashboard/spas/${spa.slug}/edit`)}
                style={{
                  backgroundColor: '#F2E6D0',
                  color: '#7a6440',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  fontWeight: 600,
                }}
              >
                Editar spa
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => navigate('/dashboard/spas')}
                style={{
                  backgroundColor: '#E0C38D',
                  color: '#fff',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  fontWeight: 700,
                  border: 'none',
                }}
              >
                Volver
              </button>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <div
            className="card border-0 shadow-sm mb-4"
            style={{ borderRadius: '20px' }}
          >
            <div className="card-body p-3">
              <div className="d-flex gap-2 flex-wrap">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setActiveTab('datos')}
                  style={{
                    backgroundColor: activeTab === 'datos' ? '#E0C38D' : '#F2E6D0',
                    color: activeTab === 'datos' ? '#fff' : '#7a6440',
                    borderRadius: '12px',
                    fontWeight: 700,
                  }}
                >
                  Datos
                </button>

                <button
                  type="button"
                  className="btn"
                  onClick={() => setActiveTab('reservas')}
                  style={{
                    backgroundColor: activeTab === 'reservas' ? '#E0C38D' : '#F2E6D0',
                    color: activeTab === 'reservas' ? '#fff' : '#7a6440',
                    borderRadius: '12px',
                    fontWeight: 700,
                  }}
                >
                  Reservas
                </button>

                <button
                  type="button"
                  className="btn"
                  onClick={() => setActiveTab('servicios')}
                  style={{
                    backgroundColor: activeTab === 'servicios' ? '#E0C38D' : '#F2E6D0',
                    color: activeTab === 'servicios' ? '#fff' : '#7a6440',
                    borderRadius: '12px',
                    fontWeight: 700,
                  }}
                >
                  Servicios
                </button>
              </div>
            </div>
          </div>

          {activeTab === 'datos' && (
            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: '20px', overflow: 'hidden' }}
            >
              <div className="card-header border-0 py-3 px-4 bg-white">
                <h5 className="mb-0 fw-bold">Datos del spa</h5>
              </div>

              <div className="card-body p-4 bg-white">
                <div className="row g-4">
                  <Info label="Nombre" value={spa.name} />
                  <Info label="Slug" value={spa.slug} />
                  <Info label="Ciudad" value={spa.city} />
                  <Info label="Código postal" value={spa.postal_code} />
                  <Info label="Dirección" value={spa.address} />
                  <Info label="Teléfono" value={spa.phone} />
                  <Info label="Email" value={spa.email} />
                  <Info
                    label="Horario"
                    value={
                      spa.opening_time && spa.closing_time
                        ? `${spa.opening_time} - ${spa.closing_time}`
                        : '-'
                    }
                  />
                  <Info
                    label="Estado"
                    value={spa.is_active ? 'Activo' : 'Inactivo'}
                  />

                  <div className="col-12">
                    <label className="text-muted small">Descripción</label>
                    <div className="fw-semibold">
                      {spa.description || '-'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reservas' && (
            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: '20px', overflow: 'hidden' }}
            >
              <div className="card-header border-0 py-3 px-4 bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Reservas</h5>

                <button
                  type="button"
                  className="btn"
                  onClick={() => navigate(`/dashboard/spas/${spa.slug}/reservations/create`)}
                  style={{
                    backgroundColor: '#E0C38D',
                    color: '#fff',
                    borderRadius: '12px',
                    fontWeight: 700,
                    border: 'none',
                  }}
                >
                  Crear reserva
                </button>
              </div>

              <div className="card-body p-0 bg-white">
                {spa.reservations.length === 0 ? (
                  <div className="p-4 text-muted">
                    No hay reservas registradas.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table align-middle mb-0">
                      <thead style={{ backgroundColor: '#F7F7F7' }}>
                        <tr>
                          <th className="px-4 py-3">Cliente</th>
                          <th className="px-4 py-3">Servicio</th>
                          <th className="px-4 py-3">Empleado</th>
                          <th className="px-4 py-3">Fecha</th>
                          <th className="px-4 py-3">Hora</th>
                          <th className="px-4 py-3">Estado</th>
                          <th className="px-4 py-3 text-end">Acciones</th>
                        </tr>
                      </thead>

                      <tbody>
                        {spa.reservations.map((reservation) => (
                          <tr key={reservation.id}>
                            <td className="px-4 py-3">
                              {reservation.client?.name || '-'}
                            </td>

                            <td className="px-4 py-3">
                              {reservation.service?.name || '-'}
                            </td>

                            <td className="px-4 py-3">
                              {reservation.employee?.name || 'Sin empleado'}
                            </td>

                            <td className="px-4 py-3">
                              {reservation.reservation_date}
                            </td>

                            <td className="px-4 py-3">
                              {reservation.start_time} - {reservation.end_time}
                            </td>

                            <td className="px-4 py-3">
                              <span className="badge bg-secondary">
                                {reservation.status}
                              </span>
                            </td>

                            <td className="px-4 py-3 text-end">
                              <button
                                type="button"
                                className="btn btn-sm me-2"
                                onClick={() =>
                                  navigate(`/dashboard/spas/${spa.slug}/reservations/${reservation.id}/edit`)
                                }
                                style={{
                                  backgroundColor: '#F2E6D0',
                                  color: '#7a6440',
                                  borderRadius: '10px',
                                  fontWeight: 600,
                                }}
                              >
                                Editar
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>deleteReservation(reservation.id)
                                }
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'servicios' && (
            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: '20px', overflow: 'hidden' }}
            >
              <div className="card-header border-0 py-3 px-4 bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Servicios</h5>

                <button
                  type="button"
                  className="btn"
                  onClick={() => navigate(`/dashboard/spas/${spa.slug}/services/create`)}
                  style={{
                    backgroundColor: '#E0C38D',
                    color: '#fff',
                    borderRadius: '12px',
                    fontWeight: 700,
                    border: 'none',
                  }}
                >
                  Crear servicio
                </button>
              </div>

              <div className="card-body p-0 bg-white">
                {spa.services.length === 0 ? (
                  <div className="p-4 text-muted">
                    No hay servicios registrados.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table align-middle mb-0">
                      <thead style={{ backgroundColor: '#F7F7F7' }}>
                        <tr>
                          <th className="px-4 py-3">Nombre</th>
                          <th className="px-4 py-3">Categoría</th>
                          <th className="px-4 py-3">Duración</th>
                          <th className="px-4 py-3">Precio</th>
                          <th className="px-4 py-3">Capacidad</th>
                          <th className="px-4 py-3">Estado</th>
                          <th className="px-4 py-3 text-end">Acciones</th>
                        </tr>
                      </thead>

                      <tbody>
                        {spa.services.map((service) => (
                          <tr key={service.id}>
                            <td className="px-4 py-3 fw-semibold">
                              {service.name}
                              {service.slug && (
                                <div className="text-muted small">
                                  {service.slug}
                                </div>
                              )}
                            </td>

                            <td className="px-4 py-3">
                              {service.category?.name || '-'}
                            </td>

                            <td className="px-4 py-3">
                              {service.length_minutes} min
                            </td>

                            <td className="px-4 py-3">
                              {service.price} €
                            </td>

                            <td className="px-4 py-3">
                              {service.capacity}
                            </td>

                            <td className="px-4 py-3">
                              <span
                                className={`badge ${service.is_active ? 'bg-success' : 'bg-secondary'
                                  }`}
                              >
                                {service.is_active ? 'Activo' : 'Inactivo'}
                              </span>
                            </td>

                            <td className="px-4 py-3 text-end">
                              <button
                                type="button"
                                className="btn btn-sm me-2"
                                onClick={() =>
                                  navigate(`/dashboard/services/${service.slug}/edit`)
                                }
                                style={{
                                  backgroundColor: '#F2E6D0',
                                  color: '#7a6440',
                                  borderRadius: '10px',
                                  fontWeight: 600,
                                }}
                              >
                                Editar
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  navigate(`/dashboard/services/${service.slug}/delete`)
                                }
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <label className="text-muted small">{label}</label>
      <div className="fw-semibold">{value || '-'}</div>
    </div>
  );
}