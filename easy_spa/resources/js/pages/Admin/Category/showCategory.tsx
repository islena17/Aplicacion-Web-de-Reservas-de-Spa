import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/AdminLayout';
import { useCategory } from '@/hooks/Admin/Category/useCategory';

export default function AdminShowCategory() {
  const navigate = useNavigate();
  const { category, loading, error } = useCategory();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-5">Cargando categoría...</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="alert alert-danger m-4">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
        <div className="container py-4 py-lg-5">

          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h1 className="fw-bold mb-1" style={{ color: '#2f2f2f' }}>
                Detalle de la categoría
              </h1>
              <p className="text-muted mb-0">
                Consulta la información de la categoría.
              </p>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn"
                onClick={() => navigate('/admin/categories')}
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
                className="btn"
                onClick={() => navigate(`/admin/categories/${category?.slug}/edit`)}
                style={{
                  backgroundColor: '#E0C38D',
                  color: '#fff',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  fontWeight: 700,
                }}
              >
                Editar
              </button>
            </div>
          </div>

          {/* DATA */}
          {category && (
            <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <div className="card-header border-0 py-3 px-4 bg-white">
                <h5 className="mb-0 fw-bold">Datos de la categoría</h5>
              </div>

              <div className="card-body p-4 p-lg-5 bg-white">
                <div className="row g-4">

                  <Info label="Nombre" value={category.name} />
                  <Info label="Slug" value={category.slug} />
                  <Info label="Orden" value={String(category.order)} />

                  <Info
                    label="Activa"
                    value={category.is_active ? 'Sí' : 'No'}
                  />

                  <Info
                    label="Descripción"
                    value={category.description ?? 'Sin descripción'}
                    full
                  />

                </div>
              </div>
            </div>
          )}

          {/* SERVICIOS */}
          {category?.services && category.services.length > 0 && (
            <div className="card border-0 shadow-sm mt-4" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <div className="card-header border-0 py-3 px-4 bg-white">
                <h5 className="mb-0 fw-bold">Servicios</h5>
              </div>

              <div className="card-body p-0">
                <table className="table mb-0">
                  <thead>
                    <tr>
                       <th className="px-4 py-3">Nombre</th>
                       <th className="px-4 py-3">Duración</th>
                       <th className="px-4 py-3">Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.services.map((service) => (
                      <tr key={service.id}>
                         <td className="px-4 py-3">{service.name}</td>
                         <td className="px-4 py-3">{service.length_minutes} min</td>
                         <td className="px-4 py-3">{service.price} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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