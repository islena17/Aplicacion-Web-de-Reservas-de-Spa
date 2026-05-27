import { ChangeEvent, FormEvent } from 'react';

interface EmployeeFormData {
  name: string;
  surname: string;
  gender: string;
  email: string;
  telephone: string;
  is_active: boolean;
  timetable_colour: string; // lo añado para que salga en el calendario su color
}

interface EmployeeErrors {
  general?: string;
  name?: string[];
  surname?: string[];
  gender?: string[];
  email?: string[];
  telephone?: string[];
  timetable_colour?: string[];
}

interface EmployeeFormProps {
  form: EmployeeFormData;
  errors: EmployeeErrors;
  loading: boolean;
  submitText: string;
  loadingText: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  fieldError: (field?: string[]) => string | undefined;
}

export default function EmployeeForm({
  form,
  errors,
  loading,
  submitText,
  loadingText,
  onChange,
  onSubmit,
  onCancel,
  fieldError,
}: EmployeeFormProps) {
  return (
    <div
      className="card border-0 shadow-sm"
      style={{ borderRadius: '20px', overflow: 'hidden' }}
    >
      <div
        className="card-header border-0 py-3 px-4"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <h5 className="mb-0 fw-bold">Datos del empleado</h5>
      </div>

      <div className="card-body p-4 p-lg-5" style={{ backgroundColor: '#FFFFFF' }}>
        {errors.general && (
          <div className="alert alert-danger">{errors.general}</div>
        )}

        <form onSubmit={onSubmit}>
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Nombre *</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                value={form.name}
                onChange={onChange}
                placeholder="Ej: Elena"
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
                onChange={onChange}
                placeholder="Ej: Rodríguez"
              />

              {errors.surname && (
                <div className="invalid-feedback">
                  {fieldError(errors.surname)}
                </div>
              )}
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Sexo</label>
              <select
                name="gender"
                className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                value={form.gender}
                onChange={onChange}
              >
                <option value="">Selecciona una opción</option>
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
                <option value="other">Otro</option>
              </select>

              {errors.gender && (
                <div className="invalid-feedback">
                  {fieldError(errors.gender)}
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
                onChange={onChange}
                placeholder="Ej: empleado@email.com"
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
                onChange={onChange}
                placeholder="Ej: +34 600 000 000"
              />

              {errors.telephone && (
                <div className="invalid-feedback">
                  {fieldError(errors.telephone)}
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
                  name="is_active"
                  className="form-check-input"
                  id="is_active"
                  checked={form.is_active}
                  onChange={onChange}
                />
                <label
                  className="form-check-label fw-semibold"
                  htmlFor="is_active"
                >
                  Empleado activo
                </label>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label fw-semibold">
              Color en calendario
            </label>

            <div className="d-flex align-items-center gap-3">
              <input
                type="color"
                name="timetable_colour"
                className={`form-control form-control-color ${errors.timetable_colour ? 'is-invalid' : ''
                  }`}
                value={form.timetable_colour || "#3788d8"}
                onChange={onChange}
                style={{
                  width: "60px",
                  height: "45px",
                  padding: "5px",
                  borderRadius: "10px",
                }}
              />

              <input
                type="text"
                name="timetable_colour"
                className={`form-control ${errors.timetable_colour ? 'is-invalid' : ''
                  }`}
                value={form.timetable_colour}
                onChange={onChange}
                placeholder="#3788d8"
              />
            </div>

            {errors.timetable_colour && (
              <div className="invalid-feedback d-block">
                {fieldError(errors.timetable_colour)}
              </div>
            )}
          </div>

          <div className="d-flex justify-content-end gap-3 flex-wrap">
            <button
              type="button"
              className="form-action-btn cancel-btn"
              onClick={onCancel}
            >
              <i className="bi bi-x-circle"></i>
              <span>Cancelar</span>
            </button>

            <button
              type="submit"
              className="form-action-btn save-btn"
              disabled={loading}
            >
              <i className="bi bi-check-circle"></i>

              <span>
                {loading ? loadingText : submitText}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}