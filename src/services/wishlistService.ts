import { WISHLIST_LIST, WISHLIST_ADD, WISHLIST_REMOVE, WISHLIST_CLEAR } from './API';

// API Response Types
export interface WishlistItem {
  wishlist_id: number;
  book_id: number;
  added_at: string;
  title: string;
  slug: string;
  price: number;
  discount_percent: number;
  cover_image_name: string;
  rating_avg?: number;
  rating_count?: number;
  stock_quantity: number;
  book_status?: string;
  author_name: string;
  category_name?: string;
  genre_name?: string;
  discounted_price: number;
  in_stock: boolean;
}

export interface WishlistResponse {
  status: string;
  message: string;
  data: {
    wishlist_items: WishlistItem[];
    pagination: {
      current_page: number;
      per_page: number;
      total_items: number;
      total_pages: number;
      has_next: boolean;
      has_prev: boolean;
    };
  };
}

export interface WishlistAddResponse {
  status: string;
  message: string;
  data: {
    wishlist_id: number;
    book_id: number;
    added_at: string;
    title: string;
    slug: string;
    price: number;
    discount_percent: number;
    cover_image_name: string;
    stock_quantity: number;
    author_name: string;
    discounted_price: number;
    in_stock: boolean;
  };
}

export interface WishlistRemoveResponse {
  status: string;
  message: string;
  data: {
    removed_wishlist_id: number;
    book_id: number;
    book_title: string;
    book_price: number;
  };
}

export interface WishlistClearResponse {
  status: string;
  message: string;
  data: {
    removed_items_count: number;
    wishlist_cleared_at: string;
  };
}

// Helper function to get auth headers
const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Get all wishlist items
export const getWishlistItems = async (): Promise<WishlistResponse> => {
  const response = await fetch(WISHLIST_LIST, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to fetch wishlist' }));
    throw new Error(error.message || 'Failed to fetch wishlist');
  }

  return response.json();
};

// Add book to wishlist
export const addToWishlistAPI = async (bookId: number): Promise<WishlistAddResponse> => {
  const response = await fetch(WISHLIST_ADD, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ book_id: bookId }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to add to wishlist' }));
    throw new Error(error.message || 'Failed to add to wishlist');
  }

  return response.json();
};

// Remove item from wishlist
export const removeFromWishlistAPI = async (
  wishlistId: number
): Promise<WishlistRemoveResponse> => {
  const response = await fetch(`${WISHLIST_REMOVE}?id=${wishlistId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: 'Failed to remove from wishlist' }));
    throw new Error(error.message || 'Failed to remove from wishlist');
  }

  return response.json();
};

// Clear entire wishlist
export const clearWishlistAPI = async (): Promise<WishlistClearResponse> => {
  const response = await fetch(WISHLIST_CLEAR, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to clear wishlist' }));
    throw new Error(error.message || 'Failed to clear wishlist');
  }

  return response.json();
};
