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
        const { books } = data;
        setBooks(books);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        throw new Error(err);
      });
  }, [books.length]);
  return (
    <section className='book-category'>
      <div className='container-fluid-lg lg:!p-0 lg:!pl-4'>
        <div className='title'>
          <h2>Popular books this year</h2>
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
