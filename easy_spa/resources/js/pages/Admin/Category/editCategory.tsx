import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/AdminLayout';
import ServiceCategoryForm from '@/components/forms/ServiceCategoryForm';
import { useCategoryForm } from '@/hooks/Admin/Category/useCategoryForm';

export default function AdminEditCategory() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const {
    form,
    errors,
    loading,
    handleChange,
    updateCategory,
    fieldError,
  } = useCategoryForm(categorySlug);

  return (
    <DashboardLayout>
      <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
        <div className="container py-4 py-lg-5">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="fw-bold">Actualizar categoría</h1>
              <p className="text-muted">Modifica una categoría de servicio.</p>
            </div>

            <button
              className="custom-main-btn back-btn"
              onClick={() => navigate('/admin/categories')}>
              <i className="bi bi-arrow-left"></i>
                Volver
            </button>
          </div>

          <ServiceCategoryForm
            form={form}
            errors={errors}
            loading={loading}
            submitText="Actualizar categoria"
            loadingText="Actualizando..."
            onChange={handleChange}
            onSubmit={updateCategory}
            onCancel={() => navigate('/admin/categories')}
            fieldError={fieldError}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}