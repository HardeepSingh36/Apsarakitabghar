import { useEffect, useState } from 'react';
import { booksByFlagsService, type BookFlag } from '@/services/booksByFlagsService';
import AddProductBox from '../general/AddProductBox';
import ProductCardSkeleton from '../ProductSkeleton';
import { ChevronRight } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';

const PopularBooksByYear = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookFlag[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPopularBooks = async () => {
    setIsLoading(true);
    try {
      const response = await booksByFlagsService.getPopularBooks({ limit: 8 });
      if (response.status === 'success' && response.data.books) {
        setBooks(response.data.books);
      }
    } catch (err) {
      console.error('Error fetching popular books:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToPopularBooks = () => {
    const params = new URLSearchParams();
    params.append('is_popular', '1');
    navigate(`/books?${params.toString()}`);
  };

  useEffect(() => {
    fetchPopularBooks();
  }, []);
  return (
    <section className='book-category'>
      <div className='container-fluid-lg lg:!p-0 lg:!px-4'>
        <div className='flex justify-between items-center mb-8'>
          <div className='title !mb-0'>
            <h2>Popular books this year</h2>
          </div>

          {books.length > 0 && !isLoading && (
            <Link
              to='#'
              onClick={(e) => {
                e.preventDefault();
                navigateToPopularBooks();
              }}
              className='!text-base font-public-sans !font-semibold !text-[#fc2403] hover:!text-[#fc6603] flex items-center gap-1 !transition-all !duration-200'
            >
              View All
              <ChevronRight size={18} />
            </Link>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 items-stretch'>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
          ) : books.length > 0 ? (
            books.map((book) => <AddProductBox key={book.id} idx={book.id} product={book} />)
          ) : (
            <p className='text-center col-span-full'>No books found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularBooksByYear;
