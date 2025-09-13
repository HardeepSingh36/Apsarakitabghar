import { useEffect } from 'react';
import feather from 'feather-icons';
import Header from './components/Header';
import MobileFixMenu from './components/MobileFixMenu';
import Home from './pages/Home';

const App = () => {
  useEffect(() => {
    feather.replace();
  }, []);
  return (
    <>
      <Header />
      <MobileFixMenu />
      <Home />
    </>
  );
};

export default App;
