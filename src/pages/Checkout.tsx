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

const Checkout = () => {
  const { currency } = useCurrency();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const { addresses, selectedAddressId, loading, error } = useAppSelector(
    (state: RootState) => state.user
  );

  const [isAddAddressModalOpen, setAddAddressModalOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);

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
                          <div
                            className='accordion accordion-flush custom-accordion'
                            id='accordionFlushExample'
                          >
                            <div className='accordion-item'>
                              <div className='accordion-header' id='flush-headingFour'>
                                <div
                                  className='accordion-button collapsed'
                                  data-bs-toggle='collapse'
                                  data-bs-target='#flush-collapseFour'
                                >
                                  <div className='custom-form-check form-check mb-0'>
                                    <label className='form-check-label' htmlFor='cash'>
                                      <input
                                        className='form-check-input mt-0'
                                        type='radio'
                                        name='flexRadioDefault'
                                        id='cash'
                                        checked
                                      />{' '}
                                      Cash On Delivery
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div
                                id='flush-collapseFour'
                                className='accordion-collapse collapse show'
                                data-bs-parent='#accordionFlushExample'
                              >
                                <div className='accordion-body'>
                                  <p className='cod-review'>
                                    Pay digitally with SMS Pay Link. Cash may not be accepted in
                                    COVID restricted areas.{' '}
                                    <a href='javascript:void(0)'>Know more.</a>
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className='accordion-item'>
                              <div className='accordion-header' id='flush-headingOne'>
                                <div
                                  className='accordion-button collapsed'
                                  data-bs-toggle='collapse'
                                  data-bs-target='#flush-collapseOne'
                                >
                                  <div className='custom-form-check form-check mb-0'>
                                    <label className='form-check-label' htmlFor='credit'>
                                      <input
                                        className='form-check-input mt-0'
                                        type='radio'
                                        name='flexRadioDefault'
                                        id='credit'
                                      />
                                      Credit or Debit Card
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div
                                id='flush-collapseOne'
                                className='accordion-collapse collapse'
                                data-bs-parent='#accordionFlushExample'
                              >
                                <div className='accordion-body'>
                                  <div className='row g-2'>
                                    <div className='col-12'>
                                      <div className='payment-method'>
                                        <div className='form-floating mb-lg-3 mb-2 theme-form-floating'>
                                          <input
                                            type='text'
                                            className='form-control'
                                            id='credit2'
                                            placeholder='Enter Credit & Debit Card Number'
                                          />
                                          <label htmlFor='credit2'>
                                            Enter Credit & Debit Card Number
                                          </label>
                                        </div>
                                      </div>
                                    </div>

                                    <div className='col-xxl-4'>
                                      <div className='form-floating mb-lg-3 mb-2 theme-form-floating'>
                                        <input
                                          type='text'
                                          className='form-control'
                                          id='expiry'
                                          placeholder='Enter Expiry Date'
                                        />
                                        <label htmlFor='expiry'>Expiry Date</label>
                                      </div>
                                    </div>

                                    <div className='col-xxl-4'>
                                      <div className='form-floating mb-lg-3 mb-2 theme-form-floating'>
                                        <input
                                          type='text'
                                          className='form-control'
                                          id='cvv'
                                          placeholder='Enter CVV Number'
                                        />
                                        <label htmlFor='cvv'>CVV Number</label>
                                      </div>
                                    </div>

                                    <div className='col-xxl-4'>
                                      <div className='form-floating mb-lg-3 mb-2 theme-form-floating'>
                                        <input
                                          type='password'
                                          className='form-control'
                                          id='password'
                                          placeholder='Enter Password'
                                        />
                                        <label htmlFor='password'>Password</label>
                                      </div>
                                    </div>

                                    <div className='button-group mt-0'>
                                      <ul>
                                        <li>
                                          <button className='btn btn-light shopping-button'>
                                            Cancel
                                          </button>
                                        </li>

                                        <li>
                                          <button className='btn btn-animation'>
                                            Use This Card
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='accordion-item'>
                              <div className='accordion-header' id='flush-headingTwo'>
                                <div
                                  className='accordion-button collapsed'
                                  data-bs-toggle='collapse'
                                  data-bs-target='#flush-collapseTwo'
                                >
                                  <div className='custom-form-check form-check mb-0'>
                                    <label className='form-check-label' htmlFor='banking'>
                                      <input
                                        className='form-check-input mt-0'
                                        type='radio'
                                        name='flexRadioDefault'
                                        id='banking'
                                      />
                                      Net Banking
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div
                                id='flush-collapseTwo'
                                className='accordion-collapse collapse'
                                data-bs-parent='#accordionFlushExample'
                              >
                                <div className='accordion-body'>
                                  <h5 className='text-uppercase mb-4'>Select Your Bank</h5>
                                  <div className='row g-2'>
                                    <div className='col-md-6'>
                                      <div className='custom-form-check form-check'>
                                        <input
                                          className='form-check-input mt-0'
                                          type='radio'
                                          name='flexRadioDefault'
                                          id='bank1'
                                        />
                                        <label className='form-check-label' htmlFor='bank1'>
                                          Industrial & Commercial Bank
                                        </label>
                                      </div>
                                    </div>

                                    <div className='col-md-6'>
                                      <div className='custom-form-check form-check'>
                                        <input
                                          className='form-check-input mt-0'
                                          type='radio'
                                          name='flexRadioDefault'
                                          id='bank2'
                                        />
                                        <label className='form-check-label' htmlFor='bank2'>
                                          Agricultural Bank
                                        </label>
                                      </div>
                                    </div>

                                    <div className='col-md-6'>
                                      <div className='custom-form-check form-check'>
                                        <input
                                          className='form-check-input mt-0'
                                          type='radio'
                                          name='flexRadioDefault'
                                          id='bank3'
                                        />
                                        <label className='form-check-label' htmlFor='bank3'>
                                          Bank of America
                                        </label>
                                      </div>
                                    </div>

                                    <div className='col-md-6'>
                                      <div className='custom-form-check form-check'>
                                        <input
                                          className='form-check-input mt-0'
                                          type='radio'
                                          name='flexRadioDefault'
                                          id='bank4'
                                        />
                                        <label className='form-check-label' htmlFor='bank4'>
                                          Construction Bank Corp.
                                        </label>
                                      </div>
                                    </div>

                                    <div className='col-md-6'>
                                      <div className='custom-form-check form-check'>
                                        <input
                                          className='form-check-input mt-0'
                                          type='radio'
                                          name='flexRadioDefault'
                                          id='bank5'
                                        />
                                        <label className='form-check-label' htmlFor='bank5'>
                                          HSBC Holdings
                                        </label>
                                      </div>
                                    </div>

                                    <div className='col-md-6'>
                                      <div className='custom-form-check form-check'>
                                        <input
                                          className='form-check-input mt-0'
                                          type='radio'
                                          name='flexRadioDefault'
                                          id='bank6'
                                        />
                                        <label className='form-check-label' htmlFor='bank6'>
                                          JPMorgan Chase & Co.
                                        </label>
                                      </div>
                                    </div>

                                    <div className='col-12'>
                                      <div className='select-option'>
                                        <div className='form-floating theme-form-floating'>
                                          <select className='form-select theme-form-select'>
                                            <option value='hsbc'>HSBC Holdings</option>
                                            <option value='loyds'>Lloyds Banking Group</option>
                                            <option value='natwest'>Nat West Group</option>
                                            <option value='Barclays'>Barclays</option>
                                            <option value='other'>Others Bank</option>
                                          </select>
                                          <label>Select Other Bank</label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='accordion-item'>
                              <div className='accordion-header' id='flush-headingThree'>
                                <div
                                  className='accordion-button collapsed'
                                  data-bs-toggle='collapse'
                                  data-bs-target='#flush-collapseThree'
                                >
                                  <div className='custom-form-check form-check mb-0'>
                                    <label className='form-check-label' htmlFor='wallet'>
                                      <input
                                        className='form-check-input mt-0'
                                        type='radio'
                                        name='flexRadioDefault'
                                        id='wallet'
                                      />
                                      My Wallet
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div
                                id='flush-collapseThree'
                                className='accordion-collapse collapse'
                                data-bs-parent='#accordionFlushExample'
                              >
                                <div className='accordion-body'>
                                  <h5 className='text-uppercase mb-4'>Select Your Wallet</h5>
                                  <div className='row'>
                                    <div className='col-md-6'>
                                      <div className='custom-form-check form-check'>
                                        <label className='form-check-label' htmlFor='amazon'>
                                          <input
                                            className='form-check-input mt-0'
                                            type='radio'
                                            name='flexRadioDefault'
                                            id='amazon'
                                          />
                                          Amazon Pay
                                        </label>
                                      </div>
                                    </div>

                                    <div className='col-md-6'>
                                      <div className='custom-form-check form-check'>
                                        <input
                                          className='form-check-input mt-0'
                                          type='radio'
                                          name='flexRadioDefault'
                                          id='gpay'
                                        />
                                        <label className='form-check-label' htmlFor='gpay'>
                                          Google Pay
                                        </label>
                                      </div>
                                    </div>

                                    <div className='col-md-6'>
                                      <div className='custom-form-check form-check'>
                                        <input
                                          className='form-check-input mt-0'
                                          type='radio'
                                          name='flexRadioDefault'
                                          id='airtel'
                                        />
                                        <label className='form-check-label' htmlFor='airtel'>
                                          Airtel Money
                                        </label>
                                      </div>
                                    </div>

                                    <div className='col-md-6'>
                                      <div className='custom-form-check form-check'>
                                        <input
                                          className='form-check-input mt-0'
                                          type='radio'
                                          name='flexRadioDefault'
                                          id='paytm'
                                        />
                                        <label className='form-check-label' htmlFor='paytm'>
                                          Paytm Pay
                                        </label>
                                      </div>
                                    </div>

                                    <div className='col-md-6'>
                                      <div className='custom-form-check form-check'>
                                        <input
                                          className='form-check-input mt-0'
                                          type='radio'
                                          name='flexRadioDefault'
                                          id='jio'
                                        />
                                        <label className='form-check-label' htmlFor='jio'>
                                          JIO Money
                                        </label>
                                      </div>
                                    </div>

                                    <div className='col-md-6'>
                                      <div className='custom-form-check form-check'>
                                        <input
                                          className='form-check-input mt-0'
                                          type='radio'
                                          name='flexRadioDefault'
                                          id='free'
                                        />
                                        <label className='form-check-label' htmlFor='free'>
                                          Freecharge
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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

                <button className='btn theme-bg-color text-white btn-md w-100 mt-4 fw-bold'>
                  Place Order
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
