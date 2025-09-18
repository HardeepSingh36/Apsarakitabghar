import { Link } from 'react-router-dom';
import { useAuthDialog } from '@/context/AuthDialogContext';

const RightSideBox = () => {
  const { openSignIn, openSignUp, openForgot } = useAuthDialog();
  return (
  <div className='rightside-box'>
    <div className='search-full'>
      <div className='input-group'>
        <span className='input-group-text'>
          <i data-feather='search' className='font-light'></i>
        </span>
        <input type='text' className='form-control search-type' placeholder='Search here..' />
        <span className='input-group-text close-search'>
          <i data-feather='x' className='font-light'></i>
        </span>
      </div>
    </div>
    <ul className='right-side-menu !mb-0'>
      <li className='right-side'>
        <div className='delivery-login-box'>
          <div className='delivery-icon'>
            <div className='search-box'>
              <i data-feather='search'></i>
            </div>
          </div>
        </div>
      </li>
      <li className='right-side'>
        <Link to='/wishlist' className='btn p-0 position-relative header-wishlist'>
          <i data-feather='bookmark'></i>
        </Link>
      </li>
      <li className='right-side'>
        <div className='onhover-dropdown header-badge'>
          <button type='button' className='btn p-0 position-relative header-wishlist'>
            <i data-feather='shopping-cart'></i>
            <span className='position-absolute top-0 start-100 translate-middle badge'>
              2<span className='visually-hidden'>unread messages</span>
            </span>
          </button>
          <div className='onhover-div'>
            <ul className='cart-list'>
              <li className='product-box-contain !w-full'>
                <div className='drop-cart'>
                  <Link to='/cart' className='drop-image'>
                    <img
                      src='/assets/images/book/product/32.jpg'
                      className='blur-up lazyload'
                      alt=''
                    />
                  </Link>
                  <div className='drop-contain'>
                    <Link to='/cart'>
                      <h5>The Lost tales v2</h5>
                    </Link>
                    <h6>
                      <span>1 x</span> $80.58
                    </h6>
                    <button className='close-button close_button'>
                      <i className='fa-solid fa-xmark'></i>
                    </button>
                  </div>
                </div>
              </li>
              <li className='product-box-contain !w-full'>
                <div className='drop-cart'>
                  <a href='/cart' className='drop-image'>
                    <img
                      src='/assets/images/book/product/33.jpg'
                      className='blur-up lazyload'
                      alt=''
                    />
                  </a>
                  <div className='drop-contain'>
                    <a href='/cart'>
                      <h5>The Lost Tales</h5>
                    </a>
                    <h6>
                      <span>1 x</span> $25.68
                    </h6>
                    <button className='close-button close_button'>
                      <i className='fa-solid fa-xmark'></i>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
            <div className='price-box'>
              <h5>Total :</h5>
              <h4 className='theme-color fw-bold'>$106.58</h4>
            </div>
            <div className='button-group'>
              <Link to='/cart' className='btn btn-sm cart-button'>
                View Cart
              </Link>
              <Link to='/checkout' className='btn btn-sm cart-button theme-bg-color text-white'>
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </li>
      <li className='right-side onhover-dropdown'>
        <div className='delivery-login-box'>
          <div className='delivery-icon'>
            <i data-feather='user'></i>
          </div>
          <div className='delivery-detail'>
            <h6>Hello,</h6>
            <h5>My Account</h5>
          </div>
        </div>
        <div className='onhover-div onhover-div-login '>
          <ul className='user-box-name !pl-0'>
            <li className='product-box-contain'>
              <i></i>
              <a href='javascript:void(0)' className='!no-underline' onClick={openSignIn}>
                Log In
              </a>
            </li>
            <li className='product-box-contain'>
              <a href='javascript:void(0)' className='!no-underline' onClick={openSignUp}>
                Register
              </a>
            </li>
            <li className='product-box-contain'>
              <a href='javascript:void(0)' className='!no-underline' onClick={openForgot}>
                Forgot Password
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
);
};

export default RightSideBox;
