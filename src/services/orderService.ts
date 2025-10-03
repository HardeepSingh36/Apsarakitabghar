import { ORDERS_PLACE } from './API';

export interface PlaceOrderRequest {
  address_id: number;
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
  };
}

export const placeOrder = async (orderData: PlaceOrderRequest): Promise<PlaceOrderResponse> => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const formData = new FormData();
  formData.append('address_id', orderData.address_id.toString());
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

  const res = await fetch(ORDERS_PLACE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to place order');
  }

  return res.json();
};
