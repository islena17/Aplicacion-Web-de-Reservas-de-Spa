import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useServiceCategoryForm } from '@/hooks/WebMaster/Services/useServiceCategoryForm';

export default function EditServiceCategory() {
    const navigate = useNavigate();
    const { slug, categorySlug } = useParams<{
        slug: string;
        categorySlug: string;
    }>();

    const {
        form,
        errors,
        loading,
        loadingOptions,
        handleChange,
        updateCategory,
        fieldError,
    } = useServiceCategoryForm(slug, categorySlug);

    if (loadingOptions) {
        return (
            <DashboardLayout>
                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: '100vh', backgroundColor: '#F7F7F7' }}
                >
                    <div className="text-center">
                        <div className="spinner-border mb-3" style={{ color: '#E0C38D' }} />
                        <p className="mb-0 text-muted">Cargando categoría...</p>
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
                                Editar categoría
                            </h1>
                            <p className="text-muted mb-0">
                                Modifica los datos de esta categoría.
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
                            <h5 className="mb-0 fw-bold">Datos de la categoría</h5>
                        </div>

                        <div className="card-body p-4 p-lg-5" style={{ backgroundColor: '#FFFFFF' }}>
                            {errors.general && (
                                <div className="alert alert-danger">{errors.general}</div>
                            )}

                            <form onSubmit={updateCategory}>
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

                                    </div>

                                    <div className="col-12 col-md-4">
                                        <label className="form-label fw-semibold">Slug*</label>
                                        <input
                                            type="text"
                                            name="slug"
                                            className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                                            value={form.slug}
                                            onChange={handleChange}
                                        />

                                        {errors.slug && (
                                            <div className="invalid-feedback">
                                                {fieldError(errors.slug)}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label className="form-label fw-semibold">Descripción *</label>
                                        <textarea
                                            name="description"
                                            rows={4}
                                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                            value={form.description}
                                            onChange={handleChange}
                                        />

                                        {errors.description && (
                                            <div className="invalid-feedback">
                                                {fieldError(errors.description)}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <label className="form-label fw-semibold">Servicio activo: </label>
                                        <div className="form-check p-3" style={{ backgroundColor: '#F7F7F7', borderRadius: '12px' }}>
                                            <input
                                                type="checkbox"
                                                name="is_active"
                                                className="form-check-input"
                                                id="is_active"
                                                checked={form.is_active}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label fw-semibold" htmlFor="is_active">
                                                Servicio activo
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label className="form-label fw-semibold">Orden</label>
                                        <input
                                            type="number"
                                            name="order"
                                            className="form-control"
                                            value={form.order}
                                            onChange={handleChange}
                                        />
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
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}