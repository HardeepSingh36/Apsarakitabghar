import { Link } from 'react-router-dom';
import { X } from 'react-feather';
// import { Tooltip } from 'react-tooltip';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { RootState } from '@/app/store';
import { addToCart } from '@/features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/features/wishlist/wishlistSlice';
import { useAuthDialog } from '@/context/AuthDialogContext';
import type { Book } from '@/types/types';
import { useCurrency } from '@/context/CurrencyContext';
import 'react-loading-skeleton/dist/skeleton.css';

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
    state.cart.items.find((item) => item.id === product.id)
  );

  // const handleDecrease = () => {
  //   if (cartItem) {
  //     dispatch(decreaseQuantity(product.id));
  //     if (cartItem.quantity === 1) {
  //       dispatch(removeFromCart(product.id));
  //     }
  //   }
  // };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      openSignIn('/cart');
      return;
    }

    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        total: product.price,
        saving: product.discounted_price - product.price,
      })
    );
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      openSignIn('/wishlist');
      return;
    }

    if (removeButton) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(
        addToWishlist({
          ...product,
          rating: 5, // Default rating for WishlistItem
        })
      );
    }
  };

  return (
    <div
      className={`flex gap-2 md:gap-0 md:flex-col items-center book-product-box wow fadeIn md:p-3 md:bg-gray-50 ${className}`}
      data-wow-delay={idx ? `0.${(idx * 5).toString().padStart(2, '0')}s` : undefined}
    >
      <div className='product-header'>
        <div className='product-image p-0 md:!mb-0 w-full '>
          <Link to={`/books/${product.id}`} state={{ item: product }}>
            <img
              src={product.cover_image_url || ''}
              className='img-fluid blur-up lazyload w-full !h-28 md:!h-72 !object-cover hover:scale-105 transition'
              alt=''
            />
          </Link>
          {removeButton && (
            <div className='product-header-top'>
              <button className='btn wishlist-button close_button' onClick={handleWishlistToggle}>
                <X className='w-4 h-4 text-gray-500' />
              </button>
            </div>
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
                <Link to={`/books/${product.id}`} state={{ item: product }}>
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
          <h6 className='weight notranslate'>{product.title}</h6>
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
          <Link to={`/books/${product.id}`} className='!no-underline' state={{ item: product }}>
            <h5 className='name'>{product.description}</h5>
          </Link>
          <h6 className='byers text-muted'>
            <span>By</span> {product.author_names || 'Unknown Author'}
          </h6>
          <h6 className='price'>
            {currency} <span className=''>{product.discounted_price}</span>
            {'  '}
            <span className='text-muted line-through ms-2'>{product.price}</span>
          </h6>
          <div className='add-to-cart-box bg-white hidden md:block'>
            {cartItem ? (
              <Link
                to={'/cart'}
                className='btn btn-add-cart addcart-button py-3'
                onClick={handleAddToCart}
              >
                ✔ In Cart
              </Link>
            ) : (
              <Link
                to={'#'}
                className='btn btn-add-cart addcart-button py-3'
                onClick={handleAddToCart}
              >
                Add to Cart
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductBox;
