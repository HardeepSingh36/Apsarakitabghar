import Slider from 'react-slick';
import AddProductBox from '../general/AddProductBox';
import { useEffect, useState } from 'react';
import type { Book } from '@/types/types';
import { getRelatedBooks } from '@/services/bookService';
import toast from 'react-hot-toast';

interface RelatedProductsProps {
  bookId?: string | number;
}

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  centerMode: false,
  arrows: true,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        arrows: false,
      },
    },
  ],
};

const RelatedProducts = ({ bookId }: RelatedProductsProps) => {
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedBooks = async () => {
      if (!bookId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await getRelatedBooks(bookId, {
          limit: 8,
          include_category: true,
          include_genre: true,
          include_tags: true,
          include_author: false,
        });

        if (response.status === 'success' && response.data?.related_books) {
          setRelatedBooks(response.data.related_books);
        } else {
          setRelatedBooks([]);
        }
      } catch (error) {
        console.error('Failed to fetch related books:', error);
        toast.error('Failed to load related books');
        setRelatedBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedBooks();
  }, [bookId]);

  // Don't render if no bookId provided
  if (!bookId) {
    return null;
  }

  // Don't render if no related books found and not loading
  if (!isLoading && relatedBooks.length === 0) {
    return null;
  }

  return (
    <div className='max-w-screen-2xl mx-auto px-4'>
      {/* Card Container */}
      <div className='bg-white rounded-lg shadow-sm p-6 lg:p-8'>
        {/* Section Header */}
        <div className='flex items-center gap-3 mb-6'>
          <h2 className='text-xl lg:text-2xl font-bold text-gray-900'>Related Products</h2>
          <svg className='w-6 h-6 text-[#fc2403]' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z' />
          </svg>
        </div>

        <div className='slider-3_1 product-wrapper'>
          {/* Loading State */}
          {isLoading ? (
            <div className='flex justify-center items-center py-12'>
              <div className='text-center'>
                <div className='w-10 h-10 border-4 border-[#fc2403] border-t-transparent rounded-full animate-spin mx-auto mb-3'></div>
                <p className='text-gray-600 text-sm font-medium'>Loading related books...</p>
              </div>
            </div>
          ) : (
            // /* Slider */
            <Slider {...sliderSettings}>
              {relatedBooks.map((product, idx) => (
                <div key={product.id} className='px-2'>
                  <AddProductBox
                    product={product}
                    idx={idx}
                    showOptions={true}
                    showAddToCart={true}
                    className='flex-col items-center border !bg-[#fdf6e3]'
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
