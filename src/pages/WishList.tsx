import AddProductBox from '@/components/general/AddProductBox';
import Breadcrumb from '@/components/ui/Breadcrumb';

const wishlistItems = [
  {
    key: 1,
    spanName: 'Book',
    img: '/assets/images/book/product/32.jpg',
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
    img: '/assets/images/book/product/33.jpg',
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
    img: '/assets/images/book/product/34.jpg',
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
    img: '/assets/images/book/product/35.jpg',
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
    img: '/assets/images/book/product/36.jpg',
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
    img: '/assets/images/book/product/37.jpg',
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
    img: '/assets/images/book/product/38.jpg',
    name: 'Legends Unfold',
    author: 'Manpreet Singh',
    rating: 5,
    ratingText: '(5.0)',
    unit: '420 pages',
    price: '₹649',
    oldPrice: '₹700',
  },
];

const WishList = () => {
  return (
    <div>
      <Breadcrumb
        title='Wishlist'
        items={[{ label: '', href: '/', iconClass: 'fa-solid fa-house' }, { label: 'Wishlist' }]}
      />

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
