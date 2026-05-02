import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useReservationForm } from '@/hooks/WebMaster/Reservation/useReservationForm';

export default function EditReservation() {
  const navigate = useNavigate();
  const { slug, reservationId } = useParams<{
    slug: string;
    reservationId: string;
  }>();

  const {
    form,
    clients,
    services,
    employees,
    errors,
    loading,
    loadingOptions,
    handleChange,
    updateReservation,
    fieldError,
    showClientForm,
    setShowClientForm,
    clientForm,
    handleClientChange,
  } = useReservationForm(slug, reservationId);

  if (loadingOptions) {
    return (
      <DashboardLayout>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: '100vh', backgroundColor: '#F7F7F7' }}
        >
          <div className="text-center">
            <div className="spinner-border mb-3" style={{ color: '#E0C38D' }} />
            <p className="mb-0 text-muted">Cargando reserva...</p>
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
                Editar reserva
              </h1>
              <p className="text-muted mb-0">
                Modifica los datos de esta reserva.
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
            <div
              className="card-header border-0 py-3 px-4"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <h5 className="mb-0 fw-bold">Datos de la reserva</h5>
            </div>

            <div className="card-body p-4 p-lg-5" style={{ backgroundColor: '#FFFFFF' }}>
              {errors.general && (
                <div className="alert alert-danger">{errors.general}</div>
              )}

              <form onSubmit={updateReservation}>
                <div className="row g-4">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label fw-semibold mb-0">Cliente *</label>

                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => setShowClientForm(!showClientForm)}
                        style={{
                          backgroundColor: '#F2E6D0',
                          color: '#7a6440',
                          borderRadius: '10px',
                          fontWeight: 600,
                        }}
                      >
                        {showClientForm ? 'Elegir cliente existente' : 'Crear nuevo cliente'}
                      </button>
                    </div>

                    {!showClientForm ? (
                      <>
                        <select
                          name="client_id"
                          className={`form-select ${errors.client_id ? 'is-invalid' : ''}`}
                          value={form.client_id}
                          onChange={handleChange}
                        >
                          <option value="">Selecciona un cliente</option>
                          {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                              {client.name}
                            </option>
                          ))}
                        </select>

                        {errors.client_id && (
                          <div className="invalid-feedback d-block">
                            {fieldError(errors.client_id)}
                          </div>
                        )}
                      </>
                    ) : (
                      <div
                        className="p-3"
                        style={{
                          backgroundColor: '#F7F7F7',
                          borderRadius: '12px',
                          border: '1px solid #eee',
                        }}
                      >
                        <div className="row g-3">
                          <div className="col-12 col-md-6">
                            <label className="form-label fw-semibold">Nombre *</label>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              value={clientForm.name}
                              onChange={handleClientChange}
                            />
                          </div>

                          <div className="col-12 col-md-6">
                            <label className="form-label fw-semibold">Apellido *</label>
                            <input
                              type="text"
                              name="surname"
                              className="form-control"
                              value={clientForm.surname}
                              onChange={handleClientChange}
                            />
                          </div>

                          <div className="col-12 col-md-6">
                            <label className="form-label fw-semibold">Email</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              value={clientForm.email}
                              onChange={handleClientChange}
                            />
                          </div>

                          <div className="col-12 col-md-6">
                            <label className="form-label fw-semibold">Teléfono</label>
                            <input
                              type="text"
                              name="telephone"
                              className="form-control"
                              value={clientForm.telephone}
                              onChange={handleClientChange}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Servicio *</label>
                    <select
                      name="service_id"
                      className={`form-select ${errors.service_id ? 'is-invalid' : ''}`}
                      value={form.service_id}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona un servicio</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>

                    {errors.service_id && (
                      <div className="invalid-feedback">
                        {fieldError(errors.service_id)}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Empleado</label>
                    <select
                      name="employee_id"
                      className={`form-select ${errors.employee_id ? 'is-invalid' : ''}`}
                      value={form.employee_id}
                      onChange={handleChange}
                    >
                      <option value="">Sin empleado asignado</option>
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name}
                        </option>
                      ))}
                    </select>

                    {errors.employee_id && (
                      <div className="invalid-feedback">
                        {fieldError(errors.employee_id)}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Estado</label>
                    <select
                      name="status"
                      className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                      value={form.status}
                      onChange={handleChange}
                    >
                      <option value="pending">Pendiente</option>
                      <option value="confirmed">Confirmada</option>
                      <option value="cancelled">Cancelada</option>
                      <option value="completed">Completada</option>
                      <option value="no_show">No presentado</option>
                    </select>

                    {errors.status && (
                      <div className="invalid-feedback">
                        {fieldError(errors.status)}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Fecha *</label>
                    <input
                      type="date"
                      name="reservation_date"
                      className={`form-control ${errors.reservation_date ? 'is-invalid' : ''}`}
                      value={form.reservation_date}
                      onChange={handleChange}
                    />

                    {errors.reservation_date && (
                      <div className="invalid-feedback">
                        {fieldError(errors.reservation_date)}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Hora inicio *</label>
                    <input
                      type="time"
                      name="start_time"
                      className={`form-control ${errors.start_time ? 'is-invalid' : ''}`}
                      value={form.start_time}
                      onChange={handleChange}
                    />

                    {errors.start_time && (
                      <div className="invalid-feedback">
                        {fieldError(errors.start_time)}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Hora fin *</label>
                    <input
                      type="time"
                      name="end_time"
                      className={`form-control ${errors.end_time ? 'is-invalid' : ''}`}
                      value={form.end_time}
                      onChange={handleChange}
                    />

                    {errors.end_time && (
                      <div className="invalid-feedback">
                        {fieldError(errors.end_time)}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Precio final</label>
                    <input
                      type="number"
                      step="0.01"
                      name="final_price"
                      className={`form-control ${errors.final_price ? 'is-invalid' : ''}`}
                      value={form.final_price}
                      onChange={handleChange}
                      placeholder="Ej: 49.99"
                    />

                    {errors.final_price && (
                      <div className="invalid-feedback">
                        {fieldError(errors.final_price)}
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Observaciones</label>
                    <textarea
                      name="observations"
                      className={`form-control ${errors.observations ? 'is-invalid' : ''}`}
                      rows={4}
                      value={form.observations}
                      onChange={handleChange}
                    />

                    {errors.observations && (
                      <div className="invalid-feedback">
                        {fieldError(errors.observations)}
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