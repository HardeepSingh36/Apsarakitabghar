import { useEffect, useState } from 'react';
import type { Book } from '@/types/types';
import { getBooks } from '@/services/bookService';
import AddProductBox from '../general/AddProductBox';
import ProductCardSkeleton from '../ProductSkeleton';

const PopularBooksByYear = () => {
  const [books, setBooks] = useState<Book[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // loading state

  useEffect(() => {
    setIsLoading(true);
    getBooks({ page: 1, limit: 20 })
      .then(({ data }) => {
        setBooks(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        throw new Error(err);
      });
  }, []);
  return (
    <section className='book-category'>
      <div className='container-fluid-lg'>
        <div className='title'>
          <h2>Popular books this year</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-4'>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
          ) : books.length === 0 ? (
            <p className='text-center col-span-full'>No books found.</p>
          ) : books && books.length > 0 ? (
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
