import { ORDERS_LIST } from './API';

export interface OrderAddress {
  name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface Order {
  id: number;
  order_number: string;
  status: string;
  total_amount: number;
  shipping_amount: number;
  tax_amount: number;
  discount_amount: number;
  transaction_id: string;
  payment_receipt: string | null;
  paid_to_upi_id: string;
  notes: string;
  created_at: string;
  updated_at: string;
  items_count: number;
  total_quantity: number;
  address: OrderAddress;
  can_cancel: boolean;
  is_completed: boolean;
  is_cancelled: boolean;
}

export interface OrderStatistics {
  total_orders: number;
  pending_orders: number;
  completed_orders: number;
  cancelled_orders: number;
  total_spent: number;
  avg_order_value: number;
}

export interface OrderPagination {
  current_page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface OrderFilters {
  status: string | null;
  from_date: string | null;
  to_date: string | null;
}

export interface OrdersListResponse {
  status: string;
  message: string;
  data: {
    orders: Order[];
    statistics: OrderStatistics;
    pagination: OrderPagination;
    filters: OrderFilters;
  };
}

export const getOrdersList = async (params?: {
  page?: number;
  per_page?: number;
  status?: string;
  from_date?: string;
  to_date?: string;
}): Promise<OrdersListResponse> => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  // Build query string
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
  if (params?.status) queryParams.append('status', params.status);
  if (params?.from_date) queryParams.append('from_date', params.from_date);
  if (params?.to_date) queryParams.append('to_date', params.to_date);

  const url = queryParams.toString() ? `${ORDERS_LIST}?${queryParams}` : ORDERS_LIST;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch orders');
  }

  return res.json();
};

// Note: Add this when you have the cancel order API endpoint
// export const cancelOrder = async (orderId: number): Promise<any> => {
//   const token = localStorage.getItem('auth_token');
//   if (!token) {
//     throw new Error('No authentication token found');
//   }

//   const res = await fetch(`${API_BASE_URL}/orders-cancel`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ order_id: orderId }),
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.message || 'Failed to cancel order');
//   }

//   return res.json();
// };
