'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Heading2 from '../general/Heading2';
import { booksByFlagsService, type BookFlag } from '@/services/booksByFlagsService';
import { Link, useNavigate } from 'react-router-dom';
import AddProductBox from '../general/AddProductBox';
import ProductCardSkeleton from '../ProductSkeleton';
import { ChevronRight } from 'react-feather';

const TopSellingBooks = () => {
  const navigate = useNavigate();
  const [topBooks, setTopBooks] = useState<BookFlag[]>([]);
  const [trendingBooks, setTrendingBooks] = useState<BookFlag[]>([]);
  const [recentBooks, setRecentBooks] = useState<BookFlag[]>([]);
  const [fade, setFade] = useState(false);
  const [activeTab, setActiveTab] = useState('top');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleTabChange = (value: string) => {
    setFade(true);
    setTimeout(() => {
      setActiveTab(value);
      setFade(false);
    }, 100);
  };

  const navigateToBooks = (flag: string) => {
    const params = new URLSearchParams();
    switch (flag) {
      case 'top':
        params.append('is_best_seller', '1');
        break;
      case 'trending':
        params.append('is_trending', '1');
        break;
      case 'recent':
        params.append('is_new', '1');
        break;
    }
    navigate(`/books?${params.toString()}`);
  };

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const [topResponse, trendingResponse, recentResponse] = await Promise.all([
        booksByFlagsService.getBestSellerBooks({ limit: 8 }),
        booksByFlagsService.getTrendingBooks({ limit: 8 }),
        booksByFlagsService.getNewBooks({ limit: 8, sort: 'created_at', order: 'DESC' }),
      ]);

      setTopBooks(topResponse.data.books);
      setTrendingBooks(trendingResponse.data.books);
      setRecentBooks(recentResponse.data.books);
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const BookGrid: React.FC<{ items: BookFlag[]; flag: string }> = ({ items, flag }) => (
    <div className='row'>
      {items.length > 0 && (
        <div className='text-right !-mt-8 !mb-2'>
          <Link
            to={`#`}
            onClick={(e) => {
              e.preventDefault();
               navigateToBooks(flag);
            }}
            className='!text-base category-name hover:!text-emerald-600 flex justify-end items-center'
          >
            View All
            <ChevronRight size={18} />
          </Link>
        </div>
      )}
      <div className='col-12'>
        <div className='top-selling-box'>
          <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4'>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            ) : items.length > 0 ? (
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
            className='relative top-selling-box w-full flex justify-between md:justify-start md:gap-8 items-center mt-12 mb-8 bg-transparent overflow-x-scroll min-h-12 overflow-y-hidden'
            style={{ scrollbarWidth: 'none' }}
          >
            <div className='absolute bottom-[13px] w-full bg-gray-100 h-0.5 '></div>
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
            <BookGrid items={topBooks} flag='top' />
          </TabsContent>

          <TabsContent
            value='trending'
            className={clsx(fade ? 'opacity-0' : 'opacity-100', 'transition-opacity duration-300')}
          >
            <BookGrid items={trendingBooks} flag='trending' />
          </TabsContent>

          <TabsContent
            value='recent'
            className={clsx(fade ? 'opacity-0' : 'opacity-100', 'transition-opacity duration-300')}
          >
            <BookGrid items={recentBooks} flag='recent' />
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
