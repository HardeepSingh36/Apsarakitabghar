import { CART_ADD, CART_LIST, CART_UPDATE, CART_REMOVE, CART_CLEAR } from './API';
import type { CartItem } from '@/types/types';

interface AddToCartRequest {
  book_id: number;
  quantity: number;
}

interface AddToCartResponse {
  status: string;
  message: string;
  data?: {
    cart_item_id: number;
    cart_id: number;
    book_id: number;
    quantity: number;
    price_at_add: number;
    title: string;
    slug: string;
    price: number;
    discount_percent: number;
    stock_quantity: number;
    cover_image_name: string;
    discounted_price: number;
    line_total: number;
  };
}

export const addToCart = async (
  payload: AddToCartRequest,
  token: string
): Promise<AddToCartResponse> => {
  const response = await fetch(CART_ADD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add item to cart');
  }

  return response.json();
};

export const getCartList = async (
  token: string
): Promise<{ cart_items: CartItem[]; summary: any }> => {
  const response = await fetch(CART_LIST, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch cart list');
  }

  const { data } = await response.json();
  return { cart_items: data.cart_items, summary: data.summary };
};

export const updateCartItem = async (
  cartItemId: number,
  quantity: number,
  token: string
): Promise<{ status: string; message: string; data?: any }> => {
  const response = await fetch(`${CART_UPDATE}?id=${cartItemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update cart item');
  }

  return response.json();
};

export const removeCartItem = async (
  cartItemId: number,
  token: string
): Promise<{ status: string; message: string; data?: any }> => {
  const response = await fetch(`${CART_REMOVE}?id=${cartItemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to remove cart item');
  }

  return response.json();
};

export const clearCartAPI = async (
  token: string
): Promise<{ status: string; message: string; data?: any }> => {
  const response = await fetch(CART_CLEAR, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to clear cart');
  }

  return response.json();
};
