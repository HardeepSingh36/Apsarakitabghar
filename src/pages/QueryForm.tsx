import { SimpleCaptcha } from '../components/SimpleCaptcha';

const QueryForm = () => {
  return (
    <>
      <section className='contact-box-section'>
        <div className='container-fluid-lg'>
          <div className='row g-lg-5 g-3'>
            <div className='col-lg-6 pb-3'>
              <div className='title d-xxl-none d-block'>
                <h2>Contact Us</h2>
              </div>
              <div className='right-sidebar-box'>
                <div className='row'>
                  <div className='col-xxl-6 col-lg-12 col-sm-6'>
                    <div className='mb-md-4 mb-3 custom-form'>
                      <label htmlFor='firstName' className='form-label'>
                        First Name
                      </label>
                      <div className='custom-input'>
                        <input
                          type='text'
                          className='form-control'
                          id='firstName'
                          placeholder='Enter First Name'
                        />
                        <i className='fa-solid fa-user'></i>
                      </div>
                    </div>
                  </div>
                  <div className='col-xxl-6 col-lg-12 col-sm-6'>
                    <div className='mb-md-4 mb-3 custom-form'>
                      <label htmlFor='lastName' className='form-label'>
                        Last Name
                      </label>
                      <div className='custom-input'>
                        <input
                          type='text'
                          className='form-control'
                          id='lastName'
                          placeholder='Enter Last Name'
                        />
                        <i className='fa-solid fa-user'></i>
                      </div>
                    </div>
                  </div>
                  <div className='col-xxl-6 col-lg-12 col-sm-6'>
                    <div className='mb-md-4 mb-3 custom-form'>
                      <label htmlFor='email' className='form-label'>
                        Email Address
                      </label>
                      <div className='custom-input'>
                        <input
                          type='email'
                          className='form-control'
                          id='email'
                          placeholder='Enter Email Address'
                        />
                        <i className='fa-solid fa-envelope'></i>
                      </div>
                    </div>
                  </div>
                  <div className='col-xxl-6 col-lg-12 col-sm-6'>
                    <div className='mb-md-4 mb-3 custom-form'>
                      <label htmlFor='phone' className='form-label'>
                        Phone Number
                      </label>
                      <div className='custom-input'>
                        <input
                          type='tel'
                          className='form-control'
                          id='phone'
                          placeholder='Enter Your Phone Number'
                          maxLength={10}
                        />
                        <i className='fa-solid fa-mobile-screen-button'></i>
                      </div>
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='mb-md-4 mb-3 custom-form'>
                      <label htmlFor='message' className='form-label'>
                        Message
                      </label>
                      <div className='custom-textarea'>
                        <textarea
                          className='form-control'
                          id='message'
                          placeholder='Enter Your Message'
                          rows={6}
                        ></textarea>
                        <i className='fa-solid fa-message'></i>
                      </div>
                    </div>
                  </div>
                  <div className='col-12'>
                    <SimpleCaptcha
                      onChange={(isValid) => {
                        console.log('Captcha valid:', isValid);
                      }}
                      captchaBgColor='bg-gray-200'
                    />
                  </div>
                </div>
                <button className='btn btn-animation btn-md fw-bold ms-auto'>Send Message</button>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='left-sidebar-box'>
                <div className='row'>
                  <div className='col-xl-12'>
                    <div className='contact-image'>
                      <img
                        src='assets/images/inner-page/contact-us.png'
                        className='img-fluid blur-up lazyloaded'
                        alt='Contact'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QueryForm;
