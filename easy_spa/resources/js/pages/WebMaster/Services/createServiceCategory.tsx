import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useServiceCategoryForm } from '@/hooks/WebMaster/Services/useServiceCategoryForm';

export default function CreateServiceCategory() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const {
    form,
    errors,
    loading,
    loadingOptions,
    handleChange,
    createCategory,
    fieldError,
  } = useServiceCategoryForm(slug);

  if (loadingOptions) {
    return (
      <DashboardLayout>
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#F7F7F7' }}>
          <div className="text-center">
            <div className="spinner-border mb-3" style={{ color: '#E0C38D' }} />
            <p className="mb-0 text-muted">Cargando...</p>
          </div>
        </div>
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
                Crear categoría
              </h1>
              <p className="text-muted mb-0">
                Añade una nueva categoría de servicios.
              </p>
            </div>

            <button
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
              Volver
            </button>
          </div>

          {/* CARD */}
          <div className="card border-0 shadow-sm" style={{ borderRadius: '20px' }}>
            <div className="card-header border-0 py-3 px-4">
              <h5 className="mb-0 fw-bold">Datos de la categoría</h5>
            </div>

            <div className="card-body p-4 p-lg-5">

              {errors.general && (
                <div className="alert alert-danger">{errors.general}</div>
              )}

              <form onSubmit={createCategory}>
                <div className="row g-4">

                  {/* NOMBRE */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Nombre *</label>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">
                        {fieldError(errors.name)}
                      </div>
                    )}
                  </div>

                  {/* ORDEN */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Orden</label>
                    <input
                      type="number"
                      name="order"
                      className="form-control"
                      value={form.order}
                      onChange={handleChange}
                    />
                  </div>

                  {/* DESCRIPCIÓN */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Descripción</label>
                    <textarea
                      name="description"
                      rows={4}
                      className="form-control"
                      value={form.description}
                      onChange={handleChange}
                    />
                  </div>

                  {/* ACTIVO */}
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        name="is_active"
                        className="form-check-input"
                        checked={form.is_active}
                        onChange={handleChange}
                      />
                      <label className="form-check-label fw-semibold">
                        Activa
                      </label>
                    </div>
                  </div>

                </div>

                {/* BOTONES */}
                <div className="d-flex justify-content-end gap-3 mt-5">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => navigate(-1)}
                    style={{
                      backgroundColor: '#F2E6D0',
                      color: '#7a6440',
                      borderRadius: '12px',
                      padding: '10px 20px',
                      fontWeight: 600,
                    }}
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="btn"
                    disabled={loading}
                    style={{
                      backgroundColor: '#E0C38D',
                      color: '#fff',
                      borderRadius: '12px',
                      padding: '10px 24px',
                      fontWeight: 700,
                      border: 'none',
                    }}
                  >
                    {loading ? 'Guardando...' : 'Crear categoría'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}