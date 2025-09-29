import { API_BASE_URL } from './API';

interface AddToCartRequest {
  book_id: number;
  quantity: number;
}

interface AddToCartResponse {
  status: string;
  message: string;
  data?: {
    cart_id: number;
    book_id: number;
    title: string;
    slug: string;
    price: number;
    discount_percent: number;
    discounted_price: number;
    quantity: number;
    line_total: number;
    stock_quantity: number;
    cover_image_name: string;
  };
}

export const addToCart = async (
  payload: AddToCartRequest,
  token: string
): Promise<AddToCartResponse> => {
  const response = await fetch(`${API_BASE_URL}/cart-add`, {
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
