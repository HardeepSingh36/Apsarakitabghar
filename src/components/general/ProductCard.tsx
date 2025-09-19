import type { Book, CartItem, WishlistItem } from '@/types/types';
import { useCurrency } from '@/context/CurrencyContext';
import { Link } from 'react-router-dom';
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

  // Check if this book is already in cart or wishlist
  const cartItem = useAppSelector((state: RootState) =>
    state.cart.items.find((cartItem) => cartItem.id === item.id)
  );
  const wishlistItem = useAppSelector((state: RootState) =>
    state.wishlist.items.find((wishItem) => wishItem.id === item.id)
  );

  const handleCartClick = () => {
    if (!isAuthenticated) {
      openSignIn();
      return;
    }
    
    if (!cartItem) {
      const cartPayload: CartItem = {
        id: item.id,
        name: item.title,
        author: item.author_names || 'Unknown',
        img: item.cover_image_url,
        soldBy: item.publisher_name || 'Super Admin',
        quantity: 1,
        pages: item.pages,
        price: item.discounted_price || item.price,
        oldPrice: item.price,
        saving: (item.price - (item.discounted_price || item.price)) * 1,
        total: (item.discounted_price || item.price) * 1,
      };
      dispatch(addToCart(cartPayload));
    }
  };

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      openSignIn();
      return;
    }
    
    if (wishlistItem) {
      dispatch(removeFromWishlist(item.id));
    } else {
      const wishlistPayload: WishlistItem = {
        id: item.id,
        name: item.title,
        author: item.author_names || 'Unknown',
        img: item.cover_image_url,
        price: item.discounted_price || item.price,
        oldPrice: item.price,
        rating: 4,
        pages: item.pages,
      };
      dispatch(addToWishlist(wishlistPayload));
    }
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
            <Link
              to='/cart'
              data-tooltip-id='cart-tooltip'
              data-tooltip-content='Add to cart'
              onClick={handleCartClick}
            >
              <ShoppingCart size={18} className='mx-auto text-gray-600' />
            </Link>
            <Tooltip id='cart-tooltip' />
          </li>
          <li data-tooltip-id='wishlist-tooltip' data-tooltip-content='Add to wishlist'>
            <Link to='/wishlist' className='notifi-wishlist' onClick={handleWishlistClick}>
              <Heart size={18} className='mx-auto text-gray-600' />
            </Link>
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
