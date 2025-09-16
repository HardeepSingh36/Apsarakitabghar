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
      {/* Example order box, replicate as needed */}
      <div className='order-box dashboard-bg-box'>
        <div className='order-container'>
          <div className='order-icon'>
            <i data-feather='box'></i>
          </div>
          <div className='order-detail'>
            <h4>
              Delivers <span>Pending</span>
            </h4>
            <h6 className='text-content'>
              Gouda parmesan caerphilly mozzarella cottage cheese cauliflower cheese taleggio gouda.
            </h6>
          </div>
        </div>
        <div className='product-order-detail'>
          <a href='product-left-thumbnail.html' className='order-image'>
            <img src='assets/images/vegetable/product/1.png' className='blur-up lazyload' alt='' />
          </a>
          <div className='order-wrap'>
            <a href='product-left-thumbnail.html'>
              <h3>Fantasy Crunchy Choco Chip Cookies</h3>
            </a>
            <p className='text-content'>
              Cheddar dolcelatte gouda. Macaroni cheese cheese strings feta halloumi cottage cheese
              jarlsberg cheese triangles say cheese.
            </p>
            <ul className='product-size'>
              <li>
                <div className='size-box'>
                  <h6 className='text-content'>Price : </h6>
                  <h5>$20.68</h5>
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
                  <h5>Fresho</h5>
                </div>
              </li>
              <li>
                <div className='size-box'>
                  <h6 className='text-content'>Quantity : </h6>
                  <h5>250 G</h5>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardOrders;
