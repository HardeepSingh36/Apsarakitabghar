import { RESET_PASSWORD } from './API';

export async function resetPasswordApi({ token, new_password, confirm_password }: { token: string; new_password: string; confirm_password: string }) {
  const res = await fetch(RESET_PASSWORD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, new_password, confirm_password }),
  });
  const data = await res.json();
  if (!res.ok || data.status !== 'success') {
    throw new Error(data.message || 'Failed to reset password');
  }
  return data;
}
