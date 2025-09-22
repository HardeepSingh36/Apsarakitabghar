import { type ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthDialog } from '@/context/AuthDialogContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, openSignIn, loading } = useAuthDialog();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Open login dialog
      openSignIn();
      // Redirect to home
      navigate('/', { replace: true, state: { from: location } });
    }
  }, [isAuthenticated, loading, openSignIn, navigate, location]);

  if (loading) {
    return <div>Loading...</div>; // or spinner placeholder
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
