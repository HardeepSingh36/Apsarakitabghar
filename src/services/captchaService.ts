import type { CaptchaConfig } from '@/types/types';
import { CAPTCHA_CONFIG, CAPTCHA_VERIFY } from './API';

interface CaptchaConfigResponse {
  status: string;
  message: string;
  data: CaptchaConfig;
}

export const getCaptchaConfig = async (): Promise<CaptchaConfig> => {
  const response = await fetch(`${CAPTCHA_CONFIG}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch CAPTCHA configuration');
  }

  const { data }: CaptchaConfigResponse = await response.json();
  return data;
};

export const verifyCaptcha = async (token: string) => {
  const response = await fetch(`${CAPTCHA_VERIFY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ captcha_token: token }),
  });

  const data = await response.json();
  if (!response.ok || data.status !== 'success') {
    throw new Error(data.message || 'CAPTCHA verification failed');
  }

  return data.data;
};
