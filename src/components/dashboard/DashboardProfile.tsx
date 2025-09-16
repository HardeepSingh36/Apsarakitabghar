import React from 'react';

const DashboardProfile: React.FC = () => (
  <div className='dashboard-profile'>
    <div className='title'>
      <h2>My Profile</h2>
      <span className='title-leaf'>
        <svg className='icon-width bg-gray'>
          <use xlinkHref='assets/svg/leaf.svg#leaf'></use>
        </svg>
      </span>
    </div>
    <div className='profile-detail dashboard-bg-box'>
      <div className='dashboard-title'>
        <h3>Profile Name</h3>
      </div>
      <div className='profile-name-detail'>
        <div className='d-sm-flex align-items-center d-block'>
          <h3>Vicki E. Pope</h3>
          <div className='product-rating profile-rating'>
            <ul className='rating'>
              <li>
                <i data-feather='star' className='fill'></i>
              </li>
              <li>
                <i data-feather='star' className='fill'></i>
              </li>
              <li>
                <i data-feather='star' className='fill'></i>
              </li>
              <li>
                <i data-feather='star'></i>
              </li>
              <li>
                <i data-feather='star'></i>
              </li>
            </ul>
          </div>
        </div>
        <a href='javascript:void(0)' data-bs-toggle='modal' data-bs-target='#editProfile'>
          Edit
        </a>
      </div>
      <div className='location-profile'>
        <ul>
          <li>
            <div className='location-box'>
              <i data-feather='map-pin'></i>
              <h6>Downers Grove, IL</h6>
            </div>
          </li>
          <li>
            <div className='location-box'>
              <i data-feather='mail'></i>
              <h6>vicki.pope@gmail.com</h6>
            </div>
          </li>
          <li>
            <div className='location-box'>
              <i data-feather='check-square'></i>
              <h6>Licensed for 2 years</h6>
            </div>
          </li>
        </ul>
      </div>
      <div className='profile-description'>
        <p>
          Residences can be classified by and how they are connected to neighbouring residences and
          land. Different types of housing tenure can be used for the same physical type.
        </p>
      </div>
    </div>
    <div className='profile-about dashboard-bg-box'>
      <div className='row'>
        <div className='col-xxl-7'>
          <div className='dashboard-title mb-3'>
            <h3>Profile About</h3>
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
                  <td>
                    <a href='javascript:void(0)'>
                      vicki.pope@gmail.com{' '}
                      <span data-bs-toggle='modal' data-bs-target='#editProfile'>
                        Edit
                      </span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Password :</td>
                  <td>
                    <a href='javascript:void(0)'>
                      ●●●●●●{' '}
                      <span data-bs-toggle='modal' data-bs-target='#editProfile'>
                        Edit
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

export default DashboardProfile;
