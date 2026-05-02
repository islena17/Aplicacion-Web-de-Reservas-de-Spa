import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useUpdateUser } from '@/hooks/WebMaster/User/useUpdateUser';

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

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
    updateUser,
    fieldError,
  } = useUpdateUser(id);

  if (loadingOptions) {
    return (
      <DashboardLayout>
        <div className="p-4">Cargando usuario...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container-fluid">
        <div className="container py-4 py-lg-5">
          <div className="mb-4">
            <h1 className="fw-bold">Editar usuario</h1>
            <p className="text-muted">
              Modifica los datos de acceso y su perfil asociado
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
              <form onSubmit={updateUser}>
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
                  <label className="form-label fw-semibold">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Déjala vacía si no quieres cambiarla"
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
                    <small className="text-danger">
                      {fieldError(errors.role_id)}
                    </small>
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
                          name="client.telephone"
                          className="form-control"
                          value={form.client.telephone}
                          onChange={handleChange}
                        />
                        {fieldError(errors['client.telephone']) && (
                          <small className="text-danger">
                            {fieldError(errors['client.telephone'])}
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
                      </div>

                      <div className="col-md-3 mb-3">
                        <label className="form-label fw-semibold">Teléfono</label>
                        <input
                          type="text"
                          name="employee.telephone"
                          className="form-control"
                          value={form.employee.telephone}
                          onChange={handleChange}
                        />
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
                      </div>
                    </div>
                  </>
                )}

                {isAdmin && (
                  <>
                    <hr />
                    <h5 className="fw-bold mb-3">Datos del administrador</h5>

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label fw-semibold">Spa</label>
                        <select
                          name="ownedSpa.id"
                          className="form-select"
                          value={form.ownedSpa.id}
                          onChange={handleChange}
                        >
                          <option value="">Selecciona un spa</option>

                          {spas.map((spa) => (
                            <option key={spa.id} value={spa.id}>
                              {spa.name}
                            </option>
                          ))}
                        </select>
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
                    {loading ? 'Guardando...' : 'Guardar cambios'}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(`/dashboard/users/${id}`)}
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
      </div>
    </DashboardLayout>
  );
}