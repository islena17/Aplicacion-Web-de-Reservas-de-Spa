import { ChangeEvent, FormEvent, useState, useEffect } from 'react';

type CategoryOption = {
  id: number;
  name: string;
  spa_id?: number;
};

// Actualizado para coincidir con el Hook
type ServiceFormData = {
  service_category_id: string;
  spa_id?: string;
  name: string;
  slug: string;
  description: string;
  capacity: string,
  image: File | null;
  current_image?: string; // URL que viene de la base de datos
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
  // Estado local para la previsualización de la nueva imagen seleccionada
  const [preview, setPreview] = useState<string | null>(null);

  // Efecto para generar la URL de previsualización cuando cambia el archivo
  useEffect(() => {
    if (!form.image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(form.image);
    setPreview(objectUrl);

    // Limpieza de memoria
    return () => URL.revokeObjectURL(objectUrl);
  }, [form.image]);

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

            {/* CATEGORÍA */}
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
                <div className="invalid-feedback">{fieldError(errors.service_category_id)}</div>
              )}
            </div>

            {/* NOMBRE */}
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
                <div className="invalid-feedback">{fieldError(errors.name)}</div>
              )}
            </div>

            {/* SLUG */}
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
                <div className="invalid-feedback">{fieldError(errors.slug)}</div>
              )}
            </div>

            {/* IMAGEN (UPLOAD) */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Imagen del servicio</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                onChange={onChange}
              />
              <small className="text-muted">Formatos aceptados: JPG, PNG. Máx 2MB.</small>
              {errors.image && (
                <div className="invalid-feedback">{fieldError(errors.image)}</div>
              )}
            </div>

            {/* SECCIÓN DE PREVISUALIZACIÓN */}
            {(preview || form.current_image) && (
              <div className="col-12">
                <div className="d-flex gap-4 align-items-end">
                  {/* Mostrar imagen actual de la DB si existe */}
                  {form.current_image && !preview && (
                    <div>
                      <label className="form-label small text-muted">Imagen actual</label>
                      <div style={imageContainerStyle}>
                        <img src={form.current_image} className="w-100 h-100" style={{ objectFit: 'cover' }} alt="Actual" />
                      </div>
                    </div>
                  )}

                  {/* Mostrar previsualización de la nueva imagen seleccionada */}
                  {preview && (
                    <div>
                      <label className="form-label small text-success fw-bold">Nueva imagen (vista previa)</label>
                      <div style={{ ...imageContainerStyle, border: '2px solid #5ebd94' }}>
                        <img src={preview} className="w-100 h-100" style={{ objectFit: 'cover' }} alt="Preview" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* DURACIÓN */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Duración (minutos) *</label>
              <input
                type="number"
                name="length_minutes"
                className={`form-control ${errors.length_minutes ? 'is-invalid' : ''}`}
                value={form.length_minutes}
                onChange={onChange}
                placeholder="Ej: 60"
              />
              {errors.length_minutes && (
                <div className="invalid-feedback">{fieldError(errors.length_minutes)}</div>
              )}
            </div>

            {/* CAPACIDAD */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Capacidad (maximo personas) *</label>
              <input
                type="number"
                name="capacity"
                className={`form-control ${errors.capacity ? 'is-invalid' : ''}`}
                value={form.capacity}
                onChange={onChange}
                placeholder="Ej: 60"
              />
              {errors.capacity && (
                <div className="invalid-feedback">{fieldError(errors.capacity)}</div>
              )}
            </div>

            {/* PRECIO */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Precio (€) *</label>
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
                <div className="invalid-feedback">{fieldError(errors.price)}</div>
              )}
            </div>

            {/* DESCRIPCIÓN */}
            <div className="col-12">
              <label className="form-label fw-semibold">Descripción</label>
              <textarea
                name="description"
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                rows={4}
                value={form.description}
                onChange={onChange}
                placeholder="Describe el servicio..."
              />
              {errors.description && (
                <div className="invalid-feedback">{fieldError(errors.description)}</div>
              )}
            </div>

            {/* CHECKBOXES */}
            <div className="col-12 col-md-6">
              <div className="form-check p-3" style={checkboxStyle}>
                <input
                  type="checkbox"
                  name="requires_employee"
                  className="form-check-input"
                  id="requires_employee"
                  checked={form.requires_employee}
                  onChange={onChange}
                />
                <label className="form-check-label fw-semibold ms-2" htmlFor="requires_employee">
                  Requiere empleado
                </label>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-check p-3" style={checkboxStyle}>
                <input
                  type="checkbox"
                  name="is_active"
                  className="form-check-input"
                  id="is_active"
                  checked={form.is_active}
                  onChange={onChange}
                />
                <label className="form-check-label fw-semibold ms-2" htmlFor="is_active">
                  Servicio activo
                </label>
              </div>
            </div>
          </div>

          {/* BOTONES */}
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

// Estilos en objetos para mantener limpio el JSX
const imageContainerStyle: React.CSSProperties = {
  width: '150px',
  height: '100px',
  borderRadius: '12px',
  overflow: 'hidden',
  border: '1px solid #eee',
  backgroundColor: '#f9f9f9'
};

const checkboxStyle: React.CSSProperties = {
  backgroundColor: '#F7F7F7',
  borderRadius: '12px',
  border: '1px solid #eee',
  display: 'flex',
  alignItems: 'center'
};


