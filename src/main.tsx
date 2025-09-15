import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { CurrencyProvider } from './context/CurrencyContext.tsx';
import { BrowserRouter } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-tooltip/dist/react-tooltip.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrencyProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CurrencyProvider>
  </StrictMode>
);
