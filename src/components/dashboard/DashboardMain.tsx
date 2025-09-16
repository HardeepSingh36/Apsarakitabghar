import React from 'react';
import DashboardHome from './DashboardHome';
import DashboardOrders from './DashboardOrders';
import DashboardWishlist from './DashboardWishlist';
import DashboardAddress from './DashboardAddress';
import DashboardPaymentHistory from './DashboardPaymentHistory';
import DashboardProfile from './DashboardProfile';

const DashboardMain: React.FC = () => (
  <div className='dashboard-right-sidebar'>
    <div className='tab-content' id='pills-tabContent'>
      <div className='tab-pane fade show active' id='pills-dashboard' role='tabpanel'>
        <DashboardHome />
      </div>
      <div className='tab-pane fade' id='pills-order' role='tabpanel'>
        <DashboardOrders />
      </div>
      <div className='tab-pane fade' id='pills-wishlist' role='tabpanel'>
        <DashboardWishlist />
      </div>
      <div className='tab-pane fade' id='pills-address' role='tabpanel'>
        <DashboardAddress />
      </div>
      <div className='tab-pane fade' id='pills-payment' role='tabpanel'>
        <DashboardPaymentHistory />
      </div>
      <div className='tab-pane fade' id='pills-profile' role='tabpanel'>
        <DashboardProfile />
      </div>
    </div>
  </div>
);

export default DashboardMain;
