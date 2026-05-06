import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import useEmployees from '@/hooks/Admin/Employee/useEmployees';

export default function AdminEmployeesIndex() {
  const navigate = useNavigate();
  const { employees, loading, error } = useEmployees();

  return (
    <AdminLayout>
      <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
        <div className="container py-4 py-lg-5">

          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h1 className="fw-bold mb-1" style={{ color: '#2f2f2f' }}>
                Empleados
              </h1>
              <p className="text-muted mb-0">
                Gestiona los empleados de tu spa.
              </p>
            </div>

            <button
              className="btn"
              onClick={() => navigate('/admin/employees/create')}
              style={{
                backgroundColor: '#E0C38D',
                color: '#fff',
                borderRadius: '12px',
                padding: '10px 18px',
                fontWeight: 700,
              }}
            >
              <i className="bi bi-plus-lg"></i> Nuevo empleado
            </button>
          </div>

          {/* ERROR */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* CONTENT */}
          {loading ? (
            <div className="text-center py-5">Cargando empleados...</div>
          ) : employees.length === 0 ? (
            <div className="text-center py-5 text-muted">
              No hay empleados registrados.
            </div>
          ) : (
            <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <div className="card-body p-4">
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead style={{ backgroundColor: '#F7F7F7' }}>
                      <tr>
                        <th className="px-4 py-3">Nombre</th>
                        <th className="px-4 py-3">
                          Email</th>
                        <th className="px-4 py-3">
                          Teléfono</th>
                        <th className="px-4 py-3">
                          Activo</th>
                        <th className="text-end px-4">Acciones</th>
                      </tr>
                    </thead>

                    <tbody>
                      {employees.map((emp) => (
                        <tr key={emp.id}>
                          <td className="px-4 fw-semibold">
                            {emp.name} {emp.surname}
                          </td>

                          <td className="px-4 py-3">
                            {emp.email ?? '-'}</td>
                          <td className="px-4 py-3">
                            {emp.telephone ?? '-'}</td>

                          <td className="px-4 py-3">

                            <span
                              className={`badge ${emp.is_active ? 'bg-success' : 'bg-secondary'
                                }`}
                            >
                              {emp.is_active ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>

                          <td className="text-end px-4">
                            <div className="d-flex justify-content-end gap-2">

                              <button
                                className="btn btn-sm"
                                onClick={() =>
                                  navigate(`/admin/employees/${emp.id}`)
                                }
                                style={{
                                  backgroundColor: '#F2E6D0',
                                  color: '#7a6440',
                                  borderRadius: '10px',
                                }}
                              >
                                Ver
                              </button>

                              <button
                                className="btn btn-sm"
                                onClick={() =>
                                  navigate(`/admin/employees/${emp.id}/edit`)
                                }
                                style={{
                                  backgroundColor: '#E0C38D',
                                  color: '#fff',
                                  borderRadius: '10px',
                                }}
                              >
                                Editar
                              </button>

                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}