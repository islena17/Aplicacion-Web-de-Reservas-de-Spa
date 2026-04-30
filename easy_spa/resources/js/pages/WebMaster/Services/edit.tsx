import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useServiceForm } from '@/hooks/WebMaster/Services/useServiceForm';

export default function EditService() {
  const navigate = useNavigate();
 const { slug, serviceSlug } = useParams<{
  slug: string;
  serviceSlug: string;
}>();

const {
  form,
  categories,
  errors,
  loading,
  loadingOptions,
  handleChange,
  updateService,
  fieldError,
} = useServiceForm(slug, serviceSlug);

  if (loadingOptions) {
    return (
      <DashboardLayout>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: '100vh', backgroundColor: '#F7F7F7' }}
        >
          <div className="text-center">
            <div className="spinner-border mb-3" style={{ color: '#E0C38D' }} />
            <p className="mb-0 text-muted">Cargando servicio...</p>
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
                Editar servicio
              </h1>
              <p className="text-muted mb-0">
                Modifica los datos de este servicio.
              </p>
            </div>

            <button
              type="button"
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

          <div className="card border-0 shadow-sm" style={{ borderRadius: '20px' }}>
            <div className="card-header border-0 py-3 px-4 bg-white">
              <h5 className="mb-0 fw-bold">Datos del servicio</h5>
            </div>

            <div className="card-body p-4 p-lg-5 bg-white">
              {errors.general && (
                <div className="alert alert-danger">{errors.general}</div>
              )}

              <form onSubmit={updateService}>
                <div className="row g-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Categoría *</label>
                    <select
                      name="service_category_id"
                      className={`form-select ${errors.service_category_id ? 'is-invalid' : ''}`}
                      value={form.service_category_id}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona una categoría</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.service_category_id && (
                      <div className="invalid-feedback">
                        {fieldError(errors.service_category_id)}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Nombre *</label>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Slug</label>
                    <input
                      type="text"
                      name="slug"
                      className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                      value={form.slug}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Imagen</label>
                    <input
                      type="text"
                      name="image"
                      className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                      value={form.image}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Duración *</label>
                    <input
                      type="number"
                      name="length_minutes"
                      className={`form-control ${errors.length_minutes ? 'is-invalid' : ''}`}
                      value={form.length_minutes}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Precio *</label>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                      value={form.price}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Descripción</label>
                    <textarea
                      name="description"
                      className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                      rows={4}
                      value={form.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="form-check p-3" style={{ backgroundColor: '#F7F7F7', borderRadius: '12px' }}>
                      <input
                        type="checkbox"
                        name="requires_employee"
                        className="form-check-input"
                        id="requires_employee"
                        checked={form.requires_employee}
                        onChange={handleChange}
                      />
                      <label className="form-check-label fw-semibold" htmlFor="requires_employee">
                        Requiere empleado
                      </label>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="form-check p-3" style={{ backgroundColor: '#F7F7F7', borderRadius: '12px' }}>
                      <input
                        type="checkbox"
                        name="is_active"
                        className="form-check-input"
                        id="is_active"
                        checked={form.is_active}
                        onChange={handleChange}
                      />
                      <label className="form-check-label fw-semibold" htmlFor="is_active">
                        Servicio activo
                      </label>
                    </div>
                  </div>
                </div>

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
                    {loading ? 'Guardando...' : 'Guardar cambios'}
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