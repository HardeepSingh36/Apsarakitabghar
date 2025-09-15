import RelatedProducts from '@/components/bookdetail/RelatedProducts';
import Reviews from '@/components/bookdetail/Reviews';

const BookDetail = () => {
  return (
    <>
      <section className='product-section'>
        <div className='container-fluid-lg'>
          <div className='row'>
            <div className='col-xxl-9 col-xl-8 col-lg-7 wow fadeInUp'>
              <div className='row g-4'>
                <div className='col-xl-6 wow fadeInUp'>
                  <div className='product-left-box'>
                    <div className='row g-2'>
                      <div className='col-xxl-10 col-lg-12 col-md-10 order-xxl-2 order-lg-1 order-md-2'>
                        <div className='product-main-2 no-arrow'>
                          <div>
                            <div className='slider-image'>
                              <img
                                src='/assets/images/product/category/1.jpg'
                                id='img-1'
                                data-zoom-image='/assets/images/product/category/1.jpg'
                                className='img-fluid image_zoom_cls-0 blur-up lazyload'
                                alt=''
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-xl-6 wow fadeInUp' data-wow-delay='0.1s'>
                  <div className='right-box-contain'>
                    <h6 className='offer-top'>30% Off</h6>
                    <h2 className='name'>Creamy Chocolate Cake</h2>
                    <div className='price-rating'>
                      <h3 className='theme-color price'>
                        $49.50 <del className='text-content'>$58.46</del>{' '}
                        <span className='offer theme-color'>(8% off)</span>
                      </h3>
                      <div className='product-rating custom-rate'>
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
                        <span className='review'>23 Customer Review</span>
                      </div>
                    </div>

                    <div className='product-contain'>
                      <p>
                        Lollipop cake chocolate chocolate cake dessert jujubes. Shortbread sugar
                        plum dessert powder cookie sweet brownie. Cake cookie apple pie dessert
                        sugar plum muffin cheesecake.
                      </p>
                    </div>

                    {/* Book Formats */}
                    <div className='product-package'>
                      <div className='product-title'>
                        <h4>Format</h4>
                      </div>
                      <ul className='select-package'>
                        <li>
                          <a href='javascript:void(0)' className='active'>
                            Hardcover
                          </a>
                        </li>
                        <li>
                          <a href='javascript:void(0)'>Paperback</a>
                        </li>
                        <li>
                          <a href='javascript:void(0)'>eBook</a>
                        </li>
                        <li>
                          <a href='javascript:void(0)'>Audiobook</a>
                        </li>
                      </ul>
                    </div>
                    {/* Quantity */}
                    <div className='note-box product-package'>
                      <div className='cart_qty qty-box product-qty'>
                        <div className='input-group'>
                          <button
                            type='button'
                            className='qty-right-plus'
                            data-type='plus'
                            data-field=''
                          >
                            <i className='fa fa-plus'></i>
                          </button>
                          <input
                            className='form-control input-number qty-input'
                            type='text'
                            name='quantity'
                            value='0'
                          />
                          <button
                            type='button'
                            className='qty-left-minus'
                            data-type='minus'
                            data-field=''
                          >
                            <i className='fa fa-minus'></i>
                          </button>
                        </div>
                      </div>

                      <button
                        // onclick="location.href = 'cart.html';"
                        className='btn btn-md bg-dark cart-button text-white w-100'
                      >
                        Add To Cart
                      </button>
                    </div>

                    <div className='progress-sec'>
                      <div className='left-progressbar'>
                        <h6>Please hurry! Only 5 left in stock</h6>
                      </div>
                    </div>

                    <div className='buy-box'>
                      <a href='wishlist.html'>
                        <i data-feather='heart'></i>
                        <span>Add To Wishlist</span>
                      </a>
                    </div>

                    <div className='pickup-box'>
                      <div className='product-title'>
                        <h4>Store Information</h4>
                      </div>

                      <div className='pickup-detail'>
                        <h4 className='text-content'>
                          Lollipop cake chocolate chocolate cake dessert jujubes. Shortbread sugar
                          plum dessert powder cookie sweet brownie.
                        </h4>
                      </div>

                      <div className='product-info'>
                        <ul className='product-info-list product-info-list-2'>
                          <li>
                            Type : <a href='javascript:void(0)'>Black Forest</a>
                          </li>
                          <li>
                            SKU : <a href='javascript:void(0)'>SDFVW65467</a>
                          </li>
                          <li>
                            MFG : <a href='javascript:void(0)'>Jun 4, 2022</a>
                          </li>
                          <li>
                            Stock : <a href='javascript:void(0)'>2 Items Left</a>
                          </li>
                          <li>
                            Tags : <a href='javascript:void(0)'>Cake,</a>{' '}
                            <a href='javascript:void(0)'>Backery</a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className='payment-option'>
                      <div className='product-title'>
                        <h4>Guaranteed Safe Checkout</h4>
                      </div>
                      <ul>
                        <li>
                          <a href='javascript:void(0)'>
                            <img
                              src='/assets/images/product/payment/1.svg'
                              className='blur-up lazyload'
                              alt=''
                            />
                          </a>
                        </li>
                        <li>
                          <a href='javascript:void(0)'>
                            <img
                              src='/assets/images/product/payment/2.svg'
                              className='blur-up lazyload'
                              alt=''
                            />
                          </a>
                        </li>
                        <li>
                          <a href='javascript:void(0)'>
                            <img
                              src='/assets/images/product/payment/3.svg'
                              className='blur-up lazyload'
                              alt=''
                            />
                          </a>
                        </li>
                        <li>
                          <a href='javascript:void(0)'>
                            <img
                              src='/assets/images/product/payment/4.svg'
                              className='blur-up lazyload'
                              alt=''
                            />{' '}
                          </a>
                        </li>
                        <li>
                          <a href='javascript:void(0)'>
                            <img
                              src='/assets/images/product/payment/5.svg'
                              className='blur-up lazyload'
                              alt=''
                            />{' '}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='col-12'>
                  <div className='product-section-box'>
                    <ul className='nav nav-tabs custom-nav' id='myTab' role='tablist'>
                      <li className='nav-item' role='presentation'>
                        <button
                          className='nav-link active'
                          id='description-tab'
                          data-bs-toggle='tab'
                          data-bs-target='#description'
                          type='button'
                          role='tab'
                        >
                          Description
                        </button>
                      </li>

                      <li className='nav-item' role='presentation'>
                        <button
                          className='nav-link'
                          id='info-tab'
                          data-bs-toggle='tab'
                          data-bs-target='#info'
                          type='button'
                          role='tab'
                        >
                          Additional info
                        </button>
                      </li>

                      <li className='nav-item' role='presentation'>
                        <button
                          className='nav-link'
                          id='review-tab'
                          data-bs-toggle='tab'
                          data-bs-target='#review'
                          type='button'
                          role='tab'
                        >
                          Review
                        </button>
                      </li>
                    </ul>

                    <div className='tab-content custom-tab' id='myTabContent'>
                      <div className='tab-pane fade show active' id='description' role='tabpanel'>
                        <div className='product-description'>
                          <div className='nav-desh'>
                            <p>
                              Jelly beans carrot cake icing biscuit oat cake gummi bears tart. Lemon
                              drops carrot cake pudding sweet gummi bears. Chocolate cake tart
                              cupcake donut topping liquorice sugar plum chocolate bar. Jelly beans
                              tiramisu caramels jujubes biscuit liquorice chocolate. Pudding toffee
                              jujubes oat cake sweet roll. Lemon drops dessert croissant danish cake
                              cupcake. Sweet roll candy chocolate toffee jelly sweet roll halvah
                              brownie topping. Marshmallow powder candy sesame snaps jelly beans
                              candy canes marshmallow gingerbread pie.
                            </p>
                          </div>

                          <div className='nav-desh'>
                            <div className='desh-title'>
                              <h5>Organic:</h5>
                            </div>
                            <p>
                              vitae et leo duis ut diam quam nulla porttitor massa id neque aliquam
                              vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet
                              nulla malesuada pellentesque elit eget gravida cum sociis natoque
                              penatibus et magnis dis parturient montes nascetur ridiculus mus
                              mauris vitae ultricies leo integer malesuada nunc vel risus commodo
                              viverra maecenas accumsan lacus vel facilisis volutpat est velit
                              egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet
                              nisl suscipit adipiscing bibendum est ultricies integer quis auctor
                              elit sed vulputate mi sit amet mauris commodo quis imperdiet massa
                              tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin
                              libero nunc consequat interdum varius sit amet mattis vulputate enim
                              nulla aliquet porttitor lacus luctus accumsan.
                            </p>
                          </div>

                          <div className='banner-contain nav-desh'>
                            <img
                              src='/assets/images/vegetable/banner/14.jpg'
                              className='bg-img blur-up lazyload'
                              alt=''
                            />
                            <div className='banner-details p-center banner-b-space w-100 text-center'>
                              <div>
                                <h6 className='ls-expanded theme-color mb-sm-3 mb-1'>SUMMER</h6>
                                <h2>VEGETABLE</h2>
                                <p className='mx-auto mt-1'>Save up to 5% OFF</p>
                              </div>
                            </div>
                          </div>

                          <div className='nav-desh'>
                            <div className='desh-title'>
                              <h5>From The Manufacturer:</h5>
                            </div>
                            <p>
                              Jelly beans shortbread chupa chups carrot cake jelly-o halvah apple
                              pie pudding gingerbread. Apple pie halvah cake tiramisu shortbread
                              cotton candy croissant chocolate cake. Tart cupcake caramels gummi
                              bears macaroon gingerbread fruitcake marzipan wafer. Marzipan dessert
                              cupcake ice cream tootsie roll. Brownie chocolate cake pudding cake
                              powder candy ice cream ice cream cake. Jujubes soufflé chupa chups
                              cake candy halvah donut. Tart tart icing lemon drops fruitcake apple
                              pie.
                            </p>

                            <p>
                              Dessert liquorice tart soufflé chocolate bar apple pie pastry danish
                              soufflé. Gummi bears halvah gingerbread jelly icing. Chocolate cake
                              chocolate bar pudding chupa chups bear claw pie dragée donut halvah.
                              Gummi bears cookie ice cream jelly-o jujubes sweet croissant. Marzipan
                              cotton candy gummi bears lemon drops lollipop lollipop chocolate. Ice
                              cream cookie dragée cake sweet roll sweet roll.Lemon drops cookie
                              muffin carrot cake chocolate marzipan gingerbread topping chocolate
                              bar. Soufflé tiramisu pastry sweet dessert.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className='tab-pane fade' id='info' role='tabpanel'>
                        <div className='table-responsive'>
                          <table className='table info-table'>
                            <tbody>
                              <tr>
                                <td>Specialty</td>
                                <td>Vegetarian</td>
                              </tr>
                              <tr>
                                <td>Ingredient Type</td>
                                <td>Vegetarian</td>
                              </tr>
                              <tr>
                                <td>Brand</td>
                                <td>Lavian Exotique</td>
                              </tr>
                              <tr>
                                <td>Form</td>
                                <td>Bar Brownie</td>
                              </tr>
                              <tr>
                                <td>Package Information</td>
                                <td>Box</td>
                              </tr>
                              <tr>
                                <td>Manufacturer</td>
                                <td>Prayagh Nutri Product Pvt Ltd</td>
                              </tr>
                              <tr>
                                <td>Item part number</td>
                                <td>LE 014 - 20pcs Crème Bakes (Pack of 2)</td>
                              </tr>
                              <tr>
                                <td>Net Quantity</td>
                                <td>40.00 count</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className='tab-pane fade' id='review' role='tabpanel'>
                        <Reviews />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-xxl-3 col-xl-4 col-lg-5 d-none d-lg-block wow fadeInUp'>
              <div className='right-sidebar-box'>
                <div className='vendor-box'>
                  <div className='vendor-contain'>
                    <div className='vendor-image'>
                      <img
                        src='/assets/images/product/vendor.png'
                        className='blur-up lazyload'
                        alt=''
                      />
                    </div>

                    <div className='vendor-name'>
                      <h5 className='fw-500'>Noodles Co.</h5>

                      <div className='product-rating mt-1'>
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
                        <span>(36 Reviews)</span>
                      </div>
                    </div>
                  </div>

                  <p className='vendor-detail !border-b-0'>
                    Noodles & Company is an American fast-casual restaurant that offers
                    international and American noodle dishes and pasta.
                  </p>
                </div>

                <div className='pt-25'>
                  <div className='category-menu'>
                    <h3>Trending Products</h3>

                    <ul className='product-list product-right-sidebar border-0 p-0'>
                      <li>
                        <div className='offer-product'>
                          <a href='product-left-thumbnail.html' className='offer-image'>
                            <img
                              src='/assets/images/vegetable/product/23.png'
                              className='img-fluid blur-up lazyload'
                              alt=''
                            />
                          </a>

                          <div className='offer-detail'>
                            <div>
                              <a href='product-left-thumbnail.html'>
                                <h6 className='name'>Meatigo Premium Goat Curry</h6>
                              </a>
                              <span>450 G</span>
                              <h6 className='price theme-color'>$ 70.00</h6>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className='offer-product'>
                          <a href='product-left-thumbnail.html' className='offer-image'>
                            <img
                              src='/assets/images/vegetable/product/24.png'
                              className='blur-up lazyload'
                              alt=''
                            />
                          </a>

                          <div className='offer-detail'>
                            <div>
                              <a href='product-left-thumbnail.html'>
                                <h6 className='name'>Dates Medjoul Premium Imported</h6>
                              </a>
                              <span>450 G</span>
                              <h6 className='price theme-color'>$ 40.00</h6>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className='offer-product'>
                          <a href='product-left-thumbnail.html' className='offer-image'>
                            <img
                              src='/assets/images/vegetable/product/25.png'
                              className='blur-up lazyload'
                              alt=''
                            />
                          </a>

                          <div className='offer-detail'>
                            <div>
                              <a href='product-left-thumbnail.html'>
                                <h6 className='name'>Good Life Walnut Kernels</h6>
                              </a>
                              <span>200 G</span>
                              <h6 className='price theme-color'>$ 52.00</h6>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li className='mb-0'>
                        <div className='offer-product'>
                          <a href='product-left-thumbnail.html' className='offer-image'>
                            <img
                              src='/assets/images/vegetable/product/26.png'
                              className='blur-up lazyload'
                              alt=''
                            />
                          </a>

                          <div className='offer-detail'>
                            <div>
                              <a href='product-left-thumbnail.html'>
                                <h6 className='name'>Apple Red Premium Imported</h6>
                              </a>
                              <span>1 KG</span>
                              <h6 className='price theme-color'>$ 80.00</h6>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='ratio_156 pt-25'>
                  <div className='home-contain'>
                    <img
                      src='/assets/images/vegetable/banner/8.jpg'
                      className='bg-img blur-up lazyload'
                      alt=''
                    />
                    <div className='home-detail p-top-left home-p-medium'>
                      <div>
                        <h6 className='text-yellow home-banner'>Seafood</h6>
                        <h3 className='text-uppercase fw-normal'>
                          <span className='theme-color fw-bold'>Freshes</span> Products
                        </h3>
                        <h3 className='fw-light'>every hour</h3>
                        <button
                          //  onclick="location.href = 'shop-left-sidebar.html';"
                          className='btn btn-animation btn-md fw-bold mend-auto'
                        >
                          Shop Now <i className='fa-solid fa-arrow-right icon'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="product-list-section section-b-space">
        <RelatedProducts />
      </section>
    </>
  );
};

export default BookDetail;
