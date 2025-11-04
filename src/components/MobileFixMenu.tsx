import { useState } from 'react';
import AllCategories from './AllCategories';
import { Link } from 'react-router-dom';

const MobileFixMenu = () => {
  const [showCategories, setShowCategories] = useState(false);
  return (
    <>
      <div className='mobile-menu lg:hidden mobile-cart bg-theme-gradient-radial'>
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
            <Link to='/wishlist' className='notifi-wishlist'>
              <i className='iconly-Heart icli'></i>
              <span>My Wish</span>
            </Link>
          </li>

          <li>
            <Link to='/cart'>
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
