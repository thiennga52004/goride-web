import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { ROUTES } from '../constants/routes';

const ProtectedRoute = ({ requiredRole }) => {
  const { accessToken, user } = useAuthStore();

  // Not authenticated → redirect to login
  if (!accessToken) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Role check
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
