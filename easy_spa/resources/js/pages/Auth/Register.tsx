import Navbar from '@/components/layouts/Navbar';
import SecondaryHero from '@/components/layouts/SecondaryHero';
import registerHero from '@images/registerHero.jpg'
import { useRegister } from '@/hooks/Auth/useRegister';

export default function Register() {
  const {
    form,
    errors,
    loading,
    handleChange,
    register,
    fieldError,
  } = useRegister();

  return (
    <>
      <Navbar />
       <SecondaryHero
                title="Únete a nuestra comunidad"
                subtitle="Descubre experiencias únicas de bienestar."
                image={registerHero}
            />

      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#F7F7F7',
        }}
      >
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-7">

              <div
                className="card border-0 shadow-sm"
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background:
                      'linear-gradient(135deg, #94beac 0%, #E0C38D 100%)',
                }}
              >
                <div
                  className="p-4 text-center"
                  style={{
                    color: '#fff',
                  }}
                >
                  <h1 className="fw-bold mb-2">
                    Crear cuenta
                  </h1>

                  <p className="mb-0">
                    Regístrate para reservar servicios spa.
                  </p>
                </div>

                <div className="card-body p-4 p-lg-5" style={{background: 'rgba(255, 255, 255, 0.9)'}}>
                  {errors.general && (
                    <div className="alert alert-danger">
                      {errors.general}
                    </div>
                  )}

                  <form onSubmit={register}>
                    <div className="row g-4">

                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold">
                          Nombre *
                        </label>

                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.name
                              ? 'is-invalid'
                              : ''
                          }`}
                        />

                        {errors.name && (
                          <div className="invalid-feedback">
                            {fieldError(errors.name)}
                          </div>
                        )}
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold">
                          Apellidos *
                        </label>

                        <input
                          type="text"
                          name="surname"
                          value={form.surname}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.surname
                              ? 'is-invalid'
                              : ''
                          }`}
                        />

                        {errors.surname && (
                          <div className="invalid-feedback">
                            {fieldError(errors.surname)}
                          </div>
                        )}
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          Teléfono
                        </label>

                        <input
                          type="text"
                          name="telephone"
                          value={form.telephone}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.telephone
                              ? 'is-invalid'
                              : ''
                          }`}
                        />

                        {errors.telephone && (
                          <div className="invalid-feedback">
                            {fieldError(errors.telephone)}
                          </div>
                        )}
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          Email *
                        </label>

                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.email
                              ? 'is-invalid'
                              : ''
                          }`}
                        />

                        {errors.email && (
                          <div className="invalid-feedback">
                            {fieldError(errors.email)}
                          </div>
                        )}
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold">
                          Contraseña *
                        </label>

                        <input
                          type="password"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.password
                              ? 'is-invalid'
                              : ''
                          }`}
                        />

                        {errors.password && (
                          <div className="invalid-feedback">
                            {fieldError(errors.password)}
                          </div>
                        )}
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold">
                          Confirmar contraseña *
                        </label>

                        <input
                          type="password"
                          name="password_confirmation"
                          value={
                            form.password_confirmation
                          }
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn w-100 mt-5"
                      style={{
                        backgroundColor: '#E0C38D',
                        color: '#fff',
                        borderRadius: '14px',
                        padding: '14px',
                        fontWeight: 700,
                        border: 'none',
                      }}
                    >
                      {loading
                        ? 'Registrando...'
                        : 'Crear cuenta'}
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}