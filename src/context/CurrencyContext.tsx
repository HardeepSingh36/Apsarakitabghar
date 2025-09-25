import React, { createContext, useContext, useState, useMemo } from 'react';

type Currency = { code: 'INR' | 'USD' | 'EUR'; sign: '₹' | '$' | '€' };

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
}

// Create context
const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Provider
export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>({ code: 'INR', sign: '₹' });

  // Simple conversion rates (you can fetch from API in real-world apps)
  const conversionRates: Record<Currency['code'], number> = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
  };

  // Memoized formatter
  const formatPrice = (price: number): string => {
    const converted = price * conversionRates[currency.code];
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
    }).format(converted);
  };

  const value = useMemo(() => ({ currency, setCurrency, formatPrice }), [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

// Hook
export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
