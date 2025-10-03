import { BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BOOKS_GENRES } from '@/services/API';
import type { Genre } from '@/types/types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'; // Importing Skeleton component

const BooksGenres = () => {
  const [genres, setGenres] = useState<Genre[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // loading state

  const getGenres = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(BOOKS_GENRES);
      if (!res.ok) throw new Error('Failed to fetch genres');
      const { data } = await res.json();
      const { genres } = data;
      setGenres(genres);
    } catch (err) {
      console.error('Failed to fetch genres:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <section className='book-genre'>
      <div className='container-fluid-lg'>
        <div className='title'>
          <h2 className='!text-center'>Explore Genres</h2>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 justify-center '>
              {isLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className='flex items-center flex-col text-center !text-black'>
                    <Skeleton
                      circle={false}
                      width={48}
                      height={48}
                      className='mb-2 custom-skeleton'
                    />
                    <Skeleton width={120} height={16} className='custom-skeleton' />
                    <Skeleton width={80} height={12} className='custom-skeleton mt-1' />
                  </div>
                ))
              ) : genres && genres.length > 0 ? (
                genres.map((genre, index) => (
                  <Link
                    key={genre.id || index}
                    to={`/books?genre_slug=${encodeURIComponent(
                      genre.slug || genre.genre_name.toLowerCase().replace(/\s+/g, '-')
                    )}`}
                    state={{
                      genreId: genre.id,
                      genreName: genre.genre_name,
                      genreSlug: genre.slug,
                    }}
                    className='flex items-center flex-col text-center !text-black hover:!text-gray-700 hover:scale-105 transition-all duration-200'
                  >
                    <div className='p-3 mb-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors'>
                      <BookOpen className='w-6 h-6 hover:!text-gray-700' />
                    </div>
                    <p className='genre-title !text-[clamp(0.985rem,2vw,1rem)] font-medium mb-1'>
                      {genre.genre_name}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {genre.book_count} book{genre.book_count !== 1 ? 's' : ''}
                    </p>
                  </Link>
                ))
              ) : (
                <p className='text-center col-span-full'>No genres found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BooksGenres;
