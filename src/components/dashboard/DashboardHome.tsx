import React, { useState, useEffect } from 'react';
// import { useAppSelector } from '@/app/hooks';
// import type { RootState } from '@/app/store';
import { getUserStats, type UserStatsResponse } from '@/services/userStatsService';
import toast from 'react-hot-toast';

const DashboardHome: React.FC = () => {
  // const user = useAppSelector((state: RootState) => state.auth.user);
  const [userStats, setUserStats] = useState<UserStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user statistics
  const fetchUserStats = async () => {
    try {
      setLoading(true);
      const stats = await getUserStats();
      setUserStats(stats);
    } catch (error) {
      console.error('Error fetching user stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user statistics on component mount
  useEffect(() => {
    fetchUserStats();
  }, []);

  return (
    <div className='dashboard-home'>
      <div className='title'>
        <h2>My Dashboard</h2>
        <div className='d-flex align-items-center gap-3'>
          <span className='title-leaf'>
            <svg className='icon-width bg-gray'>
              <use xlinkHref='assets/svg/leaf.svg#leaf'></use>
            </svg>
          </span>
        </div>
      </div>
      <div className='total-box !mt-0'>
        <div className='row g-sm-4 g-3'>
          <div className='col-xxl-4 col-lg-6 col-md-4 col-sm-6'>
            <div className='total-contain'>
              <img src='assets/images/svg/order.svg' className='img-1 blur-up lazyload' alt='' />
              <img src='assets/images/svg/order.svg' className='blur-up lazyload' alt='' />
              <div className='total-detail'>
                <h5>Total Orders</h5>
                <h3>
                  {loading ? (
                    <div className='spinner-border spinner-border-sm' role='status'>
                      <span className='visually-hidden'>Loading...</span>
                    </div>
                  ) : (
                    userStats?.data.summary.total_orders || 0
                  )}
                </h3>
              </div>
            </div>
          </div>
          <div className='col-xxl-4 col-lg-6 col-md-4 col-sm-6'>
            <div className='total-contain'>
              <img src='assets/images/svg/pending.svg' className='img-1 blur-up lazyload' alt='' />
              <img src='assets/images/svg/pending.svg' className='blur-up lazyload' alt='' />
              <div className='total-detail'>
                <h5>Pending Orders</h5>
                <h3>
                  {loading ? (
                    <div className='spinner-border spinner-border-sm' role='status'>
                      <span className='visually-hidden'>Loading...</span>
                    </div>
                  ) : (
                    userStats?.data.summary.pending_orders || 0
                  )}
                </h3>
              </div>
            </div>
          </div>
          <div className='col-xxl-4 col-lg-6 col-md-4 col-sm-6'>
            <div className='total-contain'>
              <img src='assets/images/svg/wishlist.svg' className='img-1 blur-up lazyload' alt='' />
              <img src='assets/images/svg/wishlist.svg' className='blur-up lazyload' alt='' />
              <div className='total-detail'>
                <h5>Total Wishlist</h5>
                <h3>
                  {loading ? (
                    <div className='spinner-border spinner-border-sm' role='status'>
                      <span className='visually-hidden'>Loading...</span>
                    </div>
                  ) : (
                    userStats?.data.summary.total_wishlists || 0
                  )}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row g-4'>
        {/* Recent Order Activity */}
        {userStats?.data.recent_activity?.recent_order && (
          <div className='col-xxl-6'>
            <div className='dashboard-content-title'>
              <h4>Recent Order</h4>
            </div>
            <div className='dashboard-detail'>
              <h6 className='text-content'>
                Order: <strong>{userStats.data.recent_activity.recent_order.order_number}</strong>
              </h6>
              <h6 className='text-content'>
                Status:{' '}
                <span
                  className={`badge ${
                    userStats.data.recent_activity.recent_order.status === 'pending'
                      ? 'bg-warning text-dark'
                      : userStats.data.recent_activity.recent_order.status === 'delivered'
                      ? 'bg-success'
                      : 'bg-info'
                  }`}
                >
                  {userStats.data.recent_activity.recent_order.status.charAt(0).toUpperCase() +
                    userStats.data.recent_activity.recent_order.status.slice(1)}
                </span>
              </h6>
              <h6 className='text-content'>
                Amount:{' '}
                <strong>₹{userStats.data.recent_activity.recent_order.total.toFixed(2)}</strong>
              </h6>
              <h6 className='text-content'>
                Date:{' '}
                {new Date(
                  userStats.data.recent_activity.recent_order.created_at
                ).toLocaleDateString()}
              </h6>
            </div>
          </div>
        )}
        {/* <div className='col-12'>
          <div className='dashboard-content-title'>
            <h4>
              Address Book{' '}
              <button
                type='button'
                className='!text-[15px] !text-[#e42f22]'
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
                  className='!text-[15px] !text-[#e42f22]'
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
                  className='!text-[15px] !text-[#e42f22]'
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
    </div>
  );
};

export default DashboardHome;
