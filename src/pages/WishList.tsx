import AddProductBox from '@/components/general/AddProductBox';
import { Link } from 'react-router-dom';

const wishlistItems = [
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

const WishList = () => {
  return (
    <div>
      {/* Breadcrumb Section Start */}
      <section className='breadcrumb-section pt-0'>
        <div className='container-fluid-lg'>
          <div className='row'>
            <div className='col-12'>
              <div className='breadcrumb-contain'>
                <h2>Wishlist</h2>
                <nav>
                  <ol className='breadcrumb mb-0'>
                    <li className='breadcrumb-item'>
                      <Link to='/'>
                        <i className='fa-solid fa-house'></i>
                      </Link>
                    </li>
                    <li className='breadcrumb-item active'>Wishlist</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wishlist Section Start */}
      <section className='wishlist-section section-b-space'>
        <div className='container-fluid-lg'>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
            {wishlistItems.map((item) => (
              <div key={item.key}>
                <div className='wishlist-box'>
                  <AddProductBox key={item.key} product={item} idx={item.key} removeButton={true} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WishList;
