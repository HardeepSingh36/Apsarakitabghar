import type { Book } from '@/types/types';

export interface LocalWishlistItem {
  id: number;
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
  category_name?: string;
  genre_name?: string;
  rating?: number;
}

const WISHLIST_STORAGE_KEY = 'apsara_wishlist';

// Get all wishlist items from localStorage
export const getLocalWishlist = (): LocalWishlistItem[] => {
  try {
    const wishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (error) {
    console.error('Error reading wishlist from localStorage:', error);
    return [];
  }
};

// Save wishlist items to localStorage
const saveLocalWishlist = (wishlist: LocalWishlistItem[]): void => {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    // Dispatch custom event for wishlist updates
    window.dispatchEvent(new Event('localWishlistUpdated'));
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error);
  }
};

// Add item to localStorage wishlist
export const addToLocalWishlist = (book: Book | Partial<LocalWishlistItem>): LocalWishlistItem => {
  const wishlist = getLocalWishlist();

  const wishlistItem: LocalWishlistItem = {
    id: ('id' in book ? book.id : book.id) || 0,
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
    category_name: 'category_name' in book ? book.category_name : undefined,
    genre_name: 'genre_name' in book ? book.genre_name || undefined : undefined,
    rating: 'rating' in book ? book.rating : undefined,
  };

  // Check if item already exists
  const existingIndex = wishlist.findIndex((item) => item.id === wishlistItem.id);

  if (existingIndex >= 0) {
    // Update existing item timestamp
    wishlist[existingIndex].added_at = new Date().toISOString();
  } else {
    // Add new item
    wishlist.push(wishlistItem);
  }

  saveLocalWishlist(wishlist);
  return wishlistItem;
};

// Remove item from localStorage wishlist
export const removeFromLocalWishlist = (bookId: number): void => {
  const wishlist = getLocalWishlist();
  const filteredWishlist = wishlist.filter((item) => item.id !== bookId);
  saveLocalWishlist(filteredWishlist);
};

// Clear entire localStorage wishlist
export const clearLocalWishlist = (): void => {
  localStorage.removeItem(WISHLIST_STORAGE_KEY);
  window.dispatchEvent(new Event('localWishlistUpdated'));
};

// Get wishlist item count
export const getLocalWishlistCount = (): number => {
  const wishlist = getLocalWishlist();
  return wishlist.length;
};

// Check if item is in wishlist
export const isInLocalWishlist = (bookId: number): boolean => {
  const wishlist = getLocalWishlist();
  return wishlist.some((item) => item.id === bookId);
};

// Get specific item from wishlist
export const getLocalWishlistItem = (bookId: number): LocalWishlistItem | undefined => {
  const wishlist = getLocalWishlist();
  return wishlist.find((item) => item.id === bookId);
};

// Sync localStorage wishlist with server (when user logs in)
export const syncWishlistWithServer = async (_token: string): Promise<void> => {
  const localWishlist = getLocalWishlist();

  if (localWishlist.length === 0) {
    return;
  }

  try {
    // Add all local wishlist items to server
    const { addToWishlistAPI } = await import('./wishlistService');

    for (const item of localWishlist) {
      try {
        await addToWishlistAPI(item.id);
      } catch (error) {
        console.error(`Failed to sync wishlist item ${item.id}:`, error);
      }
    }

    // Don't clear local wishlist - keep it synced
    console.log('Wishlist synced with server successfully');
  } catch (error) {
    console.error('Error syncing wishlist with server:', error);
  }
};
