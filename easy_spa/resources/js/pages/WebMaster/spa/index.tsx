import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/forms/layouts/WMLayout';
import { useSpas } from '@/hooks/WebMaster/Spa/useSpas';

export default function Index() {
  const navigate = useNavigate();

  const { spas, loading, error } = useSpas();

  return (
    <DashboardLayout>
      <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
        <div className="container py-4 py-lg-5">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h1 className="fw-bold mb-1" style={{ color: '#2f2f2f' }}>
                Spas
              </h1>
              <p className="text-muted mb-0">
                Gestiona todos los spas del sistema.
              </p>
            </div>

            <button
              type="button"
              className="btn"
              onClick={() => navigate('/dashboard/spas/create')}
              style={{
                backgroundColor: '#E0C38D',
                color: '#fff',
                borderRadius: '12px',
                padding: '10px 22px',
                fontWeight: 700,
                border: 'none',
              }}
            >
              Crear spa
            </button>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div
            className="card border-0 shadow-sm"
            style={{ borderRadius: '20px', overflow: 'hidden' }}
          >
            <div
              className="card-header border-0 py-3 px-4"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <h5 className="mb-0 fw-bold">Listado de spas</h5>
            </div>

            <div className="card-body p-0" style={{ backgroundColor: '#FFFFFF' }}>
              {loading ? (
                <div className="p-4 text-muted">Cargando spas...</div>
              ) : spas.length === 0 ? (
                <div className="p-4 text-muted">No hay spas registrados.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead style={{ backgroundColor: '#F7F7F7' }}>
                      <tr>
                        <th className="px-4 py-3">Nombre</th>
                        <th className="px-4 py-3">Ciudad</th>
                        <th className="px-4 py-3">Teléfono</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Horario</th>
                        <th className="px-4 py-3">Estado</th>
                        <th className="px-4 py-3 text-end">Acciones</th>
                      </tr>
                    </thead>

                    <tbody>
                      {spas.map((spa) => (
                        <tr key={spa.id}>
                          <td className="px-4 py-3 fw-semibold">
                            {spa.name}
                            {spa.slug && (
                              <div className="text-muted small">{spa.slug}</div>
                            )}
                          </td>

                          <td className="px-4 py-3">{spa.city || '-'}</td>

                          <td className="px-4 py-3">{spa.phone || '-'}</td>

                          <td className="px-4 py-3">{spa.email || '-'}</td>

                          <td className="px-4 py-3">
                            {spa.opening_time && spa.closing_time
                              ? `${spa.opening_time} - ${spa.closing_time}`
                              : '-'}
                          </td>

                          <td className="px-4 py-3">
                            <span
                              className={`badge ${
                                spa.is_active ? 'bg-success' : 'bg-secondary'
                              }`}
                            >
                              {spa.is_active ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>

                          <td className="px-4 py-3 text-end">
                            <button
                              type="button"
                              className="btn btn-sm"
                              onClick={() =>
                                navigate(`/dashboard/spas/${spa.slug}/edit`)
                              }
                              style={{
                                backgroundColor: '#F2E6D0',
                                color: '#7a6440',
                                borderRadius: '10px',
                                padding: '8px 14px',
                                fontWeight: 600,
                              }}
                            >
                              Editar
                            </button>
                           <button
                              type="button"
                              className="btn btn-sm ms-2"
                              onClick={() =>
                                navigate(`/dashboard/spas/${spa.slug}`)
                              }
                              style={{
                                backgroundColor: '#F2E6D0',
                                color: '#7a6440',
                                borderRadius: '10px',
                                padding: '8px 14px',
                                fontWeight: 600,
                              }}
                            >
                              Ver
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
        </div>
      </div>
    </DashboardLayout>
  );
}