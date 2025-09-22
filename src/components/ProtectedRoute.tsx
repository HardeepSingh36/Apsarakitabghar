import { type ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthDialog } from '@/context/AuthDialogContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, openSignIn } = useAuthDialog();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Open login dialog
      openSignIn();
      // Redirect to home page
      navigate('/');
    }
  }, [isAuthenticated, openSignIn, navigate]);

  if (!isAuthenticated) {
    return null; // don’t render the protected page until authenticated
  }

  return <>{children}</>;
};

export default ProtectedRoute;
