import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useUsers } from '@/hooks/WebMaster/User/useUsers';

export default function UsersIndex() {
    const navigate = useNavigate();
    const { users, loading, error, deleteUser } = useUsers();

    if (loading) {
        return (
            <DashboardLayout>
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="spinner-border" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh' }}>
                <div className="container py-4">

                    {/* HEADER */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h1 className="fw-bold">Usuarios</h1>
                            <p className="text-muted">Gestión de usuarios del sistema</p>
                        </div>

                        <button
                            className="btn"
                            onClick={() => navigate('/dashboard/users/create')}
                            style={{
                                backgroundColor: '#E0C38D',
                                color: '#fff',
                                borderRadius: '12px',
                                fontWeight: 700,
                            }}
                        >
                            Crear usuario
                        </button>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    {/* TABLA */}
                    <div className="card border-0 shadow-sm"  style={{ borderRadius: '20px', overflow: 'hidden' }}>
                        <div className="card-body p-0">
                            {users.length === 0 ? (
                                <div className="p-4 text-muted">
                                    No hay usuarios registrados.
                                </div>
                            ) : (
                                <table className="table mb-0">
                                    <thead style={{ backgroundColor: '#F7F7F7' }}>
                                        <tr>
                                            <th className="px-4 py-3">ID</th>
                                            <th className="px-4 py-3">Email</th>
                                            <th className="px-4 py-3">Rol</th>
                                            <th className="px-4 py-3 text-end">Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-4 py-3">{user.id}</td>

                                                <td className="px-4 py-3 fw-semibold">
                                                    {user.email}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {user.role?.name ?? '-'}
                                                </td>

                                                <td className="px-4 py-3 text-end">
                                                    <button
                                                        className="btn btn-sm me-2"
                                                        onClick={() => navigate(`/dashboard/users/${user.id}`)}
                                                        style={{
                                                            backgroundColor: '#fcfbfb',
                                                            color: '#7a6440',
                                                            border: '1px solid #F2E6D0',
                                                            borderRadius: '10px',
                
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        Ver
                                                    </button>
                                                    <button
                                                        className="btn btn-sm me-2"
                                                        onClick={() => navigate(`/dashboard/users/${user.id}/edit`)}
                                                        style={{
                                                            backgroundColor: '#F2E6D0',
                                                            color: '#7a6440',
                                                            borderRadius: '10px',
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => deleteUser(user.id)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}