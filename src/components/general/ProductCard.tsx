import type { Book, CartItem, WishlistItem } from '@/types/types';
import { useCurrency } from '@/context/CurrencyContext';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Heart, ShoppingCart } from 'react-feather';
import { Tooltip } from 'react-tooltip';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { RootState } from '@/app/store';
import { addToCart } from '@/features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/features/wishlist/wishlistSlice';
import { useAuthDialog } from '@/context/AuthDialogContext';

interface ProductCardProps {
  item: Book;
  className?: string;
}

const ProductCard = ({ item, className }: ProductCardProps) => {
  const { currency } = useCurrency();
  const dispatch = useAppDispatch();
  const { isAuthenticated, openSignIn } = useAuthDialog();
  const navigate = useNavigate();

  // Check if this book is already in cart or wishlist
  const cartItem = useAppSelector((state: RootState) =>
    state.cart.items.find((cartItem) => cartItem.id === item.id)
  );
  const wishlistItem = useAppSelector((state: RootState) =>
    state.wishlist.items.find((wishItem) => wishItem.id === item.id)
  );

  const handleCartClick = () => {
    if (!isAuthenticated) {
      openSignIn('/cart'); // Pass redirect path
      return;
    }

    if (!cartItem) {
      const cartPayload: CartItem = {
        ...item,
        quantity: 1,
        total: item.discounted_price,
        saving: item.price - item.discounted_price,
      };
      dispatch(addToCart(cartPayload));
      navigate('/cart');
    }
  };

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      openSignIn('/wishlist'); // Pass redirect path
      return;
    }

    if (wishlistItem) {
      dispatch(removeFromWishlist(item.id));
    } else {
      const wishlistPayload: WishlistItem = {
        ...item,
        rating: 5,
      };
      dispatch(addToWishlist(wishlistPayload));
    }
    navigate('/wishlist');
  };
  return (
    <div className={`book-product-box wow fadeIn flex md:flex-col gap-2 items-center ${className}`}>
      {item.isBest && (
        <div className='label-box'>
          <label className='label'>best</label>
        </div>
      )}
      <div className='product-image'>
        <ul className='product-option !hidden md:!block !px-8'>
          <li data-tip='Add to cart'>
            <button
              data-tooltip-id='cart-tooltip'
              data-tooltip-content='Add to cart'
              onClick={handleCartClick}
            >
              <ShoppingCart size={18} className='mx-auto text-gray-600' />
            </button>
            <Tooltip id='cart-tooltip' />
          </li>
          <li data-tooltip-id='wishlist-tooltip' data-tooltip-content='Add to wishlist'>
            <button className='notifi-wishlist' onClick={handleWishlistClick}>
              <Heart size={18} className='mx-auto text-gray-600' />
            </button>
            <Tooltip id='wishlist-tooltip' />
          </li>
          <li data-tooltip-id='view-tooltip' data-tooltip-content='View'>
            <Link to={`/books/${item.id}`} state={{ item }}>
              <Eye size={18} className='mx-auto text-gray-600' />
            </Link>
            <Tooltip id='view-tooltip' />
          </li>
        </ul>
        <div className='front h-28 w-28 md:h-64 md:w-72'>
          <Link to={`/books/${item.id}`} className='!no-underline block' state={{ item }}>
            <img src={item.cover_image_url} className='img-fluid lazyload h-full w-full' alt='' />
          </Link>
        </div>
      </div>
      <div className='product-detail position-relative md:mt-4'>
        <h6 className='weight'>{item.title}</h6>
        <Link to={`/books/${item.id}`} className='!no-underline' state={{ item }}>
          <h5 className='name'>{item.description}</h5>
        </Link>
        <h6 className='byers'>
          <span>By</span> {item.author_names || 'Unknown Author'}
        </h6>
        <h6 className='price'>
          {currency} <span className=''>{item.discounted_price}</span>
          {'  '}
          <span className='text-muted line-through ms-2'>{item.price}</span>
        </h6>
      </div>
    </div>
  );
};

export default ProductCard;
