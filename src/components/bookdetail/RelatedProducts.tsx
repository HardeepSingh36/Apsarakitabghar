import Slider from 'react-slick';
import AddProductBox from '../general/AddProductBox';
import { useEffect, useState } from 'react';
import type { Book } from '@/types/types';
import { getRelatedBooks } from '@/services/bookService';
import toast from 'react-hot-toast';

interface RelatedProductsProps {
  bookId?: string | number;
}

const getSlidesToShow = (width: number) => {
  if (width < 600) return 2;
  if (width < 1000) return 3;
  if (width < 1200) return 4;
  return 5;
};

const baseSliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
};

const RelatedProducts = ({ bookId }: RelatedProductsProps) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sliderSettings, setSliderSettings] = useState<any>({
    ...baseSliderSettings,
    slidesToShow: getSlidesToShow(windowWidth),
    centerMode: false,
    centerPadding: '0px',
    infinite: false,
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // recompute slider settings when windowWidth or relatedBooks change
  useEffect(() => {
    const defaultSlides = getSlidesToShow(windowWidth);

    const slidesToShow = defaultSlides;

    // Center only when there are MORE items than default visible slots (i.e., meaningful to center)
    const shouldCenter = relatedBooks.length > defaultSlides;

    setSliderSettings({
      ...baseSliderSettings,
      slidesToShow,
      centerMode: shouldCenter,
      centerPadding: shouldCenter ? '40px' : '0px',
      // only infinite when we have enough items to loop nicely
      infinite: shouldCenter,
    });
  }, [windowWidth, relatedBooks]);

  // Don't render if no bookId provided
  if (!bookId) {
    return null;
  }

  // Don't render if no related books found and not loading
  if (!isLoading && relatedBooks.length === 0) {
    return null;
  }

  return (
    <div className='container-fluid-lg'>
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
          <div className='slider-6_1 product-wrapper'>
            {isLoading ? (
              <div className='flex justify-center items-center py-8'>
                <div className='animate-spin h-8 w-8 border-2 border-current border-t-transparent rounded-full'></div>
                <span className='ml-2'>Loading related books...</span>
              </div>
            ) : (
              <Slider key={windowWidth} {...sliderSettings}>
                {relatedBooks.map((product, idx) => (
                  <AddProductBox
                    key={product.id}
                    product={product}
                    idx={idx}
                    showOptions={true}
                    showAddToCart={true}
                    className='!bg-secondary p-2 !block'
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
