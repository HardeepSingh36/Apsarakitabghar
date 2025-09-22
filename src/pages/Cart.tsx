import Breadcrumb from '@/components/ui/Breadcrumb';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { type RootState } from '@/app/store'; // store type
import { addToCart, decreaseQuantity, removeFromCart } from '@/features/cart/cartSlice';
import { Bookmark, Minus, Plus, X } from 'react-feather';
import { useCurrency } from '@/context/CurrencyContext';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { currency } = useCurrency();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const shipping = 6.9; // example fixed shipping
  const total = subtotal + shipping;

  return (
    <div>
      <Breadcrumb
        title='Cart'
        items={[{ label: '', href: '/', iconClass: 'fa-solid fa-house' }, { label: 'Cart' }]}
      />

      {/* Cart Section Start */}
      <section className='cart-section section-b-space'>
        <div className='container-fluid-lg'>
          <div className='row g-sm-5 g-3'>
            <div className='col-xxl-9'>
              <div className='cart-table'>
                {cartItems.length === 0 ? (
                  <div className='flex flex-col items-center py-5'>
                    {/* <img
                      src='/assets/images/inner-page/empty-cart.png'
                      alt='Empty Cart'
                      className='mx-auto mb-4 w-52 h-auto'
                    /> */}
                    <h3 className='mb-2'>Your Cart is Empty</h3>
                    <p className='text-content mb-4'>
                      Looks like you haven’t added anything to your cart yet.
                    </p>
                    <Link to={'/books'} className='btn btn-animation fw-bold'>
                      Continue Shopping
                      <i className='fa-solid fa-arrow-right-long ms-2'></i>
                    </Link>
                  </div>
                ) : (
                  <div className='table-responsive-xl'>
                    <table className='table'>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr className='product-box-contain' key={item.id}>
                            <td className='product-detail'>
                              <div className='product border-0'>
                                <a href={`/books/${item.id}`} className='product-image'>
                                  <img
                                    src={item.cover_image_url || ''}
                                    className='img-fluid blur-up lazyload'
                                    alt={item.title}
                                  />
                                </a>
                                <div className='product-detail'>
                                  <ul>
                                    <li className='name'>
                                      <a href={`/books/${item.id}`}>{item.title}</a>
                                    </li>
                                    <li className='text-content'>
                                      <span className='text-title'>Author:</span>{' '}
                                      {item.author_names}
                                    </li>
                                    <li className='text-content'>
                                      <span className='text-title'>Sold By:</span>{' '}
                                      {item.publisher_name}
                                    </li>
                                    <li className='text-content'>
                                      <span className='text-title'>Pages:</span> {item.pages}
                                    </li>
                                    <li className='text-content'>
                                      <span className='text-title'>Quantity:</span> {item.quantity}
                                    </li>
                                    <li>
                                      <h5 className='text-content d-inline-block'>Price :</h5>
                                      <span>{currency}{item.discounted_price}</span>
                                      <span className='text-content'>
                                        {currency} {item.price}
                                      </span>
                                    </li>
                                    <li>
                                      <h5 className='saving theme-color'>
                                        Saving : {currency}{item.saving}
                                      </h5>
                                    </li>
                                    <li className='quantity-price-box'>
                                      <div className='cart_qty'>
                                        <div className='input-group'>
                                          <button
                                            type='button'
                                            className='btn qty-left-minus'
                                            onClick={() => dispatch(decreaseQuantity(item.id))}
                                          >
                                            <i className='fa fa-minus ms-0'></i>
                                          </button>
                                          <input
                                            className='form-control input-number qty-input'
                                            type='text'
                                            name='quantity'
                                            value={item.quantity}
                                            readOnly
                                          />
                                          <button
                                            type='button'
                                            className='btn qty-right-plus'
                                            onClick={() =>
                                              dispatch(
                                                addToCart({
                                                  ...item,
                                                  quantity: item.quantity + 1,
                                                  total: (item.quantity + 1) * item.price,
                                                })
                                              )
                                            }
                                          >
                                            <i className='fa fa-plus ms-0'></i>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                    <li>
                                      <h5>Total: {currency}{item.total.toFixed(2)}</h5>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td className='price'>
                              <h4 className='table-title text-content'>Price</h4>
                              <h5>
                                {currency}{item.discounted_price}{' '}
                                <del className='text-center'>
                                  {currency} {item.price}
                                </del>
                              </h5>
                              <h6 className='theme-color'>
                                You Save : {currency}{(item.price - item.discounted_price).toFixed(2)}
                              </h6>
                            </td>
                            <td className='quantity'>
                              <h4 className='table-title text-content'>Qty</h4>
                              <div className='quantity-price'>
                                <div className='cart_qty'>
                                  <div className='input-group'>
                                    <button
                                      type='button'
                                      className='btn qty-left-minus !h-6 !w-6'
                                      onClick={() => dispatch(decreaseQuantity(item.id))}
                                    >
                                      <Minus className='w-4 h-4' />
                                    </button>
                                    <input
                                      className='form-control input-number qty-input'
                                      type='text'
                                      name='quantity'
                                      value={item.quantity}
                                      readOnly
                                    />
                                    <button
                                      type='button'
                                      className='btn qty-right-plus !h-6 !w-6'
                                      onClick={() =>
                                        dispatch(
                                          addToCart({
                                            ...item,
                                            quantity: item.quantity + 1,
                                            total: (item.quantity + 1) * item.price,
                                          })
                                        )
                                      }
                                    >
                                      <Plus className='w-4 h-4' />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='subtotal'>
                              <h4 className='table-title text-content'>Total</h4>
                              <h5>{currency}{item.total.toFixed(2)}</h5>
                            </td>
                            <td className='save-remove'>
                              <h4 className='table-title text-content'>Action</h4>
                              <div className='flex items-center gap-2'>
                                <a
                                  className='save notifi-wishlist'
                                  href='javascript:void(0)'
                                  data-tooltip-id='save-tooltip'
                                >
                                  <Bookmark className='w-5 h-5' />
                                </a>
                                <a
                                  className='remove close_button'
                                  href='javascript:void(0)'
                                  onClick={() => dispatch(removeFromCart(item.id))}
                                  data-tooltip-id='remove-tooltip'
                                >
                                  <X className='w-5 h-5' />
                                </a>
                              </div>
                              {/* Tooltips */}
                              <Tooltip id='save-tooltip' place='top' content='Save for later' />
                              <Tooltip id='remove-tooltip' place='top' content='Remove' />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <div className='col-xxl-3'>
              <div className='summery-box p-sticky'>
                <div className='summery-header'>
                  <h3>Cart Total</h3>
                </div>

                <div className='summery-contain'>
                  <div className='coupon-cart'>
                    <h6 className='text-content mb-2'>Coupon Apply</h6>
                    <div className='mb-3 coupon-box input-group'>
                      <input
                        type='email'
                        className='form-control'
                        id='exampleFormControlInput1'
                        placeholder='Enter Coupon Code Here...'
                      />
                      <button className='btn-apply'>Apply</button>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <h4>Subtotal</h4>
                      <h4 className='price'>
                        {currency}
                        {subtotal.toFixed(2)}
                      </h4>
                    </li>

                    <li>
                      <h4>Coupon Discount</h4>
                      <h4 className='price'>(-) 0.00</h4>
                    </li>

                    <li className='align-items-start'>
                      <h4>Shipping</h4>
                      <h4 className='price text-end'>
                        {currency}
                        {shipping.toFixed(2)}
                      </h4>
                    </li>
                  </ul>
                </div>

                <ul className='summery-total'>
                  <li className='list-total border-top-0'>
                    <h4>Total (USD)</h4>
                    <h4 className='price theme-color'>
                      {currency}
                      {total.toFixed(2)}
                    </h4>
                  </li>
                </ul>

                <div className='button-group cart-button'>
                  <ul>
                    <li>
                      <Link
                        to={'/checkout'}
                        className='btn btn-animation proceed-btn fw-bold !text-sm'
                      >
                        Process To Checkout
                      </Link>
                    </li>

                    <li>
                      <button
                        onClick={() => (window.location.href = '/')}
                        className='btn btn-light shopping-button text-dark'
                      >
                        <i className='fa-solid fa-arrow-left-long'></i>Return To Shopping
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
