import { useAppSelector } from '@/app/hooks';
import type { RootState } from '@/app/store';
import AddProductBox from '@/components/general/AddProductBox';
import Breadcrumb from '@/components/ui/Breadcrumb';

const WishList = () => {
  const wishlistItems = useAppSelector((state: RootState) => state.wishlist.items);
  return (
    <div>
      <Breadcrumb
        title='Wishlist'
        items={[{ label: '', href: '/', iconClass: 'fa-solid fa-house' }, { label: 'Wishlist' }]}
      />

      {/* Wishlist Section Start */}
      <section className='wishlist-section section-b-space'>
        <div className='container-fluid-lg'>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
            {wishlistItems.length > 0 ? (
              wishlistItems.map((item) => (
                <div key={item.id}>
                  <div className='wishlist-box'>
                    <AddProductBox
                      key={item.id}
                      product={item} // Pass item directly as it matches Book type
                      idx={item.id}
                      removeButton={true}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className='col-span-full text-center'>No items in wishlist</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WishList;
