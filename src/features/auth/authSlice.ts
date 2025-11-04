// src/features/auth/authSlice.ts
import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { syncCartWithServer } from '@/services/localStorageCartService';
import { syncWishlistWithServer } from '@/services/localStorageWishlistService';

export type UserRole = 'customer' | 'publisher' | 'reseller';

export type User = {
  id?: number;
  username: string;
  email: string;
  full_name: string;
  first_name: string; // Added first name
  last_name: string; // Added last name
  phone_number: string;
  mobile?: string;
  dob?: string;
  gender?: string;
  avatar?: string;
  role: UserRole;
  status?: string;
  created_at?: string; // Added created_at
  updated_at?: string;
  last_login?: string;
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

// Async thunk to sync cart after login
export const syncCartAfterLogin = createAsyncThunk(
  'auth/syncCartAfterLogin',
  async (token: string, { rejectWithValue }) => {
    try {
      await syncCartWithServer(token);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to sync cart');
    }
  }
);

// Async thunk to sync wishlist after login
export const syncWishlistAfterLogin = createAsyncThunk(
  'auth/syncWishlistAfterLogin',
  async (token: string, { rejectWithValue }) => {
    try {
      await syncWishlistWithServer(token);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to sync wishlist');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth_user');
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('auth_user', JSON.stringify(state.user));
      }
    },
    finishLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setUser, login, logout, updateUser, finishLoading } = authSlice.actions;
export default authSlice.reducer;
