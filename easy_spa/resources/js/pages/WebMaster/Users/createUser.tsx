import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useCreateUser } from '@/hooks/WebMaster/User/usecreateUser';

export default function CreateUser() {
  const navigate = useNavigate();

  const { createUser, loading, errors } = useCreateUser();

  const [form, setForm] = useState({
    email: '',
    password: '',
    role_id: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createUser({
        email: form.email,
        password: form.password,
        role_id: Number(form.role_id),
      });

      navigate('/dashboard/users');
    } catch {
      // errores ya gestionados en el hook
    }
  };

  return (
    <DashboardLayout>
      <div className="container-fluid">
        <div className="mb-4">
          <h1 className="fw-bold">Crear usuario</h1>
          <p className="text-muted">Añade un nuevo usuario al sistema</p>
        </div>

        <div
          className="card border-0 shadow-sm"
          style={{ borderRadius: '20px' }}
        >
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email[0]}</small>
                )}
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <small className="text-danger">{errors.password[0]}</small>
                )}
              </div>

              {/* ROLE */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Rol</label>
                <select
                  name="role_id"
                  className="form-select"
                  value={form.role_id}
                  onChange={handleChange}
                >
                  <option value="">Selecciona un rol</option>
                  <option value="1">Webmaster</option>
                  <option value="2">Admin</option>
                  <option value="3">Employee</option>
                  <option value="4">Client</option>
                </select>
                {errors.role_id && (
                  <small className="text-danger">{errors.role_id[0]}</small>
                )}
              </div>

              {/* BOTONES */}
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn"
                  disabled={loading}
                  style={{
                    backgroundColor: '#E0C38D',
                    color: '#fff',
                    borderRadius: '12px',
                    fontWeight: 700,
                  }}
                >
                  {loading ? 'Creando...' : 'Crear usuario'}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/dashboard/users')}
                  style={{ borderRadius: '12px' }}
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