import { useState } from 'react';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className=''>
      <div className='header-top'>
        <div className='container-fluid-lg'>
          <div className='row'>
            <div className='col-xxl-3 d-xxl-block d-none'></div>

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
                        src='assets/images/country/united-kingdom.png'
                        className='img-fluid blur-up lazyload'
                        alt=''
                      />
                      <span>English</span>
                    </button>
                    <ul className='dropdown-menu dropdown-menu-end'>
                      <li>
                        <a className='dropdown-item' href='javascript:void(0)' id='english'>
                          <img
                            src='assets/images/country/united-kingdom.png'
                            className='img-fluid blur-up lazyload'
                            alt=''
                          />
                          <span>English</span>
                        </a>
                      </li>
                      <li>
                        <a className='dropdown-item' href='javascript:void(0)' id='france'>
                          <img
                            src='assets/images/country/germany.png'
                            className='img-fluid blur-up lazyload'
                            alt=''
                          />
                          <span>Germany</span>
                        </a>
                      </li>
                      <li>
                        <a className='dropdown-item' href='javascript:void(0)' id='chinese'>
                          <img
                            src='assets/images/country/turkish.png'
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
                      <span>USD</span>
                    </button>
                    <ul className='dropdown-menu dropdown-menu-end sm-dropdown-menu'>
                      <li>
                        <a className='dropdown-item' id='aud' href='javascript:void(0)'>
                          AUD
                        </a>
                      </li>
                      <li>
                        <a className='dropdown-item' id='eur' href='javascript:void(0)'>
                          EUR
                        </a>
                      </li>
                      <li>
                        <a className='dropdown-item' id='cny' href='javascript:void(0)'>
                          CNY
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
                <a href='index.html' className='web-logo nav-logo'>
                  <img src='assets/logo/apsra.svg' className='img-fluid lazyload' alt='' />
                </a>

                <div className='header-nav-middle'>
                  <div className='main-nav navbar navbar-expand-xl navbar-light navbar-sticky'>
                    <div className={`offcanvas offcanvas-collapse order-xl-2 ${showMenu ? 'show' : ''}`}>
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
                          <li className='nav-item dropdown dropdown-mega'>
                            <a
                              className='nav-link dropdown-toggle ps-xl-2 ps-0'
                              href='javascript:void(0)'
                              data-bs-toggle='dropdown'
                            >
                              Home
                            </a>

                            <ul className='dropdown-menu'>
                              <li>
                                <a className='dropdown-item' href='index.html'>
                                  Kartshop
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='index-2.html'>
                                  Sweetshop
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='index-3.html'>
                                  Organic
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='index-4.html'>
                                  Supershop
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='index-5.html'>
                                  classNameic shop
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='index-6.html'>
                                  Furniture
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='index-7.html'>
                                  Search Oriented
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='index-8.html'>
                                  Category Focus
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='index-9.html'>
                                  Fashion
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='index-10.html'>
                                  Book
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='index-11.html'>
                                  Digital
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
                              Shop
                            </a>

                            <ul className='dropdown-menu'>
                              <li>
                                <a className='dropdown-item' href='shop-category-slider.html'>
                                  Shop Category Slider
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='shop-category.html'>
                                  Shop Category Sidebar
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='shop-banner.html'>
                                  Shop Banner
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='shop-left-sidebar.html'>
                                  Shop Left Sidebar
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='shop-list.html'>
                                  Shop List
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='shop-right-sidebar.html'>
                                  Shop Right Sidebar
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='shop-top-filter.html'>
                                  Shop Top Filter
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
                              Product
                            </a>

                            <div className='dropdown-menu dropdown-menu-3 dropdown-menu-2'>
                              <div className='row'>
                                <div className='col-xl-3'>
                                  <div className='dropdown-column m-0'>
                                    <h5 className='dropdown-header'>Product Pages </h5>
                                    <a className='dropdown-item' href='product-left-thumbnail.html'>
                                      Product Thumbnail
                                    </a>
                                    <a className='dropdown-item' href='product-4-image.html'>
                                      Product Images
                                    </a>
                                    <a className='dropdown-item' href='product-slider.html'>
                                      Product Slider
                                    </a>
                                    <a className='dropdown-item' href='product-sticky.html'>
                                      Product Sticky
                                    </a>
                                    <a className='dropdown-item' href='product-accordion.html'>
                                      Product Accordion
                                    </a>
                                    <a className='dropdown-item' href='product-circle.html'>
                                      Product Tab
                                    </a>
                                    <a className='dropdown-item' href='product-digital.html'>
                                      Product Digital
                                    </a>

                                    <h5 className='custom-mt dropdown-header'>Product Features</h5>
                                    <a className='dropdown-item' href='product-circle.html'>
                                      Bundle (Cross Sale)
                                    </a>
                                    <a className='dropdown-item' href='product-left-thumbnail.html'>
                                      Hot Stock Progress <label className='menu-label'>New</label>
                                    </a>
                                    <a className='dropdown-item' href='product-sold-out.html'>
                                      SOLD OUT
                                    </a>
                                    <a className='dropdown-item' href='product-circle.html'>
                                      Sale Countdown
                                    </a>
                                  </div>
                                </div>
                                <div className='col-xl-3'>
                                  <div className='dropdown-column m-0'>
                                    <h5 className='dropdown-header'>Product Variants Style </h5>
                                    <a className='dropdown-item' href='product-rectangle.html'>
                                      Variant Rectangle
                                    </a>
                                    <a className='dropdown-item' href='product-circle.html'>
                                      Variant Circle <label className='menu-label'>New</label>
                                    </a>
                                    <a className='dropdown-item' href='product-color-image.html'>
                                      Variant Image Swatch
                                    </a>
                                    <a className='dropdown-item' href='product-color.html'>
                                      Variant Color
                                    </a>
                                    <a className='dropdown-item' href='product-radio.html'>
                                      Variant Radio Button
                                    </a>
                                    <a className='dropdown-item' href='product-dropdown.html'>
                                      Variant Dropdown
                                    </a>
                                    <h5 className='custom-mt dropdown-header'>Product Features</h5>
                                    <a className='dropdown-item' href='product-left-thumbnail.html'>
                                      Sticky Checkout
                                    </a>
                                    <a className='dropdown-item' href='product-dynamic.html'>
                                      Dynamic Checkout
                                    </a>
                                    <a className='dropdown-item' href='product-sticky.html'>
                                      Secure Checkout
                                    </a>
                                    <a className='dropdown-item' href='product-bundle.html'>
                                      Active Product view
                                    </a>
                                    <a className='dropdown-item' href='product-bundle.html'>
                                      Active Last Orders
                                    </a>
                                  </div>
                                </div>
                                <div className='col-xl-3'>
                                  <div className='dropdown-column m-0'>
                                    <h5 className='dropdown-header'>Product Features </h5>
                                    <a className='dropdown-item' href='product-image.html'>
                                      Product Simple
                                    </a>
                                    <a className='dropdown-item' href='product-rectangle.html'>
                                      Product classNameified{' '}
                                      <label className='menu-label'>New</label>
                                    </a>
                                    <a className='dropdown-item' href='product-size-chart.html'>
                                      Size Chart <label className='menu-label'>New</label>
                                    </a>
                                    <a className='dropdown-item' href='product-size-chart.html'>
                                      Delivery & Return
                                    </a>
                                    <a className='dropdown-item' href='product-size-chart.html'>
                                      Product Review
                                    </a>
                                    <a className='dropdown-item' href='product-expert.html'>
                                      Ask an Expert
                                    </a>
                                    <h5 className='custom-mt dropdown-header'>Product Features</h5>
                                    <a
                                      className='dropdown-item'
                                      href='product-bottom-thumbnail.html'
                                    >
                                      Product Tags
                                    </a>
                                    <a className='dropdown-item' href='product-image.html'>
                                      Store Information
                                    </a>
                                    <a className='dropdown-item' href='product-image.html'>
                                      Social Share{' '}
                                      <label className='menu-label warning-label'>Hot</label>
                                    </a>
                                    <a className='dropdown-item' href='product-left-thumbnail.html'>
                                      Related Products
                                      <label className='menu-label warning-label'>Hot</label>
                                    </a>
                                    <a
                                      className='dropdown-item'
                                      href='product-right-thumbnail.html'
                                    >
                                      Wishlist & Compare
                                    </a>
                                  </div>
                                </div>
                                <div className='col-xl-3 d-xl-block d-none'>
                                  <div className='dropdown-column m-0'>
                                    <div className='menu-img-banner'>
                                      <a className='text-title' href='product-circle.html'>
                                        <img src='/src/assets/images/mega-menu.png' alt='banner' />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>

                          <li className='nav-item dropdown dropdown-mega'>
                            <a
                              className='nav-link dropdown-toggle ps-xl-2 ps-0'
                              href='javascript:void(0)'
                              data-bs-toggle='dropdown'
                            >
                              Mega Menu
                            </a>

                            <div className='dropdown-menu dropdown-menu-2'>
                              <div className='row'>
                                <div className='dropdown-column col-xl-3'>
                                  <h5 className='dropdown-header'>Daily Vegetables</h5>
                                  <a className='dropdown-item' href='shop-left-sidebar.html'>
                                    Beans & Brinjals
                                  </a>

                                  <a className='dropdown-item' href='shop-left-sidebar.html'>
                                    Broccoli & Cauliflower
                                  </a>

                                  <a href='shop-left-sidebar.html' className='dropdown-item'>
                                    Chilies, Garlic
                                  </a>

                                  <a className='dropdown-item' href='shop-left-sidebar.html'>
                                    Vegetables & Salads
                                  </a>

                                  <a className='dropdown-item' href='shop-left-sidebar.html'>
                                    Gourd, Cucumber
                                  </a>

                                  <a className='dropdown-item' href='shop-left-sidebar.html'>
                                    Herbs & Sprouts
                                  </a>

                                  <a href='demo-personal-portfolio.html' className='dropdown-item'>
                                    Lettuce & Leafy
                                  </a>
                                </div>

                                <div className='dropdown-column col-xl-3'>
                                  <h5 className='dropdown-header'>Baby Tender</h5>
                                  <a className='dropdown-item' href='shop-left-sidebar.html'>
                                    Beans & Brinjals
                                  </a>

                                  <a className='dropdown-item' href='shop-left-sidebar.html'>
                                    Broccoli & Cauliflower
                                  </a>

                                  <a className='dropdown-item' href='shop-left-sidebar.html'>
                                    Chilies, Garlic
                                  </a>

                                  <a className='dropdown-item' href='shop-left-sidebar.html'>
                                    Vegetables & Salads
                                  </a>

                                  <a className='dropdown-item' href='shop-left-sidebar.html'>
                                    Gourd, Cucumber
                                  </a>

                                  <a className='dropdown-item' href='shop-left-sidebar.html'>
                                    Potatoes & Tomatoes
                                  </a>

                                  <a href='shop-left-sidebar.html' className='dropdown-item'>
                                    Peas & Corn
                                  </a>
                                </div>

                                <div className='dropdown-column col-xl-3'>
                                  <h5 className='dropdown-header'>Exotic Vegetables</h5>
                                  <a className='dropdown-item' href='shop-left-sidebar.html'>
                                    Asparagus & Artichokes
                                  </a>

                                  <a className='dropdown-item' href='shop-left-sidebar.html'>
                                    Avocados & Peppers
                                  </a>

                                  <a className='dropdown-item' href='shop-left-sidebar.html'>
                                    Broccoli & Zucchini
                                  </a>

                                  <a className='dropdown-item' href='shop-left-sidebar.html'>
                                    Celery, Fennel & Leeks
                                  </a>

                                  <a className='dropdown-item' href='shop-left-sidebar.html'>
                                    Chilies & Lime
                                  </a>
                                </div>

                                <div className='dropdown-column dropdown-column-img col-3'></div>
                              </div>
                            </div>
                          </li>

                          <li className='nav-item dropdown'>
                            <a
                              className='nav-link dropdown-toggle'
                              href='javascript:void(0)'
                              data-bs-toggle='dropdown'
                            >
                              Blog
                            </a>
                            <ul className='dropdown-menu'>
                              <li>
                                <a className='dropdown-item' href='blog-detail.html'>
                                  Blog Detail
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='blog-grid.html'>
                                  Blog Grid
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='blog-list.html'>
                                  Blog List
                                </a>
                              </li>
                            </ul>
                          </li>

                          <li className='nav-item dropdown new-nav-item'>
                            <label className='new-dropdown'>New</label>
                            <a
                              className='nav-link dropdown-toggle'
                              href='javascript:void(0)'
                              data-bs-toggle='dropdown'
                            >
                              Pages
                            </a>
                            <ul className='dropdown-menu'>
                              <li className='sub-dropdown-hover'>
                                <a className='dropdown-item' href='javascript:void(0)'>
                                  Email Template{' '}
                                  <span className='new-text'>
                                    <i className='fa-solid fa-bolt-lightning'></i>
                                  </span>
                                </a>
                                <ul className='sub-menu'>
                                  <li>
                                    <a href='../email-templete/abandonment-email.html'>
                                      Abandonment
                                    </a>
                                  </li>
                                  <li>
                                    <a href='../email-templete/offer-template.html'>
                                      Offer Template
                                    </a>
                                  </li>
                                  <li>
                                    <a href='../email-templete/order-success-2.html'>
                                      Order Success
                                    </a>
                                  </li>
                                  <li>
                                    <a href='../email-templete/reset-password-2.html'>
                                      Reset Password
                                    </a>
                                  </li>
                                  <li>
                                    <a href='../email-templete/welcome-2.html'>Welcome template</a>
                                  </li>
                                </ul>
                              </li>
                              <li className='sub-dropdown-hover'>
                                <a className='dropdown-item' href='javascript:void(0)'>
                                  Invoice Template{' '}
                                  <span className='new-text'>
                                    <i className='fa-solid fa-bolt-lightning'></i>
                                  </span>
                                </a>
                                <ul className='sub-menu'>
                                  <li>
                                    <a href='../invoice/invoice-1.html'>Invoice 1</a>
                                  </li>

                                  <li>
                                    <a href='../invoice/invoice-2.html'>Invoice 2</a>
                                  </li>

                                  <li>
                                    <a href='../invoice/invoice-3.html'>Invoice 3</a>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a className='dropdown-item' href='404.html'>
                                  404
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='about-us.html'>
                                  About Us
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='cart.html'>
                                  Cart
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='contact-us.html'>
                                  Contact
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='checkout.html'>
                                  Checkout
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='coming-soon.html'>
                                  Coming Soon
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='compare.html'>
                                  Compare
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='faq.html'>
                                  Faq
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='order-success.html'>
                                  Order Success
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='order-tracking.html'>
                                  Order Tracking
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='otp.html'>
                                  OTP
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='search.html'>
                                  Search
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='user-dashboard.html'>
                                  User Dashboard
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='wishlist.html'>
                                  Wishlist
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
                              Seller
                            </a>
                            <ul className='dropdown-menu'>
                              <li>
                                <a className='dropdown-item' href='seller-become.html'>
                                  Become a Seller
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='seller-dashboard.html'>
                                  Seller Dashboard
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='seller-detail.html'>
                                  Seller Detail
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='seller-detail-2.html'>
                                  Seller Detail 2
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='seller-grid.html'>
                                  Seller Grid
                                </a>
                              </li>
                              <li>
                                <a className='dropdown-item' href='seller-grid-2.html'>
                                  Seller Grid 2
                                </a>
                              </li>
                            </ul>
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
                      <a href='wishlist.html' className='btn p-0 position-relative header-wishlist'>
                        <i data-feather='bookmark'></i>
                      </a>
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
                                    src='/src/assets/images/vegetable/product/1.png'
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
                                    src='/src/assets/images/vegetable/product/2.png'
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
                            <a href='cart.html' className='btn btn-sm cart-button'>
                              View Cart
                            </a>
                            <a
                              href='checkout.html'
                              className='btn btn-sm cart-button theme-bg-color
                                                    text-white'
                            >
                              Checkout
                            </a>
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
