import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { BookOpen, X } from 'lucide-react';
import type { Category } from '@/types/types';
import { useEffect, useState } from 'react';
import { BOOKS_CATEGORIES } from '@/services/API';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

interface AllCategoriesProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const AllCategories = ({ show, setShow }: AllCategoriesProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBooks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(BOOKS_CATEGORIES);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const { data } = await res.json();
      setCategories(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Drawer open={show} onOpenChange={setShow} direction='bottom'>
      <DrawerContent className='bg-white dark:bg-slate-800 max-h-[74vh]'>
        <DrawerTitle className='text-center'>Categories</DrawerTitle>
        {/* Close Button */}
        <button
          onClick={() => setShow(false)}
          className='absolute right-4 top-4 z-10 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none'
          aria-label='Close categories'
        >
          <X />
        </button>
        <div className='p-4 overflow-y-scroll'>
          <div className='grid grid-cols-3 gap-4 justify-center'>
            {isLoading
              ? Array.from({ length: 11 }).map((_, index) => (
                  <div key={index} className='flex items-center flex-col text-center !text-black'>
                    <Skeleton
                      circle={false}
                      width={48}
                      height={48}
                      className='mb-2 custom-skeleton'
                    />
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
      </DrawerContent>
    </Drawer>
  );
};

export default AllCategories;
