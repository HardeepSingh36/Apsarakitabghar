import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { login } from '@/features/auth/authSlice';
import { login as loginApi } from '@/services/authService';
import toast from 'react-hot-toast';
import { Loader } from 'react-feather';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from location state or default to home
  const redirectPath = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
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

      // Store token in local storage with extended expiration if remember me is checked
      localStorage.setItem('auth_token', token);
      if (rememberMe) {
        // Extend token expiration to 3 months (90 days)
        const threeMonthsFromNow = new Date();
        threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
        const extendedExpiration = Math.floor(threeMonthsFromNow.getTime() / 1000);
        localStorage.setItem('token_expires_in', extendedExpiration.toString());
        localStorage.setItem('remember_me', 'true');
      } else {
        localStorage.setItem('token_expires_in', expires_in);
        localStorage.removeItem('remember_me');
      }

      toast.success('Successfully signed in!');
      navigate(redirectPath !== '/signin' ? redirectPath : '/');
    } catch (error: any) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='log-in-section section-b-space min-h-screen'>
      <div className='container-fluid-lg w-100'>
        <div className='row'>
          <div className='col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto'>
            <div className='image-contain'>
              <img src='/assets/images/inner-page/log-in.png' className='img-fluid' alt='' />
            </div>
          </div>

          <div className='col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto'>
            <div className='log-in-box'>
              <div className='log-in-title'>
                <h3>Welcome Back</h3>
                <h4>Sign In To Your Account</h4>
              </div>

              <div className='input-box'>
                <form className='row g-4' onSubmit={handleSubmit}>
                  <div className='col-12'>
                    <div className='form-floating theme-form-floating log-in-form'>
                      <input
                        type='email'
                        className='form-control'
                        id='email'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label htmlFor='email'>Email Address</label>
                    </div>
                  </div>

                  <div className='col-12'>
                    <div className='form-floating theme-form-floating log-in-form'>
                      <input
                        type='password'
                        className='form-control'
                        id='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label htmlFor='password'>Password</label>
                    </div>
                  </div>

                  <div className='col-12'>
                    <div className='form-check ps-0 m-0 remember-box !justify-between'>
                      <div className='flex items-center'>
                        <input
                          className='checkbox_animated check-box'
                          type='checkbox'
                          id='rememberMe'
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label className='form-check-label' htmlFor='rememberMe'>
                          Remember me
                        </label>
                      </div>
                      <Link to='/forgot-password' className='forgot-password'>
                        Forgot Password?
                      </Link>
                    </div>
                  </div>

                  <div className='col-12'>
                    <button
                      className={`btn btn-animation w-100 justify-content-center ${
                        loading ? 'opacity-50' : ''
                      }`}
                      type='submit'
                      disabled={loading}
                    >
                      {loading ? <Loader className='animate-spin me-2' size={16} /> : null}
                      {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                  </div>
                </form>
              </div>

              <div className='other-log-in'>
                <h6></h6>
              </div>

              <div className='sign-up-box'>
                <h4>
                  Don't have an account?{' '}
                  <Link to='/signup' className='theme-color fw-bold'>
                    Sign Up
                  </Link>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
