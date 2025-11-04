import { ORDERS_PLACE } from './API';

export interface PlaceOrderRequest {
  // Authenticated user fields
  address_id?: number;
  
  // Guest user fields
  full_name?: string;
  email?: string;
  mobile?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  landmark?: string;
  country?: string;
  cart_items?: Array<{ book_id: number; quantity: number }>;
  
  // Common fields
  payment_method: 'upi' | 'cash_on_delivery';
  transaction_id?: string;
  paid_to_upi_id?: string;
  payment_receipt?: File;
  notes?: string;
}

export interface OrderItem {
  book_id: number;
  title: string;
  author_name: string;
  quantity: number;
  unit_price: number;
  discount_percent: number;
  discount_amount: number;
  total_price: number;
}

export interface PlaceOrderResponse {
  status: string;
  message: string;
  data: {
    id: number;
    order_number: string;
    status: string;
    total: string;
    shipping_amount: number;
    tax_amount: number;
    discount_amount: number;
    transaction_id: string;
    payment_receipt: string | null;
    paid_to_upi_id: string;
    created_at: string;
    total_amount: number;
    items: OrderItem[];
    items_count: number;
    total_quantity: number;
    // Guest checkout fields
    user_account_created?: boolean;
    user_credentials?: {
      email: string;
      password: string;
      message: string;
    };
  };
}

export const placeOrder = async (orderData: PlaceOrderRequest): Promise<PlaceOrderResponse> => {
  const token = localStorage.getItem('auth_token');
  const isGuest = !token;

  const formData = new FormData();
  
  // Authenticated user - use address_id
  if (!isGuest && orderData.address_id) {
    formData.append('address_id', orderData.address_id.toString());
  }
  
  // Guest user - include all personal and address details
  if (isGuest) {
    if (orderData.full_name) formData.append('full_name', orderData.full_name);
    if (orderData.email) formData.append('email', orderData.email);
    if (orderData.mobile) formData.append('mobile', orderData.mobile);
    if (orderData.address_line1) formData.append('address_line1', orderData.address_line1);
    if (orderData.address_line2) formData.append('address_line2', orderData.address_line2);
    if (orderData.city) formData.append('city', orderData.city);
    if (orderData.state) formData.append('state', orderData.state);
    if (orderData.pincode) formData.append('pincode', orderData.pincode);
    if (orderData.landmark) formData.append('landmark', orderData.landmark);
    if (orderData.country) formData.append('country', orderData.country || 'India');
    
    // Cart items for guest checkout
    if (orderData.cart_items) {
      formData.append('cart_items', JSON.stringify(orderData.cart_items));
    }
  }

  // Common fields
  formData.append('payment_method', orderData.payment_method);

  if (orderData.transaction_id) {
    formData.append('transaction_id', orderData.transaction_id);
  }

  if (orderData.paid_to_upi_id) {
    formData.append('paid_to_upi_id', orderData.paid_to_upi_id);
  }

  if (orderData.payment_receipt) {
    formData.append('payment_receipt', orderData.payment_receipt);
  }

  if (orderData.notes) {
    formData.append('notes', orderData.notes);
  }

  const headers: HeadersInit = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(ORDERS_PLACE, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to place order');
  }

  return res.json();
};
