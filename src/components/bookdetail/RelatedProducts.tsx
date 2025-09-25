import Slider from 'react-slick';
import AddProductBox from '../general/AddProductBox';
import { useEffect, useState } from 'react';

const relatedProducts = [
  {
    id: 1,
    title: 'The Lost Tales',
    subtitle: null,
    slug: 'the-lost-tales',
    description: 'A thrilling collection of stories set in mystical lands.',
    isbn: '978-1234560001',
    language: 'English',
    publisher_id: 1,
    published_date: '2021-05-10',
    edition: '1st',
    pages: 320,
    format: 'paperback',
    price: 499, // MRP
    discounted_price: 449, // Price with discount
    discount: 10,
    stock: 50,
    cover_image: '6.jpg',
    sample_file: '',
    author_ids: ['1'],
    category_ids: ['1'],
    status: 'active',
    created_by: 1,
    created_at: '2025-09-16 09:37:42',
    updated_at: '2025-09-16 11:12:17',
    trending: 1,
    top: 0,
    popular: 1,
    publisher_name: 'Super Admin',
    author_names: 'Harbhajan Singh',
    cover_image_url: '/assets/images/book/product/6.jpg',
  },
  {
    id: 2,
    title: 'Whispers of the Wind',
    subtitle: null,
    slug: 'whispers-of-the-wind',
    description: 'A captivating tale of love and loss.',
    isbn: '978-1234560002',
    language: 'English',
    publisher_id: 1,
    published_date: '2021-06-15',
    edition: '1st',
    pages: 280,
    format: 'paperback',
    price: 450, // MRP
    discounted_price: 399, // Price with discount
    discount: 10,
    stock: 50,
    cover_image: '2.jpg',
    sample_file: '',
    author_ids: ['2'],
    category_ids: ['1'],
    status: 'active',
    created_by: 1,
    created_at: '2025-09-16 09:37:42',
    updated_at: '2025-09-16 11:12:17',
    trending: 1,
    top: 0,
    popular: 1,
    publisher_name: 'Super Admin',
    author_names: 'Amanpreet Kaur',
    cover_image_url: '/assets/images/book/product/2.jpg',
  },
  {
    id: 3,
    title: 'Echoes of Eternity',
    subtitle: null,
    slug: 'echoes-of-eternity',
    description: 'A journey through time and space.',
    isbn: '978-1234560003',
    language: 'English',
    publisher_id: 1,
    published_date: '2021-07-20',
    edition: '1st',
    pages: 350,
    format: 'paperback',
    price: 550, // MRP
    discounted_price: 499, // Price with discount
    discount: 10,
    stock: 50,
    cover_image: '3.jpg',
    sample_file: '',
    author_ids: ['3'],
    category_ids: ['1'],
    status: 'active',
    created_by: 1,
    created_at: '2025-09-16 09:37:42',
    updated_at: '2025-09-16 11:12:17',
    trending: 1,
    top: 0,
    popular: 1,
    publisher_name: 'Super Admin',
    author_names: 'Ravinder Singh',
    cover_image_url: '/assets/images/book/product/3.jpg',
  },
  {
    id: 4,
    title: 'Shadows and Light',
    subtitle: null,
    slug: 'shadows-and-light',
    description: 'Exploring the duality of existence.',
    isbn: '978-1234560004',
    language: 'English',
    publisher_id: 1,
    published_date: '2021-08-25',
    edition: '1st',
    pages: 400,
    format: 'paperback',
    price: 599, // MRP
    discounted_price: 539, // Price with discount
    discount: 10,
    stock: 50,
    cover_image: '4.jpg',
    sample_file: '',
    author_ids: ['4'],
    category_ids: ['1'],
    status: 'active',
    created_by: 1,
    created_at: '2025-09-16 09:37:42',
    updated_at: '2025-09-16 11:12:17',
    trending: 1,
    top: 0,
    popular: 1,
    publisher_name: 'Super Admin',
    author_names: 'Simranjeet Kaur',
    cover_image_url: '/assets/images/book/product/4.jpg',
  },
  {
    id: 5,
    title: 'Journey to the Stars',
    subtitle: null,
    slug: 'journey-to-the-stars',
    description: 'An epic saga of interstellar exploration.',
    isbn: '978-1234560005',
    language: 'English',
    publisher_id: 1,
    published_date: '2021-09-30',
    edition: '1st',
    pages: 300,
    format: 'paperback',
    price: 499, // MRP
    discounted_price: 449, // Price with discount
    discount: 10,
    stock: 50,
    cover_image: '5.jpg',
    sample_file: '',
    author_ids: ['5'],
    category_ids: ['1'],
    status: 'active',
    created_by: 1,
    created_at: '2025-09-16 09:37:42',
    updated_at: '2025-09-16 11:12:17',
    trending: 1,
    top: 0,
    popular: 1,
    publisher_name: 'Super Admin',
    author_names: 'Gurpreet Singh',
    cover_image_url: '/assets/images/book/product/5.jpg',
  },
  {
    id: 6,
    title: 'Mystic Realms',
    subtitle: null,
    slug: 'mystic-realms',
    description: 'Discover the magic within the pages.',
    isbn: '978-1234560006',
    language: 'English',
    publisher_id: 1,
    published_date: '2021-10-15',
    edition: '1st',
    pages: 370,
    format: 'paperback',
    price: 599, // MRP
    discounted_price: 539, // Price with discount
    discount: 10,
    stock: 50,
    cover_image: '7.jpg',
    sample_file: '',
    author_ids: ['6'],
    category_ids: ['1'],
    status: 'active',
    created_by: 1,
    created_at: '2025-09-16 09:37:42',
    updated_at: '2025-09-16 11:12:17',
    trending: 1,
    top: 0,
    popular: 1,
    publisher_name: 'Super Admin',
    author_names: 'Navjot Kaur',
    cover_image_url: '/assets/images/book/product/7.jpg',
  },
  {
    id: 7,
    title: 'Legends Unfold',
    subtitle: null,
    slug: 'legends-unfold',
    description: 'Tales of valor and heroism await.',
    isbn: '978-1234560007',
    language: 'English',
    publisher_id: 1,
    published_date: '2021-11-20',
    edition: '1st',
    pages: 420,
    format: 'paperback',
    price: 649, // MRP
    discounted_price: 589, // Price with discount
    discount: 10,
    stock: 50,
    cover_image: '8.jpg',
    sample_file: '',
    author_ids: ['7'],
    category_ids: ['1'],
    status: 'active',
    created_by: 1,
    created_at: '2025-09-16 09:37:42',
    updated_at: '2025-09-16 11:12:17',
    trending: 1,
    top: 0,
    popular: 1,
    publisher_name: 'Super Admin',
    author_names: 'Manpreet Singh',
    cover_image_url: '/assets/images/book/product/8.jpg',
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
                <AddProductBox key={product.id} product={product} idx={idx} showOptions={true} className='!bg-secondary p-2 !block'/>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
