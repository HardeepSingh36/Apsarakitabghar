import RelatedProducts from '@/components/bookdetail/RelatedProducts';
import Reviews from '@/components/bookdetail/Reviews';
import BookGalleryDialog from '@/components/bookdetail/BookGalleryDialog';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Book } from '@/types/types';
import { getBookBySlug } from '@/services/bookService';
import { Heart, Loader } from 'react-feather';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addToCartAsync, addToLocalCartAction } from '@/features/cart/cartSlice';
import {
  addToWishlistAsync,
  fetchWishlistAsync,
  addToLocalWishlistAction,
} from '@/features/wishlist/wishlistSlice';
import type { RootState } from '@/app/store';
import { useAuthDialog } from '@/context/AuthDialogContext';
import { Tooltip } from 'react-tooltip';
import toast from 'react-hot-toast';

import { IMAGE_BASE_URL } from '@/constants';
import { BOOKS_BY_FLAGS } from '@/services/API';
import { fetchBannersByArea, getBannerImageUrl } from '@/services/bannerService';

const BookDetail = () => {
  // Trending books state
  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
  const [trendingLoading, setTrendingLoading] = useState(false);

  // Banner states
  const [mainBanner, setMainBanner] = useState<any>(null); // area 1
  const [sidebarBanner, setSidebarBanner] = useState<any>(null); // area 2
  useEffect(() => {
    async function fetchTrendingBooks() {
      setTrendingLoading(true);
      try {
        const response = await fetch(BOOKS_BY_FLAGS + '?is_trending=1&limit=3');
        const data = await response.json();
        if (data.status === 'success') {
          setTrendingBooks(data.data.books || []);
        } else {
          setTrendingBooks([]);
        }
      } catch (e) {
        setTrendingBooks([]);
      } finally {
        setTrendingLoading(false);
      }
    }
    fetchTrendingBooks();

    // Fetch banners for area 1 (main) and area 2 (sidebar)
    async function fetchBanners() {
      try {
        const banners1 = await fetchBannersByArea(1, 'active', 1);
        setMainBanner(banners1 && banners1.length > 0 ? banners1[0] : null);
        const banners2 = await fetchBannersByArea(2, 'active', 1);
        setSidebarBanner(banners2 && banners2.length > 0 ? banners2[0] : null);
      } catch (e) {
        setMainBanner(null);
        setSidebarBanner(null);
      }
    }
    fetchBanners();
  }, []);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuthDialog();
  const [quantity, setQuantity] = useState(1);
  const { slug } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoadingBook, setIsLoadingBook] = useState(true);
  // const [selectedFormat, setSelectedFormat] = useState('hardcover');
  const tags = ['BookLover', 'Bookworm', 'MustRead', 'Bookstagram'];
  const navigate = useNavigate();

  // Gallery dialog state
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    async function fetchBook() {
      if (!slug) return;

      setIsLoadingBook(true);
      try {
        const response = await getBookBySlug(slug);
        if (response.status === 'success' && response.data) {
          setBook(response.data);
        } else {
          setBook(null);
          toast.error('Book not found');
        }
      } catch (e) {
        console.error('Error fetching book:', e);
        setBook(null);
        toast.error('Failed to load book details');
      } finally {
        setIsLoadingBook(false);
      }
    }

    fetchBook();

    // Always fetch wishlist if authenticated, so wishlisted status is correct after refresh
    if (isAuthenticated) {
      dispatch(fetchWishlistAsync());
    }
  }, [slug, isAuthenticated, dispatch]);

  const handleAddToCart = async () => {
    if (!book || isAddingToCart) return;

    setCartAction('add'); // Set which action is being performed

    try {
      if (isAuthenticated) {
        // If authenticated, add to server and localStorage
        await dispatch(addToCartAsync({ book_id: book.id, quantity: quantity })).unwrap();
      } else {
        // If not authenticated, only add to localStorage
        dispatch(addToLocalCartAction({ book: book, quantity: quantity }));
      }

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
    if (!book || isWishlistLoading) return;

    try {
      if (!isInWishlist) {
        // Add to wishlist
        if (isAuthenticated) {
          // If authenticated, add to server and localStorage
          await dispatch(addToWishlistAsync(book.id)).unwrap();
        } else {
          // If not authenticated, only add to localStorage
          dispatch(addToLocalWishlistAction({ book: book }));
        }

        toast.success(`"${book.title}" added to wishlist`, {
          duration: 3000,
        });
      }
    } catch (error: any) {
      console.error('Failed to add to wishlist:', error);
      toast.error(error || 'Failed to add to wishlist. Please try again.', {
        duration: 4000,
      });
    }
  };

  const handleBuyNow = async () => {
    if (!book || isAddingToCart) return;

    setCartAction('buy'); // Set which action is being performed

    try {
      if (isAuthenticated) {
        // If authenticated, add to server and localStorage
        await dispatch(addToCartAsync({ book_id: book.id, quantity: 1 })).unwrap();
      } else {
        // If not authenticated, only add to localStorage
        dispatch(addToLocalCartAction({ book: book, quantity: 1 }));
      }

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

  if (isLoadingBook) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <Loader className='w-12 h-12 animate-spin mx-auto text-primary' />
          <p className='mt-4 text-gray-600'>Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <p className='text-xl text-gray-600'>Book not found</p>
          <Link to='/books' className='mt-4 inline-block text-primary hover:underline'>
            Browse all books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className='product-section !max-w-screen'>
        <div className='px-4'>
          <div className='row'>
            <div className='col-xxl-9 col-xl-8 col-lg-7 wow fadeInUp'>
              <div className='row g-4'>
                <div className='col-xl-6 wow fadeInUp'>
                  <div className='product-left-box'>
                    <div className='row g-2'>
                      <div className='col-xxl-10 col-lg-12 col-md-10 order-xxl-2 order-lg-1 order-md-2'>
                        <div className='product-main-2 no-arrow'>
                          <div>
                            <div className='slider-image relative group cursor-pointer shadow-md'>
                              <img
                                src={`${IMAGE_BASE_URL + book?.cover_image_name}` || ''}
                                id='img-1'
                                onClick={() => {
                                  if (
                                    book.gallery_images &&
                                    Array.isArray(book.gallery_images) &&
                                    book.gallery_images.length > 0
                                  ) {
                                    setSelectedImageIndex(0);
                                    setIsGalleryOpen(true);
                                  }
                                }}
                                className='img-fluid image_zoom_cls-0 blur-up lazyload notranslate hover:opacity-95 transition-opacity duration-200'
                                alt={book.title || ''}
                              />
                              {/* Gallery indicator overlay */}
                              {book.gallery_images &&
                                Array.isArray(book.gallery_images) &&
                                book.gallery_images.length > 0 && (
                                  <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200 flex items-center justify-center'>
                                    <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 px-4 py-2 rounded-full'>
                                      <span className='text-sm font-medium text-gray-900'>
                                        View Gallery ({book.gallery_images.length} images)
                                      </span>
                                    </div>
                                  </div>
                                )}
                              <div className='buy-box absolute right-4 top-4 bg-white p-2 rounded-full'>
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
                      {book.discounted_price && book.discounted_price < book.price && (
                        <h3 className='theme-color price'>
                          ₹{book.discounted_price || book.price}{' '}
                          <del className='text-content'>₹{book.price}</del>{' '}
                          <span className='offer theme-color'>
                            {book.discount_percent && `(${book.discount_percent}% off)`}
                          </span>
                        </h3>
                      )}
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
                            value={quantity === 0 ? 1 : quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              if (!isNaN(val)) {
                                setQuantity(val);
                              }
                            }}
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

                {/* put it here  */}

                <div className='col-12 mt-2'>
                  {/* Gallery Thumbnails */}
                  {book.gallery_images &&
                    Array.isArray(book.gallery_images) &&
                    book.gallery_images.length > 0 && (
                      <div className='mt-4 mx-auto'>
                        <div className='left-slider-image-2 left-slider no-arrow slick-top'>
                          <div
                            className='flex justify-center lg:justify-start gap-2 overflow-x-auto xxl:overflow-x-visible pb-2 xxl:pb-0'
                            style={{ scrollbarWidth: 'none' }}
                          >
                            {book.gallery_images.map((image, index) => (
                              <div
                                key={image.id}
                                className='flex-shrink-0 cursor-pointer'
                                onClick={() => {
                                  setSelectedImageIndex(index);
                                  setIsGalleryOpen(true);
                                }}
                              >
                                <div className='sidebar-image hover:opacity-75 transition-opacity duration-200 border-2 border-gray-200 rounded overflow-hidden'>
                                  <img
                                    src={IMAGE_BASE_URL + image.image_name}
                                    className='img-fluid blur-up lazyload w-30 h-30 xxl:w-full xxl:h-auto object-cover'
                                    alt={`${book.title} - Gallery ${index + 1}`}
                                    onError={(e) => {
                                      e.currentTarget.src = '/assets/images/book/product/1.jpg';
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                </div>

                <div className='col-12 mt-4'>
                  <div className='product-section-box mt-0'>
                    {/* <ul className='nav nav-tabs custom-nav' id='myTab' role='tablist'> */}
                    {/* <li className='nav-item' role='presentation'>
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
                      </li> */}

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
                    {/* </ul> */}

                    <div className='tab-content custom-tab pt-0' id='myTabContent'>
                      <div className='tab-pane fade show active' id='description' role='tabpanel'>
                        <div className='product-description'>
                          {/* <div className='nav-desh'>
                            <p>{book.description || 'No description available.'}</p>
                          </div> */}

                          <div className='banner-contain nav-desh'>
                            {mainBanner ? (
                              <a
                                href={mainBanner.url || undefined}
                                target={mainBanner.url ? '_blank' : undefined}
                                rel='noopener noreferrer'
                              >
                                <img
                                  src={getBannerImageUrl(mainBanner.image)}
                                  className='bg-img blur-up lazyload'
                                  alt={mainBanner.image || ''}
                                />
                              </a>
                            ) : (
                              <img
                                src='/assets/images/book/banner/1.jpg'
                                className='bg-img blur-up lazyload'
                                alt=''
                              />
                            )}
                          </div>
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
                      {trendingLoading ? (
                        <li className='text-center py-4'>
                          <span className='spinner-border text-primary' role='status'></span>
                          <p className='mt-2'>Loading trending books...</p>
                        </li>
                      ) : trendingBooks.length === 0 ? (
                        <li className='text-center py-4 text-muted'>No trending books found.</li>
                      ) : (
                        trendingBooks.map((book) => (
                          <li key={book.id}>
                            <div className='offer-product'>
                              <Link to={`/books/${book.slug}`} className='offer-image'>
                                <img
                                  src={IMAGE_BASE_URL + book.cover_image_name}
                                  className='img-fluid blur-up lazyload notranslate'
                                  alt={book.title}
                                  onError={(e) => {
                                    e.currentTarget.src = '/assets/images/book/product/1.jpg';
                                  }}
                                />
                              </Link>
                              <div className='offer-detail'>
                                <div>
                                  <Link to={`/books/${book.slug}`}>
                                    <h6 className='name notranslate' translate='no'>
                                      {book.title}
                                    </h6>
                                  </Link>
                                  <span>{book.author_name}</span>
                                  <h6 className='price theme-color'>
                                    ₹{book.discounted_price?.toFixed(2) ?? book.price?.toFixed(2)}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>

                <div className='ratio_156 pt-25'>
                  <div className='home-contain'>
                    {sidebarBanner ? (
                      <a
                        href={sidebarBanner.url || undefined}
                        target={sidebarBanner.url ? '_blank' : undefined}
                        rel='noopener noreferrer'
                      >
                        <img
                          src={getBannerImageUrl(sidebarBanner.image)}
                          className='bg-img blur-up lazyload'
                          alt={sidebarBanner.image || ''}
                        />
                      </a>
                    ) : (
                      <img
                        src='/assets/images/book/banner/3.jpg'
                        className='bg-img blur-up lazyload'
                        alt=''
                      />
                    )}
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

      {/* Gallery Dialog */}
      {book.gallery_images && book.gallery_images.length > 0 && (
        <BookGalleryDialog
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          images={book.gallery_images}
          initialIndex={selectedImageIndex}
          bookTitle={book.title}
        />
      )}
    </>
  );
};

export default BookDetail;
