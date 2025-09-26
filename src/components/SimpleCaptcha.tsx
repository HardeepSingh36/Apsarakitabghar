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
  ({ width = 150, height = 50, fontSize = 24, onChange, captchaBgColor = '#f5f5f5' }, ref) => {
    const [captcha, setCaptcha] = useState('');
    const [input, setInput] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    // Generate random captcha code
    const generateCaptcha = () => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let code = '';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setCaptcha(code);
      setInput('');
      onChange?.(false);
      createCaptchaImage(code);
    };

    // Draw CAPTCHA on canvas and convert to image
    const createCaptchaImage = (code: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background
      ctx.fillStyle = captchaBgColor;
      ctx.fillRect(0, 0, width, height);

      // Add random lines for obfuscation
      for (let i = 0; i < 6; i++) {
        ctx.strokeStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        })`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * width, Math.random() * height);
        ctx.lineTo(Math.random() * width, Math.random() * height);
        ctx.stroke();
      }

      // Draw CAPTCHA text
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = 'black';
      ctx.textBaseline = 'middle';
      const textWidth = ctx.measureText(code).width;
      ctx.fillText(code, (width - textWidth) / 2, height / 2);

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL('image/png');
      setImageSrc(dataUrl);
    };

    useImperativeHandle(ref, () => ({ generateCaptcha }));

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
          <img src={imageSrc} alt='captcha' style={{ width, height }} />
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
