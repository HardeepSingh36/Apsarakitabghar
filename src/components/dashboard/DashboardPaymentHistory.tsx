import React from 'react';

const DashboardPaymentHistory: React.FC = () => (
  <div className='dashboard-order'>
    <div className='title'>
      <h2>Payment History</h2>
      <span className='title-leaf title-leaf-gray'>
        <svg className='icon-width bg-gray'>
          <use xlinkHref='assets/svg/leaf.svg#leaf'></use>
        </svg>
      </span>
    </div>
    <div className='order-contain'>
      {/* Example payment history row, replicate as needed */}
      <div className='order-box dashboard-bg-box'>
        <div className='order-container'>
          <div className='order-icon'>
            <i data-feather='credit-card'></i>
          </div>
          <div className='order-detail'>
            <h4>
              Paid <span className='success-bg'>Success</span>
            </h4>
            <h6 className='text-content'>Order #123456 | 15 Sep 2025</h6>
          </div>
        </div>
        <div className='product-order-detail'>
          <div className='order-wrap'>
            <h3>Amount: $106.58</h3>
            <p className='text-content'>Payment via Credit Card (**** 2548)</p>
            <ul className='product-size'>
              <li>
                <div className='size-box'>
                  <h6 className='text-content'>Status : </h6>
                  <h5 className='theme-color'>Completed</h5>
                </div>
              </li>
              <li>
                <div className='size-box'>
                  <h6 className='text-content'>Transaction ID : </h6>
                  <h5>TXN987654321</h5>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardPaymentHistory;
