import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useSpa } from '@/hooks/WebMaster/Spa/useSpa';
import { useSpaForm } from '@/hooks/WebMaster/Spa/useSpaForm';

export default function EditSpa() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const { spa, loadingData, error } = useSpa(slug);

  const {
    form,
    errors,
    loading,
    currentLogo,
    handleChange,
    updateSpa,
    fieldError,
  } = useSpaForm(spa);

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
                Editar spa
              </h1>
              <p className="text-muted mb-0">Modifica la información del spa.</p>
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
              <i className="bi bi-arrow-left"></i>  Volver
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
              <h5 className="mb-0 fw-bold">Datos del spa</h5>
            </div>

            <div className="card-body p-4 p-lg-5" style={{ backgroundColor: '#FFFFFF' }}>
              {error && <div className="alert alert-danger">{error}</div>}

              {errors.general && (
                <div className="alert alert-danger">{errors.general}</div>
              )}

              <form onSubmit={(e) => updateSpa(e, slug)}>
                <div className="row g-4">
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
                      <div className="invalid-feedback">{fieldError(errors.name)}</div>
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
                      placeholder="spa-relax-madrid"
                    />
                    {errors.slug && (
                      <div className="invalid-feedback">{fieldError(errors.slug)}</div>
                    )}
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
                    {errors.description && (
                      <div className="invalid-feedback">
                        {fieldError(errors.description)}
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Dirección</label>
                    <input
                      type="text"
                      name="address"
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      value={form.address}
                      onChange={handleChange}
                    />
                    {errors.address && (
                      <div className="invalid-feedback">{fieldError(errors.address)}</div>
                    )}
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Ciudad</label>
                    <input
                      type="text"
                      name="city"
                      className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                      value={form.city}
                      onChange={handleChange}
                    />
                    {errors.city && (
                      <div className="invalid-feedback">{fieldError(errors.city)}</div>
                    )}
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Código postal</label>
                    <input
                      type="text"
                      name="postal_code"
                      className={`form-control ${errors.postal_code ? 'is-invalid' : ''}`}
                      value={form.postal_code}
                      onChange={handleChange}
                    />
                    {errors.postal_code && (
                      <div className="invalid-feedback">
                        {fieldError(errors.postal_code)}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Teléfono</label>
                    <input
                      type="text"
                      name="phone"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      value={form.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{fieldError(errors.phone)}</div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{fieldError(errors.email)}</div>
                    )}
                  </div>

                  <div className="col-12 col-md-3">
                    <label className="form-label fw-semibold">Hora apertura</label>
                    <input
                      type="time"
                      name="opening_time"
                      className={`form-control ${errors.opening_time ? 'is-invalid' : ''}`}
                      value={form.opening_time}
                      onChange={handleChange}
                    />
                    {errors.opening_time && (
                      <div className="invalid-feedback">
                        {fieldError(errors.opening_time)}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-3">
                    <label className="form-label fw-semibold">Hora cierre</label>
                    <input
                      type="time"
                      name="closing_time"
                      className={`form-control ${errors.closing_time ? 'is-invalid' : ''}`}
                      value={form.closing_time}
                      onChange={handleChange}
                    />
                    {errors.closing_time && (
                      <div className="invalid-feedback">
                        {fieldError(errors.closing_time)}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Nuevo logo</label>
                    <input
                      type="file"
                      name="logo"
                      className={`form-control ${errors.logo ? 'is-invalid' : ''}`}
                      accept="image/*"
                      onChange={handleChange}
                    />
                    {errors.logo && (
                      <div className="invalid-feedback">{fieldError(errors.logo)}</div>
                    )}
                  </div>

                  <div className="col-12 col-md-6 d-flex align-items-end">
                    <div
                      className="form-check p-3 w-100"
                      style={{
                        backgroundColor: '#F7F7F7',
                        borderRadius: '12px',
                        border: '1px solid #eee',
                      }}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="is_active"
                        id="is_active"
                        checked={form.is_active}
                        onChange={handleChange}
                      />
                      <label className="form-check-label fw-semibold" htmlFor="is_active">
                        Spa activo
                      </label>
                    </div>
                  </div>

                  {currentLogo && (
                    <div className="col-12">
                      <label className="form-label fw-semibold">Logo actual</label>
                      <div
                        className="p-3"
                        style={{
                          backgroundColor: '#F7F7F7',
                          borderRadius: '12px',
                          border: '1px solid #eee',
                        }}
                      >
                        <span className="text-muted small">{currentLogo}</span>
                      </div>
                    </div>
                  )}
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