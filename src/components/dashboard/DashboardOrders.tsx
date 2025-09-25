import { useCurrency } from '@/context/CurrencyContext';
import React from 'react';

const DashboardOrders: React.FC = () => {
  const { currency } = useCurrency();
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
      <div className='order-contain'>
        <ul className='space-y-2 w-full'>
          <li className='!flex !items-center bg-white shadow-md rounded-lg p-3 hover:shadow-lg transition'>
            {/* Book Image */}
            <div className='w-20 h-20 flex-shrink-0'>
              <img
                src='/assets/images/book/product/32.jpg'
                alt='The Lost Tales'
                className='w-full h-full object-cover rounded-md'
              />
            </div>

            {/* Order Details */}
            <div className='ml-4 flex-grow'>
              <h4 className='text-lg font-semibold'>The Lost Tales</h4>
              <p className='text-sm text-gray-500 m-0'>by Harbhajan Singh</p>
              <p className='text-sm text-gray-700 m-0'>Order ID: #12345</p>
              <p className='text-sm font-medium text-gray-800 m-0'>
                Total: <span className='text-theme'>{currency.sign}449</span>
              </p>
            </div>

            {/* Status + Actions */}
            <div className='text-right'>
              <p className='text-sm text-muted m-0 mb-1'>Placed on: 15 Sep 2025</p>

              <p className='text-sm'>
                Status:{' '}
                <span className='px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-600'>
                  Pending
                </span>
              </p>
            </div>
          </li>

          {/* Add more orders as needed */}
        </ul>
      </div>
    </div>
  );
};

export default DashboardOrders;
