import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { CartItem } from '@/types/types';
import {
  addToCart as addToCartAPI,
  getCartList,
  updateCartItem,
  removeCartItem,
  clearCartAPI,
} from '@/services/cartService';
import {
  getLocalCart,
  addToLocalCart,
  updateLocalCartItem,
  removeFromLocalCart,
  clearLocalCart,
  type LocalCartItem,
} from '@/services/localStorageCartService';

interface CartState {
  items: CartItem[];
  summary: any | null;
  loading: boolean;
  error: string | null;
  operationLoading: { [key: string]: boolean }; // For individual operations
}

// Helper function to convert LocalCartItem to CartItem
const convertLocalToCartItem = (localItem: LocalCartItem): CartItem => {
  return {
    cart_item_id: localItem.book_id, // Use book_id as temporary ID for local items
    cart_id: 0,
    book_id: localItem.book_id,
    quantity: localItem.quantity,
    price_at_add: localItem.price,
    added_at: localItem.added_at,
    cart_subtotal: (localItem.discounted_price * localItem.quantity).toString(),
    cart_discount: ((localItem.price - localItem.discounted_price) * localItem.quantity).toString(),
    cart_total: (localItem.discounted_price * localItem.quantity).toString(),
    title: localItem.title,
    slug: localItem.slug,
    price: localItem.price,
    discount_percent: localItem.discount_percent,
    cover_image_name: localItem.cover_image_name,
    stock_quantity: localItem.stock_quantity,
    book_status: 'active',
    author_name: localItem.author_name || '',
    author_pen_name: localItem.author_pen_name || '',
    current_discounted_price: localItem.discounted_price,
    discounted_price_at_add: localItem.discounted_price,
    line_total: localItem.discounted_price * localItem.quantity,
    current_line_total: localItem.discounted_price * localItem.quantity,
    price_changed: false,
    price_difference: 0,
    in_stock: localItem.stock_quantity > 0,
    max_quantity: localItem.stock_quantity,
    availability_status: localItem.stock_quantity > 0 ? 'in_stock' : 'out_of_stock',
  };
};

// Load initial state from localStorage
const loadInitialCart = (): CartItem[] => {
  const localCart = getLocalCart();
  return localCart.map(convertLocalToCartItem);
};

const initialState: CartState = {
  items: loadInitialCart(),
  summary: null,
  loading: false,
  error: null,
  operationLoading: {},
};

// Thunks
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async ({ book_id, quantity }: { book_id: number; quantity: number }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('Authentication token is missing');

      const response = await addToCartAPI({ book_id, quantity }, token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add item to cart');
    }
  }
);

export const fetchCartList = createAsyncThunk(
  'cart/fetchCartList',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('Authentication token is missing');

      const { cart_items, summary } = await getCartList(token);
      return { cart_items, summary };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch cart list');
    }
  }
);

export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItem',
  async (
    { cartItemId, quantity }: { cartItemId: number; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('Authentication token is missing');

      const response = await updateCartItem(cartItemId, quantity, token);
      return { cartItemId, quantity, ...response };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update cart item');
    }
  }
);

export const removeCartItemAsync = createAsyncThunk(
  'cart/removeCartItem',
  async ({ cartItemId }: { cartItemId: number }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('Authentication token is missing');

      const response = await removeCartItem(cartItemId, token);
      return { cartItemId, ...response };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to remove cart item');
    }
  }
);

export const clearCartAsync = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Authentication token is missing');

    const response = await clearCartAPI(token);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to clear cart');
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.summary = null;
      clearLocalCart();
    },
    // Add item to localStorage cart (for non-authenticated users)
    addToLocalCartAction: (state, action) => {
      const { book, quantity } = action.payload;
      addToLocalCart(book, quantity);

      // Update Redux state
      const localCart = getLocalCart();
      state.items = localCart.map(convertLocalToCartItem);
    },
    // Update item in localStorage cart
    updateLocalCartAction: (state, action) => {
      const { bookId, quantity } = action.payload;
      updateLocalCartItem(bookId, quantity);

      // Update Redux state
      const localCart = getLocalCart();
      state.items = localCart.map(convertLocalToCartItem);
    },
    // Remove item from localStorage cart
    removeFromLocalCartAction: (state, action) => {
      const { bookId } = action.payload;
      removeFromLocalCart(bookId);

      // Update Redux state
      const localCart = getLocalCart();
      state.items = localCart.map(convertLocalToCartItem);
    },
    // Load cart from localStorage
    loadCartFromLocalStorage: (state) => {
      const localCart = getLocalCart();
      state.items = localCart.map(convertLocalToCartItem);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state, action) => {
        const bookId = action.meta.arg.book_id;
        state.operationLoading[`add-${bookId}`] = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const bookId = action.meta.arg.book_id;
        state.operationLoading[`add-${bookId}`] = false;

        // Add the returned cart item to the state
        if (action.payload && action.payload) {
          const payload = action.payload;

          // Also update localStorage
          addToLocalCart(
            {
              book_id: payload.book_id,
              title: payload.title,
              slug: payload.slug,
              price: payload.price,
              discount_percent: payload.discount_percent,
              discounted_price: payload.discounted_price,
              cover_image_name: payload.cover_image_name,
              stock_quantity: payload.stock_quantity,
            },
            payload.quantity
          );

          const newCartItem: CartItem = {
            cart_item_id: payload.cart_item_id,
            cart_id: payload.cart_id,
            book_id: payload.book_id,
            quantity: payload.quantity,
            price_at_add: payload.price_at_add,
            added_at: new Date().toISOString(), // API doesn't return this, so use current time
            cart_subtotal: (payload.discounted_price * payload.quantity).toString(), // Use discounted price for subtotal
            cart_discount: (payload.price - payload.discounted_price).toString(), // Calculate discount
            cart_total: (payload.discounted_price * payload.quantity).toString(), // Use discounted price for total
            title: payload.title,
            slug: payload.slug,
            price: payload.price,
            discount_percent: payload.discount_percent,
            cover_image_name: payload.cover_image_name,
            stock_quantity: payload.stock_quantity,
            book_status: 'active', // Assuming active since it was added
            author_name: '', // API doesn't return this in add response
            author_pen_name: '', // API doesn't return this in add response
            current_discounted_price: payload.discounted_price,
            discounted_price_at_add: payload.discounted_price,
            line_total: payload.line_total,
            current_line_total: payload.line_total,
            price_changed: false,
            price_difference: 0,
            in_stock: payload.stock_quantity > 0,
            max_quantity: payload.stock_quantity,
            availability_status: payload.stock_quantity > 0 ? 'in_stock' : 'out_of_stock',
          };

          // Check if item already exists in cart
          const existingItemIndex = state.items.findIndex(
            (item) => item.book_id === payload.book_id
          );

          if (existingItemIndex >= 0) {
            // Update existing item quantity and totals
            state.items[existingItemIndex] = {
              ...state.items[existingItemIndex],
              quantity: payload.quantity,
              line_total: payload.line_total,
              current_line_total: payload.line_total,
              cart_subtotal: payload.line_total.toString(),
              cart_total: payload.line_total.toString(),
            };
          } else {
            // Add new item to cart
            state.items.push(newCartItem);
          }
        }
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        const bookId = action.meta.arg.book_id;
        state.operationLoading[`add-${bookId}`] = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCartList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartList.fulfilled, (state, action) => {
        state.items = action.payload.cart_items;
        state.summary = action.payload.summary;
        state.loading = false;
      })
      .addCase(fetchCartList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCartItemAsync.pending, (state, action) => {
        const cartItemId = action.meta.arg.cartItemId;
        state.operationLoading[`update-${cartItemId}`] = true;
        state.error = null;
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        const cartItemId = action.meta.arg.cartItemId;
        state.operationLoading[`update-${cartItemId}`] = false;

        // Update the cart item quantity in state
        if (action.payload && action.payload.cartItemId) {
          const itemIndex = state.items.findIndex(
            (item) => item.cart_item_id === action.payload.cartItemId
          );

          if (itemIndex >= 0) {
            const item = state.items[itemIndex];
            const newQuantity = action.payload.quantity;
            const newLineTotal = item.current_discounted_price * newQuantity;

            // Update localStorage
            updateLocalCartItem(item.book_id, newQuantity);

            state.items[itemIndex] = {
              ...item,
              quantity: newQuantity,
              line_total: newLineTotal,
              current_line_total: newLineTotal,
              cart_subtotal: newLineTotal.toString(),
              cart_total: newLineTotal.toString(),
            };
          }
        }
      })
      .addCase(updateCartItemAsync.rejected, (state, action) => {
        const cartItemId = action.meta.arg.cartItemId;
        state.operationLoading[`update-${cartItemId}`] = false;
        state.error = action.payload as string;
      })
      .addCase(removeCartItemAsync.pending, (state, action) => {
        const cartItemId = action.meta.arg.cartItemId;
        state.operationLoading[`remove-${cartItemId}`] = true;
        state.error = null;
      })
      .addCase(removeCartItemAsync.fulfilled, (state, action) => {
        const cartItemId = action.meta.arg.cartItemId;
        state.operationLoading[`remove-${cartItemId}`] = false;

        // Remove the cart item from state
        if (action.payload && action.payload.cartItemId) {
          // Find the item to get book_id for localStorage removal
          const itemToRemove = state.items.find(
            (item) => item.cart_item_id === action.payload.cartItemId
          );

          if (itemToRemove) {
            // Remove from localStorage
            removeFromLocalCart(itemToRemove.book_id);
          }

          state.items = state.items.filter(
            (item) => item.cart_item_id !== action.payload.cartItemId
          );
        }
      })
      .addCase(removeCartItemAsync.rejected, (state, action) => {
        const cartItemId = action.meta.arg.cartItemId;
        state.operationLoading[`remove-${cartItemId}`] = false;
        state.error = action.payload as string;
      })
      .addCase(clearCartAsync.pending, (state) => {
        state.operationLoading['clear-cart'] = true;
        state.error = null;
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.items = [];
        state.summary = null;
        state.operationLoading['clear-cart'] = false;
        // Clear localStorage
        clearLocalCart();
      })
      .addCase(clearCartAsync.rejected, (state, action) => {
        state.operationLoading['clear-cart'] = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearCart,
  addToLocalCartAction,
  updateLocalCartAction,
  removeFromLocalCartAction,
  loadCartFromLocalStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
