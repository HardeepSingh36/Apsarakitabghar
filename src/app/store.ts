import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '@/features/books/booksSlice';
import cartReducer from '@/features/cart/cartSlice';
import wishlistReducer from '@/features/wishlist/wishlistSlice';
import authReducer from '@/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
