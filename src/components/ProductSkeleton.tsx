import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
  className?: string;
}

const ProductCardSkeleton: React.FC<Props> = ({ className = '' }) => {
  return (
    <div
      className={`flex gap-2 md:gap-0 md:flex-col items-center book-product-box md:p-3 md:bg-gray-50 ${className}`}
    >
      {/* Product Image */}
      <div className='product-header w-full'>
        <div className='product-image p-0 md:!mb-0 w-full'>
          <Skeleton
            height={112}
            className='w-full md:!h-72'
            baseColor='#e2e2e2'
            highlightColor='#f5f5f5'
          />
        </div>
      </div>

      {/* Product Footer */}
      <div className='product-footer w-full mt-3 md:mt-4'>
        <div className='product-detail position-relative'>
          {/* Title */}
          <h6 className='weight mb-2'>
            <Skeleton width='70%' height={20} baseColor='#e2e2e2' highlightColor='#f5f5f5' />
          </h6>

          {/* Description */}
          <h5 className='name mb-2'>
            <Skeleton
              count={2}
              width='100%'
              height={18}
              baseColor='#e2e2e2'
              highlightColor='#f5f5f5'
            />
          </h5>

          {/* Author */}
          <h6 className='byers text-muted mb-2'>
            <Skeleton width='50%' height={16} baseColor='#e2e2e2' highlightColor='#f5f5f5' />
          </h6>

          {/* Price */}
          <h6 className='price mb-2'>
            <Skeleton width='30%' height={20} inline baseColor='#e2e2e2' highlightColor='#f5f5f5' />{' '}
            <Skeleton
              width='20%'
              height={20}
              className='ml-2'
              inline
              baseColor='#e2e2e2'
              highlightColor='#f5f5f5'
            />
          </h6>

          {/* Add to Cart Button */}
          <div className='add-to-cart-box bg-white hidden md:block mt-2'>
            <Skeleton width='100%' height={40} baseColor='#e2e2e2' highlightColor='#f5f5f5' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
