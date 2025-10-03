import { useAppSelector } from '@/app/hooks';
import type { RootState } from '@/app/store';
import React from 'react';

const DashboardProfile: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

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
              <table className='table'>
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
                      <a href='javascript:void(0)'>{user?.mobile || user?.phone_number || 'Not provided'}</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Role :</td>
                    <td style={{ textTransform: 'capitalize' }}>
                      {user?.role || 'Not specified'}
                    </td>
                  </tr>
                  <tr>
                    <td>Status :</td>
                    <td style={{ textTransform: 'capitalize' }}>
                      {user?.status || 'Not specified'}
                    </td>
                  </tr>
                  <tr>
                    <td>Member Since :</td>
                    <td>{user?.created_at ? formatDate(user.created_at) : 'Not available'}</td>
                  </tr>
                  <tr>
                    <td>Last Login :</td>
                    <td>{user?.last_login ? formatDate(user.last_login) : 'Not available'}</td>
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
                    <td>
                      <a href='javascript:void(0)'>
                        ●●●●●●{' '}
                        <span data-bs-toggle='modal' data-bs-target='#editProfile'>
                          Change Password
                        </span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='col-xxl-5'>
            <div className='profile-image'>
              <img
                src={
                    'assets/images/inner-page/dashboard-profile.png'
                }
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
    </div>
  );
};

export default DashboardProfile;
