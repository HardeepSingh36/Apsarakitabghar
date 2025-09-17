import React from 'react';

const DashboardReviews: React.FC = () => (
  <div className='dashboard-reviews'>
    <div className='title'>
      <h2>My Reviews</h2>
      <span className='title-leaf title-leaf-gray'>
        <svg className='icon-width bg-gray'>
          <use xlinkHref='assets/svg/leaf.svg#leaf'></use>
        </svg>
      </span>
    </div>
    <div className='row g-sm-4 g-3'>
      {/* Example review item, replicate as needed */}
      <div className='col-xxl-4 col-lg-6 col-md-6 col-sm-12'>
        <div className='review-box dashboard-bg-box'>
          <div className='review-header d-flex align-items-center mb-2'>
            <img
              src='assets/images/vegetable/product/1.png'
              className='img-1 blur-up lazyload me-3'
              alt=''
              style={{ width: 60, height: 60, borderRadius: 8 }}
            />
            <div>
              <h5 className='mb-1'>Fantasy Crunchy Choco Chip Cookies</h5>
              <div className='product-rating'>
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
                    <i data-feather='star'></i>
                  </li>
                  <li>
                    <i data-feather='star'></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='review-content'>
            <p className='text-content mb-2'>"Great taste and texture! Would buy again."</p>
            <span className='text-muted small'>Reviewed on 15 Sep 2025</span>
          </div>
        </div>
      </div>
      {/* If no reviews, show this message */}
      {/* <div className="col-12">
        <div className="dashboard-bg-box p-4 text-center">
          <p className="text-gray-500">You have not written any reviews yet.</p>
        </div>
      </div> */}
    </div>
  </div>
);

export default DashboardReviews;
