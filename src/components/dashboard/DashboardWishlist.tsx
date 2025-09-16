import React from 'react';

const DashboardWishlist: React.FC = () => (
  <div className='dashboard-wishlist'>
    <div className='title'>
      <h2>My Wishlist History</h2>
      <span className='title-leaf title-leaf-gray'>
        <svg className='icon-width bg-gray'>
          <use xlinkHref='assets/svg/leaf.svg#leaf'></use>
        </svg>
      </span>
    </div>
    <div className='row g-sm-4 g-3'>
      {/* Example wishlist item, replicate as needed */}
      <div className='col-xxl-3 col-lg-6 col-md-4 col-sm-6'>
        <div className='product-box-3 theme-bg-white h-100'>
          <div className='product-header'>
            <div className='product-image'>
              <a href='product-left-thumbnail.html'>
                <img
                  src='assets/images/cake/product/2.png'
                  className='img-fluid blur-up lazyload'
                  alt=''
                />
              </a>
              <div className='product-header-top'>
                <button className='btn wishlist-button close_button'>
                  <i data-feather='x'></i>
                </button>
              </div>
            </div>
          </div>
          <div className='product-footer'>
            <div className='product-detail'>
              <span className='span-name'>Vegetable</span>
              <a href='product-left-thumbnail.html'>
                <h5 className='name'>Fresh Bread and Pastry Flour 200 g</h5>
              </a>
              <p className='text-content mt-1 mb-2 product-content'>
                Cheesy feet cheesy grin brie. Mascarpone cheese and wine hard cheese the big cheese
                everyone loves smelly cheese macaroni cheese croque monsieur.
              </p>
              <h6 className='unit mt-1'>250 ml</h6>
              <h5 className='price'>
                <span className='theme-color'>$08.02</span>
                <del>$15.15</del>
              </h5>
              <div className='add-to-cart-box mt-2'>
                <button className='btn btn-add-cart addcart-button' tabIndex={0}>
                  Add
                  <span className='add-icon'>
                    <i className='fa-solid fa-plus'></i>
                  </span>
                </button>
                <div className='cart_qty qty-box'>
                  <div className='input-group'>
                    <button
                      type='button'
                      className='qty-left-minus'
                      data-type='minus'
                      data-field=''
                    >
                      <i className='fa fa-minus'></i>
                    </button>
                    <input
                      className='form-control input-number qty-input'
                      type='text'
                      name='quantity'
                      value='0'
                    />
                    <button type='button' className='qty-right-plus' data-type='plus' data-field=''>
                      <i className='fa fa-plus'></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardWishlist;
