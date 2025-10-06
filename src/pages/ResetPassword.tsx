import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader } from 'react-feather';
import { resetPasswordApi } from '@/services/resetPasswordService';

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error('Invalid or missing token.');
      return;
    }
    if (!password || !confirmPassword) {
      toast.error('Please enter and confirm your new password.');
      return;
    }
      if (password.length < 8) {
        toast.error('Password must be at least 8 characters long.');
        return;
      }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
        const response = await resetPasswordApi({ token, new_password: password, confirm_password: confirmPassword });
        if (response.status === 'success') {
          setSuccess(true);
          toast.success(response.message || 'Password reset successful!');
        } else {
          toast.error(response.message || 'Failed to reset password.');
        }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className='log-in-section section-b-space !min-h-screen'>
        <div className='container-fluid-lg w-100'>
          <div className='row'>
            <div className='col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto'>
              <div className='image-contain'>
                <img src='/assets/images/inner-page/forgot.png' className='img-fluid' alt='' />
              </div>
            </div>
            <div className='col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto'>
              <div className='log-in-box'>
                <div className='text-center mb-4'>
                  <Link to='/' className='web-logo'>
                    <img
                      src='/assets/logo/apsra.svg'
                      className='img-fluid mx-auto'
                      alt='Apsara Kitab Ghar'
                      style={{ maxHeight: '50px' }}
                    />
                  </Link>
                </div>
                <div className='log-in-title text-center'>
                  <h3>Password Reset!</h3>
                  <h4>You can now sign in</h4>
                </div>
                <div className='input-box text-center'>
                  <div className='mb-4'>
                    <div className='success-icon mb-3'>
                      <svg
                        width='80'
                        height='80'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='mx-auto text-success'
                      >
                        <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
                        <path d='m9 12 2 2 4-4' stroke='currentColor' strokeWidth='2' />
                      </svg>
                    </div>
                    <p className='mb-3'>Your password has been reset successfully.</p>
                  </div>
                  <div className='d-grid gap-2'>
                    <Link to='/signin' className='btn btn-animation'>
                      Sign In
                    </Link>
                  </div>
                </div>
                <div className='sign-up-box'>
                  <h4>
                    Go back to{' '}
                    <Link to='/' className='theme-color fw-bold'>
                      Home
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='log-in-section section-b-space !min-h-screen'>
      <div className='container-fluid-lg w-100'>
        <div className='row'>
          <div className='col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto'>
            <div className='image-contain'>
              <img src='/assets/images/inner-page/forgot.png' className='img-fluid' alt='' />
            </div>
          </div>
          <div className='col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto'>
            <div className='log-in-box'>
              <div className='text-center mb-4'>
                <Link to='/' className='web-logo'>
                  <img
                    src='/assets/logo/apsra.svg'
                    className='img-fluid mx-auto'
                    alt='Apsara Kitab Ghar'
                    style={{ maxHeight: '60px' }}
                  />
                </Link>
              </div>
              <div className='log-in-title'>
                <h3>Reset Password</h3>
                <h4>Set a New Password</h4>
              </div>
              <div className='input-box'>
                <form className='row g-4' onSubmit={handleSubmit}>
                  <div className='col-12'>
                    <div className='form-floating theme-form-floating log-in-form'>
                      <input
                        type='password'
                        className='form-control'
                        id='password'
                        placeholder='New Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label htmlFor='password'>New Password</label>
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='form-floating theme-form-floating log-in-form'>
                      <input
                        type='password'
                        className='form-control'
                        id='confirmPassword'
                        placeholder='Confirm New Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <label htmlFor='confirmPassword'>Confirm New Password</label>
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
                      {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                  </div>
                </form>
              </div>
              <div className='sign-up-box'>
                <h4>
                  Remember your password?{' '}
                  <Link to='/signin' className='theme-color fw-bold'>
                    Sign In
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

export default ResetPassword;
