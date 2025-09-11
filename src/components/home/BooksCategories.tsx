import { BookOpen } from 'lucide-react';
import Heading2 from '../general/Heading2';

const BooksCategories = () => {
  const categories = [
    { name: 'Fiction' },
    { name: 'History' },
    { name: 'Science' },
    { name: 'Romance' },
    { name: 'Mystery' },
    { name: 'Fantasy' },
    { name: 'Biography' },
    { name: 'Children' },
    { name: 'Self-help' },
    { name: 'Horror' },
  ];

  return (
    <section className='book-category'>
      <div className='container-fluid-lg'>
        <div className='title'>
          <h2 className='!text-center'>Explore Categories</h2>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 justify-center'>
              {categories.map((category, index) => (
                <div key={index} className='flex items-center flex-col text-center'>
                  <BookOpen />
                  <Heading2 className='category-title'>{category.name}</Heading2>
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
