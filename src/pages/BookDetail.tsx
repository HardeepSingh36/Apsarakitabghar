import RelatedProducts from '@/components/bookdetail/RelatedProducts';
import Reviews from '@/components/bookdetail/Reviews';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Book } from '@/types/types';
import { getBooks } from '@/services/bookService';
import { Heart, Loader } from 'react-feather';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addToCartAsync } from '@/features/cart/cartSlice';
import { addToWishlistAsync, fetchWishlistAsync } from '@/features/wishlist/wishlistSlice';
import type { RootState } from '@/app/store';
import { useAuthDialog } from '@/context/AuthDialogContext';
import { Tooltip } from 'react-tooltip';
import toast from 'react-hot-toast';
import { IMAGE_BASE_URL } from '@/constants';

const fallbackBook: Book = {
  id: 51,
  title: 'ਪੰਜਾਬ ਦੇ ਵੀਰ ਯੋਧੇ',
  slug: 'punjab-de-veer-yodhe',
  description: 'ਪੰਜਾਬ ਦੇ ਇਤਿਹਾਸਕ ਵੀਰ ਯੋਧਿਆਂ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਬਲਿਦਾਨਾਂ ਦੀ ਗਾਥਾ',
  isbn: '9782222222244',
  language: 'Punjabi',
  price: 450,
  discount_percent: 18,
  stock_quantity: 52,
  pages: 423,
  author_name: 'ਅਮਰਜੀਤ ਸਿੰਘ',
  publisher_name: 'ਵੀਰ ਗਾਥਾ ਪ੍ਰਕਾਸ਼ਨ',
  publish_date: '2023-05-25',
  cover_image_name: '3.jpg',
  featured: 1,
  views_count: 1567,
  sales_count: 124,
  rating_avg: 4.5,
  rating_count: 234,
  created_at: '2025-09-26 09:09:35',
  updated_at: '2025-09-26 09:11:18',
  author_id: 50,
  category_id: 5,
  genre_id: 49,
  author_table_id: null,
  author_pen_name: null,
  category_table_id: 5,
  category_name: 'रहस्य कहानी',
  genre_table_id: null,
  genre_name: null,
  tags: [],
  discounted_price: 369,
};

const BookDetail = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, openSignIn } = useAuthDialog();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  // const [selectedFormat, setSelectedFormat] = useState('hardcover');
  const tags = ['BookLover', 'Bookworm', 'MustRead', 'Bookstagram'];
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

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart');
      openSignIn('/cart'); // Pass redirect path
      return;
    }

    if (!book || isAddingToCart) return;

    setCartAction('add'); // Set which action is being performed

    try {
      await dispatch(addToCartAsync({ book_id: book.id, quantity: quantity })).unwrap();
      const itemText = quantity > 1 ? `${quantity} copies of "${book.title}"` : `"${book.title}"`;
      toast.success(`${itemText} added to cart`, {
        duration: 3000,
      });
      setQuantity(1);
    } catch (error: any) {
      console.error('Failed to add item to cart:', error);
      toast.error(error || 'Failed to add item to cart. Please try again.', {
        duration: 4000,
      });
    } finally {
      setCartAction(null); // Reset action state
    }
  };

  // Get wishlist state from Redux
  const wishlistState = useAppSelector((state: RootState) => state.wishlist);
  const isInWishlist = book ? wishlistState.items.find((item) => item.id === book.id) : null;
  const isAddingToWishlist = book ? wishlistState.operationLoading[`add-${book.id}`] : false;
  const isWishlistLoading = isAddingToWishlist || false;

  // Get cart state from Redux
  const cartState = useAppSelector((state: RootState) => state.cart);
  const isAddingToCart = book ? cartState.operationLoading[`add-${book.id}`] : false;

  // Local state to track which button was clicked
  const [cartAction, setCartAction] = useState<'add' | 'buy' | null>(null);

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to manage your wishlist');
      openSignIn('/wishlist'); // Pass redirect path
      return;
    }

    if (!book || isWishlistLoading) return;

    try {
      if (!isInWishlist) {
        // Add to wishlist using API
        await dispatch(addToWishlistAsync(book.id)).unwrap();

        // Refresh wishlist to get updated data
        dispatch(fetchWishlistAsync());

        toast.success(`"${book.title}" added to wishlist`, {
          duration: 3000,
        });

        navigate('/wishlist');
      }
    } catch (error: any) {
      console.error('Failed to add to wishlist:', error);
      toast.error(error || 'Failed to add to wishlist. Please try again.', {
        duration: 4000,
      });
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to purchase items');
      openSignIn('/cart'); // Pass redirect path
      return;
    }

    if (!book || isAddingToCart) return;

    setCartAction('buy'); // Set which action is being performed

    try {
      await dispatch(addToCartAsync({ book_id: book.id, quantity: 1 })).unwrap();
      toast.success(`"${book.title}" added to cart!`, {
        duration: 2000,
      });
      navigate('/cart', { state: { isBuyNow: true } });
    } catch (error: any) {
      console.error('Failed to add item to cart:', error);
      toast.error(error || 'Failed to add item to cart. Please try again.', {
        duration: 4000,
      });
    } finally {
      setCartAction(null); // Reset action state
    }
  };

  console.log(IMAGE_BASE_URL + book?.cover_image_name);

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
                            <div className='slider-image relative'>
                              <img
                                src={`${IMAGE_BASE_URL + book?.cover_image_name}` || ''}
                                id='img-1'
                                data-zoom-image={
                                  IMAGE_BASE_URL + book.cover_image_name ||
                                  '/assets/images/book/product/1.jpg'
                                }
                                className='img-fluid image_zoom_cls-0 blur-up lazyload notranslate'
                                alt={book.title || ''}
                              />
                              <div className='buy-box absolute right-4 top-4 bg-white p-2 rounded-full md:hidden'>
                                <button
                                  onClick={handleAddToWishlist}
                                  className={`flex items-center gap-2 ${
                                    isWishlistLoading ? 'opacity-50 cursor-not-allowed' : ''
                                  }`}
                                  disabled={isWishlistLoading}
                                  data-tooltip-id='cart-tooltip'
                                  data-tooltip-content={
                                    isWishlistLoading
                                      ? 'Adding to wishlist...'
                                      : isInWishlist
                                      ? 'Already in wishlist'
                                      : 'Add to wishlist'
                                  }
                                >
                                  {isWishlistLoading ? (
                                    <Loader className='w-6 h-6 animate-spin text-gray-500' />
                                  ) : (
                                    <Heart
                                      className={`w-6 h-6 ${
                                        isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-500'
                                      }`}
                                    />
                                  )}
                                </button>
                                <Tooltip id='cart-tooltip' />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-xl-6 wow fadeInUp' data-wow-delay='0.1s'>
                  <div className='right-box-contain relative'>
                    <div className='buy-box absolute right-4 top-0 !hidden md:!block'>
                      <button
                        onClick={handleAddToWishlist}
                        className={`flex items-center gap-2 ${
                          isWishlistLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={isWishlistLoading}
                        data-tooltip-id='cart-tooltip'
                        data-tooltip-content={
                          isWishlistLoading
                            ? 'Adding to wishlist...'
                            : isInWishlist
                            ? 'Already in wishlist'
                            : 'Add to wishlist'
                        }
                      >
                        {isWishlistLoading ? (
                          <Loader className='w-6 h-6 animate-spin text-gray-500' />
                        ) : (
                          <Heart
                            className={`w-6 h-6 ${
                              isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-500'
                            }`}
                          />
                        )}
                      </button>
                      <Tooltip id='cart-tooltip' />
                    </div>
                    <h2 className='name mb-0 notranslate'>{book.title || 'Book Title'}</h2>
                    <p className='author text-muted'>{book.author_name || 'Book Author'}</p>
                    {/* <div className='price-rating'>
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
                    </div> */}

                    <div className='product-contain'>
                      <p>{book.description || 'No description available.'}</p>
                    </div>

                    {/* Book Formats */}
                    <div className='product-package'>
                      <div className='product-title'>
                        <h4>Tags</h4>
                      </div>
                      <ul className='select-package'>
                        {tags.map((tag) => (
                          <li key={tag}>
                            <a
                              type='button'
                              href='javascript:void(0)'
                              // onClick={() => setSelectedFormat(format)}
                              // className={`capitalize ${selectedFormat === format ? 'active' : ''}`}
                              className='capitalize'
                            >
                              {tag}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className='price-rating mt-4'>
                      <h3 className='theme-color price'>
                        ₹{book.discounted_price || book.price}{' '}
                        <del className='text-content'>₹{book.price}</del>{' '}
                        <span className='offer theme-color'>
                          ({book.discount_percent ? `${book.discount_percent}% off` : '8% off'})
                        </span>
                      </h3>
                      {/* <div className='product-rating custom-rate'>
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
                      </div> */}
                    </div>

                    {/* Quantity */}
                    <div className='note-box product-package !items-start'>
                      <div className='cart_qty qty-box product-qty'>
                        <div className='input-group'>
                          <button
                            type='button'
                            className='qty-left-minus'
                            data-type='minus'
                            data-field=''
                            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                          >
                            <i className='fa fa-minus'></i>
                          </button>
                          <input
                            className='form-control input-number qty-input'
                            type='text'
                            name='quantity'
                            readOnly
                            value={quantity === 0 ? 1 : quantity}
                          />
                          <button
                            type='button'
                            className='qty-right-plus'
                            data-type='plus'
                            data-field=''
                            onClick={() => setQuantity((prev) => (prev === 0 ? 2 : prev + 1))}
                          >
                            <i className='fa fa-plus'></i>
                          </button>
                        </div>
                      </div>

                      <div className='w-full'>
                        <button
                          className={`btn btn-md bg-dark cart-button text-white w-100 ${
                            isAddingToCart && cartAction === 'add'
                              ? 'opacity-75 cursor-not-allowed'
                              : ''
                          }`}
                          onClick={handleAddToCart}
                          disabled={isAddingToCart && cartAction === 'add'}
                        >
                          {isAddingToCart && cartAction === 'add' ? (
                            <div className='flex items-center justify-center gap-2'>
                              <Loader className='w-4 h-4 animate-spin' />
                              Adding...
                            </div>
                          ) : (
                            'Add To Cart'
                          )}
                        </button>
                        <button
                          className={`btn btn-md !bg-gradient-to-r !from-red-400 !to-red-500 cart-button mt-2 text-white w-100 ${
                            isAddingToCart && cartAction === 'buy'
                              ? 'opacity-75 cursor-not-allowed'
                              : ''
                          }`}
                          onClick={handleBuyNow}
                          disabled={isAddingToCart && cartAction === 'buy'}
                        >
                          {isAddingToCart && cartAction === 'buy' ? (
                            <div className='flex items-center justify-center gap-2'>
                              <Loader className='w-4 h-4 animate-spin' />
                              Processing...
                            </div>
                          ) : (
                            'Buy Now'
                          )}
                        </button>
                      </div>
                    </div>

                    {/* <div className='progress-sec'>
                      <div className='left-progressbar'>
                        <h6>
                          {book.stock
                            ? `Please hurry! Only ${book.stock} left in stock`
                            : 'Please hurry! Only 5 left in stock'}
                        </h6>
                      </div>
                    </div> */}

                    {/* <div className='pickup-box'>
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
                            Category :{' '}
                            <a href='javascript:void(0)'>
                              {book.category_ids?.join(', ') || 'Cake,'}
                              Mystery
                            </a>{' '}
                            <a href='javascript:void(0)'>{book.language || 'Backery'}</a>
                          </li>
                        </ul>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className='col-12'>
                  <div className='product-section-box'>
                    <ul className='nav nav-tabs custom-nav' id='myTab' role='tablist'>
                      <li className='nav-item' role='presentation'>
                        <button
                          className='nav-link'
                          id='description-tab'
                          data-bs-toggle='tab'
                          data-bs-target='#description'
                          type='button'
                          role='tab'
                        >
                          Description
                        </button>
                      </li>

                      {/* <li className='nav-item' role='presentation'>
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
                      </li> */}
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
                                {/* <td>{book.publisher_name || 'Lavian Exotique'}</td> */}
                              </tr>
                              <tr>
                                <td>Form</td>
                                {/* <td>{book.format || 'Bar Brownie'}</td> */}
                              </tr>
                              <tr>
                                <td>Package Information</td>
                                <td>Box</td>
                              </tr>
                              {/* <tr>
                                <td>Manufacturer</td>
                                <td>{book.publisher_name || 'Prayagh Nutri Product Pvt Ltd'}</td>
                              </tr> */}
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
                {/* <div className='vendor-box'>
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
                </div> */}

                <div className='pt-25'>
                  <div className='category-menu'>
                    <h3>Trending Books</h3>
                    <ul className='product-list product-right-sidebar border-0 p-0'>
                      <li>
                        <div className='offer-product'>
                          <a href={`/books/${fallbackBook.slug}`} className='offer-image'>
                            <img
                              src={IMAGE_BASE_URL + fallbackBook.cover_image_name || ''}
                              className='img-fluid blur-up lazyload notranslate'
                              alt={fallbackBook.title}
                            />
                          </a>
                          <div className='offer-detail'>
                            <div>
                              <a href={`/books/${fallbackBook.slug}`}>
                                <h6 className='name notranslate' translate='no'>
                                  {fallbackBook.title}
                                </h6>
                              </a>
                              <span>{fallbackBook.author_name}</span>
                              <h6 className='price theme-color'>
                                ₹{fallbackBook.discounted_price}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='offer-product'>
                          <a href={`/books/${fallbackBook.slug}`} className='offer-image'>
                            {book.cover_image_name && (
                              <img
                                src={IMAGE_BASE_URL + fallbackBook.cover_image_name}
                                className='img-fluid blur-up lazyload notranslate'
                                alt={fallbackBook.title}
                              />
                            )}
                          </a>
                          <div className='offer-detail'>
                            <div>
                              <a href={`/books/${fallbackBook.slug}`}>
                                <h6 className='name notranslate'>{fallbackBook.title}</h6>
                              </a>
                              <span>{fallbackBook.author_name}</span>
                              <h6 className='price theme-color'>
                                ₹{fallbackBook.discounted_price}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='offer-product'>
                          <a href={`/books/${fallbackBook.slug}`} className='offer-image'>
                            <img
                              src={IMAGE_BASE_URL + fallbackBook.cover_image_name}
                              className='img-fluid blur-up lazyload notranslate'
                              alt={fallbackBook.title}
                            />
                          </a>
                          <div className='offer-detail'>
                            <div>
                              <a href={`/books/${fallbackBook.slug}`}>
                                <h6 className='name notranslate'>{fallbackBook.title}</h6>
                              </a>
                              <span>{fallbackBook.author_name}</span>
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
        <RelatedProducts bookId={book?.id} />
      </section>
    </>
  );
};

export default BookDetail;
