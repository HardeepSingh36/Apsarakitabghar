import React from 'react';

const DashboardAddress: React.FC = () => (
  <div className='dashboard-address'>
    <div className='title title-flex'>
      <div>
        <h2>My Address Book</h2>
        <span className='title-leaf'>
          <svg className='icon-width bg-gray'>
            <use xlinkHref='assets/svg/leaf.svg#leaf'></use>
          </svg>
        </span>
      </div>
      <button
        className='btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3'
        data-bs-toggle='modal'
        data-bs-target='#add-address'
      >
        <i data-feather='plus' className='me-2'></i> Add New Address
      </button>
    </div>
    <div className='row g-sm-4 g-3'>
      {/* Example address box, replicate as needed */}
      <div className='col-xxl-4 col-xl-6 col-lg-12 col-md-6'>
        <div className='address-box'>
          <div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='jack'
                id='flexRadioDefault2'
                defaultChecked
              />
            </div>
            <div className='label'>
              <label>Home</label>
            </div>
            <div className='table-responsive address-table'>
              <table className='table'>
                <tbody>
                  <tr>
                    <td colSpan={2}>Jack Jennas</td>
                  </tr>
                  <tr>
                    <td>Address :</td>
                    <td>
                      <p>8424 James Lane South San Francisco, CA 94080</p>
                    </td>
                  </tr>
                  <tr>
                    <td>Pin Code :</td>
                    <td>+380</td>
                  </tr>
                  <tr>
                    <td>Phone :</td>
                    <td>+ 812-710-3798</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='button-group'>
            <button
              className='btn btn-sm add-button w-100'
              data-bs-toggle='modal'
              data-bs-target='#editProfile'
            >
              <i data-feather='edit'></i> Edit
            </button>
            <button
              className='btn btn-sm add-button w-100'
              data-bs-toggle='modal'
              data-bs-target='#removeProfile'
            >
              <i data-feather='trash-2'></i> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardAddress;
