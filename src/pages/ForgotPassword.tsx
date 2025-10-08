import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader } from 'react-feather';
import { forgotPassword } from '@/services/authService';
import { getCaptchaConfig } from '@/services/captchaService';
import type { CaptchaConfig, ForgotPasswordResponse } from '@/types/types';
import Captcha from '@/components/general/Captcha';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [captchaConfig, setCaptchaConfig] = useState<CaptchaConfig | null>(null);
  const [resetData, setResetData] = useState<ForgotPasswordResponse | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Email validation
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // Captcha validation
    if (!captchaValid) {
      toast.error('Please complete the captcha verification.');
      return;
    }

    const captchaToken = localStorage.getItem('captcha_token');
    if (!captchaToken) {
      toast.error('Captcha token missing. Please try again.');
      return;
    }

    setLoading(true);

    try {
      const response = await forgotPassword({
        email,
        captcha_token: captchaToken,
      });

      if (response.status !== 'success') {
        toast.error(response?.message || 'Failed to send reset email. Please try again.');
        return;
      }

      // Store the entire response for display
      setResetData(response);
      setEmailSent(true);
      toast.success(response.message || 'Password reset link sent!');

      // Clear captcha token after successful submission
      localStorage.removeItem('captcha_token');
    } catch (error: any) {
      console.error('Forgot password error:', error);

      // Handle rate limiting and other specific errors
      if (error.message?.includes('rate limit') || error.message?.includes('Rate limiting')) {
        toast.error('Too many requests. Please wait an hour before trying again.');
      } else if (error.message?.includes('captcha') || error.message?.includes('Captcha')) {
        toast.error('Invalid captcha. Please try again.');
      } else {
        toast.error(error.message || 'Failed to send reset email. Please try again.');
      }

      // Reset captcha on error
      setCaptchaValid(false);
      localStorage.removeItem('captcha_token');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
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
                      {resetData?.message || (
                        <>
                          We've sent a password reset link to{' '}
                          <strong className='theme-color'>{email}</strong>
                        </>
                      )}
                    </p>
                  </div>

                  <div className='d-grid gap-2'>
                    <button
                      className='btn btn-animation'
                      onClick={() => {
                        setEmailSent(false);
                        setEmail('');
                        setResetData(null);
                        setCaptchaValid(false);
                        localStorage.removeItem('captcha_token');
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
              <div className='text-center mb-3'>
                <Link to='/' className='web-logo'>
                  <img
                    src='/assets/logo/apsra.svg'
                    className='img-fluid mx-auto'
                    alt='Apsara Kitab Ghar'
                    style={{ maxHeight: '60px' }}
                  />
                </Link>
              </div>
              <div className='log-in-title text-center'>
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
                    <div className='mt-2'>
                      <p className='text-muted small mb-2'>
                        Enter your email address and we'll send you a link to reset your password.
                      </p>
                    </div>
                  </div>

                  {captchaConfig && (
                    <div className='col-12 !mt-0'>
                      <div className='captcha-box'>
                        <label className='form-label'>Captcha</label>
                        <Captcha
                          config={captchaConfig}
                          onVerify={(token: string | null) => setCaptchaValid(!!token)}
                        />
                      </div>
                    </div>
                  )}

                  <div className='col-12'>
                    <button
                      className={`btn btn-animation w-100 justify-content-center ${
                        loading || !captchaValid ? 'opacity-50' : ''
                      }`}
                      type='submit'
                      disabled={loading || !captchaValid}
                    >
                      {loading ? <Loader className='animate-spin me-2' size={16} /> : null}
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                    {captchaConfig && !captchaValid && (
                      <p className='text-muted mt-2 small text-center'>
                        Please complete the captcha verification to continue.
                      </p>
                    )}
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
