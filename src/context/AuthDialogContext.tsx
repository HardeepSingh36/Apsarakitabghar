import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { login, logout, finishLoading } from '@/features/auth/authSlice';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProfile } from '@/services/authService';
import { getCaptchaConfig } from '@/services/captchaService';

import type { RootState } from '@/app/store';
import { useEffect, useState, createContext, type FC } from 'react';
import type { CaptchaConfig } from '@/types/types';

export type UserRole = 'customer' | 'publisher' | 'reseller';

type AuthDialogContextValue = {
  openChoice: (role: UserRole) => void;
  openSignIn: (path?: string) => void;
  openSignUp: (path?: string) => void;
  openForgot: () => void;
  isAuthenticated: boolean;
  logout: () => void;
  loading: boolean;
  captchaConfig: CaptchaConfig | null;
};

const AuthDialogContext = createContext<AuthDialogContextValue | undefined>(undefined);

export const useAuthDialog = (): AuthDialogContextValue => {
  const ctx = React.useContext(AuthDialogContext);
  if (!ctx) throw new Error('useAuthDialog must be used within AuthDialogProvider');
  return ctx;
};

export const AuthDialogProvider: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [captchaConfig, setCaptchaConfig] = useState<CaptchaConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [_initialized, setInitialized] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((s: RootState) => s.auth);

  const openChoice = (_role: UserRole) => {
    // For now, redirect to sign-in page
    navigate('/signin', { state: { from: location.pathname } });
  };
  const openSignIn = (path?: string) => {
    navigate('/signin', {
      state: {
        from: { pathname: path || window.location.pathname },
      },
    });
  };
  const openSignUp = (path?: string) => {
    navigate('/signup', {
      state: {
        from: { pathname: path || window.location.pathname },
      },
    });
  };
  const openForgot = () => {
    navigate('/forgot-password');
  };

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      const token = localStorage.getItem('auth_token');

      if (!token) {
        dispatch(finishLoading());
        setLoading(false);
        setInitialized(true);
        return;
      }

      try {
        const response = await getProfile(token);
        if (response.status === 'success') {
          const user = response.data;

          dispatch(
            login({
              id: user.id,
              username: user.username,
              email: user.email,
              full_name: user.full_name,
              first_name: user.first_name,
              last_name: user.last_name,
              phone_number: user.mobile || '',
              mobile: user.mobile,
              dob: user.dob,
              gender: user.gender,
              avatar: user.avatar,
              role: user.role as UserRole,
              status: user.status,
              created_at: user.created_at,
              updated_at: user.updated_at,
              last_login: user.last_login,
            })
          );
        } else {
          console.warn('Failed to fetch profile:', response.message);
          // Clear invalid token
          localStorage.removeItem('auth_token');
          dispatch(logout());
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        // Clear invalid token
        localStorage.removeItem('auth_token');
        dispatch(logout());
      } finally {
        dispatch(finishLoading());
        setLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();
  }, [dispatch]);

  // Fetch CAPTCHA configuration on component mount
  useEffect(() => {
    const fetchCaptchaConfig = async () => {
      try {
        const config = await getCaptchaConfig();
        setCaptchaConfig(config);
      } catch (error) {
        console.error('Failed to fetch CAPTCHA configuration:', error);
      }
    };

    fetchCaptchaConfig();
  }, []);

  // Update the logout function to handle proper logout
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('token_expires_in');
    localStorage.removeItem('remember_me');

    // Dispatch logout action
    dispatch(logout());

    // Show a success message
    toast.success('You have been logged out successfully.');

    // Optionally redirect to the home page or login page
    navigate('/signin');
  };

  const ctxValue: AuthDialogContextValue = {
    openChoice,
    openSignIn,
    openSignUp,
    openForgot,
    isAuthenticated,
    logout: handleLogout,
    loading, // Use actual loading state
    captchaConfig,
  };

  return <AuthDialogContext.Provider value={ctxValue}>{children}</AuthDialogContext.Provider>;
};
