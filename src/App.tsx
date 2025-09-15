import { useEffect } from 'react';
import feather from 'feather-icons';
import Header from './components/Header';
import MobileFixMenu from './components/MobileFixMenu';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import BookDetail from './pages/BookDetail';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import WishList from './pages/WishList';
import Checkout from './pages/Checkout';
import { defineElement } from 'lord-icon-element';
import Lottie from 'lottie-web';

// define once globally
defineElement(Lottie.loadAnimation);

const App = () => {
  useEffect(() => {
    feather.replace();
  }, []);
  return (
    <>
      <Header />
      <MobileFixMenu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books/:id' element={<BookDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
