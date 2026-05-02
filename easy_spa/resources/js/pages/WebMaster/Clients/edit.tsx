// src/pages/WebMaster/EditClient.tsx

import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useClientForm } from '@/hooks/WebMaster/Client/useClientForm';

export default function EditClient() {
  const navigate = useNavigate();

  const { slug, clientId } = useParams<{
    slug: string;
    clientId: string;
  }>();

  const {
    form,
    errors,
    loading,
    loadingOptions,
    handleChange,
    updateClient,
    fieldError,
  } = useClientForm(slug, clientId);

  if (loadingOptions) {
    return (
      <DashboardLayout>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: '100vh', backgroundColor: '#F7F7F7' }}
        >
          <div className="text-center">
            <div className="spinner-border mb-3" style={{ color: '#E0C38D' }} />
            <p className="mb-0 text-muted">Cargando cliente...</p>
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
                Editar cliente
              </h1>
              <p className="text-muted mb-0">
                Modifica los datos del cliente.
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
              <i className="bi bi-arrow-left"></i>  Volver
            </button>
          </div>

          <div
            className="card border-0 shadow-sm"
            style={{ borderRadius: '20px', overflow: 'hidden' }}
          >
            <div className="card-header border-0 py-3 px-4 bg-white">
              <h5 className="mb-0 fw-bold">Datos del cliente</h5>
            </div>

            <div className="card-body p-4 p-lg-5 bg-white">
              {errors.general && (
                <div className="alert alert-danger">{errors.general}</div>
              )}

              <form onSubmit={updateClient}>
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
                      <div className="invalid-feedback">
                        {fieldError(errors.name)}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Apellidos *</label>
                    <input
                      type="text"
                      name="surname"
                      className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
                      value={form.surname}
                      onChange={handleChange}
                    />

                    {errors.surname && (
                      <div className="invalid-feedback">
                        {fieldError(errors.surname)}
                      </div>
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
                      <div className="invalid-feedback">
                        {fieldError(errors.email)}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Teléfono</label>
                    <input
                      type="text"
                      name="telephone"
                      className={`form-control ${errors.telephone ? 'is-invalid' : ''}`}
                      value={form.telephone}
                      onChange={handleChange}
                    />

                    {errors.telephone && (
                      <div className="invalid-feedback">
                        {fieldError(errors.telephone)}
                      </div>
                    )}
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