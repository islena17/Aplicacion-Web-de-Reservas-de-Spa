import { ChangeEvent, FormEvent } from 'react';

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  order: number;
}

interface ServiceCategoryFormProps {
  form: CategoryFormData;
  errors: any;
  loading: boolean;
  submitText: string;
  loadingText: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  fieldError: (error: any) => string | undefined;
}

export default function ServiceCategoryForm({
  form,
  errors,
  loading,
  submitText,
  loadingText,
  onChange,
  onSubmit,
  onCancel,
  fieldError,
}: ServiceCategoryFormProps) {
  return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: '20px' }}>
      <div className="card-header border-0 py-3 px-4">
        <h5 className="mb-0 fw-bold">Datos de la categoría</h5>
      </div>

      <div className="card-body p-4 p-lg-5">
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
              <label className="form-label fw-semibold">Slug</label>
              <input
                type="text"
                name="slug"
                className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                value={form.slug}
                onChange={onChange}
                placeholder="Ej: masajes-relajantes"
              />
              {errors.slug && (
                <div className="invalid-feedback">
                  {fieldError(errors.slug)}
                </div>
              )}
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Orden</label>
              <input
                type="number"
                name="order"
                className="form-control"
                value={form.order}
                onChange={onChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Descripción</label>
              <textarea
                name="description"
                rows={4}
                className="form-control"
                value={form.description}
                onChange={onChange}
              />
            </div>

            <div className="col-12">
              <div className="form-check">
                <input
                  type="checkbox"
                  name="is_active"
                  id="is_active"
                  className="form-check-input"
                  checked={form.is_active}
                  onChange={onChange}
                />
                <label className="form-check-label fw-semibold" htmlFor="is_active">
                  Activa
                </label>
              </div>
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