import { useEffect } from 'react';
import feather from 'feather-icons';
import Header from './components/Header';
import MobileFixMenu from './components/MobileFixMenu';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
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

// define once globally
defineElement(Lottie.loadAnimation);

const App = () => {
  useEffect(() => {
    feather.replace();
  }, []);
  return (
    <AuthDialogProvider>
      <Header />
      <MobileFixMenu />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books/:id' element={<BookDetail />} />
        <Route path='/books' element={<BooksPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/query-form' element={<QueryForm />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/term-conditions' element={<TermConditions />} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
      <Footer />
    </AuthDialogProvider>
  );
};

export default App;
