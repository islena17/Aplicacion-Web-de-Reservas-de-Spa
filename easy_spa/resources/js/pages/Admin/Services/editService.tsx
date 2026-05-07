import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useServiceForm } from '@/hooks/Admin/Services/useServiceForm';
import ServiceForm from '@/components/forms/ServiceForm';

export default function AdminUpdateService() {
const { serviceSlug } = useParams<{ serviceSlug: string }>();
const navigate = useNavigate();
const {
  form,
  categories,
  errors,
  loading,
  loadingOptions,
  handleChange,
  updateService,
  fieldError,
} = useServiceForm(serviceSlug);
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
          <h1 className="fw-bold mb-4">Actualizar servicio</h1>

          <ServiceForm
            form={form}
            categories={categories}
            errors={errors}
            loading={loading}
            submitText="Guardar cambios"
            loadingText="Guardando..."
            onChange={handleChange}
            onSubmit={updateService}
            onCancel={() => navigate('/admin/services')}
            fieldError={fieldError}
          />
        </div>
      </div>
    </AdminLayout>
  );
}