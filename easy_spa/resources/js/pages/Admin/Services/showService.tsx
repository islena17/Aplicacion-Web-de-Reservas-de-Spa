import useService from "@/hooks/Admin/Services/useService";
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/forms/layouts/AdminLayout';

export default function AdminShowService() {
  const navigate = useNavigate();
  const { service, loading, error } = useService();

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-5">Cargando servicio...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="alert alert-danger m-4">{error}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
        <div className="container py-4 py-lg-5">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h1 className="fw-bold mb-1" style={{ color: '#2f2f2f' }}>
                Detalle del servicio
              </h1>
              <p className="text-muted mb-0">
                Consulta la información del servicio.
              </p>
            </div>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn"
                onClick={() => navigate('/admin/services')}
                style={{
                  backgroundColor: '#F2E6D0',
                  color: '#7a6440',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  fontWeight: 600,
                }}
              >
                Volver
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => navigate(`/admin/services/${service.slug}/edit`)}
                style={{
                  backgroundColor: '#E0C38D',
                  color: '#fff',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  fontWeight: 700,
                  border: 'none',
                }}
              >
                Editar
              </button>
            </div>
          </div>

          {service && (
            <div className="card border-0 shadow-sm" style={{ borderRadius: '20px' }}>
              <div className="card-header border-0 py-3 px-4 bg-white">
                <h5 className="mb-0 fw-bold">Datos del servicio</h5>
              </div>

              <div className="card-body p-4 p-lg-5 bg-white">
                <div className="row g-4">
                  <Info label="Nombre" value={service.name} />
                  <Info label="Slug" value={service.slug} />
                  <Info
                    label="Categoría"
                    value={service.category?.name ?? service.service_category?.name}
                  />
                  <Info label="Duración" value={`${service.length_minutes ?? ''} minutos`} />
                  <Info label="Precio" value={`${service.price ?? ''} €`} />
                  <Info label="Imagen" value={service.image} />
                  <Info
                    label="Requiere empleado"
                    value={service.requires_employee ? 'Sí' : 'No'}
                  />
                  <Info
                    label="Servicio activo"
                    value={service.is_active ? 'Sí' : 'No'}
                  />
                  <Info label="Descripción" value={service.description} full />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
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