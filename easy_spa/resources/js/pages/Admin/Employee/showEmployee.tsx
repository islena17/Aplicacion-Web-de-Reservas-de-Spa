import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/forms/layouts/AdminLayout';
import useEmployee from '@/hooks/Admin/Employee/useEmployee';

export default function AdminShowEmployee() {
  const navigate = useNavigate();
  const { employeeId } = useParams<{ employeeId: string }>();

  const { employee, loading, error } = useEmployee(employeeId);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-5">Cargando empleado...</div>
      </DashboardLayout>
    );
  }

  if (error || !employee) {
    return (
      <DashboardLayout>
        <div className="alert alert-danger m-4">
          {error || 'Empleado no encontrado.'}
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
                Detalle del empleado
              </h1>
              <p className="text-muted mb-0">
                Consulta la información del empleado.
              </p>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn"
                onClick={() => navigate('/admin/employees')}
                style={{
                  backgroundColor: '#F2E6D0',
                  color: '#7a6440',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  fontWeight: 600,
                }}
              >
                Volver
              </button>

              <button
                className="btn"
                onClick={() => navigate(`/admin/employees/${employee.id}/edit`)}
                style={{
                  backgroundColor: '#E0C38D',
                  color: '#fff',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  fontWeight: 700,
                }}
              >
                Editar
              </button>

              <button
                className="btn"
                onClick={() => navigate(`/admin/employees/${employee.id}/schedule`)}
                style={{
                  backgroundColor: '#7a9e9f',
                  color: '#fff',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  fontWeight: 700,
                }}
              >
                <i className="bi bi-calendar-week"></i> Horario
              </button>
            </div>
          </div>

          <div className="card border-0 shadow-sm" style={{ borderRadius: '20px' }}>
            <div className="card-header border-0 py-3 px-4 bg-white">
              <h5 className="mb-0 fw-bold">Datos del empleado</h5>
            </div>

            <div className="card-body p-4 p-lg-5 bg-white">
              <div className="row g-4">
                <Info label="Nombre" value={`${employee.name} ${employee.surname}`} />
                <Info label="Email" value={employee.email} />
                <Info label="Teléfono" value={employee.telephone} />
                <Info label="Género" value={employee.gender} />
                <Info label="Activo" value={employee.is_active ? 'Sí' : 'No'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="col-12 col-md-6">
      <label className="form-label fw-semibold">{label}</label>
      <div
        className="p-3"
        style={{
          backgroundColor: '#F7F7F7',
          borderRadius: '12px',
          border: '1px solid #eee',
        }}
      >
        <span className="text-muted">{value || 'No indicado'}</span>
      </div>
    </div>
  );
}