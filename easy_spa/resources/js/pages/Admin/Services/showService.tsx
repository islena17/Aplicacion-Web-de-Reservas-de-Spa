import useService from '@/hooks/Admin/Services/useService';
import AdminLayout from '@/components/layouts/AdminLayout';
import ServiceShowLayout from '@/components/layouts/panel/serviceShowLayout';

export default function AdminShowService() {
  const { service, loading, error } = useService();

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-5">Cargando servicio...</div>
      </AdminLayout>
    );
  }

  if (error || !service) {
    return (
      <AdminLayout>
        <div className="alert alert-danger m-4">
          {error || 'Servicio no encontrado.'}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <ServiceShowLayout
        service={service}
        backPath="/admin/services"
        editPath={`/admin/services/${service.slug}/edit`}
      />
    </AdminLayout>
  );
}