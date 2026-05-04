import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children, role }: any) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // o spinner
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role?.name !== role) {
    return <Navigate to="/no-autorizado" />;
  }

  return children;
}