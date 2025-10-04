import Captcha from '@/components/general/Captcha';
import { getCaptchaConfig } from '@/services/captchaService';
import { submitContactForm } from '@/services/contactService';
import type { CaptchaConfig } from '@/types/types';
import { useAuthDialog } from '@/context/AuthDialogContext';
import { Loader } from 'react-feather';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
  const { isAuthenticated, openSignIn } = useAuthDialog();
  const [captchaConfig, setCaptchaConfig] = React.useState<CaptchaConfig | null>(null);
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  React.useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await getCaptchaConfig();
        setCaptchaConfig(config);
      } catch (err) {
        console.error('Failed to load captcha config', err);
      }
    };
    fetchConfig();
  }, []);

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Validate combined full name
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    if (fullName.length < 2) {
      newErrors.fullname = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    const subject = `${formData.firstName} ${formData.lastName} - Contact Inquiry`;
    if (subject.length < 3 || subject.length > 200) {
      newErrors.subject = 'Subject must be between 3-200 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.length > 2000) {
      newErrors.message = 'Message must not exceed 2000 characters';
    }

    if (!captchaToken) {
      newErrors.captcha = 'Please complete the CAPTCHA verification';
    }

    return newErrors;
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please sign in to submit a contact form');
      openSignIn('/contact');
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    const contactData = {
      fullname: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      subject: `${formData.firstName} ${formData.lastName} - Contact Inquiry`,
      message: `Phone: ${formData.phone}\n\nMessage:\n${formData.message}`,
      captcha_token: captchaToken!,
    };

    await submitContactForm(contactData);

    toast.success('Contact form submitted successfully! We will respond within 24-48 hours.', {
      duration: 5000,
    });

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setCaptchaToken(null);
    setErrors({});
    setIsSubmitting(false);
  };
  return (
    <div>
      <section className='contact-box-section'>
        <div className='container-fluid-lg'>
          <div className='row g-lg-5 g-3'>
            <div className='col-lg-6'>
              <div className='left-sidebar-box'>
                <div className='row'>
                  <div className='col-xl-12'>
                    <div className='contact-image'>
                      <img
                        src='assets/images/inner-page/contact-us.png'
                        className='img-fluid blur-up lazyloaded'
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='col-xl-12'>
                    <div className='contact-title'>
                      <h3>Get In Touch</h3>
                      <div className='alert alert-info mt-3 mb-4'>
                        <i className='fa-solid fa-info-circle me-2'></i>
                        <small>
                          Rate limit: 5 submissions per day. We respond within 24-48 hours.
                        </small>
                      </div>
                    </div>

                    <div className='contact-detail'>
                      <div className='row g-4'>
                        <div className='col-xxl-6 col-lg-12 col-sm-6'>
                          <div className='contact-detail-box'>
                            <div className='contact-icon'>
                              <i className='fa-solid fa-phone'></i>
                            </div>
                            <div className='contact-detail-title'>
                              <h4>Phone</h4>
                            </div>

                            <div className='contact-detail-contain'>
                              <p>123-456-7890</p>
                            </div>
                          </div>
                        </div>

                        <div className='col-xxl-6 col-lg-12 col-sm-6'>
                          <div className='contact-detail-box'>
                            <div className='contact-icon'>
                              <i className='fa-solid fa-envelope'></i>
                            </div>
                            <div className='contact-detail-title'>
                              <h4>Email</h4>
                            </div>

                            <div className='contact-detail-contain'>
                              <p>info@apsrakitabghar.com</p>
                            </div>
                          </div>
                        </div>

                        <div className='col-xxl-6 col-lg-12 col-sm-6'>
                          <div className='contact-detail-box'>
                            <div className='contact-icon'>
                              <i className='fa-solid fa-location-dot'></i>
                            </div>
                            <div className='contact-detail-title'>
                              <h4>Punjab Office</h4>
                            </div>

                            <div className='contact-detail-contain'>
                              <p>Talwandi Sabo, Punjab 151302</p>
                            </div>
                          </div>
                        </div>

                        <div className='col-xxl-6 col-lg-12 col-sm-6'>
                          <div className='contact-detail-box'>
                            <div className='contact-icon'>
                              <i className='fa-solid fa-building'></i>
                            </div>
                            <div className='contact-detail-title'>
                              <h4>Zirakpur Office</h4>
                            </div>

                            <div className='contact-detail-contain'>
                              <p>Talwandi Sabo, Punjab 151302</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-6'>
              <div className='title d-xxl-none d-block'>
                <h2>Contact Us</h2>
                <div className='alert alert-info mt-3'>
                  <i className='fa-solid fa-info-circle me-2'></i>
                  <small>Rate limit: 5 submissions per day. We respond within 24-48 hours.</small>
                </div>
              </div>
              <div className='right-sidebar-box'>
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-xxl-6 col-lg-12 col-sm-6'>
                      <div className='mb-md-4 mb-3 custom-form'>
                        <label htmlFor='firstName' className='form-label'>
                          First Name *
                        </label>
                        <div className='custom-input'>
                          <input
                            type='text'
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            id='firstName'
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder='Enter First Name'
                          />
                          <i className='fa-solid fa-user'></i>
                        </div>
                        {errors.firstName && (
                          <div className='text-danger mt-1 text-sm'>{errors.firstName}</div>
                        )}
                      </div>
                    </div>

                    <div className='col-xxl-6 col-lg-12 col-sm-6'>
                      <div className='mb-md-4 mb-3 custom-form'>
                        <label htmlFor='lastName' className='form-label'>
                          Last Name *
                        </label>
                        <div className='custom-input'>
                          <input
                            type='text'
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            id='lastName'
                            name='lastName'
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder='Enter Last Name'
                          />
                          <i className='fa-solid fa-user'></i>
                        </div>
                        {errors.lastName && (
                          <div className='text-danger mt-1 text-sm'>{errors.lastName}</div>
                        )}
                      </div>
                    </div>

                    <div className='col-xxl-6 col-lg-12 col-sm-6'>
                      <div className='mb-md-4 mb-3 custom-form'>
                        <label htmlFor='email' className='form-label'>
                          Email Address *
                        </label>
                        <div className='custom-input'>
                          <input
                            type='email'
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder='Enter Email Address'
                          />
                          <i className='fa-solid fa-envelope'></i>
                        </div>
                        {errors.email && (
                          <div className='text-danger mt-1 text-sm'>{errors.email}</div>
                        )}
                      </div>
                    </div>

                    <div className='col-xxl-6 col-lg-12 col-sm-6'>
                      <div className='mb-md-4 mb-3 custom-form'>
                        <label htmlFor='phone' className='form-label'>
                          Phone Number *
                        </label>
                        <div className='custom-input'>
                          <input
                            type='tel'
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            id='phone'
                            name='phone'
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder='Enter Your Phone Number'
                            maxLength={10}
                          />
                          <i className='fa-solid fa-mobile-screen-button'></i>
                        </div>
                        {errors.phone && (
                          <div className='text-danger mt-1 text-sm'>{errors.phone}</div>
                        )}
                      </div>
                    </div>

                    <div className='col-12'>
                      <div className='mb-md-4 mb-3 custom-form'>
                        <label htmlFor='message' className='form-label'>
                          Message *{' '}
                          <span className='text-muted'>({formData.message.length}/2000)</span>
                        </label>
                        <div className='custom-textarea'>
                          <textarea
                            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                            id='message'
                            name='message'
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder='Enter Your Message (minimum 10 characters)'
                            rows={6}
                            maxLength={2000}
                          ></textarea>
                          <i className='fa-solid fa-message'></i>
                        </div>
                        {errors.message && (
                          <div className='text-danger mt-1 text-sm'>{errors.message}</div>
                        )}
                      </div>
                    </div>

                    <div className='col-12'>
                      {captchaConfig && (
                        <Captcha
                          config={captchaConfig}
                          onVerify={(token: string | null) => {
                            setCaptchaToken(token);
                            if (errors.captcha) {
                              setErrors((prev) => ({ ...prev, captcha: '' }));
                            }
                          }}
                        />
                      )}
                      {errors.captcha && (
                        <div className='text-danger mt-2 text-sm'>{errors.captcha}</div>
                      )}
                    </div>

                    {!isAuthenticated && (
                      <div className='col-12'>
                        <div className='alert alert-info mt-3'>
                          <i className='fa-solid fa-info-circle me-2'></i>
                          Please{' '}
                          <button
                            type='button'
                            className='btn btn-link p-0 text-decoration-underline'
                            onClick={() => openSignIn('/contact')}
                          >
                            sign in
                          </button>{' '}
                          to submit a contact form.
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='mt-4'>
                    <button
                      type='submit'
                      className={`btn btn-animation btn-md fw-bold ms-auto ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                      disabled={isSubmitting || !isAuthenticated}
                    >
                      {isSubmitting ? (
                        <div className='flex items-center gap-2'>
                          <Loader className='w-4 h-4 animate-spin' />
                          Sending...
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='map-section'>
        <div className='container-fluid p-0'>
          <div className='map-box'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.8170459095627!2d75.07337817534248!3d29.984687474953784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391129730d1747e1%3A0x78b49a37922b7aa!2sX3MG%2BV9G%2C%20Talwandi%20Sabo%2C%20Punjab%20151302!5e0!3m2!1sen!2sin!4v1758003267201!5m2!1sen!2sin'
              width='600'
              height='450'
              style={{ border: '0' }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
