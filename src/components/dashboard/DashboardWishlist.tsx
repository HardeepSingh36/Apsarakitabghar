import { useAppSelector, useAppDispatch } from '@/app/hooks';
import type { RootState } from '@/app/store';
import AddProductBox from '@/components/general/AddProductBox';
import { fetchWishlistAsync } from '@/features/wishlist/wishlistSlice';
import { useEffect } from 'react';
import { useAuthDialog } from '@/context/AuthDialogContext';
import { Loader } from 'react-feather';
import ProductSkeleton from '@/components/ProductSkeleton';

const DashboardWishlist = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuthDialog();
  const {
    items: wishlistItems,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.wishlist);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlistAsync());
    }
  }, [dispatch, isAuthenticated]);

  if (loading && wishlistItems.length === 0) {
    return (
      <div className='dashboard-wishlist'>
        <div className='title'>
          <h2>My Wishlist History</h2>
          <span className='title-leaf title-leaf-gray'>
            <svg className='icon-width bg-gray'>
              <use xlinkHref='assets/svg/leaf.svg#leaf'></use>
            </svg>
          </span>
        </div>
        <div className='row g-sm-4 g-3'>
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className='col-xxl-3 col-lg-6 col-md-4 col-sm-6'>
              <ProductSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='dashboard-wishlist'>
        <div className='title'>
          <h2>My Wishlist History</h2>
          <span className='title-leaf title-leaf-gray'>
            <svg className='icon-width bg-gray'>
              <use xlinkHref='assets/svg/leaf.svg#leaf'></use>
            </svg>
          </span>
        </div>
        <div className='text-center py-6'>
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
    );
  }

  if (!isAuthenticated) {
    return (
      <div className='dashboard-wishlist'>
        <div className='title'>
          <h2>My Wishlist History</h2>
          <span className='title-leaf title-leaf-gray'>
            <svg className='icon-width bg-gray'>
              <use xlinkHref='assets/svg/leaf.svg#leaf'></use>
            </svg>
          </span>
        </div>
        <div className='text-center py-6'>
          <p className='text-gray-600'>Please sign in to view your wishlist</p>
        </div>
      </div>
    );
  }

  return (
    <div className='dashboard-wishlist'>
      <div className='title'>
        <h2>My Wishlist History</h2>
        <span className='title-leaf title-leaf-gray'>
          <svg className='icon-width bg-gray'>
            <use xlinkHref='assets/svg/leaf.svg#leaf'></use>
          </svg>
        </span>
      </div>

      {loading && wishlistItems.length > 0 && (
        <div className='text-center mb-4'>
          <Loader className='w-6 h-6 animate-spin text-emerald-600 mx-auto' />
          <p className='text-sm text-gray-500 mt-2'>Updating wishlist...</p>
        </div>
      )}

      <div className='row g-sm-4 g-3'>
        {wishlistItems.length === 0 ? (
          <div className='col-12 text-center py-6'>
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
        ) : (
          <div className='grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 w-full'>
            {wishlistItems.map((item, idx) => (
              <AddProductBox key={item.id} product={item} idx={idx} removeButton={true} className='!bg-white !block p-2' />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardWishlist;
