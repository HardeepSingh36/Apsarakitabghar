import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderTop from './HeaderTop';
import MainNav from './MainNav';
import RightSideBox from './RightSideBox';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className=''>
      <HeaderTop />

      <div className='top-nav top-header sticky-header'>
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
