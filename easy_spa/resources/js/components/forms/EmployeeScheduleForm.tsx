import { useParams } from 'react-router-dom';

type UseScheduleHook = (employeeId?: string) => {
  days: any[];
  loading: boolean;
  handleChange: (index: number, field: string, value: any) => void;
  saveSchedule: () => void;
};

type Props = {
  Layout: React.ComponentType<{ children: React.ReactNode }>;
  useScheduleHook: UseScheduleHook;
};

export default function EmployeeScheduleForm({ Layout, useScheduleHook }: Props) {
  const { employeeId } = useParams<{ employeeId: string }>();

  const {
    days,
    loading,
    handleChange,
    saveSchedule,
  } = useScheduleHook(employeeId);

  return (
    <Layout>
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
            className="form-action-btn save-btn"
            onClick={saveSchedule}
            disabled={loading}
          >
            <i className="bi bi-check-circle"></i>

              <span>
                {loading ? 'Guardando...' : 'Guardar horario'}
              </span>
      
          </button>
        </div>
      </div>
    </Layout>
  );
}