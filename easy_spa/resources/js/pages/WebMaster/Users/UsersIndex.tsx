import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/forms/layouts/WMLayout';
import { useUsers } from '@/hooks/WebMaster/User/useUsers';

export default function UsersIndex() {

    const {
        users,
        filteredUsers,
        roles,
        spas,
        selectedRole,
        setSelectedRole,
        selectedSpa,
        setSelectedSpa,
        loading,
        error,
        deleteUser,
    } = useUsers();

    const navigate = useNavigate();

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

                    <div
                        className="card border-0 shadow-sm mb-4"
                        style={{ borderRadius: '20px', overflow: 'hidden' }}
                    >
                        <div className="card-body p-4 bg-white">
                            <div className="row g-3 align-items-end">
                                <div className="col-12 col-md-4">
                                    <label className="form-label fw-semibold">Filtrar por rol</label>
                                    <select
                                        className="form-select"
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value)}
                                    >
                                        <option value="">Todos los roles</option>

                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-12 col-md-4">
                                    <label className="form-label fw-semibold">Filtrar por spa</label>
                                    <select
                                        className="form-select"
                                        value={selectedSpa}
                                        onChange={(e) => setSelectedSpa(e.target.value)}
                                    >
                                        <option value="">Todos los spas</option>

                                        {spas.map((spa) => (
                                            <option key={spa.id} value={spa.id}>
                                                {spa.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-12 col-md-4">
                                    <button
                                        type="button"
                                        className="btn w-100"
                                        onClick={() => {
                                            setSelectedRole('');
                                            setSelectedSpa('');
                                        }}
                                        style={{
                                            backgroundColor: '#F2E6D0',
                                            color: '#7a6440',
                                            borderRadius: '12px',
                                            fontWeight: 700,
                                        }}
                                    >
                                        Limpiar filtros
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TABLA */}
                    <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                        <div className="card-body p-0">
                            {filteredUsers.length === 0 ? (
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
                                        {filteredUsers.map((user) => (
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