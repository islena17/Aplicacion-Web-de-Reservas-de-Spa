import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import EmployeeForm from '@/components/forms/EmployeeForm';
import { useEmployeeForm } from '@/hooks/Admin/Employee/useEmployeeForm';

export default function AdminEditEmployee() {
  const navigate = useNavigate();
  const { employeeId } = useParams<{ employeeId: string }>();

  const {
    form,
    errors,
    loading,
    loadingOptions,
    handleChange,
    updateEmployee,
    fieldError,
  } = useEmployeeForm(employeeId);

  if (loadingOptions) {
    return (
      <AdminLayout>
        <div className="text-center py-5">Cargando empleado...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
        <div className="container py-4 py-lg-5">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h1 className="fw-bold mb-1" style={{ color: '#2f2f2f' }}>
                Editar empleado
              </h1>
              <p className="text-muted mb-0">
                Modifica los datos del empleado.
              </p>
            </div>

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
          </div>

          <EmployeeForm
            form={form}
            errors={errors}
            loading={loading}
            submitText="Guardar cambios"
            loadingText="Guardando..."
            onChange={handleChange}
            onSubmit={updateEmployee}
            onCancel={() => navigate('/admin/employees')}
            fieldError={fieldError}
          />
        </div>
      </div>
    </AdminLayout>
  );
}