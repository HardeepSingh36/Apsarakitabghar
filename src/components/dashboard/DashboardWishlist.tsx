import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import AddProductBox from '@/components/general/AddProductBox';

const DashboardWishlist = () => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  return (
    <div className='dashboard-wishlist'>
      <div className='title'>
        <h2>My Wishlist History</h2>
        <span className='title-leaf title-leaf-gray'>
          <svg className='icon-width bg-gray'>
            <use xlinkHref='assets/svg/leaf.svg#leaf'></use>
          </svg>
        </span>
      </div>
      <div className='row g-sm-4 g-3'>
        {wishlistItems.length === 0 ? (
          <p className='text-center'>Your wishlist is empty.</p>
        ) : (
          wishlistItems.map((item, idx) => (
            <div key={item.id} className='col-xxl-3 col-lg-6 col-md-4 col-sm-6'>
              <AddProductBox product={item} idx={idx} removeButton={true} className='!bg-white' />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardWishlist;
