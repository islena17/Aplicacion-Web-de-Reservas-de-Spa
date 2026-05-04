import { ChangeEvent, FormEvent } from 'react';

type ClientFormData = {
  name: string;
  surname: string;
  email: string;
  telephone: string;
};

type ClientErrors = Partial<Record<keyof ClientFormData, string[]>> & {
  general?: string;
};

type ClientFormProps = {
  form: ClientFormData;
  errors: ClientErrors;
  loading: boolean;
  submitText: string;
  loadingText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  fieldError: (field?: string[]) => string | undefined;
};

export default function ClientForm({
  form,
  errors,
  loading,
  submitText,
  loadingText,
  onChange,
  onSubmit,
  onCancel,
  fieldError,
}: ClientFormProps) {
  return (
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
                onChange={onChange}
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