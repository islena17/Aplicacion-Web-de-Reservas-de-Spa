import { ChangeEvent, FormEvent } from 'react';
import { Service } from '@/types';

type Option = {
  id: number;
  name: string;
};


type ReservationFormData = {
  client_id: string;
  service_id: string;
  employee_id: string;
  reservation_date: string;
  start_time: string;
  end_time: string;
  status: string;
  final_price: string;
  number_of_people: string;
  observations: string;
};

type ClientFormData = {
  name: string;
  surname: string;
  email: string;
  telephone: string;
};

type ReservationErrors = Partial<Record<keyof ReservationFormData, string[]>> & {
  general?: string;
};

type AvailableSlot = {
  employee_id: number | null;
  start_time: string;
  end_time: string;
};

type ReservationFormProps = {
  form: ReservationFormData;
  clients: Option[];
  services: Service[];
  employees: Option[];
  errors: ReservationErrors;
  loading: boolean;
  submitText: string;
  loadingText: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  fieldError: (field?: string[]) => string | undefined;
  showClientForm: boolean;
  setShowClientForm: (value: boolean) => void;
  clientForm: ClientFormData;
  handleClientChange: (e: ChangeEvent<HTMLInputElement>) => void;
  availableSlots: AvailableSlot[];
  loadingSlots: boolean;
  selectSlot: (slot: AvailableSlot) => void;
};

export default function ReservationForm({
  form,
  clients,
  services,
  employees,
  errors,
  loading,
  submitText,
  loadingText,
  onChange,
  onSubmit,
  onCancel,
  fieldError,
  showClientForm,
  setShowClientForm,
  clientForm,
  handleClientChange,
  availableSlots,
  loadingSlots,
  selectSlot,
}: ReservationFormProps) {
  return (
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

        <form onSubmit={onSubmit}>
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
                    onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
              >
                <option value="pending">Pendiente</option>
                <option value="confirmed">Confirmada</option>
                <option value="cancelled">Cancelada</option>
                <option value="completed">Completada</option>
                <option value="no_show">No presentado</option>
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label fw-semibold">Fecha *</label>
              <input
                type="date"
                name="reservation_date"
                className={`form-control ${errors.reservation_date ? 'is-invalid' : ''}`}
                value={form.reservation_date}
                onChange={onChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Horarios disponibles</label>

              {!form.reservation_date ? (
                <div className="alert alert-light border">
                  Selecciona una fecha para ver disponibilidad.
                </div>
              ) : loadingSlots ? (
                <div className="text-muted">
                  <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                  Buscando horarios...
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="alert alert-warning">
                  No hay disponibilidad para esta fecha.
                </div>
              ) : (
                <div className="d-flex flex-wrap gap-2">
                  {availableSlots.map((slot, index) => {
                    const selected =
                      form.start_time === slot.start_time &&
                      form.end_time === slot.end_time &&
                      String(slot.employee_id ?? '') === form.employee_id;

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectSlot(slot)}
                        className="btn"
                        style={{
                          borderRadius: '999px',
                          padding: '9px 16px',
                          fontWeight: 600,
                          backgroundColor: selected ? '#E0C38D' : '#fff',
                          color: selected ? '#fff' : '#7a6440',
                          border: '1px solid #E0C38D',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {slot.start_time} - {slot.end_time}
                      </button>
                    );
                  })}
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
                onChange={onChange}
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label fw-semibold">Hora fin *</label>
              <input
                type="time"
                name="end_time"
                className={`form-control ${errors.end_time ? 'is-invalid' : ''}`}
                value={form.end_time}
                onChange={onChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Precio final</label>
              <input
                type="number"
                step="0.01"
                name="final_price"
                className={`form-control ${errors.final_price ? 'is-invalid' : ''}`}
                value={form.final_price}
                readOnly
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">
                Número de personas
              </label>

              <input
                type="number"
                min="1"
                name="number_of_people"
                className={`form-control ${errors.number_of_people ? 'is-invalid' : ''}`}
                value={form.number_of_people}
                onChange={onChange}
                placeholder="Ej: 3"
              />

              {form.service_id && (
                <small className="text-muted">
                  Capacidad máxima:{' '}
                  {
                    services.find(
                      (service) => service.id === Number(form.service_id)
                    )?.capacity
                  }{' '}
                  personas
                </small>
              )}

              {errors.number_of_people && (
                <div className="invalid-feedback d-block">
                  {fieldError(errors.number_of_people)}
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
                onChange={onChange}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-3 mt-5">
            <button
              type="button"
              className="btn"
              onClick={onCancel}
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
              {loading ? loadingText : submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}