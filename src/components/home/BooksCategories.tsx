import { BookOpen } from 'lucide-react';
import Heading2 from '../general/Heading2';
import { useEffect, useState } from 'react';
import { BOOKS_CATEGORIES } from '@/services/API';
import type { Category } from '@/types/types';

const BooksCategories = () => {
  const [categories, setCategories] = useState<Category[] | []>([]);

  const getBooks = async () => {
    try {
      const res = await fetch(BOOKS_CATEGORIES);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const { data } = await res.json();
      setCategories(data);
    } catch (err) {
      console.log(err);
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
              {categories.map((category, index) => (
                <div key={index} className='flex items-center flex-col text-center'>
                  <BookOpen/>
                  <p className='category-title !text-[clamp(0.985rem,2vw,1rem)]'>
                    {category.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BooksCategories;
