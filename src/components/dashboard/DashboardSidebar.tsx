import { useEffect, useState } from 'react';
import {
  LogOut,
  Home,
  ShoppingBag,
  Heart,
  // CreditCard,
  HelpCircle,
  MapPin,
  User,
} from 'react-feather';
import { useNavigate } from 'react-router-dom';
import LogoutConfirmationModal from './LogoutConfirmationModal';
import { useAuthDialog } from '@/context/AuthDialogContext';

interface DashboardSidebarProps {
  show: boolean;
  onClose: () => void;
}

const DashboardSidebar = ({ show, onClose }: DashboardSidebarProps) => {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const { logout } = useAuthDialog();
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogoutModalOpen(false);
    logout();
    navigate('/'); // Redirect to homepage
  };

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
                  className='blur-up lazyload update_img mx-auto'
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
              {/* <h6 className='text-content'>vicki.pope@gmail.com</h6> */}
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
              <Home size={16} className='me-2' /> DashBoard
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
              <ShoppingBag size={16} className='me-2' /> Order
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
              <Heart size={16} className='me-2' /> Wishlist
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
              <HelpCircle size={16} className='me-2' /> Support
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
              <MapPin size={16} className='me-2' /> Address
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
              <User size={16} className='me-2' /> Profile
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link'
              type='button'
              role='tab'
              onClick={() => setLogoutModalOpen(true)}
            >
              <LogOut size={16} className='me-2' /> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default DashboardSidebar;
