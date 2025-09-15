import Slider from 'react-slick';

const relatedProducts = [
  {
    key: 1,
    spanName: 'Cake',
    img: '/assets/images/cake/product/11.png',
    name: 'Chocolate Chip Cookies 250 g',
    rating: 5,
    ratingText: '(5.0)',
    unit: '500 G',
    price: '$10.25',
    oldPrice: '$12.57',
  },
  {
    key: 2,
    spanName: 'Vegetable',
    img: '/assets/images/cake/product/2.png',
    name: 'Fresh Bread and Pastry Flour 200 g',
    rating: 4,
    ratingText: '(4.0)',
    unit: '250 ml',
    price: '$08.02',
    oldPrice: '$15.15',
  },
  {
    key: 3,
    spanName: 'Vegetable',
    img: '/assets/images/cake/product/3.png',
    name: 'Peanut Butter Bite Premium Butter Cookies 600 g',
    rating: 2,
    ratingText: '(2.4)',
    unit: '350 G',
    price: '$04.33',
    oldPrice: '$10.36',
  },
  {
    key: 4,
    spanName: 'Snacks',
    img: '/assets/images/cake/product/4.png',
    name: 'SnackAmor Combo Pack of Jowar Stick and Jowar Chips',
    rating: 5,
    ratingText: '(5.0)',
    unit: '570 G',
    price: '$12.52',
    oldPrice: '$13.62',
  },
  {
    key: 5,
    spanName: 'Snacks',
    img: '/assets/images/cake/product/5.png',
    name: 'Yumitos Chilli Sprinkled Potato Chips 100 g',
    rating: 4,
    ratingText: '(3.8)',
    unit: '100 G',
    price: '$10.25',
    oldPrice: '$12.36',
  },
  {
    key: 6,
    spanName: 'Vegetable',
    img: '/assets/images/cake/product/6.png',
    name: 'Fantasy Crunchy Choco Chip Cookies',
    rating: 4,
    ratingText: '(4.0)',
    unit: '550 G',
    price: '$14.25',
    oldPrice: '$16.57',
  },
  {
    key: 7,
    spanName: 'Vegetable',
    img: '/assets/images/cake/product/7.png',
    name: 'Fresh Bread and Pastry Flour 200 g',
    rating: 4,
    ratingText: '(3.8)',
    unit: '1 Kg',
    price: '$12.68',
    oldPrice: '$14.69',
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1400,
      settings: { slidesToShow: 5 },
    },
    {
      breakpoint: 1200,
      settings: { slidesToShow: 4 },
    },
    {
      breakpoint: 992,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 },
    },
  ],
};

const RelatedProducts = () => {
  return (
    <div className='container-fluid-lg'>
      <div className='title'>
        <h2>Related Products</h2>
        <span className='title-leaf'>
          <svg className='icon-width'>
            <use xlinkHref='/assets/svg/leaf.svg#leaf'></use>
          </svg>
        </span>
      </div>
      <div className='row'>
        <div className='col-12'>
          <div className='slider-6_1 product-wrapper'>
            <Slider {...sliderSettings}>
              {relatedProducts.map((product, idx) => (
                <div key={product.key}>
                  <div
                    className='product-box-3 wow fadeInUp'
                    data-wow-delay={idx ? `0.${(idx * 5).toString().padStart(2, '0')}s` : undefined}
                  >
                    <div className='product-header'>
                      <div className='product-image'>
                        <a href='product-left-thumbnail.html'>
                          <img src={product.img} className='img-fluid blur-up lazyload' alt='' />
                        </a>
                        <ul className='product-option'>
                          <li data-bs-toggle='tooltip' data-bs-placement='top' title='View'>
                            <a
                              href='javascript:void(0)'
                              data-bs-toggle='modal'
                              data-bs-target='#view'
                            >
                              <i data-feather='eye'></i>
                            </a>
                          </li>
                          <li data-bs-toggle='tooltip' data-bs-placement='top' title='Compare'>
                            <a href='compare.html'>
                              <i data-feather='refresh-cw'></i>
                            </a>
                          </li>
                          <li data-bs-toggle='tooltip' data-bs-placement='top' title='Wishlist'>
                            <a href='wishlist.html' className='notifi-wishlist'>
                              <i data-feather='heart'></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='product-footer'>
                      <div className='product-detail'>
                        <span className='span-name'>{product.spanName}</span>
                        <a href='product-left-thumbnail.html'>
                          <h5 className='name'>{product.name}</h5>
                        </a>
                        <div className='product-rating mt-2'>
                          <ul className='rating'>
                            {[...Array(5)].map((_, i) => (
                              <li key={i}>
                                <i
                                  data-feather='star'
                                  className={i < product.rating ? 'fill' : ''}
                                ></i>
                              </li>
                            ))}
                          </ul>
                          <span>{product.ratingText}</span>
                        </div>
                        <h6 className='unit'>{product.unit}</h6>
                        <h5 className='price'>
                          <span className='theme-color'>{product.price}</span>{' '}
                          <del>{product.oldPrice}</del>
                        </h5>
                        <div className='add-to-cart-box bg-white'>
                          <button className='btn btn-add-cart addcart-button'>
                            Add
                            <span className='add-icon bg-light-gray'>
                              <i className='fa-solid fa-plus'></i>
                            </span>
                          </button>
                          <div className='cart_qty qty-box'>
                            <div className='input-group bg-white'>
                              <button
                                type='button'
                                className='qty-left-minus bg-gray'
                                data-type='minus'
                                data-field=''
                              >
                                -
                              </button>
                              <input
                                className='form-control input-number qty-input'
                                type='text'
                                name='quantity'
                                value='0'
                                readOnly
                              />
                              <button
                                type='button'
                                className='qty-right-plus bg-gray'
                                data-type='plus'
                                data-field=''
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
