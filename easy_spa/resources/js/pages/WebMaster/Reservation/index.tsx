import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/WMLayout';
import Pagination from '@/components/layouts/Pagination';
import { useReservations } from '@/hooks/WebMaster/Reservation/useReservations';
import { useSpaShow } from '@/hooks/WebMaster/Spa/useSpaShow';


export default function ReservationsIndex() {
    const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const {
  spa,
  loading: spaLoading,
} = useSpaShow(slug);
  const {
    reservations,
    loading,
    error,
    page,
    setPage,
    lastPage,
    deleteReservation,
  } = useReservations(slug);

  if (loading || spaLoading) {
    return (
      <DashboardLayout>
        <p>Cargando reservas...</p>
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
                Reservas de {spa?.name}
              </h1>
              <p className="text-muted mb-0">
                Gestiona las reservas de este spa.
              </p>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn"
                onClick={() => navigate(`/dashboard/spas/${slug}/reservations/create`)}
                style={{
                  backgroundColor: '#E0C38D',
                  color: '#fff',
                  borderRadius: '12px',
                  fontWeight: 700,
                }}
              >
                Crear reserva
              </button>

              <button
                className="btn"
                onClick={() => navigate(`/dashboard/spas/${slug}`)}
                style={{
                  backgroundColor: '#F2E6D0',
                  color: '#7a6440',
                  borderRadius: '12px',
                  fontWeight: 700,
                }}
              >
                Volver al spa
              </button>
            </div>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
            <div className="card-body p-0 bg-white">
              {reservations.length === 0 ? (
                <div className="p-4 text-muted">No hay reservas registradas.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead style={{ backgroundColor: '#F7F7F7' }}>
                      <tr>
                        <th className="px-4 py-3">Cliente</th>
                        <th className="px-4 py-3">Servicio</th>
                        <th className="px-4 py-3">Empleado</th>
                        <th className="px-4 py-3">Fecha</th>
                        <th className="px-4 py-3">Hora</th>
                        <th className="px-4 py-3">Estado</th>
                        <th className="px-4 py-3 text-end">Acciones</th>
                      </tr>
                    </thead>

                    <tbody>
                      {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                          <td className="px-4 py-3">{reservation.client?.name || '-'}</td>
                          <td className="px-4 py-3">{reservation.service?.name || '-'}</td>
                          <td className="px-4 py-3">{reservation.employee?.name || 'Sin empleado'}</td>
                          <td className="px-4 py-3">{reservation.reservation_date}</td>
                          <td className="px-4 py-3">{reservation.start_time} - {reservation.end_time}</td>
                          <td className="px-4 py-3">
                            <span className="badge bg-secondary">{reservation.status}</span>
                          </td>
                          <td className="px-4 py-3 text-end">
                            <button
                              className="btn btn-sm me-2"
                              onClick={() => navigate(`/dashboard/spas/${slug}/reservations/${reservation.id}/edit`)}
                              style={{
                                backgroundColor: '#F2E6D0',
                                color: '#7a6440',
                                borderRadius: '10px',
                                fontWeight: 600,
                              }}
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>

                            <button
                              className="btn btn-sm me-2"
                              onClick={() => navigate(`/dashboard/spas/${slug}/reservations/${reservation.id}`)}
                              style={{
                                backgroundColor: '#F2E6D0',
                                color: '#7a6440',
                                borderRadius: '10px',
                                fontWeight: 600,
                              }}
                            >
                              <i className="bi bi-eye"></i>
                            </button>

                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteReservation(reservation.id)}
                            >
                              <i className="bi bi-x-square"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <Pagination
            currentPage={page}
            lastPage={lastPage}
            onPageChange={setPage}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}