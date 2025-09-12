'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import clsx from 'clsx';
import ProductCard from '../general/ProductCard';
import Heading2 from '../general/Heading2';

const productTabs = {
  top: [
    {
      id: 1,
      name: 'Tuffets Whole Wheat Bread',
      price: '10.0',
      image: '/src/assets/images/book/product/43.jpg',
      rating: 4,
      reviews: 34,
      author: 'Tuffets Bakery',
      description: 'Freshly baked whole wheat bread, rich in fiber and nutrients.',
    },
    {
      id: 2,
      name: 'Potato',
      price: '40.0',
      image: '/src/assets/images/book/product/44.jpg',
      rating: 4,
      reviews: 34,
      author: 'Organic Farms',
      description: 'Locally grown potatoes perfect for everyday meals.',
    },
    {
      id: 3,
      name: 'Green Chilli',
      price: '45.0',
      image: '/src/assets/images/book/product/45.jpg',
      rating: 4,
      reviews: 34,
      author: 'Spice Valley',
      description: 'Fresh and spicy green chillies straight from the farm.',
    },
    {
      id: 4,
      name: 'Muffets Burger Bun',
      price: '70.0',
      image: '/src/assets/images/book/product/1.jpg',
      rating: 4,
      reviews: 34,
      author: 'Muffets',
      description: 'Soft and fluffy burger buns made from enriched flour.',
    },
    {
      id: 5,
      name: 'Muffets Burger Bun',
      price: '70.0',
      image: '/src/assets/images/book/product/1.jpg',
      rating: 4,
      reviews: 34,
      author: 'Muffets',
      description: 'Soft and fluffy burger buns made from enriched flour.',
    },
    {
      id: 6,
      name: 'Muffets Burger Bun',
      price: '70.0',
      image: '/src/assets/images/book/product/1.jpg',
      rating: 4,
      reviews: 34,
      author: 'Muffets',
      description: 'Soft and fluffy burger buns made from enriched flour.',
    },
  ],
  trending: [
    {
      id: 1,
      name: 'Good Life Refined Sunflower Oil',
      price: '10.0',
      image: '/src/assets/images/book/product/2.jpg',
      rating: 4,
      reviews: 34,
      author: 'Good Life',
      description: 'Heart-healthy refined sunflower oil ideal for cooking.',
    },
    {
      id: 2,
      name: 'Good Life Raw Peanuts',
      price: '40.0',
      image: '/src/assets/images/book/product/3.jpg',
      rating: 4,
      reviews: 34,
      author: 'Good Life',
      description: 'Protein-rich raw peanuts sourced from trusted farms.',
    },
    {
      id: 3,
      name: 'Good Life Raw Peanuts',
      price: '85.0',
      image: '/src/assets/images/book/product/4.jpg',
      rating: 4,
      reviews: 34,
      author: 'Good Life',
      description: 'Bulk pack of premium-quality raw peanuts for snacking.',
    },
    {
      id: 4,
      name: 'Frooti Mango Drink',
      price: '10.0',
      image: '/src/assets/images/book/product/5.jpg',
      rating: 4,
      reviews: 34,
      author: 'Frooti',
      description: 'Refreshing mango-flavored drink, perfect for hot days.',
    },
  ],
  recent: [
    {
      id: 1,
      name: 'Tuffets Britannia Cheezza',
      price: '10.0',
      image: '/src/assets/images/book/product/6.jpg',
      rating: 4,
      reviews: 34,
      author: 'Britannia',
      description: 'Delicious cheesy snack made with real cheddar.',
    },
    {
      id: 2,
      name: 'Long Life Toned Milk',
      price: '40.0',
      image: '/src/assets/images/book/product/7.jpg',
      rating: 4,
      reviews: 34,
      author: 'Dairy Best',
      description: 'High-quality UHT milk with extended shelf life.',
    },
    {
      id: 3,
      name: 'Organic Tomato',
      price: '45.0',
      image: '/src/assets/images/book/product/8.jpg',
      rating: 4,
      reviews: 34,
      author: 'Green Leaf Organics',
      description: 'Juicy, organic tomatoes free from harmful pesticides.',
    },
    {
      id: 4,
      name: 'Organic Pure Honey',
      price: '90.0',
      image: '/src/assets/images/book/product/9.jpg',
      rating: 4,
      reviews: 34,
      author: 'HoneyBee Naturals',
      description: '100% raw and unprocessed honey with natural goodness.',
    },
  ],
};

const TopSellingBooks = () => {
  const [fade, setFade] = useState(false);
  const [activeTab, setActiveTab] = useState('top');

  const handleTabChange = (value: string) => {
    setFade(true);
    setTimeout(() => {
      setActiveTab(value);
      setFade(false);
    }, 100); // matches transition
  };

  const renderRating = (rating: number) => (
    <ul className='rating flex space-x-1 text-yellow-500 text-sm'>
      {Array.from({ length: 5 }, (_, i) => (
        <li key={i}>
          <i data-feather='star' className={i < rating ? 'fill' : ''}></i>
        </li>
      ))}
    </ul>
  );

  return (
    <Tabs defaultValue='top' className='container-fluid-lg' onValueChange={handleTabChange}>
      <div className='row'>
        <div className='col-xxl-9 col-lg-8'>
          <TabsList className='relative top-selling-box w-full flex justify-between md:justify-start md:gap-8 items-center mt-12 mb-8 bg-transparent'>
            <div className='absolute bottom-0.5 w-full bg-gray-100 h-0.5 '></div>
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

          {Object.entries(productTabs).map(([key, items]) => (
            <TabsContent
              key={key}
              value={key}
              className={clsx(
                'slider-3_3 product-wrapper grid gap-4',
                fade ? 'opacity-0' : 'opacity-100',
                'transition-opacity duration-300'
              )}
            >
              <div className='row'>
                <div className='col-12'>
                  <div className='top-selling-box'>
                    {/* <div className='top-selling-title mb-3'>
                      <h3>
                        {key === 'top'
                          ? 'Top Selling'
                          : key === 'trending'
                          ? 'Trending Products'
                          : 'Recently Added'}
                      </h3>
                    </div> */}

                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                      {items.map((item, i) => (
                        <ProductCard key={i} item={item} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
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
