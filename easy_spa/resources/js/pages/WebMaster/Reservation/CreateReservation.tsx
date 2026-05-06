import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from "../../../components/layouts/WMLayout";
import { useReservationForm } from '@/hooks/WebMaster/Reservation/useReservationForm';
import ReservationForm from '@/components/forms/ReservationForm';

export default function CreateReservation() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const {
    form,
    clients,
    services,
    employees,
    errors,
    loading,
    loadingOptions,
    handleChange,
    createReservation,
    fieldError,
    showClientForm,
    setShowClientForm,
    clientForm,
    handleClientChange,
  } = useReservationForm(slug);

  if (loadingOptions) {
    return (
      <DashboardLayout>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: '100vh', backgroundColor: '#F7F7F7' }}
        >
          <div className="text-center">
            <div className="spinner-border mb-3" style={{ color: '#E0C38D' }} />
            <p className="mb-0 text-muted">Cargando datos...</p>
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
                Crear reserva
              </h1>
              <p className="text-muted mb-0">
                Añade una nueva reserva para este spa.
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

          <ReservationForm
            form={form}
            clients={clients}
            services={services}
            employees={employees}
            errors={errors}
            loading={loading}
            submitText="Crear reserva"
            loadingText="Guardando..."
            onChange={handleChange}
            onSubmit={createReservation}
            onCancel={() => navigate(-1)}
            fieldError={fieldError}
            showClientForm={showClientForm}
            setShowClientForm={setShowClientForm}
            clientForm={clientForm}
            handleClientChange={handleClientChange}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}