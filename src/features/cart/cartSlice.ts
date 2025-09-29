import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { CartItem } from '@/types/types';
import { addToCart as addToCartAPI, getCartList, updateCartItem, removeCartItem, clearCartAPI } from '@/services/cartService';

interface CartState {
  items: CartItem[];
  summary: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  summary: null,
  loading: false,
  error: null,
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
  async ({ cartItemId, quantity }: { cartItemId: number; quantity: number }, { rejectWithValue }) => {
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

export const clearCartAsync = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('Authentication token is missing');

      const response = await clearCartAPI(token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to clear cart');
    }
  }
);

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
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const data = action.payload;
        if (data) {
          const existingItem = state.items.find((item) => item.book_id === data.book_id);

          if (existingItem) {
            existingItem.quantity = data.quantity;
            existingItem.line_total = data.line_total;
          } else {
            state.items.push({
              cart_id: data.cart_id,
              book_id: data.book_id,
              title: data.title,
              slug: data.slug,
              price: data.price,
              discount_percent: data.discount_percent,
              discounted_price: data.discounted_price,
              quantity: data.quantity,
              line_total: data.line_total,
              stock_quantity: data.stock_quantity,
              cover_image_name: data.cover_image_name,
            });
          }
        }

        state.loading = false;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
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
      .addCase(updateCartItemAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        const { cartItemId, quantity } = action.payload;
        const existingItem = state.items.find((item) => item.cart_item_id === cartItemId);
        if (existingItem) {
          existingItem.quantity = quantity;
          existingItem.line_total = existingItem.discounted_price * quantity;
        }
        state.loading = false;
      })
      .addCase(updateCartItemAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeCartItemAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItemAsync.fulfilled, (state, action) => {
        const { cartItemId } = action.payload;
        state.items = state.items.filter((item) => item.cart_item_id !== cartItemId);
        state.loading = false;
      })
      .addCase(removeCartItemAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(clearCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.items = [];
        state.summary = null;
        state.loading = false;
      })
      .addCase(clearCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
