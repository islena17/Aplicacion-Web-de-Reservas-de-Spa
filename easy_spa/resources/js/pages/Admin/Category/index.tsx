import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/AdminLayout';
import useCategories from '@/hooks/Admin/Category/useCategories';

export default function AdminCategoriesIndex() {
  const navigate = useNavigate();
  const { categories, loading, error } = useCategories();

  return (
    <DashboardLayout>
      <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
        <div className="container py-4 py-lg-5">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h1 className="fw-bold mb-1" style={{ color: '#2f2f2f' }}>
                Categorías
              </h1>
              <p className="text-muted mb-0">
                Gestiona las categorías de servicios de tu spa.
              </p>
            </div>

            <button
              className="btn"
              onClick={() => navigate('/admin/categories/create')}
              style={{
                backgroundColor: '#E0C38D',
                color: '#fff',
                borderRadius: '12px',
                padding: '10px 18px',
                fontWeight: 700,
              }}
            >
              <i className="bi bi-plus-lg"></i> Nueva categoría
            </button>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          {loading ? (
            <div className="text-center py-5">Cargando categorías...</div>
          ) : categories.length === 0 ? (
            <div className="text-center py-5 text-muted">
              No hay categorías registradas.
            </div>
          ) : (
            <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden'}}>
              <div className="card-body p-4">
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead style={{ backgroundColor: '#F7F7F7' }}>
                      <tr>
                        <th className="px-4 py-3">Nombre</th>
                        <th>Slug</th>
                        <th>Orden</th>
                        <th>Activa</th>
                        <th>Servicios</th>
                        <th className="text-end px-4">Acciones</th>
                      </tr>
                    </thead>

                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td className="px-4 fw-semibold">{category.name}</td>
                          <td>{category.slug}</td>
                          <td>{category.order}</td>

                          <td>
                            <span
                              className={`badge ${
                                category.is_active ? 'bg-success' : 'bg-secondary'
                              }`}
                            >
                              {category.is_active ? 'Activa' : 'Inactiva'}
                            </span>
                          </td>

                          <td>
                            {category.services_count ??
                              category.services?.length ??
                              0}
                          </td>

                          <td className="text-end px-4">
                            <div className="d-flex justify-content-end gap-2">
                              <button
                                className="btn btn-sm"
                                onClick={() =>
                                  navigate(`/admin/categories/${category.slug}`)
                                }
                                style={{
                                  backgroundColor: '#F2E6D0',
                                  color: '#7a6440',
                                  borderRadius: '10px',
                                }}
                              >
                                Ver
                              </button>

                              <button
                                className="btn btn-sm"
                                onClick={() =>
                                  navigate(`/admin/categories/${category.slug}/edit`)
                                }
                                style={{
                                  backgroundColor: '#E0C38D',
                                  color: '#fff',
                                  borderRadius: '10px',
                                }}
                              >
                                Editar
                              </button>
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
        </div>
      </div>
    </DashboardLayout>
  );
}