import { useParams } from 'react-router-dom';
import AdminLayout from '@/components/forms/layouts/AdminLayout';
import { useEmployeeSchedule } from '@/hooks/Admin/Employee/useEmployeeSchedule';

export default function EmployeeSchedule() {
  const { employeeId } = useParams<{ employeeId: string }>();

  const {
    days,
    loading,
    handleChange,
    saveSchedule,
  } = useEmployeeSchedule(employeeId);

  return (
    <AdminLayout>
      <div className="container py-4">

        <h2 className="mb-4">Horario mensual</h2>

        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Día</th>
                    <th>Trabaja</th>
                    <th>Inicio</th>
                    <th>Fin</th>
                  </tr>
                </thead>

                <tbody>
                  {days.map((day, index) => (
                    <tr key={day.date}>
                      <td>{day.date}</td>

                      <td>
                        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][day.day_of_week]}
                      </td>

                      <td>
                        <input
                          type="checkbox"
                          checked={day.is_working}
                          onChange={(e) =>
                            handleChange(index, 'is_working', e.target.checked)
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="time"
                          value={day.start_time}
                          disabled={!day.is_working}
                          onChange={(e) =>
                            handleChange(index, 'start_time', e.target.value)
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="time"
                          value={day.end_time}
                          disabled={!day.is_working}
                          onChange={(e) =>
                            handleChange(index, 'end_time', e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>

        <div className="text-end mt-4">
          <button
            className="btn"
            onClick={saveSchedule}
            disabled={loading}
            style={{
              backgroundColor: '#E0C38D',
              color: '#fff',
              borderRadius: '12px',
              padding: '10px 24px',
              fontWeight: 700,
            }}
          >
            {loading ? 'Guardando...' : 'Guardar horario'}
          </button>
        </div>

      </div>
    </AdminLayout>
  );
}