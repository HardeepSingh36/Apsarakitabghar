import { useCurrency } from '@/context/CurrencyContext';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import {
  fetchAddresses,
  createAddress,
  updateAddressAsync,
  setDefaultAddressAsync,
  setSelectedAddress,
  clearError,
  type Address,
} from '@/features/user/userSlice';
import type { RootState } from '@/app/store';
import AddAddressModal from '@/components/dashboard/AddAddressModal';
import { useState, useEffect } from 'react';
import { Edit, Loader } from 'react-feather';
import { IMAGE_BASE_URL } from '@/constants';
import toast from 'react-hot-toast';
import PaymentOptions from '@/components/checkout/PaymentOptions';
import { placeOrder, type PlaceOrderRequest } from '@/services/orderService';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '@/features/cart/cartSlice';
import { login as loginApi } from '@/services/authService';
import { login } from '@/features/auth/authSlice';

const Checkout = () => {
  const { currency } = useCurrency();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const { addresses, selectedAddressId, loading, error } = useAppSelector(
    (state: RootState) => state.user
  );
  const operationLoading = useAppSelector((state: RootState) => state.user.operationLoading || {});

  const [isAddAddressModalOpen, setAddAddressModalOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [adminUpiId, setAdminUpiId] = useState('');

  // Guest checkout form fields
  const [guestForm, setGuestForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    country: 'India',
  });

  // Fetch addresses on component mount (only for authenticated users)
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAddresses());
    }
  }, [dispatch, isAuthenticated]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.current_line_total, 0);
  const coupon = 0;
  const total = subtotal - coupon;

  const handleAddressSelect = (id: string) => {
    // Optimistically update selection locally
    dispatch(setSelectedAddress(id));
    // Update backend to mark default address
    dispatch(setDefaultAddressAsync(id))
      .unwrap()
      .catch((err: any) => {
        toast.error(err || 'Failed to set default address');
      });
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
    // Validation for authenticated users
    if (isAuthenticated && !selectedAddressId) {
      toast.error('Please select a delivery address');
      return;
    }

    // Validation for guest users
    if (!isAuthenticated) {
      if (!guestForm.fullName.trim()) {
        toast.error('Please enter your full name');
        return;
      }
      if (!guestForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestForm.email)) {
        toast.error('Please enter a valid email address');
        return;
      }
      if (!guestForm.mobile.trim() || !/^[0-9]{10,15}$/.test(guestForm.mobile)) {
        toast.error('Please enter a valid mobile number (10-15 digits)');
        return;
      }
      if (!guestForm.addressLine1.trim()) {
        toast.error('Please enter your address');
        return;
      }
      if (!guestForm.city.trim()) {
        toast.error('Please enter your city');
        return;
      }
      if (!guestForm.state.trim()) {
        toast.error('Please enter your state');
        return;
      }
      if (!guestForm.pincode.trim() || !/^[0-9]{6}$/.test(guestForm.pincode)) {
        toast.error('Please enter a valid 6-digit pincode');
        return;
      }
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

    // Check if cart is empty
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      setIsPlacingOrder(true);

      const orderData: PlaceOrderRequest = {
        payment_method: 'upi',
        transaction_id: transactionId.trim(),
        paid_to_upi_id: adminUpiId,
        payment_receipt: paymentScreenshot,
        notes: notes.trim() || undefined,
      };

      // Add authenticated user data
      if (isAuthenticated && selectedAddressId) {
        orderData.address_id = parseInt(selectedAddressId);
      }

      // Add guest user data
      if (!isAuthenticated) {
        orderData.full_name = guestForm.fullName.trim();
        orderData.email = guestForm.email.trim();
        orderData.mobile = guestForm.mobile.trim();
        orderData.address_line1 = guestForm.addressLine1.trim();
        orderData.address_line2 = guestForm.addressLine2.trim() || undefined;
        orderData.city = guestForm.city.trim();
        orderData.state = guestForm.state.trim();
        orderData.pincode = guestForm.pincode.trim();
        orderData.landmark = guestForm.landmark.trim() || undefined;
        orderData.country = guestForm.country || 'India';

        // Convert cart items to format expected by API
        orderData.cart_items = cartItems.map((item) => ({
          book_id: item.book_id,
          quantity: item.quantity,
        }));
      }
      console.log('The orderData is: ', orderData);
      const response = await placeOrder(orderData);

      if (response.status === 'success') {
        // Clear the cart
        dispatch(clearCart());

        // Handle guest user auto-login
        if (
          !isAuthenticated &&
          response.data.user_account_created &&
          response.data.user_credentials
        ) {
          toast.success(
            `Order placed! Account created.\nEmail: ${response.data.user_credentials.email}\nPassword: ${response.data.user_credentials.password}\n\nLogging you in...`,
            { duration: 8000 }
          );

          try {
            // Auto-login the newly created guest user
            const loginResponse = await loginApi(
              response.data.user_credentials.email,
              response.data.user_credentials.password
            );

            if (loginResponse.status === 'success') {
              const { user, token } = loginResponse.data;

              // Dispatch login with user details
              dispatch(
                login({
                  username: user.username,
                  email: user.email,
                  full_name: `${user.username}`,
                  first_name: user.username.split('_')[0],
                  last_name: user.username.split('_')[1] || '',
                  phone_number: user.phone_number || '',
                  role: user.role,
                  status: user.status,
                  created_at: user.created_at,
                })
              );

              // Store token in local storage
              localStorage.setItem('auth_token', token);
              localStorage.setItem('token_expires_in', loginResponse.data.expires_in);

              toast.success('Logged in successfully!');

              // Navigate to orders page
              navigate('/dashboard?tab=orders', {
                state: {
                  orderNumber: response.data.order_number,
                  orderTotal: response.data.total_amount,
                  newAccount: true,
                },
              });
            } else {
              // If auto-login fails, just redirect to home with credentials
              navigate('/', {
                state: {
                  orderPlaced: true,
                  orderNumber: response.data.order_number,
                  userCredentials: response.data.user_credentials,
                },
              });
            }
          } catch (loginError) {
            console.error('Auto-login failed:', loginError);
            // If auto-login fails, redirect to home with credentials
            navigate('/', {
              state: {
                orderPlaced: true,
                orderNumber: response.data.order_number,
                userCredentials: response.data.user_credentials,
              },
            });
          }
        } else {
          toast.success(`Order ${response.data.order_number} placed successfully!`);

          // Navigate to orders page for authenticated users
          navigate('/dashboard?tab=orders', {
            state: {
              orderNumber: response.data.order_number,
              orderTotal: response.data.total_amount,
            },
          });
        }
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
        <div className='px-4'>
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
                          colors='primary:#fc2403,secondary:#fc6603,tertiary:#ff8a50'
                          className='lord-icon'
                        />
                      </div>
                      <div className='checkout-box !shadow-md'>
                        <div className='checkout-title'>
                          <h4>Delivery Address</h4>
                        </div>

                        <div className='checkout-detail'>
                          {!isAuthenticated ? (
                            // Guest Checkout Form
                            <div className='guest-checkout-form'>
                              <p className='text-muted mb-3'>
                                Please fill in your details to place the order. An account will be
                                created for you automatically.
                              </p>
                              <div className='row g-3'>
                                <div className='col-md-6'>
                                  <label className='form-label'>
                                    Full Name <span className='text-danger'>*</span>
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter your full name'
                                    value={guestForm.fullName}
                                    onChange={(e) =>
                                      setGuestForm({ ...guestForm, fullName: e.target.value })
                                    }
                                  />
                                </div>
                                <div className='col-md-6'>
                                  <label className='form-label'>
                                    Email <span className='text-danger'>*</span>
                                  </label>
                                  <input
                                    type='email'
                                    className='form-control'
                                    placeholder='Enter your email'
                                    value={guestForm.email}
                                    onChange={(e) =>
                                      setGuestForm({ ...guestForm, email: e.target.value })
                                    }
                                  />
                                </div>
                                <div className='col-md-6'>
                                  <label className='form-label'>
                                    Mobile Number <span className='text-danger'>*</span>
                                  </label>
                                  <input
                                    type='tel'
                                    className='form-control'
                                    placeholder='Enter 10-digit mobile number'
                                    value={guestForm.mobile}
                                    onChange={(e) =>
                                      setGuestForm({ ...guestForm, mobile: e.target.value })
                                    }
                                  />
                                  <small className='text-muted'>
                                    Your mobile number will be used as your password
                                  </small>
                                </div>
                                <div className='col-md-6'>
                                  <label className='form-label'>
                                    Pincode <span className='text-danger'>*</span>
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter 6-digit pincode'
                                    value={guestForm.pincode}
                                    onChange={(e) =>
                                      setGuestForm({ ...guestForm, pincode: e.target.value })
                                    }
                                  />
                                </div>
                                <div className='col-12'>
                                  <label className='form-label'>
                                    Address Line 1 <span className='text-danger'>*</span>
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='House/Flat No., Building Name'
                                    value={guestForm.addressLine1}
                                    onChange={(e) =>
                                      setGuestForm({ ...guestForm, addressLine1: e.target.value })
                                    }
                                  />
                                </div>
                                <div className='col-12'>
                                  <label className='form-label'>Address Line 2</label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Street, Area, Locality (Optional)'
                                    value={guestForm.addressLine2}
                                    onChange={(e) =>
                                      setGuestForm({ ...guestForm, addressLine2: e.target.value })
                                    }
                                  />
                                </div>
                                <div className='col-md-6'>
                                  <label className='form-label'>
                                    City <span className='text-danger'>*</span>
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter city'
                                    value={guestForm.city}
                                    onChange={(e) =>
                                      setGuestForm({ ...guestForm, city: e.target.value })
                                    }
                                  />
                                </div>
                                <div className='col-md-6'>
                                  <label className='form-label'>
                                    State <span className='text-danger'>*</span>
                                  </label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter state'
                                    value={guestForm.state}
                                    onChange={(e) =>
                                      setGuestForm({ ...guestForm, state: e.target.value })
                                    }
                                  />
                                </div>
                                <div className='col-md-6'>
                                  <label className='form-label'>Landmark</label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Nearby landmark (Optional)'
                                    value={guestForm.landmark}
                                    onChange={(e) =>
                                      setGuestForm({ ...guestForm, landmark: e.target.value })
                                    }
                                  />
                                </div>
                                <div className='col-md-6'>
                                  <label className='form-label'>Country</label>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Country'
                                    value={guestForm.country}
                                    onChange={(e) =>
                                      setGuestForm({ ...guestForm, country: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          ) : loading ? (
                            <div className='text-center'>
                              <div className='!flex !justify-center !items-center !gap-2'>
                                <Loader
                                  className='!w-6 !h-6 animate-spin'
                                  style={{ color: '#fc2403' }}
                                />
                                <p className='!mb-0'>Loading addresses...</p>
                              </div>
                            </div>
                          ) : addresses.length === 0 ? (
                            <div className='text-center'>
                              <button
                                className='font-public-sans !px-6 !py-3 bg-theme-gradient-orange hover:!from-[#e42003] hover:!to-[#e55503] !text-white !font-semibold !rounded-lg !shadow-md hover:!shadow-lg !transition-all !duration-200 !border-0'
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
                                      {operationLoading[`set-default-${address.id}`] ? (
                                        <Loader
                                          className='!w-4 !h-4 animate-spin'
                                          style={{ color: '#fc2403' }}
                                        />
                                      ) : (
                                        <div className='form-check'>
                                          <div className='flex items-center gap-2'>
                                            <input
                                              className='form-check-input'
                                              type='radio'
                                              name='address'
                                              id={`address-${address.id}`}
                                              checked={selectedAddressId === address.id}
                                              onChange={() => handleAddressSelect(address.id)}
                                              disabled={
                                                operationLoading[`set-default-${address.id}`]
                                              }
                                            />
                                          </div>
                                        </div>
                                      )}

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
                                        className='!absolute top-0 right-0 !p-2 !rounded-full bg-theme-gradient-orange hover:!from-[#e42003] hover:!to-[#e55503] !text-white !shadow-md hover:!shadow-lg !transition-all !duration-200 !border-0'
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
                          colors='primary:#fc2403,secondary:#fc6603,tertiary:#ff8a50'
                          className='lord-icon'
                        />
                        {/* </lord-icon> */}
                      </div>
                      <div className='checkout-box !shadow-md'>
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
              <div className='right-side-summery-box !top-0'>
                <div className='summery-box-2 shadow-md'>
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
                    {/* <li>
                      <h4>Coupon/Code</h4>
                      <h4 className='price'>
                        {currency.sign}-{coupon.toFixed(2)}
                      </h4>
                    </li> */}
                    <li className='list-total'>
                      <h4>Total ({currency.sign})</h4>
                      <h4 className='price'>
                        {currency.sign}
                        {total.toFixed(2)}
                      </h4>
                    </li>
                  </ul>
                </div>

                <div className='summery-box-2 mt-4 shadow-md'>
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
                  className='font-public-sans !w-full !px-6 !py-3 !text-lg bg-theme-gradient-orange hover:!from-[#e42003] hover:!to-[#e55503] !text-white !font-semibold !rounded-sm !shadow-md hover:!shadow-lg !transition-all !duration-200 !border-0 !mt-4 disabled:!opacity-50 disabled:!cursor-not-allowed'
                  onClick={handlePlaceOrder}
                  disabled={
                    isPlacingOrder ||
                    (isAuthenticated && !selectedAddressId) ||
                    cartItems.length === 0
                  }
                >
                  {isPlacingOrder ? (
                    <div className='!flex !items-center !justify-center !gap-2'>
                      <Loader className='!w-5 !h-5 animate-spin' />
                      <span>Placing Order...</span>
                    </div>
                  ) : isAuthenticated ? (
                    'Place Order'
                  ) : (
                    'Place Order & Create Account'
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
