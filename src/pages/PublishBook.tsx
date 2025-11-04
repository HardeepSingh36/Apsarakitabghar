import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader } from 'react-feather';
import { getCaptchaConfig } from '@/services/captchaService';
import { publishBook } from '@/services/bookService';
import type { CaptchaConfig, PublishBookRequest } from '@/types/types';
import Captcha from '@/components/general/Captcha';

const PublishBook = () => {
  const [formData, setFormData] = useState({
    book_title: '',
    author_name: '',
    email: '',
    mobile: '',
    notes: '',
    category_id: '',
    genre_id: '',
    book_language: '',
    book_description: '',
    anonymous: false,
  });
  // File uploads not supported in this API version
  const [loading, setLoading] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [captchaConfig, setCaptchaConfig] = useState<CaptchaConfig | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // File uploads will be handled separately in future API versions

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Required field validation
    if (!formData.book_title.trim()) errors.book_title = 'Book title is required';
    else if (formData.book_title.length < 3)
      errors.book_title = 'Book title must be at least 3 characters';
    else if (formData.book_title.length > 255)
      errors.book_title = 'Book title must not exceed 255 characters';

    if (!formData.book_language) errors.book_language = 'Please select a language';

    // Optional email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Optional mobile validation
    const mobileRegex = /^\d{10}$/;
    if (formData.mobile && !mobileRegex.test(formData.mobile)) {
      errors.mobile = 'Mobile number must be exactly 10 digits';
    }

    // Optional description validation
    if (formData.book_description && formData.book_description.length > 2000) {
      errors.book_description = 'Description must not exceed 2000 characters';
    }

    if (formData.notes && formData.notes.length > 500) {
      errors.notes = 'Notes must not exceed 500 characters';
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Please fix all validation errors before submitting.');
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
      // Prepare request data
      const requestData: PublishBookRequest = {
        book_title: formData.book_title,
        book_language: formData.book_language,
        book_description: formData.book_description || undefined,
        category_id: formData.category_id ? parseInt(formData.category_id) : undefined,
        genre_id: formData.genre_id ? parseInt(formData.genre_id) : undefined,
        author_name: formData.author_name || undefined,
        email: formData.email || undefined,
        mobile: formData.mobile || undefined,
        anonymous: formData.anonymous,
        notes: formData.notes || undefined,
        captcha_token: captchaToken,
      };

      const response = await publishBook(requestData);

      if (response.status === 'success') {
        const queryId = response.data?.id || 'N/A';
        toast.success(
          `${
            response.message || 'Book publication request submitted successfully!'
          } Request ID: ${queryId}`
        );

        // Reset form
        setFormData({
          book_title: '',
          author_name: '',
          email: '',
          mobile: '',
          notes: '',
          category_id: '',
          genre_id: '',
          book_language: '',
          book_description: '',
          anonymous: false,
        });
        setFormErrors({});
        setCaptchaValid(false);
        localStorage.removeItem('captcha_token');

        // Navigate to home after showing success message
        setTimeout(() => {
          navigate('/', {
            state: {
              message:
                'Book publication request submitted successfully! We will review and get back to you soon.',
              queryId,
            },
          });
        }, 3000);
      } else {
        throw new Error(response.message || 'Failed to submit book');
      }
    } catch (error: any) {
      console.error('Book publication error:', error);
      toast.error(error.message || 'Failed to submit book. Please try again.');
      setCaptchaValid(false);
      localStorage.removeItem('captcha_token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='log-in-section section-b-space'>
      <div className='container-fluid-lg w-100'>
        <div className='row justify-content-center'>
          <div className='col-xxl-8 col-xl-10 col-lg-12'>
            <div className='log-in-box'>
              <div className='text-center mb-4'>
                <Link to='/' className='web-logo'>
                  <img
                    src='/assets/logo/apsra.png'
                    className='img-fluid mx-auto'
                    alt='Apsara Kitab Ghar'
                    style={{ maxHeight: '50px' }}
                  />
                </Link>
              </div>

              <div className='log-in-title text-center'>
                <h3>Publish Your Book</h3>
                <h4>Share Your Knowledge with the World</h4>
                <p className='text-muted mt-2'>
                  Submit your book for publication consideration. We review all submissions
                  carefully.
                </p>
              </div>

              <div className='input-box'>
                <form className='row g-4' onSubmit={handleSubmit}>
                  {/* Basic Book Information */}
                  <div className='col-12'>
                    <h5 className='border-bottom pb-2 mb-3'>
                      <i className='fa-solid fa-book me-2 text-primary'></i>
                      Book Information
                    </h5>
                  </div>

                  <div className='col-xxl-6 col-lg-6 col-md-6'>
                    <div className='form-floating theme-form-floating'>
                      <input
                        type='text'
                        className={`form-control ${formErrors.book_title ? 'border-danger' : ''}`}
                        id='book_title'
                        name='book_title'
                        placeholder='Book Title'
                        value={formData.book_title}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor='book_title'>Book Title *</label>
                    </div>
                    {formErrors.book_title && (
                      <small className='text-danger'>{formErrors.book_title}</small>
                    )}
                  </div>

                  <div className='col-xxl-6 col-lg-6 col-md-6'>
                    <div className='form-floating theme-form-floating'>
                      <input
                        type='text'
                        className={`form-control ${formErrors.author_name ? 'border-danger' : ''}`}
                        id='author_name'
                        name='author_name'
                        placeholder='Author Name'
                        value={formData.author_name}
                        onChange={handleInputChange}
                      />
                      <label htmlFor='author_name'>Author Name (Optional)</label>
                    </div>
                    <small className='text-muted'>Leave blank to use your profile name</small>
                    {formErrors.author_name && (
                      <small className='text-danger d-block'>{formErrors.author_name}</small>
                    )}
                  </div>

                  <div className='col-xxl-6 col-lg-6 col-md-6'>
                    <div className='form-floating theme-form-floating'>
                      <select
                        className={`form-control ${formErrors.category_id ? 'border-danger' : ''}`}
                        id='category_id'
                        name='category_id'
                        value={formData.category_id}
                        onChange={handleInputChange}
                      >
                        <option value=''>Select Category (Optional)</option>
                        <option value='1'>Fiction</option>
                        <option value='2'>Non-Fiction</option>
                        <option value='3'>Academic</option>
                        <option value='4'>Textbook</option>
                        <option value='5'>Reference</option>
                        <option value='6'>Children's Books</option>
                        <option value='7'>Biography</option>
                        <option value='8'>History</option>
                        <option value='9'>Science</option>
                        <option value='10'>Technology</option>
                        <option value='11'>Religion & Spirituality</option>
                        <option value='12'>Self Help</option>
                        <option value='13'>Poetry</option>
                        <option value='14'>Other</option>
                      </select>
                      <label htmlFor='category_id'>Category (Optional)</label>
                    </div>
                    {formErrors.category_id && (
                      <small className='text-danger'>{formErrors.category_id}</small>
                    )}
                  </div>

                  <div className='col-xxl-6 col-lg-6 col-md-6'>
                    <div className='form-floating theme-form-floating'>
                      <select
                        className={`form-control ${
                          formErrors.book_language ? 'border-danger' : ''
                        }`}
                        id='book_language'
                        name='book_language'
                        value={formData.book_language}
                        onChange={handleInputChange}
                        required
                      >
                        <option value=''>Select Language</option>
                        <option value='en'>English</option>
                        <option value='hi'>Hindi</option>
                        <option value='pa'>Punjabi</option>
                        <option value='other'>Other</option>
                      </select>
                      <label htmlFor='book_language'>Book Language *</label>
                    </div>
                    {formErrors.book_language && (
                      <small className='text-danger'>{formErrors.book_language}</small>
                    )}
                  </div>

                  <div className='col-12'>
                    <div className='form-floating theme-form-floating'>
                      <textarea
                        className={`form-control ${
                          formErrors.book_description ? 'border-danger' : ''
                        }`}
                        id='book_description'
                        name='book_description'
                        placeholder='Book Description'
                        value={formData.book_description}
                        onChange={handleInputChange}
                        style={{ height: '100px' }}
                        maxLength={2000}
                      />
                      <label htmlFor='book_description'>Book Description (Optional)</label>
                    </div>
                    <small className='text-muted'>
                      {formData.book_description.length}/2000 characters
                    </small>
                    {formErrors.book_description && (
                      <small className='text-danger d-block'>{formErrors.book_description}</small>
                    )}
                  </div>

                  {/* Genre Selection */}
                  <div className='col-xxl-6 col-lg-6 col-md-6'>
                    <div className='form-floating theme-form-floating'>
                      <select
                        className={`form-control ${formErrors.genre_id ? 'border-danger' : ''}`}
                        id='genre_id'
                        name='genre_id'
                        value={formData.genre_id}
                        onChange={handleInputChange}
                      >
                        <option value=''>Select Genre (Optional)</option>
                        <option value='1'>Mystery</option>
                        <option value='2'>Romance</option>
                        <option value='3'>Thriller</option>
                        <option value='4'>Fantasy</option>
                        <option value='5'>Science Fiction</option>
                        <option value='6'>Horror</option>
                        <option value='7'>Adventure</option>
                        <option value='8'>Drama</option>
                        <option value='9'>Comedy</option>
                        <option value='10'>Historical</option>
                        <option value='11'>Educational</option>
                        <option value='12'>Other</option>
                      </select>
                      <label htmlFor='genre_id'>Genre (Optional)</label>
                    </div>
                    {formErrors.genre_id && (
                      <small className='text-danger'>{formErrors.genre_id}</small>
                    )}
                  </div>

                  {/* Anonymous Submission Option */}
                  <div className='col-xxl-6 col-lg-6 col-md-6'>
                    <div className='form-check ps-0 m-0 mt-3'>
                      <input
                        className='checkbox_animated check-box'
                        type='checkbox'
                        id='anonymous'
                        name='anonymous'
                        checked={formData.anonymous}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, anonymous: e.target.checked }))
                        }
                      />
                      <label className='form-check-label ms-2' htmlFor='anonymous'>
                        Submit anonymously (your name will not be displayed publicly)
                      </label>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className='col-12'>
                    <h5 className='border-bottom pb-2 mb-3 mt-4'>
                      <i className='fa-solid fa-user me-2 text-primary'></i>
                      Contact Information
                    </h5>
                  </div>

                  <div className='col-xxl-6 col-lg-6 col-md-6'>
                    <div className='form-floating theme-form-floating'>
                      <input
                        type='email'
                        className={`form-control ${formErrors.email ? 'border-danger' : ''}`}
                        id='email'
                        name='email'
                        placeholder='Email Address'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor='email'>Email Address (Optional)</label>
                    </div>
                    <small className='text-muted'>Leave blank to use your profile email</small>
                    {formErrors.email && <small className='text-danger'>{formErrors.email}</small>}
                  </div>

                  <div className='col-xxl-6 col-lg-6 col-md-6'>
                    <div className='form-floating theme-form-floating'>
                      <input
                        type='tel'
                        className={`form-control ${formErrors.mobile ? 'border-danger' : ''}`}
                        id='mobile'
                        name='mobile'
                        placeholder='Mobile Number'
                        value={formData.mobile}
                        onChange={handleInputChange}
                        maxLength={10}
                        pattern='[0-9]{10}'
                      />
                      <label htmlFor='mobile'>Mobile Number (Optional)</label>
                    </div>
                    {formErrors.mobile && (
                      <small className='text-danger'>{formErrors.mobile}</small>
                    )}
                  </div>

                  <div className='col-12'>
                    <div className='form-floating theme-form-floating'>
                      <textarea
                        className={`form-control ${formErrors.message ? 'border-danger' : ''}`}
                        id='notes'
                        name='notes'
                        placeholder='Additional Notes'
                        value={formData.notes}
                        onChange={handleInputChange}
                        style={{ height: '80px' }}
                        maxLength={500}
                      />
                      <label htmlFor='notes'>Additional Notes (Optional)</label>
                    </div>
                    <small className='text-muted'>{formData.notes.length}/500 characters</small>
                    {formErrors.notes && (
                      <small className='text-danger d-block'>{formErrors.notes}</small>
                    )}
                  </div>

                  {/* Note about file submission */}
                  <div className='col-12'>
                    <div className='alert alert-info'>
                      <i className='fa-solid fa-info-circle me-2'></i>
                      <strong>Note:</strong> After your book publication request is approved, we
                      will contact you for the manuscript and cover image files.
                    </div>
                  </div>

                  {/* Captcha */}
                  {captchaConfig && (
                    <div className='col-12'>
                      <h5 className='border-bottom pb-2 mb-3 mt-4'>
                        <i className='fa-solid fa-shield-alt me-2 text-primary'></i>
                        Security Verification
                      </h5>
                      <div className='captcha-box'>
                        <Captcha
                          config={captchaConfig}
                          onVerify={(token: string | null) => setCaptchaValid(!!token)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Terms and Submit */}
                  <div className='col-12'>
                    <div className='form-check ps-0 m-0 remember-box'>
                      <input
                        className='checkbox_animated check-box'
                        type='checkbox'
                        id='terms'
                        required
                      />
                      <label className='form-check-label' htmlFor='terms'>
                        I agree that the information provided is accurate and I have the rights to
                        publish this book. I also agree to the{' '}
                        <Link to='/terms-conditions' className='theme-color' target='_blank'>
                          Terms & Conditions
                        </Link>{' '}
                        and{' '}
                        <Link to='/privacy-policy' className='theme-color' target='_blank'>
                          Privacy Policy
                        </Link>
                        .
                      </label>
                    </div>
                  </div>

                  <div className='col-12'>
                    <div className='row g-3'>
                      <div className='col-md-6'>
                        <Link
                          to='/'
                          className='btn btn-outline-primary w-100 justify-content-center'
                        >
                          <i className='fa-solid fa-arrow-left me-2'></i>
                          Back to Home
                        </Link>
                      </div>
                      <div className='col-md-6'>
                        <button
                          className={`btn btn-animation w-100 justify-content-center ${
                            loading || !captchaValid ? 'opacity-50' : ''
                          }`}
                          type='submit'
                          disabled={loading || !captchaValid}
                        >
                          {loading ? <Loader className='animate-spin me-2' size={16} /> : null}
                          {loading ? 'Publishing...' : 'Submit for Publication'}
                        </button>
                      </div>
                    </div>
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

              <div className='sign-up-box text-center'>
                <h4>
                  Need help?{' '}
                  <Link to='/contact-us' className='theme-color fw-bold'>
                    Contact Us
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

export default PublishBook;
