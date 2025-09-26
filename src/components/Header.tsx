import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeaderTop from './HeaderTop';
import MainNav from './MainNav';
import RightSideBox from './RightSideBox';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  // Define pages that require a different background and shadow
  const specialPages = ['/about', '/contact', '/query-form', '/term-conditions', '/privacy-policy'];
  const isSpecialPage = specialPages.includes(location.pathname);

  return (
    <header className=''>
      <HeaderTop />

      <div
        className={`top-nav top-header sticky-header ${
          isSpecialPage ? 'bg-[#f8f8f8] shadow-md shadow-black/15' : ''
        }`}
      >
        <div className='container-fluid-lg'>
          <div className='row'>
            <div className='col-12'>
              <div className='navbar-top'>
                <button
                  className='navbar-toggler d-xl-none d-inline navbar-menu-button me-2'
                  type='button'
                  data-bs-toggle='offcanvas'
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <span className='navbar-toggler-icon'>
                    <i className='fa-solid fa-bars'></i>
                  </span>
                </button>
                <Link to='/' className='web-logo nav-logo'>
                  <img src='/assets/logo/apsra.svg' className='img-fluid lazyload' alt='' />
                </Link>

                <div className='header-nav-middle'>
                  <MainNav showMenu={showMenu} setShowMenu={setShowMenu} />
                </div>

                <RightSideBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
