import Slider from 'react-slick';
import AddProductBox from '../general/AddProductBox';
import  { useEffect, useState } from 'react';

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

const getSlidesToShow = (width: number) => {
  if (width < 480) return 2;
  if (width < 768) return 3;
  if (width < 992) return 4;
  if (width < 1200) return 6;
  return 6;
};

const baseSliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
};

const RelatedProducts = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sliderSettings = {
    ...baseSliderSettings,
    slidesToShow: getSlidesToShow(windowWidth),
  };

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
            <Slider key={windowWidth} {...sliderSettings}>
              {relatedProducts.map((product, idx) => (
                <AddProductBox key={product.key} product={product} idx={idx} showOptions={true} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
