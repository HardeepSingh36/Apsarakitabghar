import { Link } from 'react-router-dom';
import { Eye, Heart, ShoppingCart } from 'react-feather';
import { Tooltip } from 'react-tooltip';

const AddProductBox = ({ product, idx, showOptions = false, removeButton = false }: any) => {
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
              <button className='btn wishlist-button close_button'>
                <i data-feather='x'></i>
              </button>
            </div>
          )}
          {showOptions && (
            <ul className='product-option'>
              <li data-tooltip-id='cart-tooltip' data-tooltip-content='Add to cart'>
                <Link to='/cart'>
                  <ShoppingCart size={18} className='mx-auto text-gray-600' />
                </Link>
                <Tooltip id='cart-tooltip' />
              </li>
              <li data-tooltip-id='wishlist-tooltip' data-tooltip-content='Add to wishlist'>
                <Link to='/wishlist' className='notifi-wishlist'>
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
          <span className='span-name'>{product.spanName}</span>
          <a href={`/book/50`}>
            <h5 className='name'>{product.name}</h5>
          </a>
          <div className='product-rating mt-2'>
            <ul className='rating'>
              {[...Array(5)].map((_, i) => (
                <li key={i}>
                  <i data-feather='star' className={i < product.rating ? 'fill' : ''}></i>
                </li>
              ))}
            </ul>
            <span>{product.ratingText}</span>
          </div>
          <h6 className='unit'>{product.unit}</h6>
          <h5 className='price'>
            <span className='theme-color'>{product.price}</span> <del>{product.oldPrice}</del>
          </h5>
          <div className='add-to-cart-box bg-white'>
            <button className='btn btn-add-cart addcart-button'>
              Add
              <span className='add-icon bg-light-gray'>
                <i className='fa-solid fa-plus'></i>
              </span>
            </button>
            <div className='cart_qty qty-box'>
              <div className='input-group bg-white'>
                <button
                  type='button'
                  className='qty-left-minus bg-gray'
                  data-type='minus'
                  data-field=''
                >
                  -
                </button>
                <input
                  className='form-control input-number qty-input'
                  type='text'
                  name='quantity'
                  value='0'
                  readOnly
                />
                <button
                  type='button'
                  className='qty-right-plus bg-gray'
                  data-type='plus'
                  data-field=''
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductBox;
