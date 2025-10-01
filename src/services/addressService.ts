import { ADDRESSES_LIST, ADDRESSES_ADD, ADDRESSES_UPDATE, ADDRESSES_DELETE } from './API';

export interface ApiAddress {
  id: number;
  label: string;
  name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
  full_name: string;
  full_address: string;
  type: string;
  address_line_1: string;
  address_line_2?: string;
  first_name: string;
  last_name: string;
}

export interface AddressListResponse {
  status: string;
  message: string;
  data: {
    addresses: ApiAddress[];
    total_addresses: number;
    default_address: ApiAddress | null;
  };
}

export interface AddAddressRequest {
  type: string;
  is_default?: boolean;
  first_name: string;
  last_name: string;
  company?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
}

export interface UpdateAddressRequest extends Partial<AddAddressRequest> {
  // All fields are optional for update
}

export const addressService = {
  // Get all addresses for the authenticated user
  getAddresses: async (): Promise<AddressListResponse> => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(ADDRESSES_LIST, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch addresses');
    }

    return response.json();
  },

  // Add a new address
  addAddress: async (addressData: AddAddressRequest): Promise<any> => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(ADDRESSES_ADD, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add address');
    }

    return response.json();
  },

  // Update an existing address
  updateAddress: async (addressId: number, addressData: UpdateAddressRequest): Promise<any> => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${ADDRESSES_UPDATE}?id=${addressId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update address');
    }

    return response.json();
  },

  // Delete an address
  deleteAddress: async (addressId: number): Promise<any> => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${ADDRESSES_DELETE}?id=${addressId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete address');
    }

    return response.json();
  },
};

// Helper function to convert API address format to local Address format
export const convertApiAddressToLocal = (apiAddress: ApiAddress) => {
  return {
    id: apiAddress.id.toString(),
    firstName: apiAddress.first_name,
    lastName: apiAddress.last_name,
    addressLine1: apiAddress.address_line_1,
    addressLine2: apiAddress.address_line_2 || '',
    city: apiAddress.city,
    state: apiAddress.state,
    postalCode: apiAddress.postal_code,
    phone: apiAddress.phone,
    country: apiAddress.country,
    isDefault: apiAddress.is_default,
  };
};

// Helper function to convert local Address format to API format
export const convertLocalAddressToApi = (
  localAddress: any,
  type: string = 'shipping'
): AddAddressRequest => {
  return {
    type: type,
    is_default: localAddress.isDefault || false,
    first_name: localAddress.firstName,
    last_name: localAddress.lastName,
    address_line_1: localAddress.addressLine1,
    address_line_2: localAddress.addressLine2 || '',
    city: localAddress.city,
    state: localAddress.state,
    postal_code: localAddress.postalCode,
    country: localAddress.country,
    phone: localAddress.phone,
  };
};
