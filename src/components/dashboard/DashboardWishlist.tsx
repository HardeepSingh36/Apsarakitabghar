
const DashboardWishlist = () => {
  return (
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
        {/* Book wishlist item example */}
        <div className='col-xxl-3 col-lg-6 col-md-4 col-sm-6'>
          <div className='product-box-3 theme-bg-white h-100'>
            <div className='product-header'>
              <div className='product-image'>
                <a href='/books/32'>
                  <img
                    src='/assets/images/book/product/32.jpg'
                    className='img-fluid blur-up lazyload'
                    alt='The Lost Tales'
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
                <span className='span-name'>Book</span>
                <a href='/books/32'>
                  <h5 className='name'>The Lost Tales</h5>
                </a>
                <p className='text-content mt-1 mb-2 product-content'>
                  A thrilling collection of stories set in mystical lands. Author: Harbhajan Singh.
                </p>
                <h6 className='unit mt-1'>320 pages</h6>
                <h5 className='price'>
                  <span className='theme-color'>₹449</span>
                  <del>₹499</del>
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
                      <button
                        type='button'
                        className='qty-right-plus'
                        data-type='plus'
                        data-field=''
                      >
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
};

export default DashboardWishlist;
