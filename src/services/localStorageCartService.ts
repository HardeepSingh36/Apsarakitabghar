import type { Book } from '@/types/types';

export interface LocalCartItem {
  book_id: number;
  quantity: number;
  title: string;
  slug: string;
  price: number;
  discount_percent: number;
  discounted_price: number;
  cover_image_name: string;
  author_name?: string;
  author_pen_name?: string;
  stock_quantity: number;
  added_at: string;
}

const CART_STORAGE_KEY = 'apsara_cart';

// Get all cart items from localStorage
export const getLocalCart = (): LocalCartItem[] => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

// Save cart items to localStorage
const saveLocalCart = (cart: LocalCartItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Dispatch custom event for cart updates
    window.dispatchEvent(new Event('localCartUpdated'));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Add item to localStorage cart
export const addToLocalCart = (
  book: Book | Partial<LocalCartItem>,
  quantity: number = 1
): LocalCartItem => {
  const cart = getLocalCart();

  const cartItem: LocalCartItem = {
    book_id: 'id' in book ? book.id : book.book_id!,
    quantity: quantity,
    title: book.title!,
    slug: book.slug!,
    price: book.price!,
    discount_percent: book.discount_percent || 0,
    discounted_price: book.discounted_price || book.price!,
    cover_image_name: book.cover_image_name!,
    author_name: 'author_name' in book ? book.author_name || undefined : undefined,
    author_pen_name: 'author_pen_name' in book ? book.author_pen_name || undefined : undefined,
    stock_quantity: book.stock_quantity || 999,
    added_at: new Date().toISOString(),
  };

  // Check if item already exists
  const existingIndex = cart.findIndex((item) => item.book_id === cartItem.book_id);

  if (existingIndex >= 0) {
    // Update quantity
    cart[existingIndex].quantity += quantity;
    cart[existingIndex].added_at = new Date().toISOString();
  } else {
    // Add new item
    cart.push(cartItem);
  }

  saveLocalCart(cart);
  return cartItem;
};

// Update item quantity in localStorage cart
export const updateLocalCartItem = (bookId: number, quantity: number): void => {
  const cart = getLocalCart();
  const index = cart.findIndex((item) => item.book_id === bookId);

  if (index >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.splice(index, 1);
    } else {
      cart[index].quantity = quantity;
    }
    saveLocalCart(cart);
  }
};

// Remove item from localStorage cart
export const removeFromLocalCart = (bookId: number): void => {
  const cart = getLocalCart();
  const filteredCart = cart.filter((item) => item.book_id !== bookId);
  saveLocalCart(filteredCart);
};

// Clear entire localStorage cart
export const clearLocalCart = (): void => {
  localStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new Event('localCartUpdated'));
};

// Get cart item count
export const getLocalCartCount = (): number => {
  const cart = getLocalCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};

// Get cart total
export const getLocalCartTotal = (): number => {
  const cart = getLocalCart();
  return cart.reduce((sum, item) => sum + item.discounted_price * item.quantity, 0);
};

// Check if item is in cart
export const isInLocalCart = (bookId: number): boolean => {
  const cart = getLocalCart();
  return cart.some((item) => item.book_id === bookId);
};

// Get specific item from cart
export const getLocalCartItem = (bookId: number): LocalCartItem | undefined => {
  const cart = getLocalCart();
  return cart.find((item) => item.book_id === bookId);
};

// Sync localStorage cart with server (when user logs in)
export const syncCartWithServer = async (token: string): Promise<void> => {
  const localCart = getLocalCart();

  if (localCart.length === 0) {
    return;
  }

  try {
    // Add all local cart items to server
    const { addToCart } = await import('./cartService');

    for (const item of localCart) {
      try {
        await addToCart({ book_id: item.book_id, quantity: item.quantity }, token);
      } catch (error) {
        console.error(`Failed to sync item ${item.book_id}:`, error);
      }
    }

    // Don't clear local cart - keep it synced
    console.log('Cart synced with server successfully');
  } catch (error) {
    console.error('Error syncing cart with server:', error);
  }
};
