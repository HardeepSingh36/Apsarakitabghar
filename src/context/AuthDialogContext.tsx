import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type AuthView = 'choice' | 'signin' | 'signup' | 'forgot';

type AuthDialogContextValue = {
  openChoice: (role: string) => void;
  openSignIn: () => void;
  openSignUp: () => void;
  openForgot: () => void;
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  logout: () => void;
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
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [user, setUser] = React.useState<{ name: string; email: string } | null>(null);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('auth_user');
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPassword('');
  };

  const handleClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setAuthView('choice');
      setSelectedRole(null);
      resetForm();
    }
  };

  const openChoice = (role: string) => {
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
        const u = { name: 'Demo User', email };
        setUser(u);
        localStorage.setItem('auth_user', JSON.stringify(u));
        setDialogOpen(false);
      } else {
        alert('Invalid credentials. Use demo@demo.com / Password@123');
      }
    } else if (authView === 'signup') {
      const u = { name: fullName || 'New User', email };
      setUser(u);
      localStorage.setItem('auth_user', JSON.stringify(u));
      setDialogOpen(false);
    } else if (authView === 'forgot') {
      alert('Reset link sent (dummy).');
      setAuthView('signin');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const ctxValue: AuthDialogContextValue = {
    openChoice,
    openSignIn,
    openSignUp,
    openForgot,
    isAuthenticated: Boolean(user),
    user,
    logout,
  };

  return (
    <AuthDialogContext.Provider value={ctxValue}>
      {children}
      <Dialog open={dialogOpen} onOpenChange={handleClose}>
        <DialogContent
          className='auth-dialog-content'
          style={{
            maxWidth: 400,
            margin: 'auto',
            borderRadius: 12,
            background: '#fff',
            boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
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
                <>Welcome! Continue as <b>{selectedRole}</b>.</>
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
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
                <button
                  type='submit'
                  className='btn btn-sm cart-button theme-bg-color text-white'
                  style={{ width: '100%' }}
                >
                  Send Reset Link
                </button>
              </form>
              <div className='d-flex justify-content-between align-items-center' style={{ marginTop: 8 }}>
                <button className='btn btn-link p-0' onClick={() => setAuthView('signin')}>
                  ← Back to Sign In
                </button>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {authView === 'signup' && (
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
                <button
                  type='submit'
                  className='btn btn-sm cart-button theme-bg-color text-white'
                  style={{ width: '100%' }}
                >
                  {authView === 'signin' ? 'Sign In' : 'Create Account'}
                </button>
              </form>
              <div className='d-flex justify-content-between align-items-center' style={{ marginTop: 8 }}>
                <button className='btn btn-link p-0' onClick={() => setAuthView('choice')}>
                  ← Back
                </button>
                {authView === 'signin' ? (
                  <span className='small'>
                    New here?{' '}
                    <a href='javascript:void(0)' onClick={() => setAuthView('signup')}>
                      Create an account
                    </a>
                    {' '}

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


