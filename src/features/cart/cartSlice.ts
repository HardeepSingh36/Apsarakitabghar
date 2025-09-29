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
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state) => {
        // After adding to cart, we should refetch the cart list
        // to get the updated cart with all necessary fields
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
      .addCase(updateCartItemAsync.fulfilled, (state) => {
        // After updating cart item, we should refetch the cart list
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
      .addCase(removeCartItemAsync.fulfilled, (state) => {
        // After removing cart item, we should refetch the cart list
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
