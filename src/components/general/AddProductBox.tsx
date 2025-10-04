import { Link } from 'react-router-dom';
import { X, Loader } from 'react-feather';
// import { Tooltip } from 'react-tooltip';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { RootState } from '@/app/store';
import { addToCartAsync } from '@/features/cart/cartSlice';
import {
  addToWishlistAsync,
  removeFromWishlistAsync,
  fetchWishlistAsync,
} from '@/features/wishlist/wishlistSlice';
import { useAuthDialog } from '@/context/AuthDialogContext';
import type { Book } from '@/types/types';
import { useCurrency } from '@/context/CurrencyContext';
import 'react-loading-skeleton/dist/skeleton.css';
import { IMAGE_BASE_URL } from '@/constants';
import toast from 'react-hot-toast';

interface AddProductBoxProps {
  product: Book;
  idx: number;
  showOptions?: boolean;
  removeButton?: boolean;
  className?: string;
}

const AddProductBox = ({
  product,
  idx,
  // showOptions = false,
  removeButton = false,
  className = '',
}: AddProductBoxProps & { isLoading?: boolean }) => {
  const dispatch = useAppDispatch();
  const { currency } = useCurrency();
  const { isAuthenticated, openSignIn } = useAuthDialog();

  // Get cart state for this product
  const cartItem = useAppSelector((state: RootState) =>
    state.cart.items.find((item) => item.book_id === product.id)
  );
  const cartState = useAppSelector((state: RootState) => state.cart);
  const isAddingToCart = cartState.operationLoading[`add-${product.id}`] || false;

  // Get wishlist state from Redux
  const wishlistState = useAppSelector((state: RootState) => state.wishlist);
  const isInWishlist = wishlistState.items.find((item) => item.id === product.id);
  const isAddingToWishlist = wishlistState.operationLoading[`add-${product.id}`] || false;
  const isRemovingFromWishlist = wishlistState.operationLoading[`remove-${product.id}`] || false;
  const isWishlistLoading = isAddingToWishlist || isRemovingFromWishlist;
  // const handleDecrease = () => {
  //   if (cartItem) {
  //     dispatch(decreaseQuantity(product.id));
  //     if (cartItem.quantity === 1) {
  //       dispatch(removeFromCart(product.id));
  //     }
  //   }
  // };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart');
      openSignIn('/cart');
      return;
    }

    if (isAddingToCart) return; // Prevent multiple clicks

    try {
      await dispatch(addToCartAsync({ book_id: product.id, quantity: 1 })).unwrap();
      toast.success(`"${product.title}" added to cart`, {
        duration: 3000,
      });
    } catch (error: any) {
      console.error('Failed to add item to cart:', error);
      toast.error(error || 'Failed to add item to cart. Please try again.', {
        duration: 4000,
      });
    }
  };

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to manage your wishlist');
      openSignIn('/wishlist');
      return;
    }

    if (isWishlistLoading) return; // Prevent multiple clicks

    try {
      if (removeButton && isInWishlist) {
        // Remove from wishlist using API
        await dispatch(
          removeFromWishlistAsync({
            wishlistId: isInWishlist.wishlist_id || 0,
            bookId: product.id,
          })
        ).unwrap();

        toast.success(`"${product.title}" removed from wishlist`, {
          duration: 3000,
        });
      } else if (!isInWishlist) {
        // Add to wishlist using API
        await dispatch(addToWishlistAsync(product.id)).unwrap();

        // Refresh wishlist to get updated data
        dispatch(fetchWishlistAsync());

        toast.success(`"${product.title}" added to wishlist`, {
          duration: 3000,
        });
      }
    } catch (error: any) {
      console.error('Failed to update wishlist:', error);
      toast.error(error || 'Failed to update wishlist. Please try again.', {
        duration: 4000,
      });
    }
  };

  return (
    <div
      className={`flex gap-2 md:gap-0 md:flex-col items-center book-product-box wow fadeIn md:p-3 md:bg-gray-50 ${className}`}
      data-wow-delay={idx ? `0.${(idx * 5).toString().padStart(2, '0')}s` : undefined}
    >
      <div className='product-header'>
        <div className='product-image p-0 md:!mb-0 w-full '>
          <Link to={`/books/${product.slug}`} state={{ item: product }}>
            <img
              src={IMAGE_BASE_URL + product.cover_image_name || ''}
              onError={(e) => {
                e.currentTarget.src = '/assets/images/book/product/1.jpg';
              }}
              className='img-fluid blur-up lazyload w-full !h-28 md:!h-72 !object-cover hover:scale-105 transition'
              alt=''
            />
          </Link>
          {removeButton && (
            <button
              className={`btn !absolute top-0 right-0 bg-white !rounded-full w-9 h-9 !p-2 shadow-md ${
                isWishlistLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleWishlistToggle}
              disabled={isWishlistLoading}
              title={isWishlistLoading ? 'Removing...' : 'Remove from wishlist'}
            >
              {isWishlistLoading ? (
                <Loader className='w-4 h-4 text-gray-500 animate-spin' />
              ) : (
                <X className='w-10 h-10 text-gray-500' />
              )}
            </button>
          )}
          {/* {showOptions && (
            <ul className='product-option'>
              <li data-tooltip-id='cart-tooltip' data-tooltip-content='Add to cart'>
                <Link to='/cart' onClick={handleAddToCart}>
                  <ShoppingCart size={18} className='mx-auto text-gray-600' />
                </Link>
                <Tooltip id='cart-tooltip' />
              </li>
              <li data-tooltip-id='wishlist-tooltip' data-tooltip-content='Add to wishlist'>
                <Link to='/wishlist' className='notifi-wishlist' onClick={handleWishlistToggle}>
                  <Heart size={18} className='mx-auto text-gray-600' />
                </Link>
                <Tooltip id='wishlist-tooltip' />
              </li>
              <li data-tooltip-id='view-tooltip' data-tooltip-content='View'>
                <Link to={`/books/${product.slug}`} state={{ item: product }}>
                  <Eye size={18} className='mx-auto text-gray-600' />
                </Link>
                <Tooltip id='view-tooltip' />
              </li>
            </ul>
          )} */}
        </div>
      </div>
      <div className='product-footer'>
        <div className='product-detail position-relative md:mt-4'>
          <h6 className='name !font-semibold notranslate !text-xl leading-6 !text-gray-900 mb-1 cursor-pointer'>
            {product.title}
          </h6>
          {/* <div className='product-rating mt-2'>
            <ul className='rating'>
              {[...Array(5)].map((_, i) => (
                <li key={i}>
                  <Star className='w-3.5 h-3.5 text-yellow-500 fill-yellow-500' />
                </li>
              ))}
            </ul>
            <span>(5)</span>
          </div> */}
          <Link to={`/books/${product.slug}`} className='!no-underline' state={{ item: product }}>
            <h5 className='name !font-medium text-muted !text-sm'>{product.description}</h5>
          </Link>
          <h6 className='byers text-base !text-emerald-600'>
            <span>By</span> {product.author_name || 'Unknown Author'}
          </h6>
          <h6 className='price'>
            {currency.sign}
            <span className=''>{product.discounted_price.toFixed(2)}</span>
            {'  '}
            <span className='text-muted line-through ms-2'>{product.price.toFixed(2)}</span>
          </h6>
          <div className='add-to-cart-box bg-white hidden md:block'>
            {cartItem ? (
              <Link to={'/cart'} className='btn btn-add-cart addcart-button py-3'>
                ✔ In Cart
              </Link>
            ) : (
              <button
                className={`btn btn-add-cart addcart-button py-3 w-full ${
                  isAddingToCart ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <div className='flex items-center justify-center gap-2'>
                    <Loader className='w-4 h-4 animate-spin' />
                    Adding...
                  </div>
                ) : (
                  'Add to Cart'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductBox;
