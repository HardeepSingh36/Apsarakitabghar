import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='section-t-space footer-section-2 footer-color-3 mt-16'>
      <div className='container-fluid-lg'>
        <div className='main-footer'>
          <div className='row g-md-4 gy-sm-5'>
            <div className='col-xxl-3 col-xl-4 col-sm-6'>
              <Link to='/' className='foot-logo theme-logo'>
                <img src='/assets/logo/apsra.svg' className='img-fluid blur-up lazyload' alt='' />
              </Link>
              <p className='information-text information-text-2'>
                it is a long established fact that a reader will be distracted by the readable
                content.
              </p>
              <ul className='social-icon'>
                <li className='light-bg'>
                  <a href='https://www.facebook.com/' className='footer-link-color'>
                    <i className='fab fa-facebook-f'></i>
                  </a>
                </li>
                <li className='light-bg'>
                  <a
                    href='https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&amp;flowEntry=ServiceLogin'
                    className='footer-link-color'
                  >
                    <i className='fab fa-google'></i>
                  </a>
                </li>
                <li className='light-bg'>
                  <a href='https://twitter.com/i/flow/login' className='footer-link-color'>
                    <i className='fab fa-twitter'></i>
                  </a>
                </li>
                <li className='light-bg'>
                  <a href='https://www.instagram.com/' className='footer-link-color'>
                    <i className='fab fa-instagram'></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className='col-xxl-3 col-xl-4 col-sm-6'>
              <div className='footer-title'>
                <h4 className='text-white'>Quick Links</h4>
              </div>
              <ul className='footer-list footer-contact footer-list-light'>
                <li>
                  <Link
                    to='/about'
                    className='light-text'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to='/privacy-policy'
                    className='light-text'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to='/term-conditions'
                    className='light-text'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to='/query-form'
                    className='light-text'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Query Form
                  </Link>
                </li>
              </ul>
            </div>

            <div className='col-xxl-3 col-xl-4 col-sm-6'>
              <div className='footer-title'>
                <h4 className='text-white'>Useful Link</h4>
              </div>
              <ul className='footer-list footer-list-light footer-contact'>
                <li>
                  <Link to='/dashboard' className='light-text'>
                    Your Order
                  </Link>
                </li>
                <li>
                  <Link to='/dashboard' className='light-text'>
                    Your Account
                  </Link>
                </li>
                <li>
                  <Link to='/dashboard' className='light-text'>
                    Track Orders
                  </Link>
                </li>
                <li>
                  <Link to='/dashboard' className='light-text'>
                    Your Wishlist
                  </Link>
                </li>
              </ul>
            </div>

            <div className='col-xxl-3 col-xl-4 col-sm-6'>
              <div className='footer-title'>
                <h4 className='text-white'>Store information</h4>
              </div>
              <ul className='footer-address footer-contact'>
                <li>
                  <a href='javascript:void(0)' className='light-text'>
                    <div className='inform-box flex-start-box'>
                      <i data-feather='map-pin'></i>
                      <p>Talwandi Sabo, Punjab 151302</p>
                    </div>
                  </a>
                </li>

                <li>
                  <a href='javascript:void(0)' className='light-text'>
                    <div className='inform-box'>
                      <i data-feather='phone'></i>
                      <p>Call us: 123-456-7890</p>
                    </div>
                  </a>
                </li>

                <li>
                  <a href='javascript:void(0)' className='light-text'>
                    <div className='inform-box'>
                      <i data-feather='mail'></i>
                      <p>Email Us: info@apsrakitabghar.com</p>
                    </div>
                  </a>
                </li>

                <li>
                  <a href='javascript:void(0)' className='light-text'>
                    <div className='inform-box'>
                      <i data-feather='printer'></i>
                      <p>Fax: 123456</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='sub-footer sub-footer-lite section-b-space section-t-space'>
          <div className='left-footer'>
            <p className='light-text'>2024 Copyright By Apsra Kitab Ghar</p>
          </div>

          <ul className='payment-box'>
            <li>
              <img src='/assets/images/icon/paymant/visa.png' className='blur-up lazyload' alt='' />
            </li>
            <li>
              <img
                src='/assets/images/icon/paymant/discover.png'
                alt=''
                className='blur-up lazyload'
              />
            </li>
            <li>
              <img
                src='/assets/images/icon/paymant/american.png'
                alt=''
                className='blur-up lazyload'
              />
            </li>
            <li>
              <img
                src='/assets/images/icon/paymant/master-card.png'
                alt=''
                className='blur-up lazyload'
              />
            </li>
            <li>
              <img
                src='/assets/images/icon/paymant/giro-pay.png'
                alt=''
                className='blur-up lazyload'
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
