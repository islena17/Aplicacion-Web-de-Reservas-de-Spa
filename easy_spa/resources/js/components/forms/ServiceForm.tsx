import { ChangeEvent, FormEvent } from 'react';

type CategoryOption = {
  id: number;
  name: string;
  spa_id?: number;
};

type ServiceFormData = {
  service_category_id: string;
  spa_id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  length_minutes: string;
  price: string;
  requires_employee: boolean;
  is_active: boolean;
};

type ServiceErrors = Partial<Record<keyof ServiceFormData, string[]>> & {
  general?: string;
};

interface ServiceFormProps {
  form: ServiceFormData;
  categories: CategoryOption[];
  errors: ServiceErrors;
  loading: boolean;
  submitText: string;
  loadingText: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  fieldError: (field?: string[]) => string | undefined;
}

export default function ServiceForm({
  form,
  categories,
  errors,
  loading,
  submitText,
  loadingText,
  onChange,
  onSubmit,
  onCancel,
  fieldError,
}: ServiceFormProps) {
  return (
    <div
      className="card border-0 shadow-sm"
      style={{ borderRadius: '20px', overflow: 'hidden' }}
    >
      <div className="card-header border-0 py-3 px-4" style={{ backgroundColor: '#FFFFFF' }}>
        <h5 className="mb-0 fw-bold">Datos del servicio</h5>
      </div>

      <div className="card-body p-4 p-lg-5" style={{ backgroundColor: '#FFFFFF' }}>
        {errors.general && (
          <div className="alert alert-danger">{errors.general}</div>
        )}

        <form onSubmit={onSubmit}>
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Categoría *</label>
              <select
                name="service_category_id"
                className={`form-select ${errors.service_category_id ? 'is-invalid' : ''}`}
                value={form.service_category_id}
                onChange={onChange}
              >
                <option value="">Selecciona una categoría</option>

                {categories.map((category) => (
                  <option key={category.id} value={String(category.id)}>
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
                className={`form-control ${errors.length_minutes ? 'is-invalid' : ''}`}
                value={form.length_minutes}
                onChange={onChange}
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
                onChange={onChange}
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
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                rows={4}
                value={form.description}
                onChange={onChange}
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
                  onChange={onChange}
                />
                <label className="form-check-label fw-semibold" htmlFor="requires_employee">
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
                  onChange={onChange}
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