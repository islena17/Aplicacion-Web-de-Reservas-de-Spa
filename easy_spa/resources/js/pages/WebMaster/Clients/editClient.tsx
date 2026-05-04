import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../../components/forms/layouts/WMLayout';
import { useClientForm } from '@/hooks/WebMaster/Client/useClientForm';
import ClientForm from '@/components/forms/ClientForm';

export default function EditClient() {
  const navigate = useNavigate();

  const { slug, clientId } = useParams<{
    slug: string;
    clientId: string;
  }>();

  const {
    form,
    errors,
    loading,
    loadingOptions,
    handleChange,
    updateClient,
    fieldError,
  } = useClientForm(slug, clientId);

  if (loadingOptions) {
    return (
      <DashboardLayout>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: '100vh', backgroundColor: '#F7F7F7' }}
        >
          <div className="text-center">
            <div className="spinner-border mb-3" style={{ color: '#E0C38D' }} />
            <p className="mb-0 text-muted">Cargando cliente...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
        <div className="container py-4 py-lg-5">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h1 className="fw-bold mb-1" style={{ color: '#2f2f2f' }}>
                Editar cliente
              </h1>
              <p className="text-muted mb-0">
                Modifica los datos del cliente.
              </p>
            </div>

            <button
              type="button"
              className="btn"
              onClick={() => navigate(-1)}
              style={{
                backgroundColor: '#F2E6D0',
                color: '#7a6440',
                borderRadius: '12px',
                padding: '10px 18px',
                fontWeight: 600,
              }}
            >
              <i className="bi bi-arrow-left"></i> Volver
            </button>
          </div>

          <ClientForm
            form={form}
            errors={errors}
            loading={loading}
            submitText="Guardar cambios"
            loadingText="Guardando..."
            onChange={handleChange}
            onSubmit={updateClient}
            onCancel={() => navigate(-1)}
            fieldError={fieldError}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}