import React, { useState } from 'react';
import ReCAPTCHA, { type ReCAPTCHAProps } from 'react-google-recaptcha';
import type { CaptchaConfig } from '@/types/types';

interface CaptchaProps {
  config: CaptchaConfig | null;
  onVerify: (token: string | null) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ config, onVerify }) => {
  const [_valid, setValid] = useState(false);

  if (!config) return null;

  // Extract literal union types directly
  type Theme = ReCAPTCHAProps['theme'];
  type Size = ReCAPTCHAProps['size'];

  const theme: Theme = config.theme === 'dark' ? 'dark' : 'light'; // fallback
  const size: Size =
    config.size === 'compact' || config.size === 'invisible' ? config.size : 'normal';

  return (
    <ReCAPTCHA
      sitekey={config.site_key}
      theme={theme}
      size={size}
      onChange={(token) => {
        if (token) {
          setValid(true);
          localStorage.setItem('captcha_token', token);
          onVerify(token);
        } else {
          setValid(false);
          localStorage.removeItem('captcha_token');
          onVerify(null);
        }
      }}
      onExpired={() => {
        setValid(false);
        localStorage.removeItem('captcha_token');
        onVerify(null);
      }}
      onErrored={() => {
        setValid(false);
        localStorage.removeItem('captcha_token');
        onVerify(null);
      }}
    />
  );
};

export default Captcha;
