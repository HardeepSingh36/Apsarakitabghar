import { USER_STATS } from './API';

export interface OrderStats {
  total_orders: number;
  pending_orders: number;
  confirmed_orders: number;
  processing_orders: number;
  shipped_orders: number;
  delivered_orders: number;
  cancelled_orders: number;
  refunded_orders: number;
  total_spent: number;
  avg_order_value: number;
}

export interface WishlistStats {
  total_wishlists: number;
}

export interface CartStats {
  cart_items_count: number;
  cart_total_quantity: number;
}

export interface RecentOrder {
  order_number: string;
  status: string;
  total: number;
  created_at: string;
}

export interface RecentActivity {
  recent_order: RecentOrder;
}

export interface StatsSummary {
  total_orders: number;
  pending_orders: number;
  total_wishlists: number;
  cart_items: number;
  total_spent: number;
}

export interface UserStatsResponse {
  status: string;
  message: string;
  data: {
    orders: OrderStats;
    wishlist: WishlistStats;
    cart: CartStats;
    recent_activity: RecentActivity;
    summary: StatsSummary;
  };
}

export const getUserStats = async (): Promise<UserStatsResponse> => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const res = await fetch(USER_STATS, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch user statistics');
  }

  return res.json();
};
