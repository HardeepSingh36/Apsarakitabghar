import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { BookOpen, X } from 'lucide-react';
import Heading2 from './general/Heading2';
import type { Category } from '@/types/types';
import { useEffect, useState } from 'react';
import { BOOKS_CATEGORIES } from '@/services/API';

interface AllCategoriesProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const AllCategories = ({ show, setShow }: AllCategoriesProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

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
            {categories.map((category, index) => (
              <div key={index} className='flex items-center flex-col text-center'>
                <BookOpen />
                <Heading2 className='category-title'>{category.name}</Heading2>
              </div>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AllCategories;
