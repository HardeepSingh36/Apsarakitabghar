import { useCurrency } from '@/context/CurrencyContext';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import {
  fetchAddresses,
  createAddress,
  updateAddressAsync,
  setSelectedAddress,
  clearError,
  type Address,
} from '@/features/user/userSlice';
import type { RootState } from '@/app/store';
import AddAddressModal from '@/components/dashboard/AddAddressModal';
import { useState, useEffect } from 'react';
import { Edit } from 'react-feather';
import { IMAGE_BASE_URL } from '@/constants';
import toast from 'react-hot-toast';
import PaymentOptions from '@/components/checkout/PaymentOptions';
import { placeOrder, type PlaceOrderRequest } from '@/services/orderService';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '@/features/cart/cartSlice';

const Checkout = () => {
  const { currency } = useCurrency();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const { addresses, selectedAddressId, loading, error } = useAppSelector(
    (state: RootState) => state.user
  );

  const [isAddAddressModalOpen, setAddAddressModalOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [adminUpiId, setAdminUpiId] = useState('');

  // Fetch addresses on component mount
  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.current_line_total, 0);
  const shipping = 6.9;
  const tax = subtotal * 0.1;
  const coupon = 20;
  const total = subtotal + shipping + tax - coupon;

  const handleAddressSelect = (id: string) => {
    dispatch(setSelectedAddress(id));
  };

  const handleAddAddress = async (newAddress: Address) => {
    try {
      if (addressToEdit) {
        // Update the existing address
        await dispatch(
          updateAddressAsync({
            id: addressToEdit.id,
            addressData: { ...addressToEdit, ...newAddress },
          })
        ).unwrap();
        toast.success('Address updated successfully!');
      } else {
        // Add a new address
        await dispatch(createAddress(newAddress)).unwrap();
        toast.success('Address added successfully!');
      }
      setAddAddressModalOpen(false);
      setAddressToEdit(null);
    } catch (error: any) {
      toast.error(error || 'Failed to save address');
    }
  };

  const handleEditAddress = (address: Address) => {
    setAddressToEdit(address);
    setAddAddressModalOpen(true);
  };

  const handlePlaceOrder = async () => {
    // Validation
    if (!selectedAddressId) {
      toast.error('Please select a delivery address');
      return;
    }

    if (!transactionId.trim()) {
      toast.error('Please enter a transaction ID');
      return;
    }

    if (!paymentScreenshot) {
      toast.error('Please upload a payment screenshot');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(paymentScreenshot.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, or GIF)');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (paymentScreenshot.size > maxSize) {
      toast.error('File size must be less than 5MB');
      return;
    }

    try {
      setIsPlacingOrder(true);

      // Get the UPI ID from the selected address (we'll need to get this from QR API)
      const orderData: PlaceOrderRequest = {
        address_id: parseInt(selectedAddressId),
        payment_method: 'upi',
        transaction_id: transactionId.trim(),
        paid_to_upi_id: adminUpiId,
        payment_receipt: paymentScreenshot,
        notes: notes.trim() || undefined,
      };

      const response = await placeOrder(orderData);

      if (response.status === 'success') {
        // Clear the cart
        dispatch(clearCart());

        toast.success(`Order ${response.data.order_number} placed successfully!`);

        // Navigate to order success page or orders list
        navigate('/dashboard?tab=order', {
          state: {
            orderNumber: response.data.order_number,
            orderTotal: response.data.total_amount,
          },
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to place order');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleScreenshotChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPaymentScreenshot(file);
    }
  };

  return (
    <div>
      {/* Checkout section Start */}
      <section className='checkout-section-2 section-b-space'>
        <div className='container-fluid-lg'>
          <div className='row g-sm-4 g-3'>
            <div className='col-lg-8'>
              <div className='left-sidebar-checkout'>
                <div className='checkout-detail-box'>
                  <ul>
                    <li>
                      <div className='checkout-icon'>
                        {/* @ts-ignore */}
                        <lord-icon
                          target='.nav-item'
                          src='https://cdn.lordicon.com/ggihhudh.json'
                          trigger='loop-on-hover'
                          colors='primary:#121331,secondary:#646e78,tertiary:#0baf9a'
                          className='lord-icon'
                        />
                      </div>
                      <div className='checkout-box'>
                        <div className='checkout-title'>
                          <h4>Delivery Address</h4>
                        </div>

                        <div className='checkout-detail'>
                          {loading ? (
                            <div className='text-center'>
                              <div className='spinner-border text-primary' role='status'>
                                <span className='visually-hidden'>Loading...</span>
                              </div>
                              <p className='mt-2'>Loading addresses...</p>
                            </div>
                          ) : addresses.length === 0 ? (
                            <div className='text-center'>
                              <button
                                className='btn theme-bg-color text-white btn-md'
                                onClick={() => setAddAddressModalOpen(true)}
                              >
                                Add Address
                              </button>
                            </div>
                          ) : (
                            <div className='row g-4'>
                              {addresses.map((address) => (
                                <div className='col-xxl-6 col-lg-12 col-md-6' key={address.id}>
                                  <div
                                    className={`delivery-address-box ${
                                      selectedAddressId === address.id ? 'selected' : ''
                                    }`}
                                    onClick={() => handleAddressSelect(address.id)}
                                  >
                                    <div>
                                      <div className='form-check'>
                                        <input
                                          className='form-check-input'
                                          type='radio'
                                          name='address'
                                          id={`address-${address.id}`}
                                          checked={selectedAddressId === address.id}
                                          onChange={() => handleAddressSelect(address.id)}
                                        />
                                      </div>

                                      <ul className='delivery-address-detail'>
                                        <li>
                                          <h4 className='fw-500'>{`${address.firstName} ${address.lastName}`}</h4>
                                        </li>

                                        <li>
                                          <p className='text-content'>
                                            <span className='text-title'>Address : </span>
                                            {`${address.addressLine1}, ${
                                              address.addressLine2 || ''
                                            }, ${address.city}, ${address.state}, ${
                                              address.country
                                            }`}
                                          </p>
                                        </li>

                                        <li>
                                          <h6 className='text-content'>
                                            <span className='text-title'>Pin Code :</span>{' '}
                                            {address.postalCode}
                                          </h6>
                                        </li>

                                        <li>
                                          <h6 className='text-content mb-0'>
                                            <span className='text-title'>Phone :</span>{' '}
                                            {address.phone}
                                          </h6>
                                        </li>
                                      </ul>

                                      <button
                                        className='btn theme-bg-color text-white btn-md !absolute top-0 right-0 p-2 !rounded-full'
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleEditAddress(address);
                                        }}
                                      >
                                        <Edit size={16} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>

                    {/* <li>
                      <div className='checkout-icon'>
                        
                        <lord-icon
                          target='.nav-item'
                          src='https://cdn.lordicon.com/oaflahpk.json'
                          trigger='loop-on-hover'
                          colors='primary:#0baf9a'
                          className='lord-icon'
                        />
                      </div>
                      <div className='checkout-box'>
                        <div className='checkout-title'>
                          <h4>Delivery Option</h4>
                        </div>

                        <div className='checkout-detail'>
                          <div className='row g-4'>
                            <div className='col-xxl-6'>
                              <div className='delivery-option'>
                                <div className='delivery-category'>
                                  <div className='shipment-detail'>
                                    <div className='form-check custom-form-check hide-check-box'>
                                      <input
                                        className='form-check-input'
                                        type='radio'
                                        name='standard'
                                        id='standard'
                                        checked
                                      />
                                      <label className='form-check-label' htmlFor='standard'>
                                        Standard Delivery Option
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='col-xxl-6'>
                              <div className='delivery-option'>
                                <div className='delivery-category'>
                                  <div className='shipment-detail'>
                                    <div className='form-check mb-0 custom-form-check show-box-checked'>
                                      <input
                                        className='form-check-input'
                                        type='radio'
                                        name='standard'
                                        id='future'
                                      />
                                      <label className='form-check-label' htmlFor='future'>
                                        Future Delivery Option
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='col-12 future-box'>
                              <div className='future-option'>
                                <div className='row g-md-0 gy-4'>
                                  <div className='col-md-6'>
                                    <div className='delivery-items'>
                                      <div>
                                        <h5 className='items text-content'>
                                          <span>3 Items</span>@ $693.48
                                        </h5>
                                        <h5 className='charge text-content'>
                                          Delivery Charge $34.67
                                          <button
                                            type='button'
                                            className='btn p-0'
                                            data-bs-toggle='tooltip'
                                            data-bs-placement='top'
                                            title='Extra Charge'
                                          >
                                            <i className='fa-solid fa-circle-exclamation'></i>
                                          </button>
                                        </h5>
                                      </div>
                                    </div>
                                  </div>

                                  <div className='col-md-6'>
                                    <form className='form-floating theme-form-floating date-box'>
                                      <input type='date' className='form-control' />
                                      <label>Select Date</label>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li> */}

                    <li>
                      <div className='checkout-icon'>
                        {/* @ts-ignore */}
                        <lord-icon
                          target='.nav-item'
                          src='https://cdn.lordicon.com/qmcsqnle.json'
                          trigger='loop-on-hover'
                          colors='primary:#0baf9a,secondary:#0baf9a'
                          className='lord-icon'
                        />
                        {/* </lord-icon> */}
                      </div>
                      <div className='checkout-box'>
                        <div className='checkout-title'>
                          <h4>Payment Option</h4>
                        </div>

                        <div className='checkout-detail'>
                          <PaymentOptions onUpiIdChange={setAdminUpiId} />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className='col-lg-4'>
              <div className='right-side-summery-box'>
                <div className='summery-box-2'>
                  <div className='summery-header'>
                    <h3>Order Summery</h3>
                  </div>

                  <ul className='summery-contain'>
                    {cartItems.map((item) => (
                      <li key={item.cart_item_id}>
                        <img
                          src={IMAGE_BASE_URL + item.cover_image_name || ''}
                          className='img-fluid blur-up lazyloaded checkout-image notranslate'
                          alt={item.title}
                        />
                        <h4 className='notranslate'>
                          {item.title} <span>X {item.quantity}</span>
                        </h4>
                        <h4 className='price'>
                          {currency.sign}
                          {item.current_line_total.toFixed(2)}
                        </h4>
                      </li>
                    ))}
                  </ul>

                  <ul className='summery-total'>
                    <li>
                      <h4>Gross Total</h4>
                      <h4 className='price'>
                        {currency.sign}
                        {subtotal.toFixed(2)}
                      </h4>
                    </li>

                    <li>
                      <h4>Shipping</h4>
                      <h4 className='price'>
                        {currency.sign}
                        {shipping.toFixed(2)}
                      </h4>
                    </li>

                    <li>
                      <h4>GST/Tax</h4>
                      <h4 className='price'>
                        {currency.sign}
                        {tax.toFixed(2)}
                      </h4>
                    </li>

                    <li>
                      <h4>Coupon/Code</h4>
                      <h4 className='price'>
                        {currency.sign}-{coupon.toFixed(2)}
                      </h4>
                    </li>

                    <li className='list-total'>
                      <h4>Total ({currency.sign})</h4>
                      <h4 className='price'>
                        {currency.sign}
                        {total.toFixed(2)}
                      </h4>
                    </li>
                  </ul>
                </div>

                <div className='summery-box-2 mt-4'>
                  {/* Transaction ID Input */}
                  <div className='mb-3'>
                    <label htmlFor='transactionId' className='form-label fw-semibold'>
                      Transaction ID <span className='text-danger'>*</span>
                    </label>
                    <input
                      type='text'
                      id='transactionId'
                      className='form-control'
                      placeholder='Enter your UPI transaction ID'
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      required
                    />
                    <p className='text-muted small mt-1'>
                      Payment to be made to UPI ID: <strong>{adminUpiId}</strong>
                    </p>
                  </div>

                  {/* Screenshot Upload */}
                  <div className='mb-3'>
                    <label htmlFor='paymentScreenshot' className='form-label fw-semibold'>
                      Upload Payment Screenshot <span className='text-danger'>*</span>
                    </label>
                    <input
                      type='file'
                      id='paymentScreenshot'
                      className='form-control'
                      accept='image/jpeg,image/jpg,image/png,image/gif'
                      onChange={handleScreenshotChange}
                      required
                    />
                    <p className='text-muted small mt-1'>
                      Please upload the screenshot of your UPI/QR payment confirmation. Max size:
                      5MB (JPEG, PNG, GIF)
                    </p>
                    {paymentScreenshot && (
                      <p className='text-success small mt-1'>
                        ✓ Selected: {paymentScreenshot.name} (
                        {(paymentScreenshot.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    )}
                  </div>

                  {/* Notes/Special Instructions */}
                  <div className='mb-3'>
                    <label htmlFor='orderNotes' className='form-label fw-semibold'>
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      id='orderNotes'
                      className='form-control'
                      rows={3}
                      placeholder='Any special delivery instructions...'
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>

                {/* <div className='checkout-offer'>
                  <div className='offer-title'>
                    <div className='offer-icon'>
                      <img src='/assets/images/inner-page/offer.svg' className='img-fluid' alt='' />
                    </div>
                    <div className='offer-name'>
                      <h6>Available Offers</h6>
                    </div>
                  </div>

                  <ul className='offer-detail'>
                    <li>
                      <p>Combo: BB Royal Almond/Badam Californian, Extra Bold 100 gm...</p>
                    </li>
                    <li>
                      <p>
                        combo: Royal Cashew Californian, Extra Bold 100 gm + BB Royal Honey 500 gm
                      </p>
                    </li>
                  </ul>
                </div> */}

                <button
                  className='btn theme-bg-color text-white btn-md w-100 mt-4 fw-bold'
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder || !selectedAddressId || cartItems.length === 0}
                >
                  {isPlacingOrder ? (
                    <>
                      <span
                        className='spinner-border spinner-border-sm me-2'
                        role='status'
                        aria-hidden='true'
                      ></span>
                      Placing Order...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AddAddressModal
        isOpen={isAddAddressModalOpen}
        onClose={() => {
          setAddAddressModalOpen(false);
          setAddressToEdit(null);
        }}
        address={addressToEdit}
        onSave={handleAddAddress}
      />
    </div>
  );
};

export default Checkout;
