import Slider from 'react-slick';
import AddProductBox from '../general/AddProductBox';
import { useEffect, useState } from 'react';
import type { Book } from '@/types/types';

const relatedProducts: Book[] = [
  {
    id: 1,
    title: 'The Lost Tales',
    slug: 'the-lost-tales',
    description: 'A thrilling collection of stories set in mystical lands.',
    isbn: '978-1234560001',
    language: 'English',
    price: 499,
    discount_percent: 10,
    stock_quantity: 50,
    pages: 320,
    publisher_name: 'Super Admin',
    publish_date: '2021-05-10',
    cover_image_name: '6.jpg',
    featured: 1,
    views_count: 0,
    sales_count: 0,
    rating_avg: 0,
    rating_count: 0,
    created_at: '2025-09-16 09:37:42',
    updated_at: '2025-09-16 11:12:17',
    author_id: 1,
    category_id: 1,
    genre_id: 0,
    author_table_id: null,
    author_name: 'Harbhajan Singh',
    author_pen_name: null,
    category_table_id: 1,
    category_name: 'Fiction',
    genre_table_id: null,
    genre_name: null,
    tags: [],
    discounted_price: 449,
  },
  {
    id: 2,
    title: 'Whispers of the Wind',
    slug: 'whispers-of-the-wind',
    description: 'A captivating tale of love and loss.',
    isbn: '978-1234560002',
    language: 'English',
    price: 450,
    discount_percent: 10,
    stock_quantity: 50,
    pages: 280,
    publisher_name: 'Super Admin',
    publish_date: '2021-06-15',
    cover_image_name: '2.jpg',
    featured: 1,
    views_count: 0,
    sales_count: 0,
    rating_avg: 0,
    rating_count: 0,
    created_at: '2025-09-16 09:37:42',
    updated_at: '2025-09-16 11:12:17',
    author_id: 2,
    category_id: 1,
    genre_id: 0,
    author_table_id: null,
    author_name: 'Amanpreet Kaur',
    author_pen_name: null,
    category_table_id: 1,
    category_name: 'Fiction',
    genre_table_id: null,
    genre_name: null,
    tags: [],
    discounted_price: 399,
  },
  {
    id: 3,
    title: 'Echoes of Eternity',
    slug: 'echoes-of-eternity',
    description: 'A journey through time and space.',
    isbn: '978-1234560003',
    language: 'English',
    price: 550,
    discount_percent: 10,
    stock_quantity: 50,
    pages: 350,
    publisher_name: 'Super Admin',
    publish_date: '2021-07-20',
    cover_image_name: '3.jpg',
    featured: 1,
    views_count: 0,
    sales_count: 0,
    rating_avg: 0,
    rating_count: 0,
    created_at: '2025-09-16 09:37:42',
    updated_at: '2025-09-16 11:12:17',
    author_id: 3,
    category_id: 1,
    genre_id: 0,
    author_table_id: null,
    author_name: 'Ravinder Singh',
    author_pen_name: null,
    category_table_id: 1,
    category_name: 'Fiction',
    genre_table_id: null,
    genre_name: null,
    tags: [],
    discounted_price: 499,
  },
  {
    id: 4,
    title: 'Shadows and Light',
    slug: 'shadows-and-light',
    description: 'Exploring the duality of existence.',
    isbn: '978-1234560004',
    language: 'English',
    price: 599,
    discount_percent: 10,
    stock_quantity: 50,
    pages: 400,
    publisher_name: 'Super Admin',
    publish_date: '2021-08-25',
    cover_image_name: '4.jpg',
    featured: 1,
    views_count: 0,
    sales_count: 0,
    rating_avg: 0,
    rating_count: 0,
    created_at: '2025-09-16 09:37:42',
    updated_at: '2025-09-16 11:12:17',
    author_id: 4,
    category_id: 1,
    genre_id: 0,
    author_table_id: null,
    author_name: 'Simranjeet Kaur',
    author_pen_name: null,
    category_table_id: 1,
    category_name: 'Fiction',
    genre_table_id: null,
    genre_name: null,
    tags: [],
    discounted_price: 539,
  },
  {
    id: 5,
    title: 'Journey to the Stars',
    slug: 'journey-to-the-stars',
    description: 'An epic saga of interstellar exploration.',
    isbn: '978-1234560005',
    language: 'English',
    price: 499,
    discount_percent: 10,
    stock_quantity: 50,
    pages: 300,
    publisher_name: 'Super Admin',
    publish_date: '2021-09-30',
    cover_image_name: '5.jpg',
    featured: 1,
    views_count: 0,
    sales_count: 0,
    rating_avg: 0,
    rating_count: 0,
    created_at: '2025-09-16 09:37:42',
    updated_at: '2025-09-16 11:12:17',
    author_id: 5,
    category_id: 1,
    genre_id: 0,
    author_table_id: null,
    author_name: 'Gurpreet Singh',
    author_pen_name: null,
    category_table_id: 1,
    category_name: 'Fiction',
    genre_table_id: null,
    genre_name: null,
    tags: [],
    discounted_price: 449,
  },
  {
    id: 6,
    title: 'Mystic Realms',
    slug: 'mystic-realms',
    description: 'Discover the magic within the pages.',
    isbn: '978-1234560006',
    language: 'English',
    price: 599,
    discount_percent: 10,
    stock_quantity: 50,
    pages: 370,
    publisher_name: 'Super Admin',
    publish_date: '2021-10-15',
    cover_image_name: '7.jpg',
    featured: 1,
    views_count: 0,
    sales_count: 0,
    rating_avg: 0,
    rating_count: 0,
    created_at: '2025-09-16 09:37:42',
    updated_at: '2025-09-16 11:12:17',
    author_id: 6,
    category_id: 1,
    genre_id: 0,
    author_table_id: null,
    author_name: 'Navjot Kaur',
    author_pen_name: null,
    category_table_id: 1,
    category_name: 'Fiction',
    genre_table_id: null,
    genre_name: null,
    tags: [],
    discounted_price: 539,
  },
  {
    id: 7,
    title: 'Legends Unfold',
    slug: 'legends-unfold',
    description: 'Tales of valor and heroism await.',
    isbn: '978-1234560007',
    language: 'English',
    price: 649,
    discount_percent: 10,
    stock_quantity: 50,
    pages: 420,
    publisher_name: 'Super Admin',
    publish_date: '2021-11-20',
    cover_image_name: '8.jpg',
    featured: 1,
    views_count: 0,
    sales_count: 0,
    rating_avg: 0,
    rating_count: 0,
    created_at: '2025-09-16 09:37:42',
    updated_at: '2025-09-16 11:12:17',
    author_id: 7,
    category_id: 1,
    genre_id: 0,
    author_table_id: null,
    author_name: 'Manpreet Singh',
    author_pen_name: null,
    category_table_id: 1,
    category_name: 'Fiction',
    genre_table_id: null,
    genre_name: null,
    tags: [],
    discounted_price: 589,
  },
];

const getSlidesToShow = (width: number) => {
  if (width < 480) return 2;
  if (width < 1000) return 3;
  if (width < 1200) return 4;
  return 5;
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
                <AddProductBox
                  key={product.id}
                  product={product}
                  idx={idx}
                  showOptions={true}
                  className='!bg-secondary p-2 !block'
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
