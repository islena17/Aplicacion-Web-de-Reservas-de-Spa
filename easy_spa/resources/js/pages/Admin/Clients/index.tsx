import AdminLayout from "@/components/layouts/AdminLayout";
import useClients from "@/hooks/Admin/Client/useClients";
import ClientsIndexLayout from "@/components/layouts/panel/clientsIndexLayout";

export default function AdminClientsIndex() {
  const {
    clients,
    loading,
    error,
    lastPage,
    setPage,
    page,
  } = useClients();

  return (
    <AdminLayout>
      <ClientsIndexLayout
        clients={clients}
        loading={loading}
        error={error}
        page={page}
        lastPage={lastPage}
        setPage={setPage}
        showBackButton={false}
        getShowPath={(client) => `/admin/clients/${client.id}`}
        getEditPath={(client) => `/admin/clients/${client.id}/edit`}
      />
    </AdminLayout>
  );
}