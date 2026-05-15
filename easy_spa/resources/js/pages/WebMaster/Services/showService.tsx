import useService from '@/hooks/WebMaster/Services/useService';
import WMLayout from '@/components/layouts/WMLayout';
import ServiceShowLayout from '@/components/layouts/panel/serviceShowLayout';
import { useParams } from 'react-router-dom';

export default function WebmasterShowService() {
  const { slug } = useParams<{ slug: string }>();
  const { service, loading, error } = useService();

  if (loading) {
    return (
      <WMLayout>
        <div className="text-center py-5">Cargando servicio...</div>
      </WMLayout>
    );
  }

  if (error || !service) {
    return (
      <WMLayout>
        <div className="alert alert-danger m-4">
          {error || 'Servicio no encontrado.'}
        </div>
      </WMLayout>
    );
  }

  return (
    <WMLayout>
      <ServiceShowLayout
        service={service}
        backPath={`/dashboard/spas/${slug}/services`}
        editPath={`/dashboard/spas/${slug}/services/${service.slug}/edit`}
      />
    </WMLayout>
  );
}