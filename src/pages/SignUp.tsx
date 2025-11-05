import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { login, syncCartAfterLogin, syncWishlistAfterLogin } from '@/features/auth/authSlice';
import { register } from '@/services/authService';
import { getCaptchaConfig } from '@/services/captchaService';
import { fetchCartList } from '@/features/cart/cartSlice';
import { fetchWishlistAsync } from '@/features/wishlist/wishlistSlice';
import toast from 'react-hot-toast';
import { Loader } from 'react-feather';
import type { CaptchaConfig } from '@/types/types';
import Captcha from '@/components/general/Captcha';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [captchaConfig, setCaptchaConfig] = useState<CaptchaConfig | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { username, firstName, lastName, email, phoneNumber, password, confirmPassword } =
      formData;

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

    // Password validation - minimum 8 characters
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    // Phone number validation - exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error('Phone number must be exactly 10 digits.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!captchaValid) {
      toast.error('Captcha validation failed. Please try again.');
      return;
    }

    const captchaToken = localStorage.getItem('captcha_token');
    if (!captchaToken) {
      toast.error('Captcha token missing, please try again.');
      return;
    }

    setLoading(true);

    try {
      const response = await register({
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        mobile: phoneNumber,
        captcha_token: captchaToken,
        role: 'user',
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

      // Sync localStorage cart with server
      try {
        await dispatch(syncCartAfterLogin(token)).unwrap();
        // Fetch updated cart from server
        await dispatch(fetchCartList()).unwrap();
      } catch (error) {
        console.error('Failed to sync cart:', error);
        // Don't show error to user, just log it
      }

      // Sync localStorage wishlist with server
      try {
        await dispatch(syncWishlistAfterLogin(token)).unwrap();
        // Fetch updated wishlist from server
        await dispatch(fetchWishlistAsync()).unwrap();
      } catch (error) {
        console.error('Failed to sync wishlist:', error);
        // Don't show error to user, just log it
      }

      navigate('/');
    } catch (error: any) {
      console.log(error);
      toast.error('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='log-in-section section-b-space min-h-screen flex items-center justify-center relative overflow-hidden'>
      {/* Background Image with Overlay */}
      <div className='absolute inset-0 z-0'>
        <img
          src='https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2028&auto=format&fit=crop'
          alt='Books Background'
          className='w-full h-full object-cover'
          onError={(e) => {
            e.currentTarget.src = '/assets/images/book/banner/1.jpg';
          }}
        />
        <div className='absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-sm'></div>
      </div>

      <div className='container-fluid-lg w-100 relative z-10'>
        <div className='row justify-content-center'>
          <div className='col-xxl-6 col-xl-7 col-lg-8 col-md-9 col-sm-11'>
            <div className='log-in-box bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-8'>
              <div className='text-center mb-3'>
                <Link to='/' className='web-logo'>
                  <img
                    src='/assets/logo/apsra.png'
                    className='img-fluid !mx-auto'
                    alt='Apsara Kitab Ghar'
                    style={{ maxHeight: '50px' }}
                  />
                </Link>
              </div>
              <div className='log-in-title text-center'>
                <h3>Welcome</h3>
                <h4>Create Your Account</h4>
              </div>

              <div className='input-box'>
                <form className='row g-4' onSubmit={handleSubmit}>
                  <div className='col-xxl-6 col-lg-12 col-md-6'>
                    <div className='form-floating theme-form-floating'>
                      <input
                        type='text'
                        className='form-control'
                        id='firstName'
                        name='firstName'
                        placeholder='First Name'
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor='firstName'>First Name</label>
                    </div>
                  </div>

                  <div className='col-xxl-6 col-lg-12 col-md-6'>
                    <div className='form-floating theme-form-floating'>
                      <input
                        type='text'
                        className='form-control'
                        id='lastName'
                        name='lastName'
                        placeholder='Last Name'
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor='lastName'>Last Name</label>
                    </div>
                  </div>

                  <div className='col-12'>
                    <div className='form-floating theme-form-floating'>
                      <input
                        type='text'
                        className='form-control'
                        id='username'
                        name='username'
                        placeholder='Username'
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor='username'>Username</label>
                    </div>
                  </div>

                  <div className='col-12'>
                    <div className='form-floating theme-form-floating'>
                      <input
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        placeholder='Email Address'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor='email'>Email Address</label>
                    </div>
                  </div>

                  <div className='col-12'>
                    <div className='form-floating theme-form-floating'>
                      <input
                        type='tel'
                        className='form-control'
                        id='phoneNumber'
                        name='phoneNumber'
                        placeholder='Phone Number'
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        maxLength={10}
                        pattern='[0-9]{10}'
                        required
                      />
                      <label htmlFor='phoneNumber'>Phone Number</label>
                    </div>
                  </div>

                  <div className='col-xxl-6 col-lg-12 col-md-6'>
                    <div className='form-floating theme-form-floating'>
                      <input
                        type='password'
                        className='form-control'
                        id='password'
                        name='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleInputChange}
                        minLength={8}
                        required
                      />
                      <label htmlFor='password'>Password</label>
                    </div>
                    <small className='text-muted'>Minimum 8 characters required</small>
                  </div>

                  <div className='col-xxl-6 col-lg-12 col-md-6'>
                    <div className='form-floating theme-form-floating'>
                      <input
                        type='password'
                        className='form-control'
                        id='confirmPassword'
                        name='confirmPassword'
                        placeholder='Confirm Password'
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor='confirmPassword'>Confirm Password</label>
                    </div>
                  </div>

                  {captchaConfig && (
                    <div className='col-12'>
                      <div className='captcha-box'>
                        <label className='form-label'>Verification</label>
                        <Captcha
                          config={captchaConfig}
                          onVerify={(token: string | null) => setCaptchaValid(!!token)}
                        />
                      </div>
                    </div>
                  )}

                  <div className='col-12'>
                    <div className='forgot-box'>
                      <div className='form-check ps-0 m-0 remember-box'>
                        <input
                          className='checkbox_animated check-box'
                          type='checkbox'
                          id='terms'
                          required
                        />
                        <label className='form-check-label' htmlFor='terms'>
                          I agree with{' '}
                          <Link to='/terms-conditions' className='theme-color'>
                            Terms
                          </Link>{' '}
                          and{' '}
                          <Link to='/privacy-policy' className='theme-color'>
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
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
                      {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                  </div>
                </form>
              </div>

              <div className='other-log-in'>
                <h6></h6>
              </div>

              <div className='sign-up-box'>
                <h4>
                  Already have an account?{' '}
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

export default SignUp;
