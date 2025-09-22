import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'customer' | 'publisher' | 'reseller';

export interface Address {
  id: string;
  type: 'billing' | 'shipping';
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
}

const initialState: UserState = {
  profile: null,
  addresses: [],
  selectedAddressId: null,
};

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
  },
});

export const {
  setProfile,
  updateProfile,
  addAddress,
  updateAddress,
  removeAddress,
  setSelectedAddress,
} = userSlice.actions;

export default userSlice.reducer;
export type { UserState };
