import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { login, logout } from '@/features/auth/authSlice';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { RootState } from '@/app/store';

type AuthView = 'choice' | 'signin' | 'signup' | 'forgot';

export type UserRole = 'customer' | 'publisher' | 'reseller';

export type User = {
  username: string;
  email: string;
  full_name: string;
  phone_number: string;
  role: UserRole;
};

type AuthDialogContextValue = {
  openChoice: (role: UserRole) => void;
  openSignIn: () => void;
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
  const [fullName, setFullName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [role, setRole] = React.useState<UserRole>('customer');

  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((s: RootState) => s.auth);

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setPhoneNumber('');
    setRole('customer');
  };

  const handleClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setAuthView('choice');
      setSelectedRole(null);
      resetForm();
    }
  };

  const openChoice = (role: UserRole) => {
    setSelectedRole(role);
    setAuthView('choice');
    setDialogOpen(true);
  };
  const openSignIn = () => {
    setSelectedRole(null);
    setAuthView('signin');
    setDialogOpen(true);
  };
  const openSignUp = () => {
    setSelectedRole(null);
    setAuthView('signup');
    setDialogOpen(true);
  };
  const openForgot = () => {
    setSelectedRole(null);
    setAuthView('forgot');
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authView === 'signin') {
      const valid = email === 'demo@demo.com' && password === 'Password@123';
      if (valid) {
        dispatch(
          login({
            username: 'demo_user',
            email,
            full_name: 'Demo User',
            phone_number: '+1234567890',
            role: 'customer',
          })
        );
        setDialogOpen(false);
      } else {
        alert('Invalid credentials. Use demo@demo.com / Password@123');
      }
    } else if (authView === 'signup') {
      // Validate password confirmation
      if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
      }

      dispatch(
        login({
          username,
          email,
          full_name: fullName || 'New User',
          phone_number: phoneNumber,
          role,
        })
      );
      setDialogOpen(false);
    } else if (authView === 'forgot') {
      alert('Reset link sent (dummy).');
      setAuthView('signin');
    }
  };

  const ctxValue: AuthDialogContextValue = {
    openChoice,
    openSignIn,
    openSignUp,
    openForgot,
    isAuthenticated,
    logout: () => dispatch(logout()),
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
              {authView === 'choice' ? (
                <>Join{selectedRole ? ` as ${selectedRole}` : ''}</>
              ) : authView === 'signin' ? (
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

          {authView === 'choice' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                className='btn btn-sm cart-button theme-bg-color text-white'
                style={{ width: '100%' }}
                onClick={() => setAuthView('signin')}
              >
                Sign In
              </button>
              <button
                className='btn btn-sm cart-button'
                style={{ width: '100%' }}
                onClick={() => setAuthView('signup')}
              >
                Sign Up
              </button>
            </div>
          ) : authView === 'forgot' ? (
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
                className='btn btn-sm cart-button theme-bg-color text-white'
                style={{ width: '100%', marginTop: 12 }}
                onClick={handleSubmit}
              >
                Send Reset Link
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
                        <label className='form-label'>Full Name</label>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Enter your name'
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
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
                      {/* <div className='form-group'>
                        <label className='form-label'>Role</label>
                        <select
                          className='form-control'
                          value={role}
                          onChange={(e) => setRole(e.target.value as UserRole)}
                          required
                        >
                          <option value='customer'>Customer</option>
                          <option value='publisher'>Publisher</option>
                          <option value='reseller'>Reseller</option>
                        </select>
                      </div> */}
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
                </div>
              </div>
              <button
                type='button'
                className='btn btn-sm cart-button theme-bg-color text-white'
                style={{ width: '100%', marginTop: 12 }}
                onClick={handleSubmit}
              >
                {authView === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
              <div
                className='d-flex justify-content-between align-items-center'
                style={{ marginTop: 8 }}
              >
                <button className='btn btn-link p-0' onClick={() => setAuthView('choice')}>
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
