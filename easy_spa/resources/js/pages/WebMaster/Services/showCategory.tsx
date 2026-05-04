import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../../components/forms/layouts/WMLayout';
import { useCategory } from '@/hooks/WebMaster/Services/useCategory';

export default function ShowCategory() {
  const navigate = useNavigate();

  const { slug, categorySlug } = useParams<{
    slug: string;
    categorySlug: string;
  }>();

  const { category, loading, error } = useCategory(slug, categorySlug);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-4">Cargando categoría...</div>
      </DashboardLayout>
    );
  }

  if (error || !category) {
    return (
      <DashboardLayout>
        <div className="p-4 text-danger">
          {error ?? 'Categoría no encontrada'}
        </div>
      </DashboardLayout>
    );
  }

  const services = category.services ?? [];

  return (
    <DashboardLayout>
      <div className="container-fluid">
        <div className="container py-4 py-lg-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="fw-bold">Detalle categoría</h1>
              <p className="text-muted mb-0">
                Información de la categoría y servicios asociados
              </p>
            </div>

            <button
              className="btn"
              onClick={() => navigate(`/dashboard/spas/${slug}`)}
              style={{
                backgroundColor: '#F2E6D0',
                color: '#7a6440',
                borderRadius: '12px',
                fontWeight: 700,
                padding: '6px 14px',
              }}
            >
              Volver
            </button>
          </div>

          <div className="row g-4">
            <div className="col-12 col-lg-4">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ borderRadius: '20px' }}
              >
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">Datos de la categoría</h5>

                  <Info label="Nombre" value={category.name} />
                  <Info label="Slug" value={category.slug} />
                  <Info label="Spa" value={category.spa?.name ?? '-'} />
                  <Info label="Orden" value={category.order} />
                  <Info
                    label="Estado"
                    value={category.is_active ? 'Activa' : 'Inactiva'}
                  />

                  <div className="mb-0">
                    <small className="text-muted fw-semibold">Descripción</small>
                    <div>{category.description || 'Sin descripción'}</div>
                  </div>

                  <div className="d-flex gap-2 flex-wrap mt-4">
                    <button
                      className="btn"
                      onClick={() =>
                        navigate(
                          `/dashboard/spas/${slug}/categories/${category.slug}/edit`
                        )
                      }
                      style={{
                        backgroundColor: '#E0C38D',
                        color: '#fff',
                        borderRadius: '12px',
                        fontWeight: 700,
                      }}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-8">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ borderRadius: '20px', overflow: 'hidden' }}
              >
                <div className="card-body p-0">
                  <div className="p-4 border-bottom">
                    <h5 className="fw-bold mb-0">Servicios de esta categoría</h5>
                  </div>

                  {services.length === 0 ? (
                    <div className="p-4 text-muted">
                      Esta categoría todavía no tiene servicios.
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <thead style={{ backgroundColor: '#F7F7F7' }}>
                          <tr>
                            <th className="px-4 py-3">Nombre</th>
                            <th className="px-4 py-3">Duración</th>
                            <th className="px-4 py-3">Precio</th>
                            <th className="px-4 py-3">Estado</th>
                          </tr>
                        </thead>

                        <tbody>
                          {services.map((service) => (
                            <tr key={service.id}>
                              <td className="px-4 py-3 fw-semibold">
                                {service.name}
                              </td>
                              <td className="px-4 py-3">
                                {service.length_minutes} min
                              </td>
                              <td className="px-4 py-3">
                                {service.price} €
                              </td>
                              <td className="px-4 py-3">
                                {service.is_active === false
                                  ? 'Inactivo'
                                  : 'Activo'}
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
      </div>
    </DashboardLayout>
  );
}

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="mb-3">
      <small className="text-muted fw-semibold">{label}</small>
      <div className="fw-semibold">{value}</div>
    </div>
  );
}