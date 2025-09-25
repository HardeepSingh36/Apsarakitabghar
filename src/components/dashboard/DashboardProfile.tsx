import { useAppSelector } from '@/app/hooks';
import type { RootState } from '@/app/store';
import React from 'react';

const DashboardProfile: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
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
                    <td>Gender :</td>
                    <td>Female</td>
                  </tr>
                  <tr>
                    <td>Birthday :</td>
                    <td>21/05/1997</td>
                  </tr>
                  <tr>
                    <td>Phone Number :</td>
                    <td>
                      <a href='javascript:void(0)'> +91 846 - 547 - 210</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Address :</td>
                    <td>549 Sulphur Springs Road, Downers, IL</td>
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
                src='assets/images/inner-page/dashboard-profile.png'
                className='img-fluid blur-up lazyload'
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
