import { Link } from 'react-router-dom';
import { Eye, Heart, Minus, Plus, ShoppingCart, Star, X } from 'react-feather';
import { Tooltip } from 'react-tooltip';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { RootState } from '@/app/store';
import { addToCart, decreaseQuantity } from '@/features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/features/wishlist/wishlistSlice';

const AddProductBox = ({ product, idx, showOptions = false, removeButton = false }: any) => {
  const dispatch = useAppDispatch();

  // Get cart state for this product
  const cartItem = useAppSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const handleDecrease = () => {
    if (cartItem) {
      dispatch(decreaseQuantity(product.id));
    }
  };

  const handleWishlistToggle = () => {
    if (removeButton) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };
  return (
    <div
      className='product-box-3 wow fadeInUp'
      data-wow-delay={idx ? `0.${(idx * 5).toString().padStart(2, '0')}s` : undefined}
    >
      <div className='product-header'>
        <div className='product-image'>
          <a href={`/books/50`}>
            <img src={product.img} className='img-fluid blur-up lazyload' alt='' />
          </a>
          {removeButton && (
            <div className='product-header-top'>
              <button className='btn wishlist-button close_button' onClick={handleWishlistToggle}>
                <X className='w-4 h-4 text-gray-500' />
              </button>
            </div>
          )}
          {showOptions && (
            <ul className='product-option'>
              <li data-tooltip-id='cart-tooltip' data-tooltip-content='Add to cart'>
                <Link to='/cart' onClick={() => dispatch(addToCart(product))}>
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
                <Link to='javascript:void(0)' data-bs-toggle='modal' data-bs-target='#view'>
                  <Eye size={18} className='mx-auto text-gray-600' />
                </Link>
                <Tooltip id='view-tooltip' />
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className='product-footer'>
        <div className='product-detail'>
          <span className='span-name'>Book</span>
          <a href={`/book/50`}>
            <h5 className='name'>{product.name}</h5>
          </a>
          <div className='product-rating mt-2'>
            <ul className='rating'>
              {[...Array(5)].map((_, i) => (
                <li key={i}>
                  <Star className='w-3.5 h-3.5 text-yellow-500 fill-yellow-500' />
                </li>
              ))}
            </ul>
            <span>(5)</span>
          </div>
          <h6 className='unit'>{product.pages} pages</h6>
          <h5 className='price'>
            <span className='theme-color'>{product.price}</span> <del>{product.oldPrice}</del>
          </h5>
          <div className='add-to-cart-box bg-white'>
            {cartItem ? (
              <div className='cart_qty qty-box !block !relative !mt-2.5'>
                <div className='input-group bg-white'>
                  <button type='button' className='qty-left-minus bg-gray' onClick={handleDecrease}>
                    <Minus className='w-4 h-4 text-emerald-500' />
                  </button>
                  <input
                    className='form-control input-number qty-input'
                    type='text'
                    name='quantity'
                    value={cartItem.quantity}
                    readOnly
                  />
                  <button
                    type='button'
                    className='qty-right-plus bg-gray'
                    onClick={() => dispatch(addToCart(product))}
                  >
                    <Plus className='w-4 h-4 text-emerald-500' />
                  </button>
                </div>
              </div>
            ) : (
              <button
                className='btn btn-add-cart addcart-button'
                onClick={() => dispatch(addToCart(product))}
              >
                Add
                <span className='add-icon bg-light-gray'>
                  <Plus className='w-4 h-4 text-emerald-500' />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductBox;
