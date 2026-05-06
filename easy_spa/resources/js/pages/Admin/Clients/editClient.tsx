import { useParams, useNavigate } from "react-router-dom";
import ClientForm from "@/components/forms/ClientForm";
import { useClientForm } from "@/hooks/WebMaster/Client/useClientForm";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function AdminClientEdit() {
    const { clientId } = useParams();
    const navigate = useNavigate();

    const {
        form,
        errors,
        loading,
        loadingOptions,
        handleChange,
        updateClient,
        fieldError,
    } = useClientForm(clientId);

    if (loadingOptions) return <AdminLayout><p>Cargando cliente...</p></AdminLayout>;

    return (
            <AdminLayout>
        <ClientForm
            form={form}
            errors={errors}
            loading={loading}
            submitText="Actualizar cliente"
            loadingText="Actualizando..."
            onChange={handleChange}
            onSubmit={updateClient}
            onCancel={() => navigate("/admin/clients")}
            fieldError={fieldError}
        />
        </AdminLayout>
    );
}