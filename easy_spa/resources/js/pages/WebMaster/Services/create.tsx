import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useServiceForm } from '@/hooks/WebMaster/Services/useServiceForm';

export default function CreateService() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const {
    form,
    categories,
    errors,
    loading,
    loadingOptions,
    handleChange,
    createService,
    fieldError,
  } = useServiceForm(slug);

  if (loadingOptions) {
    return (
      <DashboardLayout>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: '100vh', backgroundColor: '#F7F7F7' }}
        >
          <div className="text-center">
            <div className="spinner-border mb-3" style={{ color: '#E0C38D' }} />
            <p className="mb-0 text-muted">Cargando datos...</p>
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
                Crear servicio
              </h1>
              <p className="text-muted mb-0">
                Añade un nuevo servicio para este spa.
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

          <div
            className="card border-0 shadow-sm"
            style={{ borderRadius: '20px', overflow: 'hidden' }}
          >
            <div
              className="card-header border-0 py-3 px-4"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <h5 className="mb-0 fw-bold">Datos del servicio</h5>
            </div>

            <div className="card-body p-4 p-lg-5" style={{ backgroundColor: '#FFFFFF' }}>
              {errors.general && (
                <div className="alert alert-danger">{errors.general}</div>
              )}

              <form onSubmit={createService}>
                <div className="row g-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Categoría *</label>
                    <select
                      name="service_category_id"
                      className={`form-select ${
                        errors.service_category_id ? 'is-invalid' : ''
                      }`}
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
                      placeholder="Ej: Masaje relajante"
                    />

                    {errors.name && (
                      <div className="invalid-feedback">
                        {fieldError(errors.name)}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Slug</label>
                    <input
                      type="text"
                      name="slug"
                      className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                      value={form.slug}
                      onChange={handleChange}
                      placeholder="Ej: masaje-relajante"
                    />

                    {errors.slug && (
                      <div className="invalid-feedback">
                        {fieldError(errors.slug)}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Imagen</label>
                    <input
                      type="text"
                      name="image"
                      className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                      value={form.image}
                      onChange={handleChange}
                      placeholder="URL o nombre de imagen"
                    />

                    {errors.image && (
                      <div className="invalid-feedback">
                        {fieldError(errors.image)}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Duración *</label>
                    <input
                      type="number"
                      name="length_minutes"
                      className={`form-control ${
                        errors.length_minutes ? 'is-invalid' : ''
                      }`}
                      value={form.length_minutes}
                      onChange={handleChange}
                      placeholder="Ej: 60"
                    />

                    {errors.length_minutes && (
                      <div className="invalid-feedback">
                        {fieldError(errors.length_minutes)}
                      </div>
                    )}
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
                      placeholder="Ej: 49.99"
                    />

                    {errors.price && (
                      <div className="invalid-feedback">
                        {fieldError(errors.price)}
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Descripción</label>
                    <textarea
                      name="description"
                      className={`form-control ${
                        errors.description ? 'is-invalid' : ''
                      }`}
                      rows={4}
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Describe brevemente el servicio..."
                    />

                    {errors.description && (
                      <div className="invalid-feedback">
                        {fieldError(errors.description)}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <div
                      className="form-check p-3"
                      style={{
                        backgroundColor: '#F7F7F7',
                        borderRadius: '12px',
                        border: '1px solid #eee',
                      }}
                    >
                      <input
                        type="checkbox"
                        name="requires_employee"
                        className="form-check-input"
                        id="requires_employee"
                        checked={form.requires_employee}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label fw-semibold"
                        htmlFor="requires_employee"
                      >
                        Requiere empleado
                      </label>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div
                      className="form-check p-3"
                      style={{
                        backgroundColor: '#F7F7F7',
                        borderRadius: '12px',
                        border: '1px solid #eee',
                      }}
                    >
                      <input
                        type="checkbox"
                        name="is_active"
                        className="form-check-input"
                        id="is_active"
                        checked={form.is_active}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label fw-semibold"
                        htmlFor="is_active"
                      >
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
                    {loading ? 'Guardando...' : 'Crear servicio'}
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