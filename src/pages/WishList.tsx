import { useAppSelector, useAppDispatch } from '@/app/hooks';
import type { RootState } from '@/app/store';
import AddProductBox from '@/components/general/AddProductBox';
import { fetchWishlistAsync } from '@/features/wishlist/wishlistSlice';
import { useEffect } from 'react';
import { useAuthDialog } from '@/context/AuthDialogContext';
import { Loader } from 'react-feather';
import ProductSkeleton from '@/components/ProductSkeleton';

const WishList = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuthDialog();
  const wishlistState = useAppSelector((state: RootState) => state.wishlist);
  const { items: wishlistItems, loading, error } = wishlistState;

  // Fetch wishlist data when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlistAsync());
    }
  }, [dispatch, isAuthenticated]);

  // Show loading skeleton while fetching data
  if (loading && wishlistItems.length === 0) {
    return (
      <div>
        <section className='wishlist-section section-b-space'>
          <div className='container-fluid-lg'>
            <div className='text-center mb-4'>
              <h2 className='text-2xl font-bold text-gray-800'>My Wishlist</h2>
              <p className='text-gray-600'>Loading your saved books...</p>
            </div>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx}>
                  <ProductSkeleton />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <div>
        <section className='wishlist-section section-b-space'>
          <div className='container-fluid-lg'>
            <div className='text-center py-12'>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>My Wishlist</h2>
              <div className='text-red-500 mb-4'>
                <p>Failed to load wishlist: {error}</p>
              </div>
              <button
                onClick={() => dispatch(fetchWishlistAsync())}
                className='btn bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition'
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Show empty state if not authenticated
  if (!isAuthenticated) {
    return (
      <div>
        <section className='wishlist-section section-b-space'>
          <div className='container-fluid-lg'>
            <div className='text-center py-12'>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>My Wishlist</h2>
              <p className='text-gray-600 mb-4'>Please sign in to view your wishlist</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Wishlist Section Start */}
      <section className='wishlist-section section-b-space'>
        <div className='container-fluid-lg'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800'>My Wishlist</h2>
          </div>

          <div className='grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {wishlistItems.length > 0 ? (
              wishlistItems.map((item) => (
                <div key={item.id}>
                  <div className='wishlist-box'>
                    <AddProductBox key={item.id} product={item} idx={item.id} removeButton={true} />
                  </div>
                </div>
              ))
            ) : (
              <div className='col-span-full text-center py-12'>
                <div className='text-gray-400 mb-4'>
                  <svg
                    className='w-16 h-16 mx-auto'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-semibold text-gray-600 mb-2'>Your wishlist is empty</h3>
                <p className='text-gray-500 mb-4'>
                  Discover amazing books and add them to your wishlist
                </p>
                <a
                  href='/books'
                  className='inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition'
                >
                  Browse Books
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WishList;
