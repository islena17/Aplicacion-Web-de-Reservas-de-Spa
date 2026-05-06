import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useServiceForm } from '@/hooks/Admin/Services/useServiceForm';
import ServiceForm from '@/components/forms/ServiceForm';

export default function AdminCreateService() {
  const navigate = useNavigate();

  const {
    form,
    categories,
    errors,
    loading,
    loadingOptions,
    handleChange,
    createService,
    fieldError,
  } = useServiceForm();

  if (loadingOptions) {
    return (
      <AdminLayout>
        <div className="text-center py-5">Cargando datos...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
        <div className="container py-4 py-lg-5">
          <h1 className="fw-bold mb-4">Crear servicio</h1>

          <ServiceForm
            form={form}
            categories={categories}
            errors={errors}
            loading={loading}
            submitText="Crear servicio"
            loadingText="Creando..."
            onChange={handleChange}
            onSubmit={createService}
            onCancel={() => navigate('/admin/services')}
            fieldError={fieldError}
          />
        </div>
      </div>
    </AdminLayout>
  );
}