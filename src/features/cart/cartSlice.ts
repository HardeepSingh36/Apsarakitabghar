import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { CartItem } from '@/types/types';
import {
  addToCart as addToCartAPI,
  getCartList,
  updateCartItem,
  removeCartItem,
  clearCartAPI,
} from '@/services/cartService';

interface CartState {
  items: CartItem[];
  summary: any | null;
  loading: boolean;
  error: string | null;
  operationLoading: { [key: string]: boolean }; // For individual operations
}

const initialState: CartState = {
  items: [],
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
          const newCartItem: CartItem = {
            cart_item_id: payload.cart_item_id,
            cart_id: payload.cart_id,
            book_id: payload.book_id,
            quantity: payload.quantity,
            price_at_add: payload.price_at_add,
            added_at: new Date().toISOString(), // API doesn't return this, so use current time
            cart_subtotal: payload.line_total.toString(), // Use line_total as subtotal
            cart_discount: '0', // Will be updated when cart list is fetched
            cart_total: payload.line_total.toString(), // Use line_total as total
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
            const newLineTotal = item.price_at_add * newQuantity;

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
      })
      .addCase(clearCartAsync.rejected, (state, action) => {
        state.operationLoading['clear-cart'] = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
