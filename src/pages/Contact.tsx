
const Contact = () => {
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
              </div>
              <div className='right-sidebar-box'>
                <div className='row'>
                  <div className='col-xxl-6 col-lg-12 col-sm-6'>
                    <div className='mb-md-4 mb-3 custom-form'>
                      <label htmlFor='exampleFormControlInput' className='form-label'>
                        First Name
                      </label>
                      <div className='custom-input'>
                        <input
                          type='text'
                          className='form-control'
                          id='exampleFormControlInput'
                          placeholder='Enter First Name'
                        />
                        <i className='fa-solid fa-user'></i>
                      </div>
                    </div>
                  </div>

                  <div className='col-xxl-6 col-lg-12 col-sm-6'>
                    <div className='mb-md-4 mb-3 custom-form'>
                      <label htmlFor='exampleFormControlInput1' className='form-label'>
                        Last Name
                      </label>
                      <div className='custom-input'>
                        <input
                          type='text'
                          className='form-control'
                          id='exampleFormControlInput1'
                          placeholder='Enter Last Name'
                        />
                        <i className='fa-solid fa-user'></i>
                      </div>
                    </div>
                  </div>

                  <div className='col-xxl-6 col-lg-12 col-sm-6'>
                    <div className='mb-md-4 mb-3 custom-form'>
                      <label htmlFor='exampleFormControlInput2' className='form-label'>
                        Email Address
                      </label>
                      <div className='custom-input'>
                        <input
                          type='email'
                          className='form-control'
                          id='exampleFormControlInput2'
                          placeholder='Enter Email Address'
                        />
                        <i className='fa-solid fa-envelope'></i>
                      </div>
                    </div>
                  </div>

                  <div className='col-xxl-6 col-lg-12 col-sm-6'>
                    <div className='mb-md-4 mb-3 custom-form'>
                      <label htmlFor='exampleFormControlInput3' className='form-label'>
                        Phone Number
                      </label>
                      <div className='custom-input'>
                        <input
                          type='tel'
                          className='form-control'
                          id='exampleFormControlInput3'
                          placeholder='Enter Your Phone Number'
                          maxLength={10}
                          // onInput='javascript: if (this.value.length > this.maxLength) this.value =
                          //                   this.value.slice(0, this.maxLength);'
                        />
                        <i className='fa-solid fa-mobile-screen-button'></i>
                      </div>
                    </div>
                  </div>

                  <div className='col-12'>
                    <div className='mb-md-4 mb-3 custom-form'>
                      <label htmlFor='exampleFormControlTextarea' className='form-label'>
                        Message
                      </label>
                      <div className='custom-textarea'>
                        <textarea
                          className='form-control'
                          id='exampleFormControlTextarea'
                          placeholder='Enter Your Message'
                          rows={6}
                        ></textarea>
                        <i className='fa-solid fa-message'></i>
                      </div>
                    </div>
                  </div>
                </div>
                <button className='btn btn-animation btn-md fw-bold ms-auto'>Send Message</button>
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
