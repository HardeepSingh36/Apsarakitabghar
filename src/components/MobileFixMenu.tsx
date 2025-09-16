import { useState } from 'react';
import AllCategories from './AllCategories';
import { Link } from 'react-router-dom';

const MobileFixMenu = () => {
  const [showCategories, setShowCategories] = useState(false);
  return (
    <>
      <div className='mobile-menu d-md-none d-block mobile-cart'>
        <ul>
          <li className='active'>
            <Link to='/'>
              <i className='iconly-Home icli'></i>
              <span>Home</span>
            </Link>
          </li>

          <li className='mobile-category'>
            <button className='text-white flex items-center flex-col gap-1.5 justify-center mx-auto' onClick={() => setShowCategories(true)}>
              <i className='iconly-Category icli js-link text-xl'></i>
              <span>Category</span>
            </button>
          </li>

          <li>
            <a href='search.html' className='search-box'>
              <i className='iconly-Search icli'></i>
              <span>Search</span>
            </a>
          </li>

          <li>
            <a href='wishlist.html' className='notifi-wishlist'>
              <i className='iconly-Heart icli'></i>
              <span>My Wish</span>
            </a>
          </li>

          <li>
            <a href='cart.html'>
              <i className='iconly-Bag-2 icli fly-cate'></i>
              <span>Cart</span>
            </a>
          </li>
        </ul>
      </div>
      <AllCategories show={showCategories} setShow={setShowCategories} />
    </>
  );
};

export default MobileFixMenu;
