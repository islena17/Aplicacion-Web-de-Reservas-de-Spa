import AdminLayout from '@/components/layouts/AdminLayout';
import useServices from '@/hooks/Admin/Services/useServices';
import ServicesIndexLayout from '@/components/layouts/panel/serviceIndexLayout';

export default function AdminServicesIndex() {
  const {
    services,
    loading,
    error,
    lastPage,
    setPage,
    page,
  } = useServices();

  return (
    <AdminLayout>
      <ServicesIndexLayout
        services={services}
        loading={loading}
        error={error}
        page={page}
        lastPage={lastPage}
        setPage={setPage}
        createPath="/admin/services/create"
        showBackButton={false}
        getShowPath={(service) => `/admin/services/${service.slug}`}
        getEditPath={(service) => `/admin/services/${service.slug}/edit`}
      />
    </AdminLayout>
  );
}