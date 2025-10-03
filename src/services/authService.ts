import { AUTH_LOGIN, AUTH_ME, AUTH_REGISTER, AUTH_FORGOT_PASSWORD } from './API';
import type { 
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ForgotPasswordErrorResponse
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
