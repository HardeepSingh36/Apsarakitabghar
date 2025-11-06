import RelatedProducts from '@/components/bookdetail/RelatedProducts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Book, GalleryImage } from '@/types/types';
import { getBookBySlug } from '@/services/bookService';
import { Heart, Loader, Minus, Plus, ShoppingCart } from 'react-feather';
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
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuthDialog();
  const { slug } = useParams();
  const navigate = useNavigate();

  // State
  const [book, setBook] = useState<Book | null>(null);
  const [isLoadingBook, setIsLoadingBook] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [_selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedMainImage, setSelectedMainImage] = useState<string>('');
  const [_isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [cartAction, setCartAction] = useState<'add' | 'buy' | null>(null);
  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [mainBanner, setMainBanner] = useState<any>(null);
  const [sidebarBanner, setSidebarBanner] = useState<any>(null);

  // Zoom effect state
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // Image lightbox state
  const [showLightbox, setShowLightbox] = useState(false);

  const tags = ['BookLover', 'Bookworm', 'MustRead', 'Bookstagram'];

  // Redux selectors
  const wishlistState = useAppSelector((state: RootState) => state.wishlist);
  const isInWishlist = book ? wishlistState.items.find((item) => item.id === book.id) : null;
  const isAddingToWishlist = book ? wishlistState.operationLoading[`add-${book.id}`] : false;
  const isWishlistLoading = isAddingToWishlist || false;

  const cartState = useAppSelector((state: RootState) => state.cart);
  const isAddingToCart = book ? cartState.operationLoading[`add-${book.id}`] : false;

  // Fetch book data
  useEffect(() => {
    async function fetchBook() {
      if (!slug) return;

      setIsLoadingBook(true);
      try {
        const response = await getBookBySlug(slug);
        if (response.status === 'success' && response.data) {
          setBook(response.data);
          setSelectedMainImage(IMAGE_BASE_URL + response.data.cover_image_name);
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

    if (isAuthenticated) {
      dispatch(fetchWishlistAsync());
    }
  }, [slug, isAuthenticated, dispatch]);

  // Fetch trending books and banners
  useEffect(() => {
    async function fetchTrendingBooks() {
      setTrendingLoading(true);
      try {
        const response = await fetch(BOOKS_BY_FLAGS + '?is_trending=1&limit=3');
        const data = await response.json();
        if (data.status === 'success') {
          setTrendingBooks(data.data.books || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setTrendingLoading(false);
      }
    }

    async function fetchBanners() {
      try {
        const banners1 = await fetchBannersByArea(1, 'active', 1);
        setMainBanner(banners1 && banners1.length > 0 ? banners1[0] : null);
        const banners2 = await fetchBannersByArea(2, 'active', 1);
        setSidebarBanner(banners2 && banners2.length > 0 ? banners2[0] : null);
      } catch (e) {
        console.error(e);
      }
    }

    fetchTrendingBooks();
    fetchBanners();
  }, []);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (showLightbox) {
      document.body.classList.add('lightbox-open');
    } else {
      document.body.classList.remove('lightbox-open');
    }

    return () => {
      document.body.classList.remove('lightbox-open');
    };
  }, [showLightbox]);

  // Handlers
  const handleAddToCart = async () => {
    if (!book || isAddingToCart) return;
    setCartAction('add');

    try {
      if (isAuthenticated) {
        await dispatch(addToCartAsync({ book_id: book.id, quantity: quantity })).unwrap();
      } else {
        dispatch(addToLocalCartAction({ book: book, quantity: quantity }));
      }

      const itemText = quantity > 1 ? `${quantity} copies of "${book.title}"` : `"${book.title}"`;
      toast.success(`${itemText} added to cart`, { duration: 3000 });
      setQuantity(1);
    } catch (error: any) {
      toast.error(error || 'Failed to add item to cart', { duration: 4000 });
    } finally {
      setCartAction(null);
    }
  };

  const handleAddToWishlist = async () => {
    if (!book || isWishlistLoading) return;

    try {
      if (!isInWishlist) {
        if (isAuthenticated) {
          await dispatch(addToWishlistAsync(book.id)).unwrap();
        } else {
          dispatch(addToLocalWishlistAction({ book: book }));
        }
        toast.success(`"${book.title}" added to wishlist`, { duration: 3000 });
      }
    } catch (error: any) {
      toast.error(error || 'Failed to add to wishlist', { duration: 4000 });
    }
  };

  const handleBuyNow = async () => {
    if (!book || isAddingToCart) return;
    setCartAction('buy');

    try {
      if (isAuthenticated) {
        await dispatch(addToCartAsync({ book_id: book.id, quantity: 1 })).unwrap();
      } else {
        dispatch(addToLocalCartAction({ book: book, quantity: 1 }));
      }

      toast.success(`"${book.title}" added to cart!`, { duration: 2000 });
      navigate('/cart', { state: { isBuyNow: true } });
    } catch (error: any) {
      toast.error(error || 'Failed to add item to cart', { duration: 4000 });
    } finally {
      setCartAction(null);
    }
  };

  // Image zoom handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  // Handle image click - show lightbox on mobile, gallery on desktop
  const handleImageClick = () => {
    if (window.innerWidth < 768) {
      // Mobile: show lightbox
      setShowLightbox(true);
    } else if (book && book.gallery_images && book.gallery_images.length > 0) {
      // Desktop: show gallery
      setIsGalleryOpen(true);
    }
  };

  // Loading state
  if (isLoadingBook) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <Loader className='w-12 h-12 animate-spin mx-auto text-[#fc2403]' />
          <p className='mt-4 text-gray-600'>Loading book details...</p>
        </div>
      </div>
    );
  }

  // Not found state
  if (!book) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <p className='text-xl text-gray-600'>Book not found</p>
          <Link
            to='/books'
            className='mt-4 inline-block text-[#fc2403] hover:text-[#fc6603] underline'
          >
            Browse all books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='max-w-screen-2xl mx-auto px-4 py-8 lg:py-12'>
        <div className='grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-4'>
          {/* Main Content - Left Side */}
          <div className='xl:col-span-8'>
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {/* Image Gallery */}
                <div className=''>
                  <div className='flex gap-3'>
                    {/* Thumbnails */}
                    {book.gallery_images && book.gallery_images.length > 0 && (
                      <div className='flex flex-col gap-2 w-20'>
                        {/* Cover Image Thumbnail */}
                        <div
                          className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                            selectedMainImage === IMAGE_BASE_URL + book.cover_image_name
                              ? 'border-[#fc2403]'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => {
                            setSelectedMainImage(IMAGE_BASE_URL + book.cover_image_name);
                            setSelectedImageIndex(0);
                          }}
                        >
                          <img
                            src={IMAGE_BASE_URL + book.cover_image_name}
                            alt={`${book.title} cover`}
                            className='w-full h-24 object-cover'
                            onError={(e) =>
                              (e.currentTarget.src = '/assets/images/book/product/1.jpg')
                            }
                          />
                        </div>

                        {/* Gallery Thumbnails */}
                        {book.gallery_images.map((image: GalleryImage, idx: number) => (
                          <div
                            key={image.id || idx}
                            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                              selectedMainImage === IMAGE_BASE_URL + image.image_name
                                ? 'border-[#fc2403]'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => {
                              setSelectedMainImage(IMAGE_BASE_URL + image.image_name);
                              setSelectedImageIndex(idx + 1);
                            }}
                          >
                            <img
                              src={IMAGE_BASE_URL + image.image_name}
                              alt={`${book.title} ${idx + 1}`}
                              className='w-full h-24 object-cover'
                              onError={(e) =>
                                (e.currentTarget.src = '/assets/images/book/product/1.jpg')
                              }
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Main Image */}
                    <div className='flex-1 relative group'>
                      <div
                        className='relative rounded-lg overflow-hidden border border-gray-200 cursor-grab'
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img
                          src={selectedMainImage || IMAGE_BASE_URL + book.cover_image_name}
                          alt={book.title}
                          className='w-full h-auto object-cover transition-transform duration-200 cursor-pointer'
                          style={{
                            transform: showZoom ? 'scale(1.5)' : 'scale(1)',
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          }}
                          onClick={handleImageClick}
                          onError={(e) =>
                            (e.currentTarget.src = '/assets/images/book/product/1.jpg')
                          }
                        />

                        {/* Wishlist Button */}
                        <button
                          onClick={handleAddToWishlist}
                          disabled={isWishlistLoading}
                          className='absolute top-4 right-4 bg-white p-2 !rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 z-10'
                          data-tooltip-id='wishlist-tooltip'
                          data-tooltip-content={
                            isWishlistLoading
                              ? 'Adding...'
                              : isInWishlist
                              ? 'In wishlist'
                              : 'Add to wishlist'
                          }
                        >
                          {isWishlistLoading ? (
                            <Loader className='w-5 h-5 animate-spin text-gray-500' />
                          ) : (
                            <Heart
                              className={`w-5 h-5 ${
                                isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-500'
                              }`}
                            />
                          )}
                        </button>
                        <Tooltip id='wishlist-tooltip' />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Book Details */}
                <div className='flex flex-col'>
                  <h1 className='text-xl lg:!text-4xl font-bold text-gray-900 notranslate mb-2'>
                    {book.title}
                  </h1>
                  <p className='!text-lg text-gray-600 mb-2'>by {book.author_name}</p>

                  {/* Price */}
                  {book.discounted_price && book.discounted_price < book.price ? (
                    <div className='mb-4'>
                      <div className='flex items-baseline gap-3'>
                        <span className='text-3xl font-bold text-[#fc2403]'>
                          ₹{book.discounted_price}
                        </span>
                        <span className='text-xl text-gray-500 line-through'>₹{book.price}</span>
                        {book.discount_percent && (
                          <span className='bg-[#fc2403] text-white px-2 py-1 rounded text-sm font-semibold'>
                            {book.discount_percent}% OFF
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className='mb-4'>
                      <span className='text-3xl font-bold text-gray-900'>₹{book.price}</span>
                    </div>
                  )}

                  {/* Description */}
                  <div className='mb-4'>
                    <h3 className='text-sm font-semibold text-gray-700 uppercase mb-2'>
                      Description
                    </h3>
                    <p className='text-gray-600 leading-relaxed !mb-0'>
                      {book.description || 'No description available.'}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className='mb-4'>
                    <h3 className='text-sm font-semibold text-gray-700 uppercase mb-2'>Tags</h3>
                    <div className='flex flex-wrap gap-2'>
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer'
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className='space-y-4'>
                    <div className='flex items-center gap-4'>
                      <span className='text-sm font-semibold text-gray-700'>Quantity:</span>
                      <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden'>
                        <button
                          onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                          className='px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors'
                        >
                          <Minus className='w-4 h-4' />
                        </button>
                        <input
                          type='text'
                          value={quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val) && val > 0) setQuantity(val);
                          }}
                          className='w-16 text-center py-2 border-x border-gray-300 focus:outline-none'
                        />
                        <button
                          onClick={() => setQuantity((prev) => prev + 1)}
                          className='px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors'
                        >
                          <Plus className='w-4 h-4' />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='grid grid-cols-2 gap-4'>
                      <button
                        onClick={handleAddToCart}
                        disabled={isAddingToCart && cartAction === 'add'}
                        className='flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                      >
                        {isAddingToCart && cartAction === 'add' ? (
                          <>
                            <Loader className='w-5 h-5 animate-spin' />
                            Adding...
                          </>
                        ) : (
                          <>
                            <ShoppingCart className='w-5 h-5' />
                            Add to Cart
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleBuyNow}
                        disabled={isAddingToCart && cartAction === 'buy'}
                        className='px-6 py-3 bg-gradient-to-r from-[#fc2403] to-[#fc6603] text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                      >
                        {isAddingToCart && cartAction === 'buy' ? (
                          <span className='flex items-center justify-center gap-2'>
                            <Loader className='w-5 h-5 animate-spin' />
                            Processing...
                          </span>
                        ) : (
                          'Buy Now'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Banner Section */}
              {mainBanner && (
                <div className='mt-8'>
                  <a
                    href={mainBanner.url || undefined}
                    target={mainBanner.url ? '_blank' : undefined}
                    rel='noopener noreferrer'
                    className='block rounded-lg overflow-hidden'
                  >
                    <img
                      src={getBannerImageUrl(mainBanner.image)}
                      alt={mainBanner.image || ''}
                      className='w-full h-auto'
                    />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className='xl:col-span-4'>
            <div className='sticky top-4 space-y-6'>
              {/* Trending Books */}
              <div className='bg-white rounded-lg shadow-sm p-6'>
                <h3 className='text-lg font-bold text-gray-900 mb-4'>Trending Books</h3>
                {trendingLoading ? (
                  <div className='text-center py-8'>
                    <Loader className='w-8 h-8 animate-spin mx-auto text-[#fc2403]' />
                  </div>
                ) : trendingBooks.length === 0 ? (
                  <p className='text-center text-gray-500 py-4'>No trending books found.</p>
                ) : (
                  <div className='space-y-4'>
                    {trendingBooks.map((trendingBook) => (
                      <Link
                        key={trendingBook.id}
                        to={`/books/${trendingBook.slug}`}
                        className='flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors !bg-[#fdf6e3]'
                      >
                        <img
                          src={IMAGE_BASE_URL + trendingBook.cover_image_name}
                          alt={trendingBook.title}
                          className='w-16 h-20 object-cover rounded'
                          onError={(e) =>
                            (e.currentTarget.src = '/assets/images/book/product/1.jpg')
                          }
                        />
                        <div className='flex-1 min-w-0'>
                          <h4 className='font-semibold text-sm text-gray-900 truncate notranslate'>
                            {trendingBook.title}
                          </h4>
                          <p className='text-xs text-gray-600 truncate'>
                            {trendingBook.author_name}
                          </p>
                          <p className='text-sm font-bold text-[#fc2403] mt-1'>
                            ₹
                            {trendingBook.discounted_price?.toFixed(2) ??
                              trendingBook.price?.toFixed(2)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar Banner */}
              {sidebarBanner && (
                <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
                  <a
                    href={sidebarBanner.url || undefined}
                    target={sidebarBanner.url ? '_blank' : undefined}
                    rel='noopener noreferrer'
                  >
                    <img
                      src={getBannerImageUrl(sidebarBanner.image)}
                      alt={sidebarBanner.image || ''}
                      className='w-full h-auto'
                    />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className=''>
        <RelatedProducts bookId={book?.id} />
      </div>

      {/* Image Lightbox for Mobile */}
      {showLightbox && (
        <div
          className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4'
          onClick={() => setShowLightbox(false)}
        >
          <button
            onClick={() => setShowLightbox(false)}
            className='absolute top-4 right-4 text-white hover:text-gray-300 transition-colors'
            aria-label='Close lightbox'
          >
            <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
          <div className='relative max-w-full max-h-full' onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedMainImage || IMAGE_BASE_URL + book.cover_image_name}
              alt={book.title}
              className='max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg'
              onError={(e) => (e.currentTarget.src = '/assets/images/book/product/1.jpg')}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetail;
