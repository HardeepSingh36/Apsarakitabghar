import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '@/types/types';

interface CartState {
  items: CartItem[];
  buyNowItem?: CartItem | null;
}

const initialState: CartState = {
  items: [],
  buyNowItem: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = existingItem.discounted_price * existingItem.quantity;
        existingItem.saving = existingItem.price * existingItem.quantity - existingItem.total;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
          total: action.payload.discounted_price * (action.payload.quantity || 1),
          saving:
            (action.payload.price - action.payload.discounted_price) *
            (action.payload.quantity || 1),
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload);

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];

        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.total = existingItem.discounted_price * existingItem.quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setBuyNowItem: (state, action: PayloadAction<CartItem>) => {
      state.buyNowItem = action.payload;
    },
    clearBuyNowItem: (state) => {
      state.buyNowItem = null;
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart, setBuyNowItem, clearBuyNowItem } = cartSlice.actions;

export default cartSlice.reducer;
