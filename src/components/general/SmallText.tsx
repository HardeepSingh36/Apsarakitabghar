import React from 'react';

interface SmallTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const SmallText: React.FC<SmallTextProps> = ({ children, className = '', style }) => {
  return (
    <p className={`text-sm text-gray-600 ${className}`} style={style}>
      {children}
    </p>
  );
};

export default SmallText;
