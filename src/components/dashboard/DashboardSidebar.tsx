import { useEffect, useRef, useState } from 'react';
import {
  LogOut,
  Home,
  ShoppingBag,
  Heart,
  Book,
  // CreditCard,
  HelpCircle,
  MapPin,
  User,
} from 'react-feather';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LogoutConfirmationModal from './LogoutConfirmationModal';
import { useAuthDialog } from '@/context/AuthDialogContext';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { updateUser } from '@/features/auth/authSlice';
import { uploadAvatar } from '@/services/authService';
import { IMAGE_PATH } from '@/services/API';
import type { RootState } from '@/app/store';
import { AVATAR_BASE_URL } from '@/constants';

interface DashboardSidebarProps {
  show: boolean;
  onClose: () => void;
}

const DashboardSidebar = ({ show, onClose }: DashboardSidebarProps) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const { logout } = useAuthDialog();
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    setLogoutModalOpen(false);
    logout();
    navigate('/'); // Redirect to homepage
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, JPG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (max 3MB)
    const maxSize = 3 * 1024 * 1024; // 3MB in bytes
    if (file.size > maxSize) {
      toast.error('File size must be less than 3MB');
      return;
    }

    try {
      setIsUploadingAvatar(true);
      const response = await uploadAvatar(file);
      if (response.status === 'success' && response.data?.user) {
        dispatch(updateUser({ avatar: response.data.user.avatar }));
        toast.success('Profile picture updated successfully!');
      } else {
        toast.error(response.message || 'Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update profile picture');
    } finally {
      setIsUploadingAvatar(false);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Fallback to default image if user avatar fails to load
    event.currentTarget.src = 'assets/images/inner-page/user/1.jpg';
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
        ref={sidebarRef}
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
                  src={
                    user?.avatar
                      ? `${AVATAR_BASE_URL}${user.avatar}`
                      : 'assets/images/inner-page/user/1.jpg'
                  }
                  className='blur-up lazyload update_img mx-auto'
                  alt='Profile'
                  onError={handleImageError}
                  style={{ opacity: isUploadingAvatar ? 0.7 : 1 }}
                />
                <div
                  className='cover-icon'
                  onClick={!isUploadingAvatar ? handleAvatarClick : undefined}
                  style={{
                    cursor: isUploadingAvatar ? 'not-allowed' : 'pointer',
                    opacity: isUploadingAvatar ? 0.7 : 1,
                  }}
                  title={isUploadingAvatar ? 'Uploading...' : 'Change profile picture'}
                >
                  <i className={`fa-solid ${isUploadingAvatar ? 'fa-spinner fa-spin' : 'fa-pen'}`}>
                    <input
                      ref={fileInputRef}
                      type='file'
                      accept='image/jpeg,image/jpg,image/png,image/webp'
                      onChange={handleAvatarChange}
                      style={{ display: 'none' }}
                      disabled={isUploadingAvatar}
                    />
                  </i>
                </div>
              </div>
            </div>
            <div className='profile-name'>
              <h3>{user?.full_name}</h3>
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
              id='pills-book-queries-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-book-queries'
              type='button'
              onClick={onClose}
            >
              <Book size={16} className='me-2' /> My Book Requests
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
