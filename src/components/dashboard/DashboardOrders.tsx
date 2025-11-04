import { useCurrency } from '@/context/CurrencyContext';
import React, { useState, useEffect } from 'react';
import { getOrdersList } from '@/services/ordersService';
import type { Order } from '@/services/ordersService';
import toast from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';

const DashboardOrders: React.FC = () => {
  const { currency } = useCurrency();
  const location = useLocation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [showWelcome, setShowWelcome] = useState(false);

  // Check if this is a new account from guest checkout
  useEffect(() => {
    if (location.state?.newAccount) {
      setShowWelcome(true);
      // Clear the state to avoid showing message on refresh
      window.history.replaceState({}, document.title);

      // Hide welcome message after 5 seconds
      setTimeout(() => {
        setShowWelcome(false);
      }, 8000);
    }
  }, [location]);

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = statusFilter ? { status: statusFilter } : undefined;
      const response = await getOrdersList(params);

      if (response.status === 'success') {
        setOrders(response.data.orders);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'confirmed':
        return 'bg-blue-100 text-blue-600';
      case 'processing':
        return 'bg-purple-100 text-purple-600';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-600';
      case 'delivered':
        return 'bg-green-100 text-green-600';
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      case 'refunded':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className='dashboard-order'>
      <div className='title'>
        <h2>My Orders History</h2>
        <span className='title-leaf title-leaf-gray'>
          <svg className='icon-width bg-gray'>
            <use xlinkHref='assets/svg/leaf.svg#leaf'></use>
          </svg>
        </span>
      </div>

      {/* Welcome Banner for New Accounts */}
      {showWelcome && (
        <div className='bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 mb-4 rounded-lg shadow-md animate-fade-in'>
          <div className='flex items-start'>
            <div className='flex-shrink-0'>
              <svg
                className='h-6 w-6 text-green-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div className='ml-3 flex-1'>
              <h3 className='text-lg font-semibold text-green-800 mb-1'>
                Welcome to Apsara Kitab Ghar! 🎉
              </h3>
              <p className='text-sm text-green-700'>
                Your order has been placed successfully and your account has been created! You can
                now track your orders, manage your wishlist, and enjoy personalized shopping
                experience.
              </p>
              <p className='text-xs text-green-600 mt-2'>
                💡 <strong>Tip:</strong> Your mobile number is your password. You can change it
                anytime in your profile settings.
              </p>
            </div>
            <button
              onClick={() => setShowWelcome(false)}
              className='flex-shrink-0 ml-3 text-green-500 hover:text-green-700'
            >
              <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className='mb-4'>
        <div className='flex flex-wrap items-center gap-4'>
          <div className='w-full sm:w-auto flex-grow max-w-sm'>
            <select
              className='form-select w-full'
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value=''>All Orders</option>
              <option value='pending'>Pending</option>
              <option value='confirmed'>Confirmed</option>
              <option value='processing'>Processing</option>
              <option value='shipped'>Shipped</option>
              <option value='delivered'>Delivered</option>
              <option value='cancelled'>Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className='order-contain'>
        {loading ? (
          <div className='text-center py-10 w-full'>
            <div className='spinner-border text-emerald-600' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
            <p className='mt-3 text-gray-600'>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className='text-center py-5 w-full'>
            <h4>No Orders Found</h4>
            <p className='text-muted'>You haven't placed any orders yet.</p>
            <Link to='/books' className='btn !bg-[#0da487] text-white max-w-sm mx-auto'>
              Start Shopping
            </Link>
          </div>
        ) : (
          <ul className='space-y-4 w-full max-w-full overflow-hidden'>
            {orders.map((order) => (
              <li
                key={order.id}
                className='bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition w-full'
              >
                <div className='flex flex-col md:flex-row gap-4'>
                  {/* Order Header - Always Visible */}
                  <div className='flex-grow'>
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3'>
                      <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
                        <h4 className='text-lg font-semibold m-0'>Order #{order.order_number}</h4>
                        <span
                          className={`px-3 py-1 text-xs rounded-full whitespace-nowrap w-fit ${getStatusBadgeClass(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className='text-sm text-gray-500 m-0'>
                        Placed on: {formatDate(order.created_at)}
                      </p>
                    </div>

                    {/* Order Items */}
                    <div className='mb-3'>
                      <p className='text-sm font-medium text-gray-700 mb-1'>
                        {order.items_count} item(s) • {order.total_quantity} book(s)
                      </p>
                      <div className='text-xs text-gray-500 space-y-1'>
                        {order.order_items.map((item) => (
                          <div key={item.item_id} className='flex justify-between'>
                            <span>
                              {item.book_title} (x{item.quantity})
                            </span>
                            <span className='text-gray-700'>
                              {currency.sign}
                              {item.total_price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3'>
                      <div className='space-y-1'>
                        <p className='text-sm text-gray-700 m-0'>
                          <strong>Total Amount:</strong>{' '}
                          <span className='text-theme font-semibold'>
                            {currency.sign}
                            {order.total_amount.toFixed(2)}
                          </span>
                        </p>
                        {order.shipping_amount > 0 && (
                          <p className='text-sm text-gray-700 m-0'>
                            <strong>Shipping:</strong> {currency.sign}
                            {order.shipping_amount.toFixed(2)}
                          </p>
                        )}
                        {order.tax_amount > 0 && (
                          <p className='text-sm text-gray-700 m-0'>
                            <strong>Tax:</strong> {currency.sign}
                            {order.tax_amount.toFixed(2)}
                          </p>
                        )}
                        <p className='text-sm text-gray-700 m-0'>
                          <strong>Payment ID:</strong> {order.transaction_id}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm text-gray-700 m-0 mb-1'>
                          <strong>Delivery to:</strong> {order.address.name}
                        </p>
                        <p className='text-sm text-gray-500 m-0'>
                          {order.address.city}, {order.address.state}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    {/* <div className='flex flex-wrap gap-2 justify-end pt-3 border-t'>
                      {order.can_cancel && !order.is_cancelled && (
                        <button className='btn !bg-[#bf2020] text-white hover:!bg-red-700 hover:scale-105 mx-auto sm:!mx-0 w-full sm:w-auto max-w-sm'>
                          Cancel Order
                        </button>
                      )}
                    </div> */}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination */}
        {pagination && pagination.total_pages > 1 && (
          <div className='mt-4 d-flex justify-content-center'>
            <nav>
              <ul className='pagination pagination-sm'>
                <li className={`page-item ${!pagination.has_prev ? 'disabled' : ''}`}>
                  <button className='page-link' disabled={!pagination.has_prev}>
                    Previous
                  </button>
                </li>
                <li className='page-item active'>
                  <span className='page-link'>{pagination.current_page}</span>
                </li>
                <li className={`page-item ${!pagination.has_next ? 'disabled' : ''}`}>
                  <button className='page-link' disabled={!pagination.has_next}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOrders;
