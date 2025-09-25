import React, { useState } from 'react';
import EditProfileModal from './EditProfileModal';
import { useAppSelector } from '@/app/hooks';
import type { RootState } from '@/app/store';

const DashboardHome: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [showEditModal, setShowEditModal] = useState(false);
  const openEditModal = () => setShowEditModal(true);
  const closeEditModal = () => setShowEditModal(false);

  return (
    <div className='dashboard-home'>
      <div className='title'>
        <h2>My Dashboard</h2>
        <span className='title-leaf'>
          <svg className='icon-width bg-gray'>
            <use xlinkHref='assets/svg/leaf.svg#leaf'></use>
          </svg>
        </span>
      </div>
      <div className='total-box !mt-0'>
        <div className='row g-sm-4 g-3'>
          <div className='col-xxl-4 col-lg-6 col-md-4 col-sm-6'>
            <div className='total-contain'>
              <img src='assets/images/svg/order.svg' className='img-1 blur-up lazyload' alt='' />
              <img src='assets/images/svg/order.svg' className='blur-up lazyload' alt='' />
              <div className='total-detail'>
                <h5>Total Order</h5>
                <h3>3658</h3>
              </div>
            </div>
          </div>
          <div className='col-xxl-4 col-lg-6 col-md-4 col-sm-6'>
            <div className='total-contain'>
              <img src='assets/images/svg/pending.svg' className='img-1 blur-up lazyload' alt='' />
              <img src='assets/images/svg/pending.svg' className='blur-up lazyload' alt='' />
              <div className='total-detail'>
                <h5>Total Pending Order</h5>
                <h3>254</h3>
              </div>
            </div>
          </div>
          <div className='col-xxl-4 col-lg-6 col-md-4 col-sm-6'>
            <div className='total-contain'>
              <img src='assets/images/svg/wishlist.svg' className='img-1 blur-up lazyload' alt='' />
              <img src='assets/images/svg/wishlist.svg' className='blur-up lazyload' alt='' />
              <div className='total-detail'>
                <h5>Total Wishlist</h5>
                <h3>32158</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row g-4'>
        <div className='col-xxl-6'>
          <div className='dashboard-content-title'>
            <h4>
              Contact Information{' '}
              <button
                type='button'
                className='!text-[15px] text-emerald-600'
                onClick={openEditModal}
              >
                Edit
              </button>
            </h4>
          </div>
          <div className='dashboard-detail'>
            <h6 className='text-content'>{user?.full_name}</h6>
            <h6 className='text-content'>{user?.email}</h6>
            <a href='javascript:void(0)'>Change Password</a>
          </div>
        </div>
        {/* <div className='col-12'>
          <div className='dashboard-content-title'>
            <h4>
              Address Book{' '}
              <button
                type='button'
                className='!text-[15px] text-emerald-600'
                onClick={openEditModal}
              >
                Edit
              </button>
            </h4>
          </div>
          <div className='row g-4'>
            <div className='col-xxl-6'>
              <div className='dashboard-detail'>
                <h6 className='text-content'>Default Billing Address</h6>
                <h6 className='text-content'>You have not set a default billing address.</h6>
                <button
                  type='button'
                  className='!text-[15px] text-emerald-600'
                  onClick={openEditModal}
                >
                  Edit Address
                </button>
              </div>
            </div>
            <div className='col-xxl-6'>
              <div className='dashboard-detail'>
                <h6 className='text-content'>Default Shipping Address</h6>
                <h6 className='text-content'>You have not set a default shipping address.</h6>
                <button
                  type='button'
                  className='!text-[15px] text-emerald-600'
                  onClick={openEditModal}
                >
                  Edit Address
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      {/* Modal for editing the profile */}
      <EditProfileModal isOpen={showEditModal} onClose={closeEditModal} />
    </div>
  );
};

export default DashboardHome;
