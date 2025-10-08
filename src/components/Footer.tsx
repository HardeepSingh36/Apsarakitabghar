import { Link } from 'react-router-dom';
import { useAuthDialog } from '@/context/AuthDialogContext';

const Footer = () => {
  const { isAuthenticated, openSignIn } = useAuthDialog();

  // Wrapper handler for protected links
  const handleProtectedClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault(); // stop navigation
      openSignIn('/dashboard'); // open login/signup dialog
    }
  };

  return (
    <footer className='section-t-space footer-section-2 footer-color-3 mt-16'>
      <div className='container-fluid-lg'>
        <div className='main-footer'>
          <div className='row g-md-4 gy-sm-5'>
            {/* Logo & Social */}
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
                    href='https://accounts.google.com/signin/v2/identifier'
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

            {/* Quick Links (Public) */}
            <div className='col-xxl-3 col-xl-4 col-sm-6'>
              <div className='footer-title'>
                <h4 className='text-white'>Quick Links</h4>
              </div>
              <ul className='footer-list footer-contact footer-list-light'>
                <li>
                  <Link
                    to='#'
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
                    to='/terms-conditions'
                    className='light-text'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to='/contact-us'
                    className='light-text'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to='/publish-book'
                    className='light-text'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Publish With Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Useful Links (Protected) */}
            <div className='col-xxl-3 col-xl-4 col-sm-6'>
              <div className='footer-title'>
                <h4 className='text-white'>Useful Link</h4>
              </div>
              <ul className='footer-list footer-list-light footer-contact'>
                <li>
                  <Link
                    to='/dashboard?tab=orders'
                    className='light-text'
                    onClick={(e) => handleProtectedClick(e)}
                  >
                    Your Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to='/dashboard?tab=dashboard'
                    className='light-text'
                    onClick={(e) => handleProtectedClick(e)}
                  >
                    Your Account
                  </Link>
                </li>
                <li>
                  <Link
                    to='/dashboard?tab=orders'
                    className='light-text'
                    onClick={(e) => handleProtectedClick(e)}
                  >
                    Track Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to='/dashboard?tab=wishlist'
                    className='light-text'
                    onClick={(e) => handleProtectedClick(e)}
                  >
                    Your Wishlist
                  </Link>
                </li>
              </ul>
            </div>

            {/* Store Information */}
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
              </ul>
            </div>
          </div>
        </div>

        {/* Sub Footer */}
        <div className='sub-footer sub-footer-lite section-b-space section-t-space'>
          <div className='left-footer w-full text-center'>
            <p className='light-text'>© 2024 Apsra Kitab Ghar. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
