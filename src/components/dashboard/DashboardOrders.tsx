import { useCurrency } from '@/context/CurrencyContext';
import React, { useState, useEffect } from 'react';
import { getOrdersList, type Order } from '@/services/ordersService';
import toast from 'react-hot-toast';

const DashboardOrders: React.FC = () => {
  const { currency } = useCurrency();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');

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
      {/* Filters */}
      <div className='mb-4'>
        <div className='row align-items-center'>
          <div className='col-md-6'>
            <select
              className='form-select'
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
          <div className='text-center py-5'>
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
            <p className='mt-2'>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className='text-center py-5'>
            <h4>No Orders Found</h4>
            <p className='text-muted'>You haven't placed any orders yet.</p>
            <a href='/books' className='btn btn-primary'>
              Start Shopping
            </a>
          </div>
        ) : (
          <ul className='space-y-3 w-full'>
            {orders.map((order) => (
              <li
                key={order.id}
                className='!flex !items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition'
              >
                {/* Order Icon */}
                <div className='w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center'>
                  <i className='fa-solid fa-receipt text-gray-500 text-xl'></i>
                </div>

                {/* Order Details */}
                <div className='ml-4 flex-grow'>
                  <div className='flex justify-between items-start mb-2'>
                    <div>
                      <h4 className='text-lg font-semibold mb-1'>Order #{order.order_number}</h4>
                      <p className='text-sm text-gray-500 m-0'>
                        {order.items_count} item(s) • {order.total_quantity} book(s)
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${getStatusBadgeClass(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className='row'>
                    <div className='col-md-6'>
                      <p className='text-sm text-gray-700 m-0 mb-1'>
                        <strong>Total:</strong>{' '}
                        <span className='text-theme font-semibold'>
                          {currency.sign}
                          {order.total_amount.toFixed(2)}
                        </span>
                      </p>
                      <p className='text-sm text-gray-700 m-0 mb-1'>
                        <strong>Payment ID:</strong> {order.transaction_id}
                      </p>
                      {order.shipping_amount > 0 && (
                        <p className='text-sm text-gray-700 m-0'>
                          <strong>Shipping:</strong> {currency.sign}
                          {order.shipping_amount.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <div className='col-md-6'>
                      <p className='text-sm text-gray-700 m-0 mb-1'>
                        <strong>Delivery to:</strong> {order.address.name}
                      </p>
                      <p className='text-sm text-gray-500 m-0'>
                        {order.address.city}, {order.address.state}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Date and Actions */}
                <div className='text-right ml-4'>
                  <p className='text-sm text-muted m-0 mb-2'>
                    Placed on: {formatDate(order.created_at)}
                  </p>

                  <div className='flex flex-col gap-2'>
                    {order.can_cancel && !order.is_cancelled && (
                      <button className='btn btn-sm btn-outline-danger'>Cancel Order</button>
                    )}
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
