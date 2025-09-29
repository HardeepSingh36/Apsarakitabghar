import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { login, logout } from '@/features/auth/authSlice';
import toast from 'react-hot-toast';
import { Loader } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { SimpleCaptcha } from '@/components/SimpleCaptcha';
import { login as loginApi, getProfile, register } from '@/services/authService';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { RootState } from '@/app/store';
import { useRef, useEffect } from 'react';

type AuthView = 'choice' | 'signin' | 'signup' | 'forgot';

export type UserRole = 'customer' | 'publisher' | 'reseller';

type AuthDialogContextValue = {
  openChoice: (role: UserRole) => void;
  openSignIn: (path?: string) => void;
  openSignUp: () => void;
  openForgot: () => void;
  isAuthenticated: boolean;
  logout: () => void;
  loading: boolean;
};

const AuthDialogContext = React.createContext<AuthDialogContextValue | undefined>(undefined);

export const useAuthDialog = (): AuthDialogContextValue => {
  const ctx = React.useContext(AuthDialogContext);
  if (!ctx) throw new Error('useAuthDialog must be used within AuthDialogProvider');
  return ctx;
};

export const AuthDialogProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [authView, setAuthView] = React.useState<AuthView>('choice');
  const [selectedRole, setSelectedRole] = React.useState<UserRole | null>(null);
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [redirectPath, setRedirectPath] = React.useState<string | null>(null); // Track origin page
  const [captchaValid, setCaptchaValid] = React.useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((s: RootState) => s.auth);
  const captchaRef = useRef<{ generateCaptcha: () => void } | null>(null);

  const handleClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setAuthView('choice');
      setSelectedRole(null);
      setRedirectPath(null); // Reset redirect path
    }
  };

  const openChoice = (role: UserRole) => {
    setSelectedRole(role);
    setAuthView('choice');
    setDialogOpen(true);
  };
  const openSignIn = (path?: string) => {
    resetForm();
    setSelectedRole(null);
    setAuthView('signin');
    setEmail(''); // Reset email
    setPassword(''); // Reset password
    setDialogOpen(true);
    if (path) setRedirectPath(path); // Set origin page
  };
  const openSignUp = (path?: string) => {
    resetForm();
    setSelectedRole(null);
    setAuthView('signup');
    setEmail(''); // Reset email
    setPassword(''); // Reset password
    setDialogOpen(true);
    if (path) setRedirectPath(path); // Set origin page
  };
  const openForgot = () => {
    setSelectedRole(null);
    setAuthView('forgot');
    setDialogOpen(true);
  };

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
  };

  // Ensure `navigate` is used explicitly in `handleSubmit` to avoid lint errors
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Ensure no field is empty
    if (authView === 'signin') {
      if (!email || !password) {
        toast.error('Please fill in all fields.');
        return;
      }
    } else if (authView === 'signup') {
      if (
        !username ||
        !email ||
        !password ||
        !confirmPassword ||
        !firstName ||
        !lastName ||
        !phoneNumber
      ) {
        toast.error('Please fill in all fields.');
        return;
      }
      if (password !== confirmPassword) {
        toast.error('Passwords do not match. Please try again.');
        return;
      }
      if (!captchaValid) {
        toast.error('Captcha validation failed. Please try again.');
        captchaRef.current?.generateCaptcha(); // Refresh captcha
        return;
      }
    } else if (authView === 'forgot') {
      if (!email) {
        toast.error('Please enter your email.');
        return;
      }
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        if (authView === 'signin') {
          const response = await loginApi(email, password);

          if (response.status === 'error') {
            toast.error(response.message || 'An error occurred. Please try again.');
            return;
          }

          const { user, token, expires_in } = response.data;

          // Dispatch login with updated user details
          dispatch(
            login({
              username: user.username,
              email: user.email,
              full_name: `${user.username}`,
              first_name: user.username.split('_')[0],
              last_name: user.username.split('_')[1] || '',
              phone_number: user.phone_number || '',
              role: user.role,
              status: user.status,
              created_at: user.created_at,
            })
          );

          // Store token in local storage
          localStorage.setItem('auth_token', token);
          localStorage.setItem('token_expires_in', expires_in);

          toast.success('Successfully signed in!');
          setDialogOpen(false);
          if (redirectPath && redirectPath !== '/') navigate(redirectPath);
        } else if (authView === 'signup') {
          try {
            const response = await register({
              username,
              email,
              password,
              first_name: firstName,
              last_name: lastName,
              mobile: phoneNumber,
            });

            if (response.status !== 'success') {
              toast.error(response?.message || 'An error occurred. Please try again.');
              return;
            }

            const { user, token, expires_in } = response.data;

            // Dispatch login with updated user details
            dispatch(
              login({
                username: user.username,
                email: user.email,
                full_name: user.full_name,
                first_name: user.first_name,
                last_name: user.last_name,
                phone_number: user.mobile,
                role: user.role,
                status: user.status,
                created_at: user.created_at,
              })
            );

            // Store token in local storage
            localStorage.setItem('auth_token', token);
            localStorage.setItem('token_expires_in', expires_in);

            toast.success('Account created successfully!');
            setDialogOpen(false);
            if (redirectPath) navigate(redirectPath); // Explicitly use navigate
          } catch (error: any) {
            // Update the error handling in the signup flow
            const errorMessage =
              error?.message || 'An unexpected error occurred. Please try again.';
            toast.error(errorMessage);
          } finally {
            setLoading(false);
          }
        } else if (authView === 'forgot') {
          toast.success('Reset link sent (dummy).');
          setAuthView('signin');
        }
      } catch (error: any) {
        toast.error('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1500); // Simulate a delay of 1.5 seconds
  };

  // Add useEffect to fetch profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) return;

      try {
        const response = await getProfile(token);
        if (response.status === 'success') {
          const user = response.data;

          dispatch(
            login({
              username: user.username,
              email: user.email,
              full_name: user.full_name,
              first_name: user.first_name,
              last_name: user.last_name,
              phone_number: user.phone || '',
              role: user.role,
              status: user.is_verified ? 'verified' : 'unverified',
              created_at: user.created_at,
            })
          );
        } else {
          toast.error(response.message || 'Failed to fetch profile');
        }
      } catch (error: any) {
        toast.error(error.message || 'An error occurred while fetching profile');
      }
    };

    fetchProfile();
  }, [dispatch]);

  // Update the logout function to handle proper logout
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('token_expires_in');

    // Dispatch logout action
    dispatch(logout());

    // Show a success message
    toast.success('You have been logged out successfully.');

    // Optionally redirect to the home page or login page
    navigate('/');
  };

  const ctxValue: AuthDialogContextValue = {
    openChoice,
    openSignIn,
    openSignUp,
    openForgot,
    isAuthenticated,
    logout: handleLogout, // Use the new logout function
    loading,
  };

  return (
    <AuthDialogContext.Provider value={ctxValue}>
      {children}
      <style>
        {`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <Dialog open={dialogOpen} onOpenChange={handleClose}>
        <DialogContent
          className='auth-dialog-content'
          style={{
            maxWidth: 400,
            margin: 'auto',
            borderRadius: 12,
            background: '#fff',
            boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ fontWeight: 600, fontSize: 22, marginBottom: 8 }}>
              {authView === 'choice' ? null : authView === 'signin' ? ( // <>Join{selectedRole ? ` as ${selectedRole}` : ''}</>
                <>Sign In</>
              ) : authView === 'signup' ? (
                <>Create Account</>
              ) : (
                <>Forgot Password</>
              )}
            </DialogTitle>
            <DialogDescription style={{ marginBottom: 16 }}>
              {authView === 'choice' ? (
                <>
                  Welcome! Continue as <b>{selectedRole}</b>.
                </>
              ) : authView === 'signin' ? (
                <>Welcome back! Enter your details to sign in.</>
              ) : authView === 'signup' ? (
                <>Join us! It only takes a minute.</>
              ) : (
                <>Enter your email to receive a reset link.</>
              )}
            </DialogDescription>
          </DialogHeader>

          {authView === 'choice' ? null : authView === 'forgot' ? (
            <>
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
                className='scrollbar-hide'
              >
                <div className='form-group'>
                  <label className='form-label'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='you@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type='button'
                className={`btn btn-sm cart-button theme-bg-color text-white ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={{
                  width: '100%',
                  marginTop: 12,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onClick={handleSubmit}
                disabled={loading}
              >
                Send Reset Link
                {loading && <Loader className='animate-spin' size={16} />}
              </button>
              <div
                className='d-flex justify-content-between align-items-center'
                style={{ marginTop: 8 }}
              >
                <button className='btn btn-link p-0' onClick={() => setAuthView('signin')}>
                  ← Back to Sign In
                </button>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
                className='scrollbar-hide'
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {authView === 'signup' && (
                    <>
                      <div className='form-group'>
                        <label className='form-label'>Username</label>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Enter your username'
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label className='form-label'>First Name</label>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Enter your first name'
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label className='form-label'>Last Name</label>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Enter your last name'
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label className='form-label'>Phone Number</label>
                        <input
                          type='tel'
                          className='form-control'
                          placeholder='Enter your phone number'
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                        />
                      </div>
                    </>
                  )}
                  <div className='form-group'>
                    <label className='form-label'>Email</label>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='you@example.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label className='form-label'>Password</label>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='Your password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {authView === 'signup' && (
                    <div className='form-group'>
                      <label className='form-label'>Confirm Password</label>
                      <input
                        type='password'
                        className='form-control'
                        placeholder='Confirm your password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  {authView === 'signup' && (
                    <div className='form-group'>
                      <label className='form-label'>Captcha</label>
                      <SimpleCaptcha
                        ref={captchaRef}
                        onChange={(isValid) => setCaptchaValid(isValid)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <button
                type='button'
                className={`btn btn-sm cart-button theme-bg-color text-white ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={{
                  width: '100%',
                  marginTop: 12,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {authView === 'signin' ? 'Sign In' : 'Create Account'}
                {loading && <Loader className='animate-spin' size={16} />}
              </button>
              <div
                className='d-flex justify-content-between align-items-center'
                style={{ marginTop: 8 }}
              >
                <button className='btn btn-link p-0' onClick={() => setDialogOpen(false)}>
                  ← Back
                </button>
                {authView === 'signin' ? (
                  <span className='small'>
                    New here?{' '}
                    <a href='javascript:void(0)' onClick={() => setAuthView('signup')}>
                      Create an account
                    </a>{' '}
                  </span>
                ) : (
                  <span className='small'>
                    Have an account?{' '}
                    <a href='javascript:void(0)' onClick={() => setAuthView('signin')}>
                      Sign in
                    </a>
                  </span>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AuthDialogContext.Provider>
  );
};
