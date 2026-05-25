import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from "../../../components/layouts/WMLayout";
import { useSpaShow } from '@/hooks/WebMaster/Spa/useSpaShow';

import reservations from '@/routes/reservations';

export default function ShowSpa() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const {
    spa,
    loading,
    error,
    deleteSpa
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
                className="custom-main-btn edit-2-btn"
                onClick={() => navigate(`/dashboard/spas/${spa.slug}/edit`)}
              >
                <i className="bi bi-pencil-square action-icon"></i>
                <span>
                  Editar
                </span>
              </button>
              <button
                type="button"
                className="custom-main-btn delete-btn"
                onClick={async () => {
                  const deleted = await deleteSpa();

                  if (deleted) {
                    navigate('/dashboard/spas');
                  }
                }}
              >
                <i className="bi bi-trash"></i>
                  Eliminar
              </button>

              <button
                type="button"
                className="custom-main-btn back-btn"
                onClick={() => navigate('/dashboard/spas')}

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
              <div className="spa-navigation-buttons">

                <button
                  type="button"
                  className="spa-nav-btn spa-nav-primary"
                  onClick={() => navigate(`/dashboard/spas/${spa.slug}`)}
                >
                  <i className="bi bi-building"></i>
                  <span>Datos</span>
                </button>

                <button
                  type="button"
                  className="spa-nav-btn spa-nav-secondary"
                  onClick={() => navigate(`/dashboard/spas/${spa.slug}/reservations`)}
                >
                  <i className="bi bi-calendar-check"></i>
                  <span>Reservas</span>
                </button>

                <button
                  type="button"
                  className="spa-nav-btn spa-nav-secondary"
                  onClick={() => navigate(`/dashboard/spas/${spa.slug}/categories`)}
                >
                  <i className="bi bi-tags"></i>
                  <span>Categorías</span>
                </button>

                <button
                  type="button"
                  className="spa-nav-btn spa-nav-secondary"
                  onClick={() => navigate(`/dashboard/spas/${spa.slug}/services`)}
                >
                  <i className="bi bi-stars"></i>
                  <span>Servicios</span>
                </button>

                <button
                  type="button"
                  className="spa-nav-btn spa-nav-secondary"
                  onClick={() => navigate(`/dashboard/spas/${spa.slug}/employees`)}
                >
                  <i className="bi bi-people"></i>
                  <span>Empleados</span>
                </button>

                <button
                  type="button"
                  className="spa-nav-btn spa-nav-secondary"
                  onClick={() => navigate(`/dashboard/spas/${spa.slug}/clients`)}
                >
                  <i className="bi bi-person-heart"></i>
                  <span>Clientes</span>
                </button>

                <button
                  type="button"
                  className="spa-nav-btn spa-nav-calendar"
                  onClick={() => navigate(`/dashboard/spas/${spa.slug}/calendar`)}
                >
                  <i className="bi bi-calendar-week"></i>
                  <span>Calendario</span>
                </button>

                <button
                  type="button"
                  className="spa-nav-btn spa-nav-calendar"
                  onClick={() => navigate(`/dashboard/spas/${spa.slug}/schedule`)}
                >
                  <i className="bi bi-clock-history"></i>
                  <span>Horario</span>
                </button>

              </div>
            </div>
          </div>

          <div
            className="card border-0 shadow-sm"
            style={{ borderRadius: '20px', overflow: 'hidden' }}
          >
            <div className="card-header border-0 py-3 px-4 bg-white">
              <h5 className="mb-0 fw-bold">Datos del spa</h5>
            </div>

            <div className="card-body p-4 p-lg-5 bg-white">
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
                  <div
                    className="p-3"
                    style={{
                      backgroundColor: '#F7F7F7',
                      borderRadius: '12px',
                      border: '1px solid #eee',
                      minHeight: '48px',
                    }}
                  >
                    <div className="text-muted">
                      {spa.description || '-'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
      <div
        className="p-3"
        style={{
          backgroundColor: '#F7F7F7',
          borderRadius: '12px',
          border: '1px solid #eee',
          minHeight: '48px',
        }}
      >
        <div className="text-muted">{value || '-'}</div></div>
    </div>
  );
}