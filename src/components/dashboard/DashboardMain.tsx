import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardHome from './DashboardHome';
import DashboardOrders from './DashboardOrders';
import DashboardWishlist from './DashboardWishlist';
import DashboardAddress from './DashboardAddress';
import DashboardPaymentHistory from './DashboardPaymentHistory';
import DashboardProfile from './DashboardProfile';
import DashboardReviews from './DashboardReviews';
import DashboardSupport from './DashboardSupport';
import BookQueries from './BookQueries';

const DashboardMain: React.FC = () => {
  const location = useLocation();

  // Track active tab from localStorage or query param
  const [activeTab, setActiveTab] = useState<string>(
    localStorage.getItem('activeDashboardTab') || 'dashboard'
  );

  // When ?tab= changes (like /dashboard?tab=orders)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
      localStorage.setItem('activeDashboardTab', tab);
    }
  }, [location.search]);

  // Allow persistence on reload
  useEffect(() => {
    const savedTab = localStorage.getItem('activeDashboardTab');
    if (savedTab) setActiveTab(savedTab);
  }, []);

  // Helper to toggle active pane
  const isActive = (tabId: string) =>
    activeTab === tabId ? 'tab-pane fade show active' : 'tab-pane fade';

  return (
    <div className='dashboard-right-sidebar'>
      <div className='tab-content' id='pills-tabContent'>
        <div className={isActive('dashboard')} id='pills-dashboard' role='tabpanel'>
          <DashboardHome />
        </div>
        <div className={isActive('orders')} id='pills-order' role='tabpanel'>
          <DashboardOrders />
        </div>
        <div className={isActive('wishlist')} id='pills-wishlist' role='tabpanel'>
          <DashboardWishlist />
        </div>
        <div className={isActive('reviews')} id='pills-reviews' role='tabpanel'>
          <DashboardReviews />
        </div>
        <div className={isActive('address')} id='pills-address' role='tabpanel'>
          <DashboardAddress />
        </div>
        <div className={isActive('payment')} id='pills-payment' role='tabpanel'>
          <DashboardPaymentHistory />
        </div>
        <div className={isActive('profile')} id='pills-profile' role='tabpanel'>
          <DashboardProfile />
        </div>
        <div className={isActive('support')} id='pills-support' role='tabpanel'>
          <DashboardSupport />
        </div>
        <div className={isActive('book-queries')} id='pills-book-queries' role='tabpanel'>
          <BookQueries />
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
