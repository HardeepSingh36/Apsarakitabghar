import { useCurrency } from '@/context/CurrencyContext';
import React, { useState, useEffect } from 'react';
import { getOrdersList } from '@/services/ordersService';
import type { Order } from '@/services/ordersService';
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
