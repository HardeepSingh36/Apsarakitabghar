// src/components/SimpleCaptcha.tsx
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { RefreshCw } from 'react-feather';

type SimpleCaptchaProps = {
  width?: number;
  height?: number;
  fontSize?: number;
  captchaBgColor?: string;
  onChange?: (isValid: boolean) => void;
};

export const SimpleCaptcha = forwardRef<{ generateCaptcha: () => void }, SimpleCaptchaProps>(
  ({ width = 150, height = 50, fontSize = 24, onChange, captchaBgColor = 'bg-stone-100' }, ref) => {
    const [captcha, setCaptcha] = useState('');
    const [input, setInput] = useState('');

    // Generate random captcha
    const generateCaptcha = () => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let code = '';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setCaptcha(code);
      setInput('');
      onChange?.(false);
    };

    useImperativeHandle(ref, () => ({
      generateCaptcha,
    }));

    useEffect(() => {
      generateCaptcha();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.toUpperCase();
      setInput(val);
      onChange?.(val === captcha);
    };

    return (
      <div className='flex flex-col gap-3 mb-2'>
        <div className='flex gap-4 items-center'>
          <div
            className={`flex justify-center items-center font-mon ${captchaBgColor} select-none`}
            style={{
              width,
              height,
              fontSize,
              letterSpacing: 3,
            }}
            title='Captcha'
          >
            {captcha}
          </div>
          <button onClick={generateCaptcha} title='Refresh Captcha'>
            <RefreshCw size={24} />
          </button>
        </div>
        <input
          type='text'
          placeholder='Enter captcha'
          value={input}
          onChange={handleChange}
          className='form-control'
        />
      </div>
    );
  }
);

SimpleCaptcha.displayName = 'SimpleCaptcha';
