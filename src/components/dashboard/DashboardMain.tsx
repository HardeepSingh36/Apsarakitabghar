import React from 'react';
import DashboardHome from './DashboardHome';
import DashboardOrders from './DashboardOrders';
import DashboardWishlist from './DashboardWishlist';
import DashboardAddress from './DashboardAddress';
import DashboardPaymentHistory from './DashboardPaymentHistory';
import DashboardProfile from './DashboardProfile';
import DashboardReviews from './DashboardReviews';

const tabIcons = {
  dashboard: 'home',
  order: 'shopping-bag',
  wishlist: 'heart',
  reviews: 'star',
  address: 'map-pin',
  payment: 'credit-card',
  profile: 'user',
};

const DashboardMain: React.FC = () => (
  <div className='dashboard-right-sidebar'>
    <div className='tab-content' id='pills-tabContent'>
      <div className='tab-pane fade show active' id='pills-dashboard' role='tabpanel'>
        <div className='tab-icon-title'>
          <i data-feather={tabIcons.dashboard}></i> DashBoard
        </div>
        <DashboardHome />
      </div>
      <div className='tab-pane fade' id='pills-order' role='tabpanel'>
        <div className='tab-icon-title'>
          <i data-feather={tabIcons.order}></i> Orders
        </div>
        <DashboardOrders />
      </div>
      <div className='tab-pane fade' id='pills-wishlist' role='tabpanel'>
        <div className='tab-icon-title'>
          <i data-feather={tabIcons.wishlist}></i> Wishlist
        </div>
        <DashboardWishlist />
      </div>
      <div className='tab-pane fade' id='pills-reviews' role='tabpanel'>
        <div className='tab-icon-title'>
          <i data-feather={tabIcons.reviews}></i> Reviews
        </div>
        <DashboardReviews />
      </div>
      <div className='tab-pane fade' id='pills-address' role='tabpanel'>
        <div className='tab-icon-title'>
          <i data-feather={tabIcons.address}></i> Address
        </div>
        <DashboardAddress />
      </div>
      <div className='tab-pane fade' id='pills-payment' role='tabpanel'>
        <div className='tab-icon-title'>
          <i data-feather={tabIcons.payment}></i> Payment History
        </div>
        <DashboardPaymentHistory />
      </div>
      <div className='tab-pane fade' id='pills-profile' role='tabpanel'>
        <div className='tab-icon-title'>
          <i data-feather={tabIcons.profile}></i> Profile
        </div>
        <DashboardProfile />
      </div>
    </div>
  </div>
);

export default DashboardMain;
