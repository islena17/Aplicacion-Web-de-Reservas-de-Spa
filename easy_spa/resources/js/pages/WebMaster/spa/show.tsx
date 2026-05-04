import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useSpaShow } from '@/hooks/WebMaster/Spa/useSpaShow';
import reservations from '@/routes/reservations';

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
    selectedCategory,
    setSelectedCategory,
    filteredServices,
    categories,
    deleteCategory,
    deleteService
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
                <i className="bi bi-pencil-square"></i> spa
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
                <i className="bi bi-arrow-left"></i> Volver
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
                  onClick={() => setActiveTab('categorias')}
                  style={{
                    backgroundColor: activeTab === 'categorias' ? '#E0C38D' : '#F2E6D0',
                    color: activeTab === 'categorias' ? '#fff' : '#7a6440',
                    borderRadius: '12px',
                    fontWeight: 700,
                  }}
                >
                  Categorias
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

                <button
                  type="button"
                  className="btn"
                  onClick={() => setActiveTab('empleados')}
                  style={{
                    backgroundColor: activeTab === 'empleados' ? '#E0C38D' : '#F2E6D0',
                    color: activeTab === 'empleados' ? '#fff' : '#7a6440',
                    borderRadius: '12px',
                    fontWeight: 700,
                  }}
                >
                  Empleados
                </button>

                <button
                  type="button"
                  className="btn"
                  onClick={() => setActiveTab('clientes')}
                  style={{
                    backgroundColor: activeTab === 'clientes' ? '#E0C38D' : '#F2E6D0',
                    color: activeTab === 'clientes' ? '#fff' : '#7a6440',
                    borderRadius: '12px',
                    fontWeight: 700,
                  }}
                >
                  Clientes
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
                                <i className="bi bi-pencil-square"></i>
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm me-2"
                                onClick={() =>
                                  navigate(`/dashboard/spas/${spa.slug}/reservations/${reservation.id}`)
                                }
                                style={{
                                  backgroundColor: '#F2E6D0',
                                  color: '#7a6440',
                                  borderRadius: '10px',
                                  fontWeight: 600,
                                }}
                              >
                                <i className="bi bi-eye"></i>
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => deleteReservation(reservation.id)
                                }
                              >
                                <i className="bi bi-x-square"></i>
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

          {activeTab === 'categorias' && (
            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: '20px', overflow: 'hidden' }}
            >
              <div className="card-header border-0 py-3 px-4 bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Categorías</h5>

                <button
                  type="button"
                  className="btn"
                  onClick={() => navigate(`/dashboard/spas/${spa.slug}/categories/create`)}
                  style={{
                    backgroundColor: '#E0C38D',
                    color: '#fff',
                    borderRadius: '12px',
                    fontWeight: 700,
                    border: 'none',
                  }}
                >
                  Crear categoría
                </button>
              </div>

              <div className="card-body p-0 bg-white">
                {(spa.categories ?? []).length === 0 ? (
                  <div className="p-4 text-muted">
                    No hay categorías registradas.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table align-middle mb-0">
                      <thead style={{ backgroundColor: '#F7F7F7' }}>
                        <tr>
                          <th className="px-4 py-3">Nombre</th>
                          <th className="px-4 py-3">Slug</th>
                          <th className="px-4 py-3">Descripción</th>
                          <th className="px-4 py-3">Estado</th>
                          <th className="px-4 py-3 text-end" style={{ minWidth: '200px' }}>Acciones</th>
                        </tr>
                      </thead>

                      <tbody>
                        {(spa.categories ?? []).map((cat) => (
                          <tr key={cat.id}>
                            <td className="px-4 py-3 fw-semibold">{cat.name}</td>

                            <td className="px-4 py-3">
                              <span className="text-muted small">{cat.slug || '-'}</span>
                            </td>

                            <td className="px-4 py-3">
                              {cat.description || '-'}
                            </td>

                            <td className="px-4 py-3">
                              <span className={`badge ${cat.is_active ? 'bg-success' : 'bg-secondary'}`}>
                                {cat.is_active ? 'Activa' : 'Inactiva'}
                              </span>
                            </td>

                            <td className="px-4 py-3 text-end">
                              <button
                                type="button"
                                className="btn btn-sm me-2"
                                onClick={() =>
                                  navigate(`/dashboard/spas/${spa.slug}/categories/${cat.slug}/edit`)
                                }
                                style={{
                                  backgroundColor: '#F2E6D0',
                                  color: '#7a6440',
                                  borderRadius: '10px',
                                  fontWeight: 600,
                                }}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm me-2"
                                onClick={() =>
                                  navigate(`/dashboard/spas/${spa.slug}/categories/${cat.slug}`)
                                }
                                style={{
                                  backgroundColor: '#F2E6D0',
                                  color: '#7a6440',
                                  borderRadius: '10px',
                                  fontWeight: 600,
                                }}
                              ><i className="bi bi-eye"></i>
                              </button>

                               <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  deleteCategory(cat.slug)
                                }
                              >
                                <i className="bi bi-x-square"></i>
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

                <div className="d-flex gap-2">

                  {/* CREAR SERVICIO */}
                  <button
                    className="btn btn-sm"
                    onClick={() =>
                      navigate(`/dashboard/spas/${slug}/services/create`)
                    }
                    style={{
                      backgroundColor: '#E0C38D',
                      color: '#fff',
                      borderRadius: '10px',
                      fontWeight: 600,
                    }}
                  >
                    + Servicio
                  </button>

                  {/* CREAR CATEGORÍA */}
                  <button
                    className="btn btn-sm"
                    onClick={() =>
                      navigate(`/dashboard/spas/${slug}/categories/create`)
                    }
                    style={{
                      backgroundColor: '#F2E6D0',
                      color: '#7a6440',
                      borderRadius: '10px',
                      fontWeight: 600,
                    }}
                  >
                    + Categoría
                  </button>
                </div>
              </div>

              <div className="card-body p-0 bg-white">
                <div className="p-4 border-bottom">
                  <div className="row g-3 align-items-end">
                    <div className="col-12 col-md-4">
                      <label className="form-label fw-semibold">Filtrar por categoría</label>
                      <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="">Todas las categorías</option>

                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                {filteredServices.length === 0 ? (
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
                        {filteredServices.map((service) => (
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
                                  navigate(`/dashboard/spas/${slug}/services/${service.slug}/edit`)
                                }
                                style={{
                                  backgroundColor: '#F2E6D0',
                                  color: '#7a6440',
                                  borderRadius: '10px',
                                  fontWeight: 600,
                                }}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  deleteService(service.slug)
                                }
                              >
                                <i className="bi bi-x-square"></i>
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

          {activeTab === 'empleados' && (
            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: '20px', overflow: 'hidden' }}
            >
              <div className="card-header border-0 py-3 px-4 bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Empleados</h5>

                <button
                  type="button"
                  className="btn"
                  onClick={() => navigate(`/dashboard/spas/${spa.slug}/employees/create`)}
                  style={{
                    backgroundColor: '#E0C38D',
                    color: '#fff',
                    borderRadius: '12px',
                    fontWeight: 700,
                    border: 'none',
                  }}
                >
                  Crear Empleado
                </button>
              </div>

              <div className="card-body p-0 bg-white">
                {spa.employees.length === 0 ? (
                  <div className="p-4 text-muted">
                    No hay servicios registrados.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table align-middle mb-0">
                      <thead style={{ backgroundColor: '#F7F7F7' }}>
                        <tr>
                          <th className="px-4 py-3">Nombre</th>
                          <th className="px-4 py-3">Apellido</th>
                          <th className="px-4 py-3">Usuario</th>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3">Teléfono</th>
                          <th className="px-4 py-3">Estado</th>
                          <th className="px-4 py-3 text-end">Acciones</th>
                        </tr>
                      </thead>

                      <tbody>
                        {spa.employees.map((employee) => (
                          <tr key={employee.id}>
                            <td className="px-4 py-3 fw-semibold">
                              {employee.name}
                              {employee.id && (
                                <div className="text-muted small">
                                  {employee.id}
                                </div>
                              )}
                            </td>

                            <td className="px-4 py-3">
                              {employee.surname}
                            </td>

                            <td className="px-4 py-3">
                              {employee.user?.id || '-'}
                            </td>

                            <td className="px-4 py-3">
                              {employee.email || '-'}
                            </td>

                            <td className="px-4 py-3">
                              {employee.telephone || '-'}
                            </td>

                            <td className="px-4 py-3">
                              <span
                                className={`badge ${employee.is_active ? 'bg-success' : 'bg-secondary'
                                  }`}
                              >
                                {employee.is_active ? 'Activo' : 'Inactivo'}
                              </span>
                            </td>

                            <td className="px-4 py-3 text-end">
                              <button
                                type="button"
                                className="btn btn-sm me-2"
                                onClick={() =>
                                  navigate(`/dashboard/spas/${slug}/employees/${employee.id}/edit`)
                                }
                                style={{
                                  backgroundColor: '#F2E6D0',
                                  color: '#7a6440',
                                  borderRadius: '10px',
                                  fontWeight: 600,
                                }}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  navigate(`/dashboard/employees/${employee.id}/delete`)
                                }
                              >
                                <i className="bi bi-x-square"></i>
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

          {activeTab === 'clientes' && (
            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: '20px', overflow: 'hidden' }}
            >
              <div className="card-header border-0 py-3 px-4 bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">clientes</h5>
              </div>

              <div className="card-body p-0 bg-white">
                {spa.clients.length === 0 ? (
                  <div className="p-4 text-muted">
                    No hay clientes registrados.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table align-middle mb-0">
                      <thead style={{ backgroundColor: '#F7F7F7' }}>
                        <tr>
                          <th className="px-4 py-3">Nombre</th>
                          <th className="px-4 py-3">Apellido</th>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3">Usuario</th>
                          <th className="px-4 py-3">Teléfono</th>
                          <th className="px-4 py-3">Ultima Reserva</th>
                          <th className="px-4 py-3 text-end">Acciones</th>
                        </tr>
                      </thead>

                      <tbody>
                        {spa.clients.map((client) => (
                          <tr key={client.id}>
                            <td className="px-4 py-3 fw-semibold">
                              {client.name}
                              {client.id && (
                                <div className="text-muted small">
                                  {client.id}
                                </div>
                              )}
                            </td>

                            <td className="px-4 py-3">
                              {client.surname}
                            </td>

                            <td className="px-4 py-3">
                              {client.email || '-'}
                            </td>


                            <td className="px-4 py-3">
                              {client.user?.id || '-'}
                            </td>

                            <td className="px-4 py-3">
                              {client.telephone || '-'}
                            </td>

                            <td className="px-4 py-3">
                              {client.last_reservation_date || '-'}

                            </td>

                            <td className="px-4 py-3 text-end">
                              <button
                                type="button"
                                className="btn btn-sm me-2"
                                onClick={() =>
                                  navigate(`/dashboard/spas/${slug}/clients/${client.id}/edit`)
                                }
                                style={{
                                  backgroundColor: '#F2E6D0',
                                  color: '#7a6440',
                                  borderRadius: '10px',
                                  fontWeight: 600,
                                }}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm me-2"
                                onClick={() =>
                                  navigate(`/dashboard/spas/${spa.slug}/clients/${client.id}`)
                                }
                                style={{
                                  backgroundColor: '#F2E6D0',
                                  color: '#7a6440',
                                  borderRadius: '10px',
                                  fontWeight: 600,
                                }}
                              ><i className="bi bi-eye"></i>
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