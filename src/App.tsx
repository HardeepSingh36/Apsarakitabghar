import './assets/style.css';
import './assets/css/bulk-style.css';
import './assets/css/animate.min.css';
import './assets/css/vendors/vendor.css';
import './assets/css/vendors/animate.css';
import './assets/css/vendors/bootstrap.css';

import { useEffect } from 'react';
import feather from 'feather-icons';
import Header from './components/Header';
import MobileFixMenu from './components/MobileFixMenu';
import HomeSection from './components/HomeSection';

const App = () => {
  useEffect(() => {
    feather.replace();
  }, []);
  return (
    <>
      <Header />
      <MobileFixMenu />
      <HomeSection/> 
    </>
  );
};

export default App;
