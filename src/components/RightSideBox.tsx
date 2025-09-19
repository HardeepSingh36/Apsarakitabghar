import { Link, useNavigate } from 'react-router-dom';
import { Bookmark, ShoppingCart, User } from 'react-feather';
import { useAuthDialog } from '@/context/AuthDialogContext';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { RootState } from '@/app/store';
import { removeFromCart } from '@/features/cart/cartSlice';

const RightSideBox = () => {
  const { openSignIn, openSignUp, openForgot, isAuthenticated, user, logout } = useAuthDialog();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();
  const cartTotal = cartItems.reduce((acc, item) => acc + item.total, 0);

  // Handle protected navigation
  const handleProtectedNav = (path: string) => {
    if (!isAuthenticated) {
      openSignIn();
      return;
    }
    navigate(path);
  };

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

        {/* Wishlist */}
        <li className='right-side'>
          <button
            type='button'
            className='btn p-0 position-relative header-wishlist'
            onClick={() => handleProtectedNav('/wishlist')}
          >
            <Bookmark size={22} />
          </button>
        </li>

        {/* Cart + Checkout */}
        <li className='right-side'>
          <div className='onhover-dropdown header-badge'>
            <button
              type='button'
              className='btn p-0 position-relative header-wishlist'
              onClick={() => handleProtectedNav('/cart')}
            >
              <ShoppingCart size={22} />
              {cartItems && cartItems.length > 0 && (
                <span className='position-absolute top-0 start-100 translate-middle badge'>
                  {cartItems.length}
                  <span className='visually-hidden'>unread messages</span>
                </span>
              )}
            </button>

            <div className='onhover-div'>
              {!isAuthenticated ? (
                <div className='p-3 text-center'>
                  <p className='mb-2'>Please log in to view your cart.</p>
                  <button
                    className='btn btn-sm theme-bg-color text-white mx-auto'
                    onClick={openSignIn}
                  >
                    Log In
                  </button>
                </div>
              ) : cartItems.length === 0 ? (
                // ⬇️ If no cart items
                <div className='p-3 text-center'>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <>
                  {/* ⬇️ Cart items from Redux */}
                  <ul className='cart-list'>
                    {cartItems.map((item) => (
                      <li className='product-box-contain !w-full' key={item.id}>
                        <div className='drop-cart'>
                          <button
                            type='button'
                            className='drop-image'
                            onClick={() => handleProtectedNav('/cart')}
                          >
                            <img src={item.img} className='blur-up lazyload' alt={item.name} />
                          </button>
                          <div className='drop-contain'>
                            <button
                              type='button'
                              className='!no-underline bg-transparent border-0 p-0'
                              onClick={() => handleProtectedNav('/cart')}
                            >
                              <h5>{item.name}</h5>
                            </button>
                            <h6>
                              <span>{item.quantity} x</span> ${item.price.toFixed(2)}
                            </h6>
                            {/* ⬇️ Remove item from cart */}
                            <button
                              className='close-button close_button'
                              onClick={() => dispatch(removeFromCart(item.id as number))}
                            >
                              <i className='fa-solid fa-xmark'></i>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* ⬇️ Cart total */}
                  <div className='price-box'>
                    <h5>Total :</h5>
                    <h4 className='theme-color fw-bold'>${cartTotal.toFixed(2)}</h4>
                  </div>

                  {/* ⬇️ Buttons */}
                  <div className='button-group'>
                    <button
                      className='btn btn-sm cart-button'
                      onClick={() => handleProtectedNav('/cart')}
                    >
                      View Cart
                    </button>
                    <button
                      className='btn btn-sm cart-button theme-bg-color text-white'
                      onClick={() => handleProtectedNav('/checkout')}
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </li>

        {/* Account / Login */}
        <li className='right-side onhover-dropdown'>
          <div className='delivery-login-box'>
            <div className='delivery-icon'>
              {isAuthenticated ? (
                <div
                  className='rounded-circle bg-dark text-white d-flex align-items-center justify-content-center'
                  style={{ width: 28, height: 28, fontSize: 12 }}
                  title={user?.email || ''}
                >
                  {(user?.full_name || 'U').charAt(0).toUpperCase()}
                </div>
              ) : (
                <User size={22} />
              )}
            </div>
            <div className='delivery-detail'>
              <h6>{isAuthenticated ? `Hello, ${user?.full_name}` : 'Hello,'}</h6>
              <h5>{isAuthenticated ? 'Account' : 'My Account'}</h5>
            </div>
          </div>

          <div className='onhover-div onhover-div-login'>
            <ul className='user-box-name !pl-0'>
              {isAuthenticated ? (
                <>
                  <li className='product-box-contain'>
                    <span className='!no-underline'>Signed in as {user?.email}</span>
                  </li>
                  <li className='product-box-contain'>
                    <button
                      type='button'
                      className='!no-underline bg-transparent border-0 p-0'
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className='product-box-contain'>
                    <button
                      type='button'
                      className='!no-underline bg-transparent border-0 p-0'
                      onClick={openSignIn}
                    >
                      Log In
                    </button>
                  </li>
                  <li className='product-box-contain'>
                    <button
                      type='button'
                      className='!no-underline bg-transparent border-0 p-0'
                      onClick={openSignUp}
                    >
                      Register
                    </button>
                  </li>
                  <li className='product-box-contain'>
                    <button
                      type='button'
                      className='!no-underline bg-transparent border-0 p-0'
                      onClick={openForgot}
                    >
                      Forgot Password
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default RightSideBox;
