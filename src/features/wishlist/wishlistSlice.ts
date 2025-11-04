// src/features/wishlist/wishlistSlice.ts
import type { WishlistItem } from '@/types/types';
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import {
  getWishlistItems,
  addToWishlistAPI,
  removeFromWishlistAPI,
  clearWishlistAPI,
  type WishlistItem as APIWishlistItem,
} from '@/services/wishlistService';
import {
  getLocalWishlist,
  addToLocalWishlist,
  removeFromLocalWishlist,
  clearLocalWishlist,
  type LocalWishlistItem,
} from '@/services/localStorageWishlistService';

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
  operationLoading: { [key: string]: boolean }; // For individual operations
}

// Helper function to convert LocalWishlistItem to WishlistItem
const convertLocalToWishlistItem = (localItem: LocalWishlistItem): WishlistItem => {
  return {
    id: localItem.id,
    title: localItem.title,
    slug: localItem.slug,
    description: '',
    isbn: '',
    language: '',
    price: localItem.price,
    discount_percent: localItem.discount_percent,
    stock_quantity: localItem.stock_quantity,
    pages: 0,
    author_name: localItem.author_name || '',
    publisher_name: '',
    publish_date: '',
    cover_image_name: localItem.cover_image_name,
    featured: 0,
    views_count: 0,
    sales_count: 0,
    rating_avg: localItem.rating || 0,
    rating_count: 0,
    created_at: localItem.added_at,
    updated_at: localItem.added_at,
    author_id: 0,
    category_id: 0,
    genre_id: 0,
    author_table_id: null,
    author_pen_name: localItem.author_pen_name || null,
    category_table_id: 0,
    category_name: localItem.category_name || '',
    genre_table_id: null,
    genre_name: localItem.genre_name || null,
    tags: [],
    discounted_price: localItem.discounted_price,
    rating: localItem.rating || 0,
    wishlist_id: undefined,
    in_stock: localItem.stock_quantity > 0,
  };
};

// Load initial state from localStorage
const loadInitialWishlist = (): WishlistItem[] => {
  const localWishlist = getLocalWishlist();
  return localWishlist.map(convertLocalToWishlistItem);
};

const initialState: WishlistState = {
  items: loadInitialWishlist(),
  loading: false,
  error: null,
  operationLoading: {},
};

// Helper function to convert API WishlistItem to local WishlistItem
const convertAPIWishlistItem = (apiItem: APIWishlistItem): WishlistItem => ({
  id: apiItem.book_id,
  title: apiItem.title,
  slug: apiItem.slug,
  description: '', // Not provided by API, will be filled from book details if needed
  isbn: '', // Not provided by wishlist API
  language: '', // Not provided by wishlist API
  price: apiItem.price,
  discount_percent: apiItem.discount_percent,
  stock_quantity: apiItem.stock_quantity,
  pages: 0, // Not provided by wishlist API
  author_name: apiItem.author_name,
  publisher_name: '', // Not provided by wishlist API
  publish_date: '', // Not provided by wishlist API
  cover_image_name: apiItem.cover_image_name,
  featured: 0,
  views_count: 0,
  sales_count: 0,
  rating_avg: apiItem.rating_avg || 0,
  rating_count: apiItem.rating_count || 0,
  created_at: apiItem.added_at,
  updated_at: apiItem.added_at,
  author_id: 0,
  category_id: 0,
  genre_id: 0,
  author_table_id: null,
  author_pen_name: null,
  category_table_id: 0,
  category_name: apiItem.category_name || '',
  genre_table_id: null,
  genre_name: apiItem.genre_name || null,
  tags: [],
  discounted_price: apiItem.discounted_price,
  rating: apiItem.rating_avg || 0, // Use API rating for WishlistItem type
  wishlist_id: apiItem.wishlist_id,
  in_stock: apiItem.in_stock,
});

// Async actions
export const fetchWishlistAsync = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWishlistItems();
      return response.data.wishlist_items.map(convertAPIWishlistItem);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch wishlist');
    }
  }
);

export const addToWishlistAsync = createAsyncThunk(
  'wishlist/addToWishlist',
  async (bookId: number, { rejectWithValue }) => {
    try {
      const response = await addToWishlistAPI(bookId);
      // Return the API response data for potential optimistic updates
      return {
        bookId,
        wishlistData: response.data,
      };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add to wishlist');
    }
  }
);

export const removeFromWishlistAsync = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async ({ wishlistId, bookId }: { wishlistId: number; bookId: number }, { rejectWithValue }) => {
    try {
      await removeFromWishlistAPI(wishlistId);
      return bookId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to remove from wishlist'
      );
    }
  }
);

export const clearWishlistAsync = createAsyncThunk(
  'wishlist/clearWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await clearWishlistAPI();
      return response.data.removed_items_count;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to clear wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // Keep local-only actions for backward compatibility
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
      clearLocalWishlist();
    },
    // Add item to localStorage wishlist (for non-authenticated users)
    addToLocalWishlistAction: (state, action) => {
      const { book } = action.payload;
      addToLocalWishlist(book);

      // Update Redux state
      const localWishlist = getLocalWishlist();
      state.items = localWishlist.map(convertLocalToWishlistItem);
    },
    // Remove item from localStorage wishlist
    removeFromLocalWishlistAction: (state, action) => {
      const { bookId } = action.payload;
      removeFromLocalWishlist(bookId);

      // Update Redux state
      const localWishlist = getLocalWishlist();
      state.items = localWishlist.map(convertLocalToWishlistItem);
    },
    // Load wishlist from localStorage
    loadWishlistFromLocalStorage: (state) => {
      const localWishlist = getLocalWishlist();
      state.items = localWishlist.map(convertLocalToWishlistItem);
    },
    setOperationLoading: (
      state,
      action: PayloadAction<{ operation: string; loading: boolean }>
    ) => {
      state.operationLoading[action.payload.operation] = action.payload.loading;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch wishlist
      .addCase(fetchWishlistAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlistAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add to wishlist
      .addCase(addToWishlistAsync.pending, (state, action) => {
        state.operationLoading[`add-${action.meta.arg}`] = true;
        state.error = null;
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.operationLoading[`add-${action.payload.bookId}`] = false;

        // Add the item to local state using API response data
        const apiWishlistData = action.payload.wishlistData;
        const wishlistItem = convertAPIWishlistItem(apiWishlistData);

        // Also update localStorage
        addToLocalWishlist({
          id: apiWishlistData.book_id,
          title: apiWishlistData.title,
          slug: apiWishlistData.slug,
          price: apiWishlistData.price,
          discount_percent: apiWishlistData.discount_percent,
          discounted_price: apiWishlistData.discounted_price,
          cover_image_name: apiWishlistData.cover_image_name,
          author_name: apiWishlistData.author_name,
          stock_quantity: apiWishlistData.stock_quantity,
        });

        // Check if item already exists to avoid duplicates
        const exists = state.items.find((item) => item.id === wishlistItem.id);
        if (!exists) {
          state.items.push(wishlistItem);
        }
      })
      .addCase(addToWishlistAsync.rejected, (state, action) => {
        state.operationLoading[`add-${action.meta.arg}`] = false;
        state.error = action.payload as string;
      })
      // Remove from wishlist
      .addCase(removeFromWishlistAsync.pending, (state, action) => {
        state.operationLoading[`remove-${action.meta.arg.bookId}`] = true;
        state.error = null;
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        state.operationLoading[`remove-${action.payload}`] = false;

        // Remove from localStorage
        removeFromLocalWishlist(action.payload);

        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeFromWishlistAsync.rejected, (state, action) => {
        state.operationLoading[`remove-${action.meta.arg.bookId}`] = false;
        state.error = action.payload as string;
      })
      // Clear wishlist
      .addCase(clearWishlistAsync.pending, (state) => {
        state.operationLoading['clear'] = true;
        state.error = null;
      })
      .addCase(clearWishlistAsync.fulfilled, (state) => {
        state.operationLoading['clear'] = false;
        state.items = [];
        // Clear localStorage
        clearLocalWishlist();
      })
      .addCase(clearWishlistAsync.rejected, (state, action) => {
        state.operationLoading['clear'] = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  addToLocalWishlistAction,
  removeFromLocalWishlistAction,
  loadWishlistFromLocalStorage,
  setOperationLoading,
  clearError,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
