import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import categoriesService from '@/services/categoriesService';
import { BOOKS_GENRES } from '@/services/API';
import type { Genre } from '@/types/types';
import Skeleton from 'react-loading-skeleton';

interface Category {
  id: number;
  category_name: string;
  children: Category[];
}

// Component to render a single category with nested children
const CategoryItem = ({ category }: { category: Category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div
      className='relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/books?category_name=${category.category_name}`}
        state={{ categoryId: category.id, categoryName: category.category_name }}
        className='group block !px-4 !py-2.5 !text-gray-700 hover:!bg-gradient-to-r hover:!from-[#ffe8e0] hover:!to-[#ffede5] !transition-all !duration-200 !border-b !border-gray-100 !text-base !font-medium'
      >
        <span className='!flex !items-center !justify-between'>
          <span className='!flex !items-center !gap-2'>
            <span className='!text-[#fc6603] !text-lg'>▸</span>
            {category.category_name}
          </span>
          {hasChildren && <ChevronRight className='!w-4 !h-4 !text-gray-400' />}
        </span>
      </Link>

      {/* Nested children dropdown */}
      {hasChildren && isHovered && (
        <div className='absolute left-[98%] top-0 ml-1 min-w-[250px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-y-visible'>
          {category.children.map((child) => (
            <NestedCategoryItem key={child.id} category={child} level={1} />
          ))}
        </div>
      )}
    </div>
  );
};

// Component to render nested category items (2nd level and beyond)
const NestedCategoryItem = ({ category, level }: { category: Category; level: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div
      className='relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/books?category_name=${category.category_name}`}
        state={{ categoryId: category.id, categoryName: category.category_name }}
        className='group block !px-4 !py-2.5 !text-gray-700 hover:!bg-gradient-to-r hover:!from-[#ffe8e0] hover:!to-[#ffede5] !transition-all !duration-200 !border-b !border-gray-100 !text-sm !font-medium'
        style={{ paddingLeft: `${level * 12 + 16}px`}}
      >
        <span className='!flex !items-center !justify-between'>
          <span className='!flex !items-center !gap-2'>
            <span className='!text-[#fc6603] !text-base'>•</span>
            {category.category_name}
          </span>
          {hasChildren && <ChevronRight className='!w-3 !h-3 !text-gray-400' />}
        </span>
      </Link>

      {/* Further nested children */}
      {hasChildren && isHovered && (
        <div className='absolute left-[98%] top-0 ml-1 min-w-[250px] bg-white border border-gray-200 rounded-lg shadow-xl max-h-[400px]'>
          {category.children.map((child) => (
            <NestedCategoryItem key={child.id} category={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSidebarData = async () => {
      setLoading(true);
      try {
        // Fetch Categories
        const categoriesData = await categoriesService.getCategories();
        if (categoriesData.status === 'success') {
          console.log('Fetched categories:', categoriesData.data.categories);
          setCategories(categoriesData.data.categories);
        }

        // Fetch Genres
        const genresRes = await fetch(BOOKS_GENRES);
        const genresData = await genresRes.json();
        if (genresData.status === 'success') {
          setGenres(genresData.data.genres);
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
    <aside className='hidden lg:block w-64 bg-gradient-to-b from-gray-50 to-gray-100 h-full top-0 rounded-xl mx-2 shadow-md shadow-stone-300'>
      <div>
        {/* Apsra Spotlight Section */}
        <div className=''>
          <div className='bg-theme-gradient-orange px-4 py-3 text-white rounded-t-xl font-semibold !text-lg shadow-md'>
            Apsra Spotlight
          </div>
          <div className='bg-white border-x border-gray-200'>
            {loading ? (
              <div className='px-4 py-2 space-y-2'>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div className='custom-skeleton'>
                    <Skeleton key={i} width='100%' height={30} duration={0.8} />
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Categories with nested children */}
                {categories.map((category) => (
                  <CategoryItem key={category.id} category={category} />
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
      </div>
    </aside>
  );
};

export default Sidebar;
