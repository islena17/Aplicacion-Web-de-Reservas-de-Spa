import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/AdminLayout';
import { useSpa } from '@/hooks/Admin/Spa/useSpa';

export default function AdminShowSpa() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const { spa, loadingData, error } = useSpa();

  if (loadingData) {
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

  return (
    <DashboardLayout>
      <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
        <div className="container py-4 py-lg-5">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h1 className="fw-bold mb-1" style={{ color: '#2f2f2f' }}>
                Mi spa
              </h1>
              <p className="text-muted mb-0">Consulta la información de tu spa.</p>
            </div>
<div className="d-flex gap-2">
            <button
              type="button"
              className="btn"
              onClick={() => navigate(`/admin/spa/edit`)}
              style={{
                backgroundColor: '#E0C38D',
                color: '#fff',
                borderRadius: '12px',
                padding: '10px 18px',
                fontWeight: 700,
              }}
            >
              <i className="bi bi-pencil-square"></i> Editar spa
            </button>

            <button
              type="button"
              className="btn"
              onClick={() => navigate(`/admin/spa/spa-schedule`)}
              style={{
                backgroundColor: '#7a9e9f',
                color: '#fff',
                borderRadius: '12px',
                padding: '10px 18px',
                fontWeight: 700,
              }}
            >
              <i className="bi bi-calendar-week"></i> Horario
            </button>
          </div>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          {spa && (
            <div className="card border-0 shadow-sm" style={{ borderRadius: '20px' }}>
              <div className="card-header border-0 py-3 px-4 bg-white">
                <h5 className="mb-0 fw-bold">Datos del spa</h5>
              </div>

              <div className="card-body p-4 p-lg-5 bg-white">
                <div className="row g-4">
                  <Info label="Nombre" value={spa.name} />
                  <Info label="Slug" value={spa.slug} />
                  <Info label="Descripción" value={spa.description} full />
                  <Info label="Dirección" value={spa.address} full />
                  <Info label="Ciudad" value={spa.city} />
                  <Info label="Código postal" value={spa.postal_code} />
                  <Info label="Teléfono" value={spa.phone} />
                  <Info label="Email" value={spa.email} />
                  <Info label="Hora apertura" value={spa.opening_time?.slice(0, 5)} />
                  <Info label="Hora cierre" value={spa.closing_time?.slice(0, 5)} />

                  {spa.logo && (
                    <div className="col-12">
                      <label className="form-label fw-semibold">Logo</label>
                      <div
                        className="p-3"
                        style={{
                          backgroundColor: '#F7F7F7',
                          borderRadius: '12px',
                          border: '1px solid #eee',
                        }}
                      >
                        <span className="text-muted small">{spa.logo}</span>
                      </div>
                    </div>
                  )}
                </div>
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
  full = false,
}: {
  label: string;
  value?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? 'col-12' : 'col-12 col-md-6'}>
      <label className="form-label fw-semibold">{label}</label>
      <div
        className="p-3"
        style={{
          backgroundColor: '#F7F7F7',
          borderRadius: '12px',
          border: '1px solid #eee',
          minHeight: '48px',
        }}
      >
        <span className="text-muted">{value || 'No indicado'}</span>
      </div>
    </div>
  );
}