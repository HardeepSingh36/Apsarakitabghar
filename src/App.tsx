import { useEffect } from 'react';
import feather from 'feather-icons';
import Header from './components/Header';
import MobileFixMenu from './components/MobileFixMenu';
import Home from './pages/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import BooksPage from './pages/BooksPage';
import BookDetail from './pages/BookDetail';
import Footer from './components/Footer';
import { AuthDialogProvider } from './context/AuthDialogContext';
import Cart from './pages/Cart';
import WishList from './pages/WishList';
import Checkout from './pages/Checkout';
import { defineElement } from 'lord-icon-element';
import Lottie from 'lottie-web';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/dashboard';
import QueryForm from './pages/QueryForm';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermConditions from './pages/TermConditions';
import ScrollToTop from './components/scrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import PublishBook from './pages/PublishBook';

// define once globally
defineElement(Lottie.loadAnimation);

const App = () => {
  const location = useLocation();

  useEffect(() => {
    feather.replace();
  }, []);
  return (
    <AuthDialogProvider>
      {/* Conditionally render Header */}
      {location.pathname !== '/dashboard' &&
      location.pathname !== '/signin' &&
      location.pathname !== '/signup' &&
      location.pathname !== '/forgot-password' &&
      location.pathname !== '/publish-book' ? (
        <Header />
      ) : null}
      <MobileFixMenu />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/publish-book' element={<PublishBook />} />
        <Route path='/books/:id' element={<BookDetail />} />
        <Route path='/books' element={<BooksPage />} />
        {/* Protected routes */}
        <Route
          path='/cart'
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path='/checkout'
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path='/wishlist'
          element={
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path='/about' element={<About />} />
        <Route path='/contact-us' element={<Contact />} />
        <Route path='/query-form' element={<QueryForm />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-conditions' element={<TermConditions />} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
      {location.pathname !== '/dashboard' &&
        location.pathname !== '/signin' &&
        location.pathname !== '/signup' &&
        location.pathname !== '/forgot-password' &&
        location.pathname !== '/publish-book' && <Footer />}
      <Toaster position='top-right' />
    </AuthDialogProvider>
  );
};

export default App;
