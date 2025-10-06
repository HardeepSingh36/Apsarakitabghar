import { useAppSelector } from '@/app/hooks';
import type { RootState } from '@/app/store';
import React, { useState } from 'react';
import ChangePasswordForm from './ChangePasswordForm';
import EditProfileModal from './EditProfileModal';
import { useAppDispatch } from '@/app/hooks';
import { updateUser } from '@/features/auth/authSlice';
import { updateProfileService } from '@/services/authService';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const DashboardProfile: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const closeEditModal = () => setShowEditModal(false);
  const openEditModal = () => setShowEditModal(true);

  // Profile update handler
  const handleProfileUpdate = async (profileData: Record<string, any>) => {
    setEditLoading(true);
    try {
      const response = await updateProfileService(profileData);
      if (response.status === 'success' && response.data) {
        dispatch(updateUser(response.data));
        toast.success('Profile updated successfully!');
        setShowEditModal(false);
      } else {
        toast.error(response.message || 'Failed to update profile');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update profile');
    } finally {
      setEditLoading(false);
    }
  };

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString || dateString === '0000-00-00 00:00:00') return 'Not provided';
    try {
      return new Date(dateString).toLocaleDateString('en-GB');
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <div className='dashboard-profile'>
      <div className='title'>
        <h2>My Profile</h2>
        <span className='title-leaf'>
          <svg className='icon-width bg-gray'>
            <use xlinkHref='assets/svg/leaf.svg#leaf'></use>
          </svg>
        </span>
      </div>
      <div className='profile-about dashboard-bg-box !mt-0'>
        <div className='row'>
          <div className='col-xxl-7'>
            <div className='dashboard-title mb-3'>
              <h3>Profile</h3>
            </div>
            <div className='table-responsive'>
              <table className='table !mb-0'>
                <tbody>
                  <tr>
                    <td>Name :</td>
                    <td>{user?.full_name || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td>Username :</td>
                    <td>{user?.username || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td>Gender :</td>
                    <td>{user?.gender || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td>Date of Birth :</td>
                    <td>{user?.dob ? formatDate(user.dob) : 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td>Phone Number :</td>
                    <td>
                      <Link to='#' onClick={(e) => e.preventDefault()}>
                        {user?.mobile || user?.phone_number || 'Not provided'}
                      </Link>
                    </td>
                  </tr>
                  {/* <tr>
                    <td>Role :</td>
                    <td style={{ textTransform: 'capitalize' }}>{user?.role || 'Not specified'}</td>
                  </tr> */}
                  {/* <tr>
                    <td>Status :</td>
                    <td style={{ textTransform: 'capitalize' }}>
                      {user?.status || 'Not specified'}
                    </td>
                  </tr> */}
                  <tr>
                    <td>Member Since :</td>
                    <td>{user?.created_at ? formatDate(user.created_at) : 'Not available'}</td>
                  </tr>
                  <tr>
                    <td>Last Login :</td>
                    <td>{user?.last_login ? formatDate(user.last_login) : 'Not available'}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <button
                        type='button'
                        className='!text-[15px] text-emerald-600'
                        onClick={openEditModal}
                      >
                        Edit Profile
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='dashboard-title mb-3'>
              <h3>Login Details</h3>
            </div>
            <div className='table-responsive'>
              <table className='table'>
                <tbody>
                  <tr>
                    <td>Email :</td>
                    <td>{user?.email}</td>
                  </tr>
                  <tr>
                    <td>Password :</td>
                    <td>●●●●●●</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='col-xxl-5'>
            <div className='profile-image'>
              <img
                src={'assets/images/inner-page/dashboard-profile.png'}
                className='img-fluid blur-up lazyload'
                alt={user?.full_name || 'Profile'}
                onError={(e) => {
                  // Fallback to default image if avatar fails to load
                  e.currentTarget.src = 'assets/images/inner-page/dashboard-profile.png';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Form */}
      <ChangePasswordForm className='mt-4' />
      <EditProfileModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        user={user}
        onSave={handleProfileUpdate}
        loading={editLoading}
      />
    </div>
  );
};

export default DashboardProfile;
