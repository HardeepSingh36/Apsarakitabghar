import { useEffect } from 'react';

interface DashboardSidebarProps {
  show: boolean;
  onClose: () => void;
}

const DashboardSidebar = ({ show, onClose }: DashboardSidebarProps) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  return (
    <>
      <div
        className={`fixed ${
          !show && 'hidden -z-2'
        } top-0 left-0 w-screen h-screen bg-black/20 z-40 lg:hidden`}
      ></div>
      <div
        className={`dashboard-left-sidebar ${show ? 'show !z-50' : ''}`}
        style={{ scrollbarWidth: 'none' }}
      >
        <div className='close-button d-flex d-lg-none'>
          <button className='close-sidebar' onClick={onClose}>
            <i className='fa-solid fa-xmark'></i>
          </button>
        </div>
        <div className='profile-box'>
          <div className='cover-image'>
            <img
              src='assets/images/inner-page/cover-img.jpg'
              className='img-fluid blur-up lazyload'
              alt=''
            />
          </div>
          <div className='profile-contain'>
            <div className='profile-image'>
              <div className='position-relative'>
                <img
                  src='assets/images/inner-page/user/1.jpg'
                  className='blur-up lazyload update_img'
                  alt=''
                />
                <div className='cover-icon'>
                  <i className='fa-solid fa-pen'>
                    <input type='file' onChange={() => {}} />
                  </i>
                </div>
              </div>
            </div>
            <div className='profile-name'>
              <h3>Vicki E. Pope</h3>
              <h6 className='text-content'>vicki.pope@gmail.com</h6>
            </div>
          </div>
        </div>
        <ul className='nav nav-pills user-nav-pills' id='pills-tab' role='tablist'>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link active'
              id='pills-dashboard-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-dashboard'
              type='button'
              onClick={onClose}
            >
              <i data-feather='home'></i> DashBoard
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link'
              id='pills-order-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-order'
              type='button'
              onClick={onClose}
            >
              <i data-feather='shopping-bag'></i>Order
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link'
              id='pills-wishlist-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-wishlist'
              type='button'
              onClick={onClose}
            >
              <i data-feather='heart'></i> Wishlist
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link'
              id='pills-reviews-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-reviews'
              type='button'
              onClick={onClose}
            >
              <i data-feather='star'></i> Reviews
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link'
              id='pills-payment-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-payment'
              type='button'
              role='tab'
              onClick={onClose}
            >
              <i data-feather='credit-card'></i> Payment History
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link'
              id='pills-support-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-support'
              type='button'
              role='tab'
              onClick={onClose}
            >
              <i data-feather='help-circle'></i> Support
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link'
              id='pills-address-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-address'
              type='button'
              role='tab'
              onClick={onClose}
            >
              <i data-feather='map-pin'></i>Address
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link'
              id='pills-profile-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-profile'
              type='button'
              role='tab'
              onClick={onClose}
            >
              <i data-feather='user'></i> Profile
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DashboardSidebar;
