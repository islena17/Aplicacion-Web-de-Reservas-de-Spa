import Navbar from '@/components/layouts/Navbar';
import { useLogin } from '@/hooks/Auth/useLogin';
import '../../../css/Login.css';
import Footer from '@/components/layouts/Footer';

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    remember,
    setRemember,
    loading,
    errors,
    handleSubmit,
    fieldError,
  } = useLogin();

  return (
    <>
      <Navbar />

      <div className="login-page">
        <div className="login-card">
          <div className="text-center mb-4">
            <h3 className="login-title">Iniciar sesión</h3>
            <p className="login-subtitle">Accede a tu cuenta</p>
          </div>

          {errors.general && (
            <div className="alert alert-danger" role="alert">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${
                  errors.email ? 'is-invalid' : ''
                }`}
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>

              <div className="invalid-feedback">
                {fieldError(errors.email)}
              </div>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className={`form-control ${
                  errors.password ? 'is-invalid' : ''
                }`}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Contraseña</label>

              <div className="invalid-feedback">
                {fieldError(errors.password)}
              </div>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <div className="form-check">
                <input
                  className="form-check-input login-checkbox"
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />

                <label className="form-check-label" htmlFor="remember">
                  Recordarme
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn login-button w-100 py-2"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}