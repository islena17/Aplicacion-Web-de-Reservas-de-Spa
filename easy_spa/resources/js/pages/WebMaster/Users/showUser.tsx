import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useUser } from '@/hooks/WebMaster/User/useUser';

export default function ShowUser() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { user, loading, error } = useUser(id);

    if (loading) {
        return (
            <DashboardLayout>
                <div className="p-4">Cargando usuario...</div>
            </DashboardLayout>
        );
    }

    if (error || !user) {
        return (
            <DashboardLayout>
                <div className="p-4 text-danger">
                    {error ?? 'Usuario no encontrado'}
                </div>
            </DashboardLayout>
        );
    }
    const isClientUser = !!user.client;
    const latestReservations = user.client?.reservations?.slice(0, 3) ?? [];

    return (
        <DashboardLayout>
            <div className="container-fluid">
                <div className="container py-4 py-lg-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h1 className="fw-bold">Detalle usuario</h1>
                            <p className="text-muted mb-0">
                                Información del usuario y últimas reservas
                            </p>
                        </div>

                        <button
                            className="btn"
                            onClick={() => navigate('/dashboard/users')}
                            style={{
                                backgroundColor: '#F2E6D0',
                                color: '#7a6440',
                                borderRadius: '12px',
                                fontWeight: 700,
                                padding: '6px 14px',
                            }}
                        >
                            Volver
                        </button>
                    </div>

                    <div className="row g-4">
                        {/* IZQUIERDA */}
                        <div className={isClientUser ? 'col-12 col-lg-4' : 'col-12'}>
                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{ borderRadius: '20px', overflow: 'hidden' }}
                            >
                                <div className="card-body p-4">
                                    <h5 className="fw-bold mb-4">Datos del usuario</h5>

                                    <div className="mb-3">
                                        <small className="text-muted fw-semibold">Email</small>
                                        <div className="fw-semibold">{user.email}</div>
                                    </div>

                                    <div className="mb-3">
                                        <small className="text-muted fw-semibold">Rol</small>
                                        <div className="fw-semibold">
                                            {user.role?.name ?? '-'}
                                        </div>
                                    </div>

                                    {user.client && (
                                        <>
                                            <hr />

                                            <h6 className="fw-bold mb-3">Datos del cliente</h6>

                                            <div className="mb-3">
                                                <small className="text-muted fw-semibold">Nombre</small>
                                                <div>{user.client.name}</div>
                                            </div>

                                            <div className="mb-3">
                                                <small className="text-muted fw-semibold">Apellido</small>
                                                <div>{user.client.surname}</div>
                                            </div>

                                            <div className="mb-0">
                                                <small className="text-muted fw-semibold">Teléfono</small>
                                                <div>{user.client.telephone}</div>
                                            </div>
                                        </>
                                    )}

                                    {user.employee && (
                                        <>
                                            <hr />

                                            <h6 className="fw-bold mb-3">Datos del Empleado</h6>

                                            <div className="mb-3">
                                                <small className="text-muted fw-semibold">Spa</small>
                                                <div>{user.employee.spa?.name}</div>
                                            </div>

                                            <div className="mb-3">
                                                <small className="text-muted fw-semibold">Nombre</small>
                                                <div>{user.employee.name}</div>
                                            </div>

                                            <div className="mb-3">
                                                <small className="text-muted fw-semibold">Apellido</small>
                                                <div>{user.employee.surname}</div>
                                            </div>

                                            <div className="mb-0">
                                                <small className="text-muted fw-semibold">Teléfono</small>
                                                <div>{user.employee.telephone}</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                      {isClientUser && (
                        <div className="col-12 col-lg-8">
                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{ borderRadius: '20px', overflow: 'hidden' }}
                            >
                                <div className="card-body p-0">
                                    <div className="p-4 border-bottom">
                                        <h5 className="fw-bold mb-0">Últimas 3 reservas</h5>
                                    </div>

                                    {latestReservations.length === 0 ? (
                                        <div className="p-4 text-muted">
                                            Este cliente no tiene reservas.
                                        </div>
                                    ) : (
                                        <table className="table mb-0">
                                            <thead style={{ backgroundColor: '#F7F7F7' }}>
                                                <tr>
                                                    <th className="px-4 py-3">Fecha</th>
                                                    <th className="px-4 py-3">Spa</th>
                                                    <th className="px-4 py-3">Servicio</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {latestReservations.map((reservation) => (
                                                    <tr key={reservation.id}>
                                                        <td className="px-4 py-3">
                                                            {reservation.reservation_date}
                                                        </td>

                                                        <td className="px-4 py-3">
                                                            {reservation.service?.spa?.name ?? '-'}
                                                        </td>

                                                        <td className="px-4 py-3 fw-semibold">
                                                            {reservation.service?.name ?? '-'}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                              
                        </div>
                          )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}