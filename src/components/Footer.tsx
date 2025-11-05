import { Link } from 'react-router-dom';
import { useAuthDialog } from '@/context/AuthDialogContext';
import { Heart } from 'react-feather';

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
    <footer className='section-t-space footer-section-2 bg-white !shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)] mt-4'>
      <div className='container-fluid-lg'>
        <div className='main-footer'>
          <div className='row g-md-4 gy-sm-5'>
            {/* Logo & Social */}
            <div className='col-xxl-3 col-xl-4 col-sm-6'>
              <Link to='/' className='foot-logo theme-logo'>
                <img src='/assets/logo/apsra.png' className='img-fluid blur-up lazyload' alt='' />
              </Link>
              <p className='information-text information-text-2 !text-[#4a5568]'>
                Your trusted destination for discovering and purchasing books across all genres.
                Bringing stories to life, one page at a time.
              </p>
              <ul className='social-icon'>
                <li className='!bg-white/20 hover:!bg-white/20'>
                  <a
                    href='https://www.facebook.com/'
                    className='!'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='fab fa-facebook-f'></i>
                  </a>
                </li>
                <li className='!bg-white/20 hover:!bg-white/20'>
                  <a
                    href='https://accounts.google.com/signin/v2/identifier'
                    className='!'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='fab fa-google'></i>
                  </a>
                </li>
                <li className='!bg-white/20 hover:!bg-white/20'>
                  <a
                    href='https://twitter.com/i/flow/login'
                    className='!'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='fab fa-twitter'></i>
                  </a>
                </li>
                <li className='!bg-white/20 hover:!bg-white/20'>
                  <a
                    href='https://www.instagram.com/apsra_kitab_ghar?igsh=bjY3MHlydmZsc3p0'
                    className='!'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='fab fa-instagram'></i>
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links (Public) */}
            <div className='col-xxl-3 col-xl-4 col-sm-6'>
              <div className='footer-title'>
                <h4 className=''>Quick Links</h4>
              </div>
              <ul className='footer-list footer-contact footer-list-light'>
                <li>
                  <Link
                    to='#'
                    className='hover:!text-[#4a5568] transition-colors'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to='/privacy-policy'
                    className='hover:!text-[#4a5568] transition-colors'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to='/terms-conditions'
                    className='hover:!text-[#4a5568] transition-colors'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to='/contact-us'
                    className='hover:!text-[#4a5568] transition-colors'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to='/publish-book'
                    className='hover:!text-[#4a5568] transition-colors'
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
                <h4 className=''>Useful Link</h4>
              </div>
              <ul className='footer-list footer-list-light footer-contact'>
                <li>
                  <Link
                    to='/dashboard?tab=orders'
                    className='hover:!text-[#4a5568] transition-colors'
                    onClick={(e) => handleProtectedClick(e)}
                  >
                    Your Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to='/dashboard?tab=dashboard'
                    className='hover:!text-[#4a5568] transition-colors'
                    onClick={(e) => handleProtectedClick(e)}
                  >
                    Your Account
                  </Link>
                </li>
                <li>
                  <Link
                    to='/dashboard?tab=orders'
                    className='hover:!text-[#4a5568] transition-colors'
                    onClick={(e) => handleProtectedClick(e)}
                  >
                    Track Orders
                  </Link>
                </li>
                <li>
                  <Link to='/wishlist' className='hover:!text-[#4a5568] transition-colors'>
                    Your Wishlist
                  </Link>
                </li>
              </ul>
            </div>

            {/* Store Information */}
            <div className='col-xxl-3 col-xl-4 col-sm-6'>
              <div className='footer-title'>
                <h4 className=''>Store information</h4>
              </div>
              <ul className='footer-address footer-contact'>
                <li>
                  <a href='javascript:void(0)' className='hover:!text-[#4a5568] transition-colors'>
                    <div className='inform-box flex-start-box'>
                      <i data-feather='map-pin' className='!'></i>
                      <p>Talwandi Sabo, Punjab 151302</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href='javascript:void(0)' className='hover:!text-[#4a5568] transition-colors'>
                    <div className='inform-box'>
                      <i data-feather='phone' className='!'></i>
                      <p>Call us: 123-456-7890</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href='javascript:void(0)' className='hover:!text-[#4a5568] transition-colors'>
                    <div className='inform-box'>
                      <i data-feather='mail' className='!'></i>
                      <p>Email Us: info@apsrakitabghar.com</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sub Footer */}
        <div className='sub-footer sub-footer-lite section-b-space section-t-space !border-t !border-black/20'>
          <div className='left-footer w-full text-center'>
            <p className=''>© 2025 Apsra Kitab Ghar. All rights reserved.</p>
            <p className='flex items-center justify-center'>Made with <span><Heart className='size-4 mx-1 text-red-500 fill-red-500'/></span> by Creative Web Solutions</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
