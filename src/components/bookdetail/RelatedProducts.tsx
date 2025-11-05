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
  centerPadding: '0px',
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: false,
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
    <div className='px-4'>
      <div className='title'>
        <h2>Related Products</h2>
        <span className='title-leaf'>
          <svg className='icon-width'>
            <use xlinkHref='/assets/svg/leaf.svg#leaf'></use>
          </svg>
        </span>
      </div>
      <div className='row'>
        <div className='col-12'>
          <div className='product-wrapper'>
            {isLoading ? (
              <div className='flex justify-center items-center py-8'>
                <div className='animate-spin h-8 w-8 border-2 border-current border-t-transparent rounded-full'></div>
                <span className='ml-2'>Loading related books...</span>
              </div>
            ) : (
              <Slider {...sliderSettings}>
                {relatedBooks.map((product, idx) => (
                  <AddProductBox
                    key={product.id}
                    product={product}
                    idx={idx}
                    showOptions={true}
                    showAddToCart={true}
                    className='flex-col items-center'
                  />
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
