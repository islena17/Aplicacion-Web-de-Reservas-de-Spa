import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/forms/layouts/AdminLayout';
import EmployeeForm from '@/components/forms/EmployeeForm';
import { useEmployeeForm } from '@/hooks/Admin/Employee/useEmployeeForm';

export default function AdminCreateEmployee() {
  const navigate = useNavigate();

  const {
    form,
    errors,
    loading,
    handleChange,
    createEmployee,
    fieldError,
  } = useEmployeeForm();

  return (
    <DashboardLayout>
      <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
        <div className="container py-4 py-lg-5">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h1 className="fw-bold mb-1" style={{ color: '#2f2f2f' }}>
                Crear empleado
              </h1>
              <p className="text-muted mb-0">
                Añade un nuevo empleado a tu spa.
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
            submitText="Crear empleado"
            loadingText="Creando..."
            onChange={handleChange}
            onSubmit={createEmployee}
            onCancel={() => navigate('/admin/employees')}
            fieldError={fieldError}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}