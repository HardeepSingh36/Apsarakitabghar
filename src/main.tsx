import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { CurrencyProvider } from './context/CurrencyContext.tsx';
import { BrowserRouter } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-tooltip/dist/react-tooltip.css';
import { store } from '@/app/store';
import { Provider } from 'react-redux';
import { setUser, finishLoading } from '@/features/auth/authSlice';
import 'react-loading-skeleton/dist/skeleton.css';
import '/public/assets/css/custom-shimmer.css';

// Initialize auth before rendering the app
const raw = localStorage.getItem('auth_user');
if (raw) {
  store.dispatch(setUser(JSON.parse(raw)));
}
store.dispatch(finishLoading());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <CurrencyProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CurrencyProvider>
    </Provider>
  </StrictMode>
);
