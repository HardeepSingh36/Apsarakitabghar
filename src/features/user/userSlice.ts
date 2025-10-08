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
  operationLoading?: Record<string, boolean>;
}

const initialState: UserState = {
  profile: null,
  addresses: [],
  selectedAddressId: null,
  loading: false,
  error: null,
  operationLoading: {},
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

// Set default address (only updates is_default on API)
export const setDefaultAddressAsync = createAsyncThunk(
  'user/setDefaultAddress',
  async (id: string, { rejectWithValue }) => {
    try {
      // API expects is_default boolean; call update endpoint with only that field
      await addressService.updateAddress(parseInt(id), { is_default: true } as any);
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
      // Create address (per-operation loading)
      .addCase(createAddress.pending, (state) => {
        state.error = null;
        if (!state.operationLoading) state.operationLoading = {};
        state.operationLoading['create-address'] = true;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        if (!state.operationLoading) state.operationLoading = {};
        state.operationLoading['create-address'] = false;
        state.addresses = action.payload;
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.error = action.payload as string;
        if (!state.operationLoading) state.operationLoading = {};
        state.operationLoading['create-address'] = false;
      })
      // Update address (per-operation loading)
      .addCase(updateAddressAsync.pending, (state, action) => {
        state.error = null;
        const id = (action.meta.arg as any)?.id;
        if (!state.operationLoading) state.operationLoading = {};
        if (id) state.operationLoading[`update-${id}`] = true;
      })
      .addCase(updateAddressAsync.fulfilled, (state, action) => {
        state.addresses = action.payload;
        const id = (action.meta.arg as any)?.id;
        if (!state.operationLoading) state.operationLoading = {};
        if (id) state.operationLoading[`update-${id}`] = false;
      })
      .addCase(updateAddressAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        const id = (action.meta.arg as any)?.id;
        if (!state.operationLoading) state.operationLoading = {};
        if (id) state.operationLoading[`update-${id}`] = false;
      })
      // Set default address (per-address operation loading)
      .addCase(setDefaultAddressAsync.pending, (state, action) => {
        state.error = null;
        const id = action.meta.arg;
        if (!state.operationLoading) state.operationLoading = {};
        state.operationLoading[`set-default-${id}`] = true;
      })
      .addCase(setDefaultAddressAsync.fulfilled, (state, action) => {
        state.addresses = action.payload;
        // clear per-address loading flags
        if (!state.operationLoading) state.operationLoading = {};
        Object.keys(state.operationLoading).forEach((k) => {
          if (k.startsWith('set-default-')) state.operationLoading![k] = false;
        });
        // Ensure selectedAddressId points to the default address if present
        const defaultAddr = state.addresses.find((a) => a.isDefault);
        if (defaultAddr) state.selectedAddressId = defaultAddr.id;
      })
      .addCase(setDefaultAddressAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        const id = action.meta.arg;
        if (!state.operationLoading) state.operationLoading = {};
        state.operationLoading[`set-default-${id}`] = false;
      })
      // Delete address (per-operation loading)
      .addCase(deleteAddressAsync.pending, (state, action) => {
        state.error = null;
        const id = action.meta.arg;
        if (!state.operationLoading) state.operationLoading = {};
        state.operationLoading[`remove-${id}`] = true;
      })
      .addCase(deleteAddressAsync.fulfilled, (state, action) => {
        state.addresses = action.payload;
        const id = (action.meta.arg as any) || null;
        if (!state.operationLoading) state.operationLoading = {};
        if (id) state.operationLoading[`remove-${id}`] = false;
        // Clear selected address if it was deleted
        if (
          state.selectedAddressId &&
          !action.payload.find((addr) => addr.id === state.selectedAddressId)
        ) {
          state.selectedAddressId = null;
        }
      })
      .addCase(deleteAddressAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        const id = action.meta.arg;
        if (!state.operationLoading) state.operationLoading = {};
        state.operationLoading[`remove-${id}`] = false;
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
