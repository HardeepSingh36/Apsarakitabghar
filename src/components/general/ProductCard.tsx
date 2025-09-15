import type { Book } from '@/types/types';
import { useCurrency } from '@/context/CurrencyContext';
import { Link } from 'react-router-dom';
import { Eye, Heart, ShoppingCart } from 'react-feather';
import { Tooltip } from 'react-tooltip';

interface ProductCardProps {
  item: Book;
  className?: string;
}

const ProductCard = ({ item, className }: ProductCardProps) => {
  const { currency } = useCurrency();
  return (
    <div className={`book-product-box wow fadeIn flex md:flex-col gap-2 items-center ${className}`}>
      {item.isBest && (
        <div className='label-box'>
          <label className='label'>best</label>
        </div>
      )}
      <div className='product-image h-24 w-24 md:h-48 md:w-48'>
        <ul className='product-option !hidden md:!block'>
          <li data-tip='Add to cart'>
            <Link to='cart.html' data-tooltip-id='cart-tooltip' data-tooltip-content='Add to cart'>
              <ShoppingCart size={18} className='mx-auto text-gray-600' />
            </Link>
            <Tooltip id='cart-tooltip' />
          </li>
          <li data-tooltip-id='wishlist-tooltip' data-tooltip-content='Add to wishlist'>
            <Link to='wishlist.html' className='notifi-wishlist'>
              <Heart size={18} className='mx-auto text-gray-600' />
            </Link>
            <Tooltip id='wishlist-tooltip'/>
          </li>
          <li data-tooltip-id='view-tooltip' data-tooltip-content='View'>
            <Link to='javascript:void(0)' data-bs-toggle='modal' data-bs-target='#view'>
              <Eye size={18} className='mx-auto text-gray-600' />
            </Link>
            <Tooltip id='view-tooltip' />
          </li>
        </ul>
        <div className='front'>
          <Link to={`/books/${item.id}`} className='!no-underline'>
            <img src={item.cover_image_url} className='img-fluid lazyload' alt='' />
          </Link>
        </div>
      </div>
      <div className='product-detail position-relative'>
        <h6 className='weight'>{item.title}</h6>
        <Link to={`/books/${item.id}`} className='!no-underline'>
          <h5 className='name'>Home Decor Lucky Deer Family Matte Finish Ceramic Figures</h5>
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
