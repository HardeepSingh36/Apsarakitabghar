import React from 'react';

const DashboardOrders: React.FC = () => (
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
      {/* Book order example */}
      <div className='order-box dashboard-bg-box'>
        <div className='order-container'>
          <div className='order-icon'>
            <i data-feather='book'></i>
          </div>
          <div className='order-detail'>
            <h4>
              Delivery <span>Pending</span>
            </h4>
            <h6 className='text-content'>
              "The Lost Tales" by Harbhajan Singh is on its way to you!
            </h6>
          </div>
        </div>
        <div className='product-order-detail'>
          <a href='/books/32' className='order-image h-full w-36'>
            <img
              src='/assets/images/book/product/32.jpg'
              className='blur-up lazyload'
              alt='The Lost Tales'
            />
          </a>
          <div className='order-wrap'>
            <a href='/books/32'>
              <h3>The Lost Tales</h3>
            </a>
            <p className='text-content'>
              Dive into adventure and mystery with this bestselling book. 320 pages, paperback
              edition.
            </p>
            <ul className='product-size'>
              <li>
                <div className='size-box'>
                  <h6 className='text-content'>Price : </h6>
                  <h5>₹449</h5>
                </div>
              </li>
              <li>
                <div className='size-box'>
                  <h6 className='text-content'>Rate : </h6>
                  <div className='product-rating ms-2'>
                    <ul className='rating'>
                      <li>
                        <i data-feather='star' className='fill'></i>
                      </li>
                      <li>
                        <i data-feather='star' className='fill'></i>
                      </li>
                      <li>
                        <i data-feather='star' className='fill'></i>
                      </li>
                      <li>
                        <i data-feather='star' className='fill'></i>
                      </li>
                      <li>
                        <i data-feather='star'></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div className='size-box'>
                  <h6 className='text-content'>Sold By : </h6>
                  <h5>Super Admin</h5>
                </div>
              </li>
              <li>
                <div className='size-box'>
                  <h6 className='text-content'>Quantity : </h6>
                  <h5>1</h5>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Add more book orders as needed */}
    </div>
  </div>
);

export default DashboardOrders;
