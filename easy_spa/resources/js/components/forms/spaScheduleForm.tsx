
interface Props {
  days: any[];
  loading: boolean;
  handleChange: (index: number, field: string, value: any) => void;
  saveSchedule: () => void;
  title?: string;
}

export default function SpaScheduleForm({
  days,
  loading,
  handleChange,
  saveSchedule,
  title = 'Horario del spa',
}: Props) {
  return (
    <div className="container py-4">
      <h2 className="mb-4">{title}</h2>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th>Día</th>
                  <th>Abierto</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                </tr>
              </thead>

              <tbody>
                {days.map((day, index) => (
                  <tr key={day.day_of_week}>
                    <td>
                      {
                        [
                          'Domingo',
                          'Lunes',
                          'Martes',
                          'Miércoles',
                          'Jueves',
                          'Viernes',
                          'Sábado',
                        ][day.day_of_week]
                      }
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
          disabled={loading}>
          <i className="bi bi-check-circle"></i>
          <span>
            {loading ? 'Guardando...' : 'Guardar horario'}
          </span>
        </button>
      </div>
    </div>
  );
}