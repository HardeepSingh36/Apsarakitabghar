import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Award } from 'lucide-react';
import categoriesService from '@/services/categoriesService';
import { BOOKS_GENRES } from '@/services/API';
import { booksByFlagsService } from '@/services/booksByFlagsService';
import type { Genre, Book } from '@/types/types';
import Skeleton from 'react-loading-skeleton';

interface Category {
  id: number;
  category_name: string;
  children: { id: number; category_name: string }[];
}

const Sidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
  const [bestSellerBooks, setBestSellerBooks] = useState<Book[]>([]);
  const [newBooks, setNewBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSidebarData = async () => {
      setLoading(true);
      try {
        // Fetch Categories
        const categoriesData = await categoriesService.getCategories();
        if (categoriesData.status === 'success') {
          setCategories(categoriesData.data.categories.slice(0, 6)); // Limit to 6
        }

        // Fetch Genres
        const genresRes = await fetch(BOOKS_GENRES);
        const genresData = await genresRes.json();
        if (genresData.status === 'success') {
          setGenres(genresData.data.genres.slice(0, 8)); // Limit to 8
        }

        // Fetch Trending Books
        const trendingData = await booksByFlagsService.getTrendingBooks({ limit: 6 });
        if (trendingData.status === 'success') {
          setTrendingBooks(trendingData.data.books as unknown as Book[]);
        }

        // Fetch Best Seller Books
        const bestSellerData = await booksByFlagsService.getBestSellerBooks({ limit: 6 });
        if (bestSellerData.status === 'success') {
          setBestSellerBooks(bestSellerData.data.books as unknown as Book[]);
        }

        // Fetch New Books
        const newBooksData = await booksByFlagsService.getNewBooks({ limit: 6 });
        if (newBooksData.status === 'success') {
          setNewBooks(newBooksData.data.books as unknown as Book[]);
        }
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSidebarData();
  }, []);

  return (
    <aside className='hidden lg:block w-64 bg-gradient-to-b from-gray-50 to-gray-100 h-full top-0 overflow-y-auto scroll-container rounded-xl mx-2 shadow-md shadow-stone-300'>
      <div>
        {/* Apsra Spotlight Section */}
        <div className=''>
          <div className='bg-theme-gradient-orange px-4 py-3 text-white font-semibold !text-lg shadow-md'>
            Apsra Spotlight
          </div>
          <div className='bg-white border-x border-gray-200'>
            {loading ? (
              <div className='px-4 py-2 space-y-2'>
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} height={32} className='custom-skeleton' />
                ))}
              </div>
            ) : (
              <>
                {/* Categories */}
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/books?category_name=${category.category_name}`}
                    state={{ categoryId: category.id, categoryName: category.category_name }}
                    className='block !px-4 !py-2.5 !text-gray-700 hover:!bg-gradient-to-r hover:!from-[#ffe8e0] hover:!to-[#ffede5] !transition-all !duration-200 !border-b !border-gray-100 !text-base !font-medium'
                  >
                    <span className='!flex !items-center !gap-2'>
                      <span className='!text-[#fc6603] !text-lg'>▸</span>
                      {category.category_name}
                    </span>
                  </Link>
                ))}

                {/* Genres */}
                {genres.slice(0, 6).map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/books?genre_slug=${encodeURIComponent(
                      genre.slug || genre.genre_name.toLowerCase().replace(/\s+/g, '-')
                    )}`}
                    state={{ genreId: genre.id, genreName: genre.genre_name }}
                    className='block !px-4 !py-2.5 !text-gray-700 hover:!bg-gradient-to-r hover:!from-[#ffe8e0] hover:!to-[#ffede5] !transition-all !duration-200 !border-b !border-gray-100 !text-base !font-medium'
                  >
                    <span className='!flex !items-center !gap-2'>
                      <span className='!text-[#fc6603] !text-lg'>▸</span>
                      {genre.genre_name}
                    </span>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Trending Books Section */}
        <div>
          <div className='bg-theme-gradient-orange px-4 py-3 text-white font-semibold !text-lg shadow-md'>
            Trending Books
          </div>
          <div className='bg-white border-x border-gray-200'>
            {loading ? (
              <div className='px-4 py-2 space-y-2'>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} height={28} className='custom-skeleton' />
                ))}
              </div>
            ) : (
              <>
                {trendingBooks.map((book) => (
                  <Link
                    key={book.id}
                    to={`/books/${book.slug || book.id}`}
                    state={{ item: book }}
                    className='block !px-4 !py-2.5 hover:!bg-gradient-to-r hover:!from-[#ffe8e0] hover:!to-[#ffede5] !transition-all !duration-200 !border-b !border-gray-100 notranslate'
                  >
                    <div className='!flex !items-start !gap-2'>
                      <TrendingUp className='!w-4 !h-4 !flex-shrink-0 !text-[#fc6603] !mt-1' />
                      <div className='!flex-1 !min-w-0'>
                        <p className='!text-base !font-semibold !text-gray-800 !truncate !mb-0'>
                          {book.title}
                        </p>
                        <p className='!text-sm !text-gray-500 !truncate !mb-0'>
                          {book.author_name}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
                <Link
                  to='/books?is_trending=1'
                  className='block !px-4 !py-2.5 !text-center !text-base !font-semibold !text-[#fc2403] hover:!bg-gradient-to-r hover:!from-[#ffe8e0] hover:!to-[#ffede5] !transition-all !duration-200 !border-t !border-gray-200'
                >
                  View All Trending Books →
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Best Sellers Section */}
        <div>
          <div className='bg-theme-gradient-orange px-4 py-3 text-white font-semibold !text-lg shadow-md'>
            Best Sellers
          </div>
          <div className='bg-white border-x border-gray-200'>
            {loading ? (
              <div className='px-4 py-2 space-y-2'>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} height={28} className='custom-skeleton' />
                ))}
              </div>
            ) : (
              <>
                {bestSellerBooks.map((book) => (
                  <Link
                    key={book.id}
                    to={`/books/${book.slug || book.id}`}
                    state={{ item: book }}
                    className='block !px-4 !py-2.5 hover:!bg-gradient-to-r hover:!from-[#ffe8e0] hover:!to-[#ffede5] !transition-all !duration-200 !border-b !border-gray-100 notranslate'
                  >
                    <div className='!flex !items-start !gap-2'>
                      <Award className='!w-4 !h-4 !flex-shrink-0 !text-[#fc6603] !mt-1' />
                      <div className='!flex-1 !min-w-0'>
                        <p className='!text-base !font-semibold !text-gray-800 !truncate !mb-0'>
                          {book.title}
                        </p>
                        <p className='!text-sm !text-gray-500 !truncate !mb-0'>
                          {book.author_name}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
                <Link
                  to='/books?is_best_seller=1'
                  className='block !px-4 !py-2.5 !text-center !text-base !font-semibold !text-[#fc2403] hover:!bg-gradient-to-r hover:!from-[#ffe8e0] hover:!to-[#ffede5] !transition-all !duration-200 !border-t !border-gray-200'
                >
                  View All Best Sellers →
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Recently Added Section */}
        <div className='mb-4'>
          <div className='bg-gradient-to-r from-[#fc6603] to-[#ff8a50] px-4 py-3 text-white font-semibold !text-lg shadow-md'>
            Recently Added
          </div>
          <div className='bg-white border-x border-gray-200'>
            {loading ? (
              <div className='px-4 py-2 space-y-2'>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} height={28} className='custom-skeleton' />
                ))}
              </div>
            ) : (
              <>
                {newBooks.map((book) => (
                  <Link
                    key={book.id}
                    to={`/books/${book.slug || book.id}`}
                    state={{ item: book }}
                    className='block !px-4 !py-2.5 hover:!bg-gradient-to-r hover:!from-[#ffe8e0] hover:!to-[#ffede5] !transition-all !duration-200 !border-b !border-gray-100 notranslate'
                  >
                    <div className='!flex !items-start !gap-2'>
                      <Clock className='!w-4 !h-4 !flex-shrink-0 !text-[#fc6603] !mt-1' />
                      <div className='!flex-1 !min-w-0'>
                        <p className='!text-base !font-semibold !text-gray-800 !truncate !mb-0'>
                          {book.title}
                        </p>
                        <p className='!text-sm !text-gray-500 !truncate !mb-0'>
                          {book.author_name}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
                <Link
                  to='/books?is_new=1'
                  className='block !px-4 !py-2.5 !text-center !text-base !font-semibold !text-[#fc2403] hover:!bg-gradient-to-r hover:!from-[#ffe8e0] hover:!to-[#ffede5] !transition-all !duration-200 !border-t !border-gray-200'
                >
                  View All New Books →
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
