import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/AdminLayout';
import ServiceCategoryForm from '@/components/forms/ServiceCategoryForm';
import { useCategoryForm } from '@/hooks/Admin/Category/useCategoryForm';

export default function AdminCreateCategory() {
  const navigate = useNavigate();

  const {
    form,
    errors,
    loading,
    handleChange,
    createCategory,
    fieldError,
  } = useCategoryForm();

  return (
    <DashboardLayout>
      <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
        <div className="container py-4 py-lg-5">
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="fw-bold">Crear categoría</h1>
              <p className="text-muted">Añade una nueva categoría de servicio.</p>
            </div>

            <button
              className="btn"
              onClick={() => navigate('/admin/categories')}
              style={{
                backgroundColor: '#F2E6D0',
                color: '#7a6440',
                borderRadius: '12px',
                padding: '10px 18px',
              }}
            >
              Volver
            </button>
          </div>

          <ServiceCategoryForm
            form={form}
            errors={errors}
            loading={loading}
            submitText="Crear categoría"
            loadingText="Creando..."
            onChange={handleChange}
            onSubmit={createCategory}
            onCancel={() => navigate('/admin/categories')}
            fieldError={fieldError}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}