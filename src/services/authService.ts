import {
  AUTH_LOGIN,
  AUTH_ME,
  AUTH_REGISTER,
  AUTH_FORGOT_PASSWORD,
  AUTH_CHANGE_PASSWORD,
  AUTH_UPDATE_PROFILE,
  UPDATE_AVATAR,
  UPDATE_PROFILE,
} from './API';
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ForgotPasswordErrorResponse,
} from '../types/types';

export const login = async (email: string, password: string) => {
  const res = await fetch(AUTH_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to login');
  }

  return res.json();
};

export const getProfile = async (token: string) => {
  const res = await fetch(`${AUTH_ME}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch profile');
  }

  return res.json();
};

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  mobile: string;
  captcha_token?: string;
  role?: string;
}) => {
  const res = await fetch(AUTH_REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to register');
  }

  return res.json();
};

export const forgotPassword = async (
  userData: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
  const res = await fetch(AUTH_FORGOT_PASSWORD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const error: ForgotPasswordErrorResponse = await res.json();
    throw new Error(error.message || 'Failed to send reset email');
  }

  return res.json() as Promise<ForgotPasswordResponse>;
};

export const changePassword = async (passwordData: {
  current_password: string;
  new_password: string;
  confirm_password: string;
}) => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const res = await fetch(AUTH_CHANGE_PASSWORD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(passwordData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to change password');
  }

  return res.json();
};


export const updateProfileService = async (profileData: Record<string, any>) => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  const res = await fetch(UPDATE_PROFILE, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });
  const data = await res.json();
  if (!res.ok || data.status !== 'success') {
    throw new Error(data.message || 'Failed to update profile');
  }
  return data;
};

export const uploadAvatar = async (file: File) => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const formData = new FormData();
  formData.append('avatar', file);

  const res = await fetch(UPDATE_AVATAR, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok || data.status !== 'success') {
    throw new Error(data.message || 'Failed to upload avatar');
  }
  return data;
};
