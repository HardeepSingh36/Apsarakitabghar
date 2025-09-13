import type { Book } from '@/types/types';
import { useCurrency } from '@/context/CurrencyContext';

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
          <li data-bs-toggle='tooltip' data-bs-placement='top' title='Add to cart'>
            <a href='cart.html'>
              <i data-feather='shopping-cart'></i>
            </a>
          </li>
          <li data-bs-toggle='tooltip' data-bs-placement='top' title='Wishlist'>
            <a href='wishlist.html' className='notifi-wishlist'>
              <i data-feather='heart'></i>
            </a>
          </li>
          <li data-bs-toggle='tooltip' data-bs-placement='top' title='View'>
            <a href='javascript:void(0)' data-bs-toggle='modal' data-bs-target='#view'>
              <i data-feather='eye'></i>
            </a>
          </li>
        </ul>
        <div className='front'>
          <a href='product-left-thumbnail.html' className='!no-underline'>
            <img src={item.cover_image_url} className='img-fluid lazyload' alt='' />
          </a>
        </div>
      </div>
      <div className='product-detail position-relative'>
        <h6 className='weight'>{item.title}</h6>
        <a href='product-left-thumbnail.html' className='!no-underline'>
          <h5 className='name'>Home Decor Lucky Deer Family Matte Finish Ceramic Figures</h5>
        </a>
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
