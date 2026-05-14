import { useParams } from 'react-router-dom';
import WMLayout from '@/components/layouts/WMLayout';
import useServices from '@/hooks/WebMaster/Services/useServices';
import ServicesIndexLayout from '@/components/layouts/panel/serviceIndexLayout';

export default function WebmasterServicesIndex() {
  const { slug } = useParams();

  const {
    services,
    loading,
    error,
    page,
    setPage,
    lastPage,
    deleteService,
  } = useServices(slug);

  return (
    <WMLayout>
      <ServicesIndexLayout
        title="Servicios del spa"
        description="Gestiona los servicios disponibles de este spa."
        services={services}
        loading={loading}
        error={error}
        page={page}
        lastPage={lastPage}
        setPage={setPage}
        createPath={`/dashboard/spas/${slug}/services/create`}
        getShowPath={(service) =>
          `/dashboard/spas/${slug}/services/${service.slug}`
        }
        getEditPath={(service) =>
          `/dashboard/spas/${slug}/services/${service.slug}/edit`
        }
        onDelete={deleteService}
      />
    </WMLayout>
  );
}