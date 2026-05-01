import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useCreateUser } from '@/hooks/WebMaster/User/useCreateUser';

export default function CreateUser() {
    const navigate = useNavigate();

    const {
        form,
        roles,
        spas,
        errors,
        loading,
        loadingOptions,
        isClient,
        isEmployee,
        isAdmin,
        handleChange,
        createUser,
        fieldError,
    } = useCreateUser();

    if (loadingOptions) {
        return (
            <DashboardLayout>
                <div className="p-4">Cargando datos...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="container-fluid">
                <div className="mb-4">
                    <h1 className="fw-bold">Crear usuario</h1>
                    <p className="text-muted">
                        Crea un usuario y, si corresponde, su perfil asociado
                    </p>
                </div>

                {errors.general && (
                    <div className="alert alert-danger">{errors.general}</div>
                )}

                <div
                    className="card border-0 shadow-sm"
                    style={{ borderRadius: '20px', overflow: 'hidden' }}
                >
                    <div className="card-body p-4">
                        <form onSubmit={createUser}>
                            <h5 className="fw-bold mb-3">Datos de acceso</h5>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                                {fieldError(errors.email) && (
                                    <small className="text-danger">{fieldError(errors.email)}</small>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Contraseña</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                {fieldError(errors.password) && (
                                    <small className="text-danger">{fieldError(errors.password)}</small>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold">Rol</label>
                                <select
                                    name="role_id"
                                    className="form-select"
                                    value={form.role_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecciona un rol</option>

                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>

                                {fieldError(errors.role_id) && (
                                    <small className="text-danger">{fieldError(errors.role_id)}</small>
                                )}
                            </div>

                            {isClient && (
                                <>
                                    <hr />
                                    <h5 className="fw-bold mb-3">Datos del cliente</h5>

                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label className="form-label fw-semibold">Nombre</label>
                                            <input
                                                type="text"
                                                name="client.name"
                                                className="form-control"
                                                value={form.client.name}
                                                onChange={handleChange}
                                            />
                                            {fieldError(errors['client.name']) && (
                                                <small className="text-danger">
                                                    {fieldError(errors['client.name'])}
                                                </small>
                                            )}
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <label className="form-label fw-semibold">Apellido</label>
                                            <input
                                                type="text"
                                                name="client.surname"
                                                className="form-control"
                                                value={form.client.surname}
                                                onChange={handleChange}
                                            />
                                            {fieldError(errors['client.surname']) && (
                                                <small className="text-danger">
                                                    {fieldError(errors['client.surname'])}
                                                </small>
                                            )}
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <label className="form-label fw-semibold">Teléfono</label>
                                            <input
                                                type="text"
                                                name="client.phone"
                                                className="form-control"
                                                value={form.client.phone}
                                                onChange={handleChange}
                                            />
                                            {fieldError(errors['client.phone']) && (
                                                <small className="text-danger">
                                                    {fieldError(errors['client.phone'])}
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                            {isEmployee && (
                                <>
                                    <hr />
                                    <h5 className="fw-bold mb-3">Datos del empleado</h5>

                                    <div className="row">
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label fw-semibold">Nombre</label>
                                            <input
                                                type="text"
                                                name="employee.name"
                                                className="form-control"
                                                value={form.employee.name}
                                                onChange={handleChange}
                                            />
                                            {fieldError(errors['employee.name']) && (
                                                <small className="text-danger">
                                                    {fieldError(errors['employee.name'])}
                                                </small>
                                            )}
                                        </div>

                                        <div className="col-md-3 mb-3">
                                            <label className="form-label fw-semibold">Apellido</label>
                                            <input
                                                type="text"
                                                name="employee.surname"
                                                className="form-control"
                                                value={form.employee.surname}
                                                onChange={handleChange}
                                            />
                                            {fieldError(errors['employee.surname']) && (
                                                <small className="text-danger">
                                                    {fieldError(errors['employee.surname'])}
                                                </small>
                                            )}
                                        </div>

                                        <div className="col-md-3 mb-3">
                                            <label className="form-label fw-semibold">Teléfono</label>
                                            <input
                                                type="text"
                                                name="employee.phone"
                                                className="form-control"
                                                value={form.employee.phone}
                                                onChange={handleChange}
                                            />
                                            {fieldError(errors['employee.phone']) && (
                                                <small className="text-danger">
                                                    {fieldError(errors['employee.phone'])}
                                                </small>
                                            )}
                                        </div>

                                        <div className="col-md-3 mb-3">
                                            <label className="form-label fw-semibold">Spa</label>
                                            <select
                                                name="employee.spa_id"
                                                className="form-select"
                                                value={form.employee.spa_id}
                                                onChange={handleChange}
                                            >
                                                <option value="">Selecciona un spa</option>

                                                {spas.map((spa) => (
                                                    <option key={spa.id} value={spa.id}>
                                                        {spa.name}
                                                    </option>
                                                ))}
                                            </select>

                                            {fieldError(errors['employee.spa_id']) && (
                                                <small className="text-danger">
                                                    {fieldError(errors['employee.spa_id'])}
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                            {isAdmin && (
                                <>
                                    <hr />

                                    <div className="row">

                                        <div className="col-md-3 mb-3">
                                            <label className="form-label fw-semibold">Spa</label>
                                            <select
                                                name="employee.spa_id"
                                                className="form-select"
                                                value={form.employee.spa_id}
                                                onChange={handleChange}
                                            >
                                                <option value="">Selecciona un spa</option>

                                                {spas.map((spa) => (
                                                    <option key={spa.id} value={spa.id}>
                                                        {spa.name}
                                                    </option>
                                                ))}
                                            </select>

                                            {fieldError(errors['employee.spa_id']) && (
                                                <small className="text-danger">
                                                    {fieldError(errors['employee.spa_id'])}
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="d-flex gap-2 mt-4">
                                <button
                                    type="submit"
                                    className="btn"
                                    disabled={loading}
                                    style={{
                                        backgroundColor: '#E0C38D',
                                        color: '#fff',
                                        borderRadius: '12px',
                                        fontWeight: 700,
                                        padding: '8px 18px',
                                    }}
                                >
                                    {loading ? 'Creando...' : 'Crear usuario'}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => navigate('/dashboard/users')}
                                    style={{
                                        borderRadius: '12px',
                                        fontWeight: 600,
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}