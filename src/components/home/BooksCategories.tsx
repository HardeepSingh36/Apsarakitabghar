import { BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BOOKS_CATEGORIES } from '@/services/API';
import type { Category } from '@/types/types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'; // Importing Skeleton component

const BooksCategories = () => {
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // loading state

  const getBooks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(BOOKS_CATEGORIES);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const { data } = await res.json();
      setCategories(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <section className='book-category'>
      <div className='container-fluid-lg'>
        <div className='title'>
          <h2 className='!text-center'>Explore Categories</h2>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 justify-center '>
              {isLoading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={index}
                      className='flex items-center flex-col text-center !text-black'
                    >
                      <Skeleton circle={false} width={48} height={48} className='mb-2 custom-skeleton' />
                      <Skeleton width={120} height={16} className='custom-skeleton' />
                    </div>
                  ))
                : categories.map((category, index) => (
                    <Link
                      key={index}
                      to={`/books`}
                      className='flex items-center flex-col text-center !text-black hover:!text-gray-700 hover:scale-105'
                    >
                      <BookOpen className='hover:!text-gray-700' />
                      <p className='category-title !text-[clamp(0.985rem,2vw,1rem)]'>
                        {category.name}
                      </p>
                    </Link>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BooksCategories;
