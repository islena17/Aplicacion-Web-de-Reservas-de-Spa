import { useNavigate } from 'react-router-dom';
import DashboardLayout from "../../../components/layouts/WMLayout";
import { useSpaForm } from '@/hooks/WebMaster/Spa/useSpaForm';

export default function CreateSpa() {
  const navigate = useNavigate();

  const {
    form,
    errors,
    loading,
    handleChange,
    createSpa,
    fieldError,
  } = useSpaForm();

  return (
    <DashboardLayout>
      <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
        <div className="container py-4 py-lg-5">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h1 className="fw-bold mb-1" style={{ color: '#2f2f2f' }}>
                Crear spa
              </h1>
              <p className="text-muted mb-0">Añade un nuevo spa al sistema.</p>
            </div>

            <button
              type="button"
              className="custom-main-btn back-btn"
              onClick={() => navigate(-1)}
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
              {errors.general && (
                <div className="alert alert-danger">{errors.general}</div>
              )}

              <form onSubmit={createSpa}>
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
                    <label className="form-label fw-semibold">Logo</label>
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
                </div>

                <div className="d-flex justify-content-end gap-3 mt-5">
                  <button
                    type="button"
                    className="form-action-btn cancel-btn"
                    onClick={() => navigate(-1)}

                  ><i className="bi bi-x-circle"></i>
                   <span>Cancelar</span>
                  </button>

                  <button
                    type="submit"
                     className="form-action-btn save-btn"
                    disabled={loading}
                   
                  ><i className="bi bi-check-circle"></i>

              <span>
                    {loading ? 'Guardando...' : 'Crear spa'}
                    </span>
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