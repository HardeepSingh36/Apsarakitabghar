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
    // Only redirect if we're sure the user is not authenticated after loading
    if (!loading && !isAuthenticated) {
      // Store the current location for redirect after login
      const currentPath = location.pathname + location.search + location.hash;
      // Open login dialog and redirect to signin page
      openSignIn(currentPath);
      navigate('/signin', {
        replace: true,
        state: { from: currentPath },
      });
    }
  }, [isAuthenticated, loading, openSignIn, navigate, location]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className='fullpage-loader'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }

  // Don't render anything while redirecting
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
