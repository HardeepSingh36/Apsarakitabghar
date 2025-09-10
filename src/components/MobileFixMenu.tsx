import React from 'react';

const MobileFixMenu = () => {
  return (
    <div className='mobile-menu d-md-none d-block mobile-cart'>
      <ul>
        <li className='active'>
          <a href='index.html'>
            <i className='iconly-Home icli'></i>
            <span>Home</span>
          </a>
        </li>

        <li className='mobile-category'>
          <a href='javascript:void(0)'>
            <i className='iconly-Category icli js-link'></i>
            <span>Category</span>
          </a>
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
  );
};

export default MobileFixMenu;
