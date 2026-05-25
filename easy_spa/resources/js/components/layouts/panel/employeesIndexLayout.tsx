// components/layouts/panel/employeesLayout.tsx

import { useNavigate } from 'react-router-dom';
import Pagination from '@/components/layouts/Pagination';
import type { Employee } from '@/types';

interface Props {
  title?: string;
  description?: string;
  employees: Employee[];
  loading: boolean;
  error: string;
  page: number;
  lastPage: number;
  setPage: (page: number) => void;
  createPath: string;
  getShowPath: (employee: Employee) => string;
  getEditPath: (employee: Employee) => string;
  onDelete?: (employeeId: number) => void;
  showBackButton?: boolean;

}

export default function EmployeesIndexLayout({
  title = 'Empleados',
  description = 'Gestiona los empleados de tu spa.',
  employees,
  loading,
  error,
  page,
  lastPage,
  setPage,
  createPath,
  getShowPath,
  getEditPath,
  onDelete,
  showBackButton = true,
}: Props) {
  const navigate = useNavigate();

  const safeEmployees = Array.isArray(employees) ? employees : [];

  return (
    <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
      <div className="container py-4 py-lg-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h1 className="fw-bold mb-1" style={{ color: '#2f2f2f' }}>
              {title}
            </h1>
            <p className="text-muted mb-0">{description}</p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              className="custom-main-btn create-btn"
              onClick={() => navigate(createPath)}
            >
              <i className="bi bi-plus-circle"></i> Nuevo empleado
            </button>

            {showBackButton && (
              <button
                className="custom-main-btn back-btn"
                onClick={() => navigate(-1)}
              >
                <i className="bi bi-arrow-left"></i>
                Volver
              </button>
            )}
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <div className="text-center py-5">Cargando empleados...</div>
        ) : safeEmployees.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No hay empleados registrados.
          </div>
        ) : (
          <div
            className="card border-0 shadow-sm"
            style={{ borderRadius: '20px', overflow: 'hidden' }}
          >
            <div className="card-body p-4">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead style={{ backgroundColor: '#F7F7F7' }}>
                    <tr>
                      <th className="px-4 py-3">Nombre</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Teléfono</th>
                      <th className="px-4 py-3">Activo</th>
                      <th className="text-end px-4">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {safeEmployees.map((emp) => (
                      <tr key={emp.id}>
                        <td className="px-4 fw-semibold">
                          {emp.name} {emp.surname}
                        </td>

                        <td className="px-4 py-3">{emp.email ?? '-'}</td>
                        <td className="px-4 py-3">{emp.telephone ?? '-'}</td>

                        <td className="px-4 py-3">
                          <span
                            className={`badge ${emp.is_active ? 'bg-success' : 'bg-secondary'
                              }`}
                          >
                            {emp.is_active ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>

                        <td className="text-end px-4">
                          <div className="d-flex justify-content-end gap-3">

                            <button
                              type="button"
                              className="custom-action-wrapper"
                              onClick={() => navigate(getShowPath(emp))}
                            >
                              <i className="bi bi-eye action-icon"></i>
                              <span className="action-label view-label">
                                Ver
                              </span>
                            </button>

                            <button
                              type="button"
                              className="custom-action-wrapper"
                              onClick={() => navigate(getEditPath(emp))}
                            >
                              <i className="bi bi-pencil-square action-icon"></i>
                              <span className="action-label edit-label">
                                Editar
                              </span>
                            </button>

                            {onDelete && (
                              <button
                                type="button"
                                className="custom-action-wrapper"
                                onClick={() => onDelete(emp.id)}
                              >
                                <i className="bi bi-trash action-icon text-danger"></i>
                                <span className="action-label delete-label">
                                  Eliminar
                                </span>
                              </button>
                            )}

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

        <Pagination
          currentPage={page}
          lastPage={lastPage}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}