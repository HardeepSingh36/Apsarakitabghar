import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader } from 'react-feather';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email.');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call - replace with actual forgot password API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // TODO: Replace with actual API call
      // const response = await forgotPasswordApi(email);

      setEmailSent(true);
      toast.success('Reset link sent to your email!');
    } catch (error: any) {
      toast.error('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <section className='log-in-section section-b-space'>
        <div className='container-fluid-lg w-100'>
          <div className='row'>
            <div className='col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto'>
              <div className='image-contain'>
                <img src='/assets/images/inner-page/forgot.png' className='img-fluid' alt='' />
              </div>
            </div>

            <div className='col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto'>
              <div className='log-in-box'>
                <div className='log-in-title text-center'>
                  <h3>Email Sent!</h3>
                  <h4>Check Your Inbox</h4>
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
                    <p className='mb-3'>
                      We've sent a password reset link to{' '}
                      <strong className='theme-color'>{email}</strong>
                    </p>
                    <p className='text-muted'>
                      Please check your email and click on the reset link to create a new password.
                    </p>
                  </div>

                  <div className='d-grid gap-2'>
                    <button
                      className='btn btn-animation'
                      onClick={() => {
                        setEmailSent(false);
                        setEmail('');
                      }}
                    >
                      Send Another Email
                    </button>
                  </div>
                </div>

                <div className='other-log-in'>
                  <h6></h6>
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
  }

  return (
    <section className='log-in-section section-b-space'>
      <div className='container-fluid-lg w-100'>
        <div className='row'>
          <div className='col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto'>
            <div className='image-contain'>
              <img src='/assets/images/inner-page/forgot.png' className='img-fluid' alt='' />
            </div>
          </div>

          <div className='col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto'>
            <div className='log-in-box'>
              <div className='log-in-title'>
                <h3>Forgot Password</h3>
                <h4>Reset Your Password</h4>
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
                    <p className='text-muted mt-2 small'>
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
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
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                  </div>
                </form>
              </div>

              <div className='other-log-in'>
                <h6></h6>
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

export default ForgotPassword;
