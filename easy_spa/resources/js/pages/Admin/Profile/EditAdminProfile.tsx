import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useUpdateProfile } from '@/hooks/Admin/Profile/useUpdateProfile';

export default function EditAdminProfile() {
    const navigate = useNavigate();

    const {
        form,
        errors,
        loading,
        loadingOptions,
        handleChange,
        updateUser,
        fieldError,
    } = useUpdateProfile();

    if (loadingOptions) {
        return (

            <div className="p-4">Cargando formulario...</div>

        );
    }

    return (

        <div className="col-12">
            <div
                className="card border-0 shadow-sm"
                style={{ borderRadius: '20px', overflow: 'hidden' }}
            >
                <div className="card-body p-4 p-lg-5 bg-white">
                    <div className="d-flex align-items-center mb-4">
                        <div
                            className="d-flex align-items-center justify-content-center me-3"
                            style={{
                                width: '54px',
                                height: '54px',
                                borderRadius: '16px',
                                backgroundColor: 'var(--color-main)',
                                color: 'var(--color-text)',
                                fontSize: '24px',
                            }}
                        >
                            <i className="bi bi-pencil-square"></i>
                        </div>

                        <div>
                            <h5 className="fw-bold mb-0">
                                Datos de acceso
                            </h5>
                            <small className="text-muted">
                                Actualiza tus credenciales
                            </small>
                        </div>
                    </div>

                    <form onSubmit={updateUser} className='row'>
                        <div className="mb-4 col-lg-6 col-12">
                            <label className="form-label fw-semibold">
                                Email actual
                            </label>

                            <div
                                className="p-3 mb-3"
                                style={{
                                    backgroundColor: '#F7F7F7',
                                    borderRadius: '12px',
                                    border: '1px solid #eee',
                                }}
                            >
                                <span className="text-muted">
                                    {form.email || 'Sin email'}
                                </span>
                            </div>

                            <label className="form-label fw-semibold">
                                Nuevo email
                            </label>

                            <input
                                type="email"
                                name="email"
                                className={`form-control ${fieldError(errors.email)
                                    ? 'is-invalid'
                                    : ''
                                    }`}
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Introduce el nuevo email"
                            />

                            {fieldError(errors.email) && (
                                <div className="invalid-feedback">
                                    {fieldError(errors.email)}
                                </div>
                            )}
                        </div>

                        <div className="mb-4 col-lg-6 col-12">
                            <label className="form-label fw-semibold">
                                Nueva contraseña
                            </label>

                            <input
                                type="password"
                                name="password"
                                className={`form-control ${fieldError(errors.password)
                                    ? 'is-invalid'
                                    : ''
                                    }`}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Introduce una nueva contraseña"
                            />

                            {fieldError(errors.password) && (
                                <div className="invalid-feedback">
                                    {fieldError(errors.password)}
                                </div>
                            )}


                        </div>
                        <div className="d-flex col-lg-12 gap-2">
                            <button
                                type="button"
                                className="btn btn-sm w-50"
                                onClick={() =>
                                    navigate('/admin/spa')
                                }
                                style={{
                                    backgroundColor: '#F7F7F7',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    padding: '10px 16px',
                                    border: '1px solid #eee'
                                }}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="btn w-50"
                                disabled={loading}
                                style={{
                                    backgroundColor: 'var(--color-main)',
                                    color: '#fff',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    padding: '10px 16px',
                                }}
                            >
                                {loading
                                    ? 'Guardando...'
                                    : 'Guardar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}