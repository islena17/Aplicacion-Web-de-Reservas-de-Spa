import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from "../../../components/layouts/WMLayout";
import { useServiceCategoryForm } from '@/hooks/WebMaster/Services/useServiceCategoryForm';
import ServiceCategoryForm from '@/components/forms/ServiceCategoryForm';

export default function CreateServiceCategory() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const {
    form,
    errors,
    loading,
    loadingOptions,
    handleChange,
    createCategory,
    fieldError,
  } = useServiceCategoryForm(slug);

  if (loadingOptions) {
    return (
      <DashboardLayout>
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#F7F7F7' }}>
          <div className="text-center">
            <div className="spinner-border mb-3" style={{ color: '#E0C38D' }} />
            <p className="mb-0 text-muted">Cargando...</p>
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
                Crear categoría
              </h1>
              <p className="text-muted mb-0">
                Añade una nueva categoría de servicios.
              </p>
            </div>

            <button
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
              <i className="bi bi-arrow-left"></i> Volver
            </button>
          </div>

          <ServiceCategoryForm
            form={form}
            errors={errors}
            loading={loading}
            submitText="Crear categoría"
            loadingText="Guardando..."
            onChange={handleChange}
            onSubmit={createCategory}
            onCancel={() => navigate(-1)}
            fieldError={fieldError}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}