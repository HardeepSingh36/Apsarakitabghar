import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '@/features/books/booksSlice';
import cartReducer from '@/features/cart/cartSlice';
import wishlistReducer from '@/features/wishlist/wishlistSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
