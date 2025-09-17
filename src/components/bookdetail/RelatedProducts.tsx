import Slider from 'react-slick';
import AddProductBox from '../general/AddProductBox';
import { useEffect, useState } from 'react';

const relatedProducts = [
  {
    key: 1,
    spanName: 'Book',
    img: 'https://apsrakitabghar.com/uploads/covers/6.jpg',
    name: 'The Lost Tales',
    author: 'Harbhajan Singh',
    rating: 5,
    ratingText: '(5.0)',
    unit: '320 pages',
    price: '₹449',
    oldPrice: '₹499',
  },
  {
    key: 2,
    spanName: 'Book',
    img: 'https://apsrakitabghar.com/uploads/covers/2.jpg',
    name: 'Whispers of the Wind',
    author: 'Amanpreet Kaur',
    rating: 4,
    ratingText: '(4.5)',
    unit: '280 pages',
    price: '₹399',
    oldPrice: '₹450',
  },
  {
    key: 3,
    spanName: 'Book',
    img: 'https://apsrakitabghar.com/uploads/covers/3.jpg',
    name: 'Echoes of Eternity',
    author: 'Ravinder Singh',
    rating: 4,
    ratingText: '(4.2)',
    unit: '350 pages',
    price: '₹499',
    oldPrice: '₹550',
  },
  {
    key: 4,
    spanName: 'Book',
    img: 'https://apsrakitabghar.com/uploads/covers/4.jpg',
    name: 'Shadows and Light',
    author: 'Simranjeet Kaur',
    rating: 5,
    ratingText: '(5.0)',
    unit: '400 pages',
    price: '₹599',
    oldPrice: '₹650',
  },
  {
    key: 5,
    spanName: 'Book',
    img: 'https://apsrakitabghar.com/uploads/covers/5.jpg',
    name: 'Journey to the Stars',
    author: 'Gurpreet Singh',
    rating: 4,
    ratingText: '(4.0)',
    unit: '300 pages',
    price: '₹399',
    oldPrice: '₹450',
  },
  {
    key: 6,
    spanName: 'Book',
    img: 'https://apsrakitabghar.com/uploads/covers/7.jpg',
    name: 'Mystic Realms',
    author: 'Navjot Kaur',
    rating: 4,
    ratingText: '(4.3)',
    unit: '370 pages',
    price: '₹549',
    oldPrice: '₹600',
  },
  {
    key: 7,
    spanName: 'Book',
    img: 'https://apsrakitabghar.com/uploads/covers/8.jpg',
    name: 'Legends Unfold',
    author: 'Manpreet Singh',
    rating: 5,
    ratingText: '(5.0)',
    unit: '420 pages',
    price: '₹649',
    oldPrice: '₹700',
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
