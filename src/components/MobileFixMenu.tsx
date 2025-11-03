import { useState } from 'react';
import AllCategories from './AllCategories';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthDialog } from '@/context/AuthDialogContext';

const MobileFixMenu = () => {
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const { openSignIn, isAuthenticated } = useAuthDialog();

  // handle protected routes (Wishlist & Cart)
  const handleProtectedRoute = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      e.preventDefault();
      openSignIn();
    }
  };
  return (
    <>
      <div className='mobile-menu lg:hidden mobile-cart'>
        <ul>
          <li className='active'>
            <Link to='/'>
              <i className='iconly-Home icli'></i>
              <span>Home</span>
            </Link>
          </li>

          <li className='mobile-category'>
            <button
              className='text-white flex items-center flex-col gap-1.5 justify-center mx-auto'
              onClick={() => setShowCategories(true)}
            >
              <i className='iconly-Category icli js-link text-xl'></i>
              <span>Category</span>
            </button>
          </li>

          <li>
            <a href='/books' className='search-box'>
              <i className='iconly-Search icli'></i>
              <span>Search</span>
            </a>
          </li>

          <li>
            <Link
              to='/wishlist'
              className='notifi-wishlist'
              onClick={(e) => handleProtectedRoute(e, '/wishlist')}
            >
              <i className='iconly-Heart icli'></i>
              <span>My Wish</span>
            </Link>
          </li>

          <li>
            <Link to='/cart' onClick={(e) => handleProtectedRoute(e, '/cart')}>
              <i className='iconly-Bag-2 icli fly-cate'></i>
              <span>Cart</span>
            </Link>
          </li>
        </ul>
      </div>
      <AllCategories show={showCategories} setShow={setShowCategories} />
    </>
  );
};

export default MobileFixMenu;
