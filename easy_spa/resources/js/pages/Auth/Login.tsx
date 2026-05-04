import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';

type LoginErrors = {
  email?: string | string[];
  password?: string | string[];
  general?: string;
};
export default function Login() {
    const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('SE ESTA EJECUTANDO EL SUBMIT');

    setLoading(true);
    setErrors({});
    try {
      await api.get('/sanctum/csrf-cookie');

      await api.post('/login', {
        email,
        password,
        remember,
      });

      const userResponse = await api.get('/api/user');
      const user = userResponse.data;

      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      if (user.role?.name === 'WebMaster') {
        navigate('/dashboard');
      } else if (user.role?.name === 'Admin') {
        navigate('/admin');
      }
    } catch (error: any) {
      console.log('ERROR LOGIN:', error);
      console.log('STATUS:', error.response?.status);
      console.log('DATA:', error.response?.data);

      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else if (error.response?.status === 419) {
        setErrors({
          general: 'La sesión CSRF ha fallado. Recarga la página e inténtalo de nuevo.',
        });
      } else if (error.response?.status === 401) {
        setErrors({
          general: 'Credenciales incorrectas.',
        });
      } else {
        setErrors({
          general: 'Ha ocurrido un error al iniciar sesión.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '400px', borderRadius: '15px' }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold">Iniciar sesión</h3>
          <p className="text-muted">Accede a tu cuenta</p>
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
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Contraseña</label>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="remember">
                Recordarme
              </label>
            </div>

            <a href="#" className="text-decoration-none">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}