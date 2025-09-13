import React, { createContext, useContext, useState, useMemo } from 'react';

type Currency = 'INR' | 'USD' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
}

// Create context
const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Provider
export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('INR');

  // Simple conversion rates (you can fetch from API in real-world apps)
  const conversionRates: Record<Currency, number> = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
  };

  // Memoized formatter
  const formatPrice = (price: number): string => {
    const converted = price * conversionRates[currency];
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
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
