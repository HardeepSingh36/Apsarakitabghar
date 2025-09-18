import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '@/types/types';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = existingItem.price * existingItem.quantity;
        existingItem.saving = existingItem.oldPrice * existingItem.quantity - existingItem.total;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
          total: action.payload.price * (action.payload.quantity || 1),
          saving: (action.payload.oldPrice - action.payload.price) * (action.payload.quantity || 1),
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
          existingItem.total = existingItem.price * existingItem.quantity;
        } else {
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
