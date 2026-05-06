import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from "../../../components/layouts/WMLayout";
import { useReservation } from '@/hooks/WebMaster/Reservation/useReservation';

export default function ShowReservation() {
  const navigate = useNavigate();
  const { reservationId } = useParams<{ reservationId: string }>();

  const { reservation, loading, error } = useReservation(reservationId);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-4">Cargando reserva...</div>
      </DashboardLayout>
    );
  }

  if (error || !reservation) {
    return (
      <DashboardLayout>
        <div className="p-4 text-danger">
          {error ?? 'Reserva no encontrada'}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container-fluid">
        <div className="container py-4 py-lg-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="fw-bold">Detalle reserva</h1>
              <p className="text-muted mb-0">
                Información completa de la reserva
              </p>
            </div>

            <button
              className="btn"
              onClick={() => navigate('/dashboard/reservations')}
              style={{
                backgroundColor: '#F2E6D0',
                color: '#7a6440',
                borderRadius: '12px',
                fontWeight: 700,
                padding: '6px 14px',
              }}
            >
              <i className="bi bi-arrow-left"></i>  Volver
            </button>
          </div>

          <div className="row g-4">
            {/* RESUMEN */}
            <div className="col-12">
              <div
                className="card border-0 shadow-sm"
                style={{ borderRadius: '20px' }}
              >
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3">Resumen</h5>

                  <p className="mb-0 text-muted">
                    {reservation.client
                      ? `${reservation.client.name} ${reservation.client.surname}`
                      : 'Cliente no asignado'}{' '}
                    reservó{' '}
                    <strong>{reservation.service?.name ?? 'un servicio'}</strong>{' '}
                    para el día{' '}
                    <strong>{reservation.reservation_date}</strong> de{' '}
                    <strong>{reservation.start_time}</strong> a{' '}
                    <strong>{reservation.end_time}</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* DATOS RESERVA */}
            <div className="col-12 col-lg-4">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ borderRadius: '20px' }}
              >
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">Datos de la reserva</h5>

                  <Info label="ID" value={`#${reservation.id}`} />
                  <Info label="Fecha" value={reservation.reservation_date} />
                  <Info label="Hora inicio" value={reservation.start_time} />
                  <Info label="Hora fin" value={reservation.end_time} />
                  <Info label="Precio final" value={`${reservation.final_price} €`} />
                  <Info label="Estado" value={reservation.status ?? '-'} />

                  <div className="mb-0">
                    <small className="text-muted fw-semibold">Observaciones</small>
                    <div>{reservation.observations || 'Sin observaciones'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CLIENTE */}
            <div className="col-12 col-lg-4">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ borderRadius: '20px' }}
              >
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">Cliente</h5>

                  {reservation.client ? (
                    <>
                      <Info
                        label="Nombre"
                        value={`${reservation.client.name} ${reservation.client.surname}`}
                      />
                      <Info
                        label="Teléfono"
                        value={reservation.client.telephone ?? '-'}
                      />
                      <Info
                        label="Email"
                        value={reservation.client.user?.email ?? '-'}
                      />

                      <button
                        className="btn btn-sm mt-2"
                        onClick={() =>
                          navigate(`/dashboard/clients/${reservation.client?.id}`)
                        }
                        style={{
                          backgroundColor: '#F2E6D0',
                          color: '#7a6440',
                          borderRadius: '10px',
                          fontWeight: 700,
                        }}
                      >
                        Ver cliente
                      </button>
                    </>
                  ) : (
                    <p className="text-muted mb-0">Cliente no asignado.</p>
                  )}
                </div>
              </div>
            </div>

            {/* SERVICIO */}
            <div className="col-12 col-lg-4">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ borderRadius: '20px' }}
              >
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">Servicio</h5>

                  {reservation.service ? (
                    <>
                      <Info label="Nombre" value={reservation.service.name} />
                      <Info
                        label="Categoría"
                        value={reservation.service.category?.name ?? '-'}
                      />
                      <Info
                        label="Spa"
                        value={reservation.service.spa?.name ?? '-'}
                      />
                      <Info
                        label="Precio"
                        value={`${reservation.service.price} €`}
                      />
                    </>
                  ) : (
                    <p className="text-muted mb-0">Servicio no asignado.</p>
                  )}
                </div>
              </div>
            </div>

            {/* EMPLEADO */}
            <div className="col-12 col-lg-6">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ borderRadius: '20px' }}
              >
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">Empleado asignado</h5>

                  {reservation.employee ? (
                    <>
                      <Info
                        label="Nombre"
                        value={`${reservation.employee.name} ${reservation.employee.surname}`}
                      />
                      <Info
                        label="Email"
                        value={reservation.employee.user?.email ?? '-'}
                      />
                    </>
                  ) : (
                    <p className="text-muted mb-0">Sin empleado asignado.</p>
                  )}
                </div>
              </div>
            </div>

            {/* ACCIONES */}
            <div className="col-12 col-lg-6">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ borderRadius: '20px' }}
              >
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">Acciones</h5>

                  <div className="d-flex gap-2 flex-wrap">
                    <button
                      className="btn"
                      onClick={() =>
                        navigate(`/dashboard/reservations/${reservation.id}/edit`)
                      }
                      style={{
                        backgroundColor: '#E0C38D',
                        color: '#fff',
                        borderRadius: '12px',
                        fontWeight: 700,
                      }}
                    >
                      Editar reserva
                    </button>

                    <button
                      className="btn"
                      onClick={() => navigate('/dashboard/reservations')}
                      style={{
                        backgroundColor: '#F2E6D0',
                        color: '#7a6440',
                        borderRadius: '12px',
                        fontWeight: 700,
                      }}
                    >
                      Ir al listado
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="mb-3">
      <small className="text-muted fw-semibold">{label}</small>
      <div className="fw-semibold">{value}</div>
    </div>
  );
}