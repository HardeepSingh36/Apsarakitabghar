import React from 'react';
import Skeleton from 'react-loading-skeleton';


interface Props {
  className?: string;
}

const ProductCardSkeleton: React.FC<Props> = ({ className = '' }) => {
  return (
    <div
      className={`flex gap-2 md:gap-0 md:flex-col items-center book-product-box md:p-3 md:bg-gray-50 ${className}`}
    >
      {/* Product Image */}
      <div className='product-header h-24 w-28 md:!h-60 md:w-full custom-skeleton'>
        <div className='product-image p-0 md:!mb-0'>
          <Skeleton className='md:!h-60 ' duration={0.8} />
        </div>
      </div>

      {/* Product Footer */}
      <div className='product-footer w-full mt-3 md:mt-4'>
        <div className='product-detail position-relative'>
          {/* Title */}
          <h6 className='weight mb-2 custom-skeleton max-w-30'>
            <Skeleton width='70%' height={20} duration={0.8} />
          </h6>

          {/* Description */}
          <h5 className='name mb-2 custom-skeleton'>
            <Skeleton count={2} width='100%' height={18} duration={0.8} />
          </h5>

          {/* Author */}
          <h6 className='byers text-muted mb-2 custom-skeleton max-w-30'>
            <Skeleton width='50%' height={16} duration={0.8} />
          </h6>

          {/* Add to Cart Button */}
          <div className='add-to-cart-box custom-skeleton hidden md:block mt-2'>
            <Skeleton
              width='100%'
              height={40}
              baseColor='#e2e2e2'
              highlightColor='#f5f5f5'
              duration={0.8}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
