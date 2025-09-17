import ProductCard from '../general/ProductCard';
import { useEffect, useState } from 'react';
import type { Book } from '@/types/types';
import { getBooks } from '@/services/bookService';

const PopularBooksByYear = () => {
  const [books, setBooks] = useState<Book[] | []>([]);

  useEffect(() => {
    getBooks({ page: 1, limit: 20 })
      .then(({ data }) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <section className='book-category'>
      <div className='container-fluid-lg'>
        <div className='title'>
          <h2>Popular books this year</h2>
        </div>

        {books.length === 0 ? (
          <p className='text-center'>No books found.</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-5 xl:grid-cols-6 gap-4'>
            {books.map((book) => (
              <ProductCard key={book.id} item={book} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularBooksByYear;
