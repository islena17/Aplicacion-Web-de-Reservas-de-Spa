import { useParams } from "react-router-dom";
import WMLayout from "@/components/layouts/WMLayout";
import useClients from "@/hooks/WebMaster/Client/useClients";
import ClientsIndexLayout from "@/components/layouts/panel/clientsIndexLayout";

export default function WebmasterClientsIndex() {
  const { slug } = useParams();

  const {
    clients,
    loading,
    error,
    lastPage,
    setPage,
    page,
  } = useClients(slug);

  return (
    <WMLayout>
      <ClientsIndexLayout
        title="Clientes del spa"
        description="Consulta los clientes que han reservado en este spa."
        clients={clients}
        loading={loading}
        error={error}
        page={page}
        lastPage={lastPage}
        setPage={setPage}
        getShowPath={(client) => `/dashboard/spas/${slug}/clients/${client.id}`}
      />
    </WMLayout>
  );
}