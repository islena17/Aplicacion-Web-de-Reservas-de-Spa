import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';

export function useLogout() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');

      localStorage.removeItem('user');

      setUser(null);

      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return { logout };
}