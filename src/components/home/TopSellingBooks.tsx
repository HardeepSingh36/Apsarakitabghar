'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import Heading2 from '../general/Heading2';
import { BOOKS_LIST } from '@/services/API';
import type { Book } from '@/types/types';
import AddProductBox from '../general/AddProductBox';
import ProductCardSkeleton from '../ProductSkeleton';

const TopSellingBooks = () => {
  const [books, setBooks] = useState<Book[] | []>([]);
  const [fade, setFade] = useState(false);
  const [activeTab, setActiveTab] = useState('top');
  const [isLoading, setIsLoading] = useState<boolean>(true); // loading state

  const handleTabChange = (value: string) => {
    setFade(true);
    setTimeout(() => {
      setActiveTab(value);
      setFade(false);
    }, 100); // matches transition
  };

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(BOOKS_LIST);
      if (!res.ok) throw new Error('Failed to fetch books');
      const { data } = await res.json();
      setBooks(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const top = Array.isArray(books) ? books.filter((b) => b.top).slice(0, 6) : [];
  const trending = Array.isArray(books) ? books.filter((b) => b.trending).slice(0, 6) : [];
  const recent = Array.isArray(books)
    ? [...books]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 6)
    : [];

  useEffect(() => {
    fetchBooks();
  }, []);

  const BookGrid: React.FC<{ items: Book[] }> = ({ items }) => (
    <div className='row'>
      <div className='col-12'>
        <div className='top-selling-box'>
          <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4'>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            ) : items && items.length > 0 ? (
              items.map((item) => <AddProductBox key={item.id} idx={item.id} product={item} />)
            ) : (
              <p className='text-center col-span-full'>No books found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Tabs defaultValue='top' className='container-fluid-lg' onValueChange={handleTabChange}>
      <div className='row'>
        <div className='col-xxl-9 col-lg-8'>
          <TabsList
            className='relative top-selling-box w-full flex justify-between md:justify-start md:gap-8 items-center mt-12 mb-8 bg-transparent overflow-x-scroll overflow-y-hidden'
            style={{ scrollbarWidth: 'none' }}
          >
            <div className='absolute bottom-2 w-full bg-gray-100 h-0.5 '></div>
            <TabsTrigger
              className={clsx(
                'top-selling-title mb-3 shadow-none !border-b-2 !border-gray-100',
                activeTab === 'top' && '!border-gray-500/80'
              )}
              value='top'
            >
              <Heading2>Top Selling</Heading2>
            </TabsTrigger>

            <TabsTrigger
              className={clsx(
                'top-selling-title mb-3 shadow-none !border-b-2 !border-gray-100',
                activeTab === 'trending' && '!border-gray-500/80'
              )}
              value='trending'
            >
              <Heading2>
                Trending <span className='!hidden md:!contents'>Products</span>
              </Heading2>
            </TabsTrigger>

            <TabsTrigger
              className={clsx(
                'top-selling-title mb-3 shadow-none !border-b-2 !border-gray-100',
                activeTab === 'recent' && '!border-gray-500/80'
              )}
              value='recent'
            >
              <Heading2>Recently Added</Heading2>
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value='top'
            className={clsx(fade ? 'opacity-0' : 'opacity-100', 'transition-opacity duration-300')}
          >
            <BookGrid items={top} />
          </TabsContent>

          <TabsContent
            value='trending'
            className={clsx(fade ? 'opacity-0' : 'opacity-100', 'transition-opacity duration-300')}
          >
            <BookGrid items={trending} />
          </TabsContent>

          <TabsContent
            value='recent'
            className={clsx(fade ? 'opacity-0' : 'opacity-100', 'transition-opacity duration-300')}
          >
            <BookGrid items={recent} />
          </TabsContent>
        </div>

        {/* Right-side banner */}
        <div className='col-xxl-3 col-lg-4 d-lg-block d-none'>
          <div className='ratio_156'>
            <div className='banner-contain-2 hover-effect'>
              <img src='/assets/images/book/banner/3.jpg' className='bg-img lazyload' alt='' />
            </div>
          </div>
        </div>
      </div>
    </Tabs>
  );
};
export default TopSellingBooks;
