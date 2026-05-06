import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import useReservations from '@/hooks/Admin/Reservation/useReservations';
import { useReservation } from '@/hooks/Admin/Reservation/useReservation';
import api from '@/lib/axios';

export default function AdminReservationsIndex() {
  const navigate = useNavigate();
  const { reservations, loading, error, refetch } = useReservations();

  const handleDelete = async (id: number) => {
    if (!confirm('¿Seguro que quieres eliminar esta reserva?')) return;

    try {
      await api.delete(`/api/admin/reservations/${id}`);
      await refetch();
    } catch (error) {
      console.error(error);
      alert('No se pudo eliminar la reserva.');
    }
  };

  if (loading) return  <AdminLayout><div>Cargando...</div></AdminLayout>;
  if (error) return <AdminLayout><div>{error}</div></AdminLayout>;
  return (
    <AdminLayout>
      <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
        <div className="container py-4 py-lg-5">

          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h1 className="fw-bold mb-1" style={{ color: '#2f2f2f' }}>
                Reservas
              </h1>
              <p className="text-muted mb-0">
                Gestiona las reservas de tu spa.
              </p>
            </div>

            <button
              className="btn"
              onClick={() => navigate('/admin/reservations/create')}
              style={{
                backgroundColor: '#E0C38D',
                color: '#fff',
                borderRadius: '12px',
                padding: '10px 18px',
                fontWeight: 700,
              }}
            >
              <i className="bi bi-plus-lg"></i> Nueva reserva
            </button>
          </div>

          {/* ERROR */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* TABLA */}
          {reservations.length === 0 ? (
            <div className="text-center py-5 text-muted">
              No hay reservas registradas.
            </div>
          ) : (
            <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <div className="card-body p-4">
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead style={{ backgroundColor: '#F7F7F7' }}>
                      <tr>
                        <th className="px-4 py-3">Cliente</th>
                        <th className="px-4 py-3">
                          Servicio</th>
                        <th className="px-4 py-3">
                          Empleado</th>
                        <th className="px-4 py-3">
                          Fecha</th>
                        <th className="px-4 py-3">
                          Hora</th>
                        <th className="px-4 py-3">
                          Estado</th>
                        <th className="text-end px-4">Acciones</th>
                      </tr>
                    </thead>

                    <tbody>
                      {reservations.map((r: any) => (
                        <tr key={r.id}>
                          <td className="px-4 fw-semibold">
                            {r.client
                              ? `${r.client.name} ${r.client.surname}`
                              : 'Cliente eliminado'}
                          </td>

                          <td className="px-4 py-3">
                            {r.service?.name ?? '-'}</td>

                          <td className="px-4 py-3">

                            {r.employee
                              ? `${r.employee.name} ${r.employee.surname}`
                              : 'Sin asignar'}
                          </td>

                          <td className="px-4 py-3">
                            {r.reservation_date}</td>

                          <td className="px-4 py-3">

                            {r.start_time?.slice(0, 5)} -{' '}
                            {r.end_time?.slice(0, 5)}
                          </td>

                          <td className="px-4 py-3">

                            <span
                              className={`badge ${r.status === 'confirmed'
                                ? 'bg-success'
                                : r.status === 'pending'
                                  ? 'bg-warning text-dark'
                                  : r.status === 'cancelled'
                                    ? 'bg-danger'
                                    : 'bg-secondary'
                                }`}
                            >
                              {r.status}
                            </span>
                          </td>

                          <td className="text-end px-4">
                            <div className="d-flex justify-content-end gap-2">

                              <button
                                className="btn btn-sm"
                                onClick={() =>
                                  navigate(`/admin/reservations/${r.id}/edit`)
                                }
                                style={{
                                  backgroundColor: '#E0C38D',
                                  color: '#fff',
                                  borderRadius: '10px',
                                }}
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(r.id)}
                                style={{
                                  borderRadius: '10px',
                                  fontWeight: 600,
                                }}
                              >
                                <i className="bi bi-x-square"></i>
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