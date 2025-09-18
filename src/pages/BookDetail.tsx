import RelatedProducts from '@/components/bookdetail/RelatedProducts';
import Reviews from '@/components/bookdetail/Reviews';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Book, CartItem } from '@/types/types';
import { getBooks } from '@/services/bookService';
import { Heart, Star } from 'react-feather';
import { useAppDispatch } from '@/app/hooks';
import { addToCart } from '@/features/cart/cartSlice';
import { addToWishlist } from '@/features/wishlist/wishlistSlice';

const fallbackBook: Book = {
  id: 6,
  title: 'The Lost Tales',
  subtitle: 'Adventures Beyond',
  slug: 'the-lost-tales',
  description: 'A thrilling collection of stories set in mystical lands.',
  isbn: '978-1234560006',
  language: 'English',
  publisher_id: 1,
  published_date: '2021-05-10',
  edition: '1st',
  pages: 320,
  format: 'paperback',
  price: 499,
  discount: 10,
  stock: 50,
  cover_image: '6.jpg',
  sample_file: '',
  author_ids: ['5'],
  category_ids: ['6'],
  status: 'active',
  created_by: 1,
  created_at: '2025-09-16 09:37:42',
  updated_at: '2025-09-16 11:12:17',
  trending: 1,
  top: 0,
  popular: 1,
  publisher_name: 'Super Admin',
  author_names: 'Harbhajan Singh',
  discounted_price: 449.1,
  cover_image_url: 'https://apsrakitabghar.com/uploads/covers/6.jpg',
};

const BookDetail = () => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(0);
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('hardcover');
  const formats = ['hardcover', 'paperback', 'ebook', 'audiobook'];
  const location = useLocation();
  const navigate = useNavigate();

  const passedBook = location.state?.item as Book | undefined;
  useEffect(() => {
    if (passedBook) {
      setBook(passedBook);
    } else {
      // fallback: fetch from API if no state (e.g., user refreshed)
      async function fetchBook() {
        try {
          const data = await getBooks({});
          const found = data?.books?.find((b: Book) => String(b.id) === String(id));
          setBook(found || null);
        } catch (e) {
          setBook(null);
        }
      }
      fetchBook();
    }
  }, [id, passedBook]);

  const handleAddToCart = () => {
    if (!book) return;

    const cartItem: CartItem = {
      id: book.id,
      name: book.title,
      author: book.author_names || 'Unknown',
      img: book.cover_image_url,
      soldBy: book.publisher_name || 'Super Admin',
      quantity,
      pages: book.pages,
      price: book.discounted_price || book.price,
      oldPrice: book.price,
      saving: book.price - (book.discounted_price || book.price),
      total: (book.discounted_price || book.price) * quantity,
    };

    dispatch(addToCart(cartItem));

    navigate('/cart');
  };

  const handleAddToWishlist = () => {
    if (!book) return;

    dispatch(
      addToWishlist({
        id: book.id,
        name: book.title,
        author: book.author_names || 'Unknown',
        img: book.cover_image_url,
        price: book.discounted_price || book.price,
        oldPrice: book.price,
        rating: 4,
        pages: book.pages,
      })
    );

    navigate('/wishlist');
  };

  if (!book) return null;

  return (
    <>
      <section className='product-section !max-w-screen'>
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
                                src={
                                  book.cover_image_url || '/assets/images/product/category/1.jpg'
                                }
                                id='img-1'
                                data-zoom-image={
                                  book.cover_image_url || '/assets/images/product/category/1.jpg'
                                }
                                className='img-fluid image_zoom_cls-0 blur-up lazyload'
                                alt={book.title || ''}
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
                    <h6 className='offer-top'>
                      {book.discount ? `${book.discount}% Off` : '30% Off'}
                    </h6>
                    <h2 className='name'>{book.title || 'Book Title'}</h2>
                    <div className='price-rating'>
                      <h3 className='theme-color price'>
                        ₹{book.discounted_price || book.price}{' '}
                        <del className='text-content'>₹{book.price}</del>{' '}
                        <span className='offer theme-color'>
                          ({book.discount ? `${book.discount}% off` : '8% off'})
                        </span>
                      </h3>
                      <div className='product-rating custom-rate'>
                        <ul className='rating'>
                          <li>
                            <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                          </li>
                          <li>
                            <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                          </li>
                          <li>
                            <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                          </li>
                          <li>
                            <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                          </li>
                          <li>
                            <Star className='w-4 h-4 text-yellow-500' />
                          </li>
                        </ul>
                        <span className='review'>23 Customer Review</span>
                      </div>
                    </div>

                    <div className='product-contain'>
                      <p>{book.description || 'No description available.'}</p>
                    </div>

                    {/* Book Formats */}
                    <div className='product-package'>
                      <div className='product-title'>
                        <h4>Format</h4>
                      </div>
                      <ul className='select-package'>
                        {formats.map((format) => (
                          <li key={format}>
                            <a
                              type='button'
                              href='javascript:void(0)'
                              onClick={() => setSelectedFormat(format)}
                              className={`capitalize ${selectedFormat === format ? 'active' : ''}`}
                            >
                              {format}
                            </a>
                          </li>
                        ))}
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
                            onClick={() => setQuantity((prev) => prev + 1)}
                          >
                            <i className='fa fa-plus'></i>
                          </button>
                          <input
                            className='form-control input-number qty-input'
                            type='text'
                            name='quantity'
                            readOnly
                            value={quantity}
                          />
                          <button
                            type='button'
                            className='qty-left-minus'
                            data-type='minus'
                            data-field=''
                            onClick={() => setQuantity((prev) => Math.max(prev - 1, 0))}
                          >
                            <i className='fa fa-minus'></i>
                          </button>
                        </div>
                      </div>

                      <button
                        className='btn btn-md bg-dark cart-button text-white w-100'
                        onClick={handleAddToCart}
                      >
                        Add To Cart
                      </button>
                    </div>

                    <div className='progress-sec'>
                      <div className='left-progressbar'>
                        <h6>
                          {book.stock
                            ? `Please hurry! Only ${book.stock} left in stock`
                            : 'Please hurry! Only 5 left in stock'}
                        </h6>
                      </div>
                    </div>

                    <div className='buy-box'>
                      <button onClick={handleAddToWishlist} className='flex items-center gap-2'>
                        <Heart className='w-5 h-5' />
                        <span>Add To Wishlist</span>
                      </button>
                    </div>

                    <div className='pickup-box'>
                      <div className='product-title'>
                        <h4>Store Information</h4>
                      </div>

                      <div className='pickup-detail'>
                        <h4 className='text-content'>
                          {book.publisher_name ||
                            'Noodles & Company is an American fast-casual restaurant that offers international and American noodle dishes and pasta.'}
                        </h4>
                      </div>

                      <div className='product-info'>
                        <ul className='product-info-list product-info-list-2'>
                          <li>
                            Type : <a href='javascript:void(0)'>{book.format || 'Black Forest'}</a>
                          </li>
                          <li>
                            SKU : <a href='javascript:void(0)'>{book.isbn || 'SDFVW65467'}</a>
                          </li>
                          <li>
                            MFG :{' '}
                            <a href='javascript:void(0)'>{book.published_date || 'Jun 4, 2022'}</a>
                          </li>
                          <li>
                            Stock :{' '}
                            <a href='javascript:void(0)'>
                              {book.stock ? `${book.stock} Items Left` : '2 Items Left'}
                            </a>
                          </li>
                          <li>
                            Tags :{' '}
                            <a href='javascript:void(0)'>
                              {book.category_ids?.join(', ') || 'Cake,'}
                            </a>{' '}
                            <a href='javascript:void(0)'>{book.language || 'Backery'}</a>
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
                            <p>{book.description || 'No description available.'}</p>
                          </div>

                          <div className='nav-desh'>
                            <div className='desh-title'>
                              <h5>About the Book:</h5>
                            </div>
                            <p>
                              Dive into a world of adventure and mystery with "The Lost Tales". This
                              book takes you on a journey through mystical lands, where every
                              chapter reveals new secrets and challenges. Follow the protagonist as
                              they unravel ancient puzzles, encounter magical creatures, and
                              discover the true meaning of courage and friendship. With vivid
                              storytelling and unforgettable characters, "The Lost Tales" is a
                              must-read for anyone who loves epic adventures and heartwarming tales.
                            </p>
                          </div>

                          <div className='banner-contain nav-desh'>
                            <img
                              src='/assets/images/book/banner/1.jpg'
                              className='bg-img blur-up lazyload'
                              alt=''
                            />
                            <div className='banner-details p-center banner-b-space w-100 text-center'>
                              <div>
                                <h6 className='ls-expanded theme-color mb-sm-3 mb-1'>FEATURED</h6>
                                <h2>THE LOST TALES</h2>
                                <p className='mx-auto mt-1'>A Journey Beyond Imagination</p>
                              </div>
                            </div>
                          </div>

                          <div className='nav-desh'>
                            <div className='desh-title'>
                              <h5>Publisher's Note:</h5>
                            </div>
                            <p>
                              "The Lost Tales" is a labor of love from our team and author Harbhajan
                              Singh. This book was crafted to inspire readers to dream big, embrace
                              adventure, and cherish the bonds of friendship. We believe every page
                              will transport you to a world where magic and reality blend
                              seamlessly, and where every challenge leads to growth and discovery.
                              Thank you for joining us on this unforgettable journey.
                            </p>

                            <p>
                              About the Author: Harbhajan Singh is known for his vivid imagination
                              and captivating storytelling. With years of experience weaving tales
                              that touch the heart, he brings characters and worlds to life in a way
                              that resonates with readers of all ages. We are proud to present his
                              latest work and hope it finds a special place in your collection.
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
                                <td>{book.publisher_name || 'Lavian Exotique'}</td>
                              </tr>
                              <tr>
                                <td>Form</td>
                                <td>{book.format || 'Bar Brownie'}</td>
                              </tr>
                              <tr>
                                <td>Package Information</td>
                                <td>Box</td>
                              </tr>
                              <tr>
                                <td>Manufacturer</td>
                                <td>{book.publisher_name || 'Prayagh Nutri Product Pvt Ltd'}</td>
                              </tr>
                              <tr>
                                <td>Item part number</td>
                                <td>{book.isbn || 'LE 014 - 20pcs Crème Bakes (Pack of 2)'}</td>
                              </tr>
                              <tr>
                                <td>Net Quantity</td>
                                <td>{book.pages || '40.00 count'}</td>
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
                      <img src='' className='blur-up lazyload' alt='' />
                    </div>
                    <div className='vendor-name'>
                      <h5 className='fw-500'>{book.publisher_name || 'Noodles Co.'}</h5>

                      <div className='product-rating mt-1'>
                        <ul className='rating'>
                          <li>
                            <Star className='w-3 h-3 text-yellow-500 fill-yellow-500' />
                          </li>
                          <li>
                            <Star className='w-3 h-3 text-yellow-500 fill-yellow-500' />
                          </li>
                          <li>
                            <Star className='w-3 h-3 text-yellow-500 fill-yellow-500' />
                          </li>
                          <li>
                            <Star className='w-3 h-3 text-yellow-500 fill-yellow-500' />
                          </li>
                          <li>
                            <Star className='w-3 h-3 text-yellow-500' />
                          </li>
                        </ul>
                        <span>(36 Reviews)</span>
                      </div>
                    </div>
                  </div>

                  <p className='vendor-detail !border-b-0'>
                    {book.publisher_name ||
                      'Noodles & Company is an American fast-casual restaurant that offers international and American noodle dishes and pasta.'}
                  </p>
                </div>

                <div className='pt-25'>
                  <div className='category-menu'>
                    <h3>Trending Books</h3>
                    <ul className='product-list product-right-sidebar border-0 p-0'>
                      <li>
                        <div className='offer-product'>
                          <a href={`/books/${fallbackBook.id}`} className='offer-image'>
                            <img
                              src={fallbackBook.cover_image_url}
                              className='img-fluid blur-up lazyload'
                              alt={fallbackBook.title}
                            />
                          </a>
                          <div className='offer-detail'>
                            <div>
                              <a href={`/books/${fallbackBook.id}`}>
                                <h6 className='name'>{fallbackBook.title}</h6>
                              </a>
                              <span>{fallbackBook.author_names}</span>
                              <h6 className='price theme-color'>
                                ₹{fallbackBook.discounted_price}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='offer-product'>
                          <a href={`/books/${fallbackBook.id}`} className='offer-image'>
                            <img
                              src={fallbackBook.cover_image_url}
                              className='img-fluid blur-up lazyload'
                              alt={fallbackBook.title}
                            />
                          </a>
                          <div className='offer-detail'>
                            <div>
                              <a href={`/books/${fallbackBook.id}`}>
                                <h6 className='name'>{fallbackBook.title}</h6>
                              </a>
                              <span>{fallbackBook.author_names}</span>
                              <h6 className='price theme-color'>
                                ₹{fallbackBook.discounted_price}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='offer-product'>
                          <a href={`/books/${fallbackBook.id}`} className='offer-image'>
                            <img
                              src={fallbackBook.cover_image_url}
                              className='img-fluid blur-up lazyload'
                              alt={fallbackBook.title}
                            />
                          </a>
                          <div className='offer-detail'>
                            <div>
                              <a href={`/books/${fallbackBook.id}`}>
                                <h6 className='name'>{fallbackBook.title}</h6>
                              </a>
                              <span>{fallbackBook.author_names}</span>
                              <h6 className='price theme-color'>
                                ₹{fallbackBook.discounted_price}
                              </h6>
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
                      src='/assets/images/book/banner/3.jpg'
                      className='bg-img blur-up lazyload'
                      alt=''
                    />
                    {/* <div className='home-detail p-top-left home-p-medium'>
                      <div>
                        <h6 className='text-yellow home-banner'>Seafood</h6>
                        <h3 className='text-uppercase fw-normal'>
                          <span className='theme-color fw-bold'>Freshes</span> Products
                        </h3>
                        <h3 className='fw-light'>every hour</h3>
                        <button className='btn btn-animation btn-md fw-bold mend-auto'>
                          Shop Now <i className='fa-solid fa-arrow-right icon'></i>
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='product-list-section section-b-space'>
        <RelatedProducts />
      </section>
    </>
  );
};

export default BookDetail;
