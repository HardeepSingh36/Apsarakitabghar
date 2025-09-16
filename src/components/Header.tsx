import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Printer } from 'react-feather';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className=''>
      <div className='header-top'>
        <div className='container-fluid-lg'>
          <div className='flex justify-between'>
            <div className='col-xxl-2 d-xxl-block text-white'>
              <Link to='/' className='flex text-white gap-2'>
                <Printer size={18}/>
                Publish With Us
              </Link>
            </div>

            <div className='col-xxl-6 col-lg-9 d-lg-block d-none'></div>

            <div className='col-lg-3'>
              <ul className='about-list right-nav-about'>
                <li className='right-nav-list'>
                  <div className='dropdown theme-form-select'>
                    <button
                      className='btn dropdown-toggle'
                      type='button'
                      id='select-language'
                      data-bs-toggle='dropdown'
                    >
                      <img
                        src='/assets/images/country/united-kingdom.png'
                        className='img-fluid blur-up lazyload'
                        alt=''
                      />
                      <span>English</span>
                    </button>
                    <ul className='dropdown-menu dropdown-menu-end'>
                      <li>
                        <a className='dropdown-item' href='javascript:void(0)' id='english'>
                          <img
                            src='/assets/images/country/united-kingdom.png'
                            className='img-fluid blur-up lazyload'
                            alt=''
                          />
                          <span>English</span>
                        </a>
                      </li>
                      <li>
                        <a className='dropdown-item' href='javascript:void(0)' id='france'>
                          <img
                            src='/assets/images/country/germany.png'
                            className='img-fluid blur-up lazyload'
                            alt=''
                          />
                          <span>Germany</span>
                        </a>
                      </li>
                      <li>
                        <a className='dropdown-item' href='javascript:void(0)' id='chinese'>
                          <img
                            src='/assets/images/country/turkish.png'
                            className='img-fluid blur-up lazyload'
                            alt=''
                          />
                          <span>Turki</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className='right-nav-list'>
                  <div className='dropdown theme-form-select'>
                    <button
                      className='btn dropdown-toggle'
                      type='button'
                      id='select-dollar'
                      data-bs-toggle='dropdown'
                    >
                      <span>INR</span>
                    </button>
                    <ul className='dropdown-menu dropdown-menu-end sm-dropdown-menu'>
                      <li>
                        <a className='dropdown-item' id='aud' href='javascript:void(0)'>
                          USD
                        </a>
                      </li>
                      <li>
                        <a className='dropdown-item' id='eur' href='javascript:void(0)'>
                          EUR
                        </a>
                      </li>
                      <li>
                        <a className='dropdown-item' id='cny' href='javascript:void(0)'>
                          AUD
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='top-nav top-header sticky-header'>
        <div className='container-fluid-lg'>
          <div className='row'>
            <div className='col-12'>
              <div className='navbar-top'>
                <button
                  className='navbar-toggler d-xl-none d-inline navbar-menu-button me-2'
                  type='button'
                  data-bs-toggle='offcanvas'
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <span className='navbar-toggler-icon'>
                    <i className='fa-solid fa-bars'></i>
                  </span>
                </button>
                <Link to='/' className='web-logo nav-logo'>
                  <img src='/assets/logo/apsra.svg' className='img-fluid lazyload' alt='' />
                </Link>

                <div className='header-nav-middle'>
                  <div className='main-nav navbar navbar-expand-xl navbar-light navbar-sticky'>
                    <div
                      className={`offcanvas offcanvas-collapse order-xl-2 ${
                        showMenu ? 'show' : ''
                      }`}
                    >
                      <div className='offcanvas-header navbar-shadow'>
                        <h5>Menu</h5>
                        <button
                          className='btn-close lead'
                          type='button'
                          data-bs-dismiss='offcanvas'
                          onClick={() => setShowMenu(false)}
                        ></button>
                      </div>
                      <div className='offcanvas-body'>
                        <ul className='navbar-nav'>
                          <li className='nav-item dropdown'>
                            <a
                              className='nav-link dropdown-toggle'
                              href='javascript:void(0)'
                              data-bs-toggle='dropdown'
                            >
                              Best Selling
                            </a>

                            <ul className='dropdown-menu'>
                              <li>
                                <a className='dropdown-item' href='shop-category-slider.html'>
                                  Best Selling Audiobooks
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='shop-category.html'>
                                  Best Selling eBooks
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='shop-banner.html'>
                                  Best Selling Print Books
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='shop-left-sidebar.html'>
                                  Editor’s Picks
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='shop-list.html'>
                                  Trending Now
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='shop-right-sidebar.html'>
                                  All-Time Best Sellers
                                </a>
                              </li>
                            </ul>
                          </li>

                          <li className='nav-item dropdown'>
                            <a
                              className='nav-link dropdown-toggle'
                              href='javascript:void(0)'
                              data-bs-toggle='dropdown'
                            >
                              Top Categories
                            </a>

                            <ul className='dropdown-menu'>
                              <li>
                                <a className='dropdown-item' href='shop-category-slider.html'>
                                  Children
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='shop-category.html'>
                                  Education
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='shop-banner.html'>
                                  Fiction
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='shop-left-sidebar.html'>
                                  Non-Fiction
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='shop-list.html'>
                                  Poetry
                                </a>
                              </li>
                            </ul>
                          </li>

                          <li className='nav-item'>
                            <Link
                              className='nav-link no-dropdown ps-xl-2 ps-0'
                              to="/about"
                            >
                              About Us
                            </Link>
                          </li>

                          <li className='nav-item dropdown new-nav-item xl:!ml-4'>
                            <a
                              className='nav-link no-dropdown dropdown-toggle'
                              href='javascript:void(0)'
                              data-bs-toggle='dropdown'
                            >
                              Contact Us
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='rightside-box'>
                  <div className='search-full'>
                    <div className='input-group'>
                      <span className='input-group-text'>
                        <i data-feather='search' className='font-light'></i>
                      </span>
                      <input
                        type='text'
                        className='form-control search-type'
                        placeholder='Search here..'
                      />
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
                            <li className='product-box-contain'>
                              <div className='drop-cart'>
                                <a href='product-left-thumbnail.html' className='drop-image'>
                                  <img
                                    src='/assets/images/vegetable/product/1.png'
                                    className='blur-up lazyload'
                                    alt=''
                                  />
                                </a>

                                <div className='drop-contain'>
                                  <a href='product-left-thumbnail.html'>
                                    <h5>Fantasy Crunchy Choco Chip Cookies</h5>
                                  </a>
                                  <h6>
                                    <span>1 x</span> $80.58
                                  </h6>
                                  <button className='close-button close_button'>
                                    <i className='fa-solid fa-xmark'></i>
                                  </button>
                                </div>
                              </div>
                            </li>

                            <li className='product-box-contain'>
                              <div className='drop-cart'>
                                <a href='product-left-thumbnail.html' className='drop-image'>
                                  <img
                                    src='/assets/images/vegetable/product/2.png'
                                    className='blur-up lazyload'
                                    alt=''
                                  />
                                </a>

                                <div className='drop-contain'>
                                  <a href='product-left-thumbnail.html'>
                                    <h5>Peanut Butter Bite Premium Butter Cookies 600 g</h5>
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
                            <Link
                              to='/checkout'
                              className='btn btn-sm cart-button theme-bg-color
                                                    text-white'
                            >
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
                            <a
                              href='login.html'
                              className='!no-underline
'
                            >
                              Log In
                            </a>
                          </li>

                          <li className='product-box-contain'>
                            <a
                              href='sign-up.html'
                              className='!no-underline
'
                            >
                              Register
                            </a>
                          </li>

                          <li className='product-box-contain'>
                            <a
                              href='forgot.html'
                              className='!no-underline
'
                            >
                              Forgot Password
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
