import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import {
  addressService,
  convertApiAddressToLocal,
  convertLocalAddressToApi,
} from '@/services/addressService';

export type UserRole = 'customer' | 'publisher' | 'reseller';

export interface Address {
  id: string;
  // type: 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string; // Made optional
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  country: string;
  isDefault?: boolean;
}

export interface Profile {
  username: string;
  email: string;
  full_name: string;
  phone_number: string;
  role: UserRole;
}

interface UserState {
  profile: Profile | null;
  addresses: Address[];
  selectedAddressId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  addresses: [],
  selectedAddressId: null,
  loading: false,
  error: null,
};

// Async thunks for address operations
export const fetchAddresses = createAsyncThunk(
  'user/fetchAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await addressService.getAddresses();
      return response.data.addresses.map(convertApiAddressToLocal);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createAddress = createAsyncThunk(
  'user/createAddress',
  async (addressData: Address, { rejectWithValue }) => {
    try {
      const apiAddressData = convertLocalAddressToApi(addressData);
      await addressService.addAddress(apiAddressData);
      // Fetch updated addresses after creation
      const response = await addressService.getAddresses();
      return response.data.addresses.map(convertApiAddressToLocal);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAddressAsync = createAsyncThunk(
  'user/updateAddress',
  async ({ id, addressData }: { id: string; addressData: Address }, { rejectWithValue }) => {
    try {
      const apiAddressData = convertLocalAddressToApi(addressData);
      await addressService.updateAddress(parseInt(id), apiAddressData);
      // Fetch updated addresses after update
      const response = await addressService.getAddresses();
      return response.data.addresses.map(convertApiAddressToLocal);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAddressAsync = createAsyncThunk(
  'user/deleteAddress',
  async (id: string, { rejectWithValue }) => {
    try {
      await addressService.deleteAddress(parseInt(id));
      // Fetch updated addresses after deletion
      const response = await addressService.getAddresses();
      return response.data.addresses.map(convertApiAddressToLocal);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    // Legacy reducers for backward compatibility
    addAddress: (state, action: PayloadAction<Address>) => {
      const newAddress = { ...action.payload, id: `${Date.now()}` }; // Ensure unique ID
      state.addresses.push(newAddress);
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      state.addresses = state.addresses.map((a) =>
        a.id === action.payload.id ? action.payload : a
      );
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter((a) => a.id !== action.payload);
      if (state.selectedAddressId === action.payload) {
        state.selectedAddressId = null;
      }
    },
    setSelectedAddress: (state, action: PayloadAction<string | null>) => {
      state.selectedAddressId = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
        // Set default address as selected if none is selected
        if (!state.selectedAddressId && action.payload.length > 0) {
          const defaultAddress = action.payload.find((addr) => addr.isDefault);
          if (defaultAddress) {
            state.selectedAddressId = defaultAddress.id;
          }
        }
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create address
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update address
      .addCase(updateAddressAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(updateAddressAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete address
      .addCase(deleteAddressAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
        // Clear selected address if it was deleted
        if (
          state.selectedAddressId &&
          !action.payload.find((addr) => addr.id === state.selectedAddressId)
        ) {
          state.selectedAddressId = null;
        }
      })
      .addCase(deleteAddressAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setProfile,
  updateProfile,
  addAddress,
  updateAddress,
  removeAddress,
  setSelectedAddress,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
export type { UserState };
