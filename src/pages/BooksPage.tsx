import AddProductBox from '../components/general/AddProductBox';
import ProductCardSkeleton from '../components/ProductSkeleton';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';
import type { Book } from '@/types/types';
import {
  getBooks,
  searchBooks,
  getBooksByCategory,
  getBooksByAuthor,
  getBooksByGenre,
  getBooksByTags,
} from '@/services/bookService';
import { booksByFlagsService, getFlagDisplayName } from '@/services/booksByFlagsService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Search Form Component
const SearchForm = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className='search-box'>
      <form onSubmit={handleSearch}>
        <div className='input-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Search books, authors, categories...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className='btn theme-bg-color text-white m-0' type='submit'>
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

const BooksPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showFilter] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageTitle, setPageTitle] = useState('Find Your Next Read');
  const min = 0;
  const max = 1000000;
  const [value, setValue] = useState([550000]);

  // Get search parameters
  const searchQuery = searchParams.get('search');
  const authorId = searchParams.get('author');
  const categoryId = searchParams.get('category');
  const genreId = searchParams.get('genre');
  const tagId = searchParams.get('tag');
  const searchType = searchParams.get('type');

  // Get flag parameters
  const isNew = searchParams.get('is_new');
  const isTrending = searchParams.get('is_trending');
  const isPopular = searchParams.get('is_popular');
  const isBestSeller = searchParams.get('is_best_seller');
  const featured = searchParams.get('featured');

  const fetchBooks = async () => {
    setIsLoading(true);

    try {
      let response;
      let title = 'Find Your Next Read';

      // Check for flag-based filtering first
      if (isNew || isTrending || isPopular || isBestSeller || featured) {
        const flagParams = {
          is_new: isNew === '1',
          is_trending: isTrending === '1',
          is_popular: isPopular === '1',
          is_best_seller: isBestSeller === '1',
          featured: featured === '1',
          page: 1,
          limit: 20,
          sort: 'created_at' as const,
          order: 'DESC' as const,
        };

        response = await booksByFlagsService.getBooksByFlags(flagParams);

        // Create title based on active flags
        const activeFlags = [];
        if (isNew === '1') activeFlags.push(getFlagDisplayName('is_new'));
        if (isTrending === '1') activeFlags.push(getFlagDisplayName('is_trending'));
        if (isPopular === '1') activeFlags.push(getFlagDisplayName('is_popular'));
        if (isBestSeller === '1') activeFlags.push(getFlagDisplayName('is_best_seller'));
        if (featured === '1') activeFlags.push(getFlagDisplayName('featured'));

        title =
          activeFlags.length > 1 ? `${activeFlags.join(' & ')} Books` : `${activeFlags[0]} Books`;
      }
      // Determine which API call to make based on search parameters
      else if (searchQuery && searchType === 'author') {
        // Search for books by author name/query
        response = await searchBooks({ q: searchQuery });
        title = `Books by Authors matching "${searchQuery}"`;
      } else if (searchQuery) {
        // General book search
        response = await searchBooks({ q: searchQuery });
        title = `Search Results for "${searchQuery}"`;
      } else if (authorId) {
        // Books by specific author ID
        response = await getBooksByAuthor(authorId, { page: 1, limit: 20 });
        title = `Books by Author (ID: ${authorId})`;
      } else if (categoryId) {
        // Books by category
        response = await getBooksByCategory(categoryId, { page: 1, limit: 20 });
        title = `Books in Category (ID: ${categoryId})`;
      } else if (genreId) {
        // Books by genre
        response = await getBooksByGenre(genreId, { page: 1, limit: 20 });
        title = `Books in Genre (ID: ${genreId})`;
      } else if (tagId) {
        // Books by tag
        response = await getBooksByTags(tagId, { page: 1, limit: 20 });
        title = `Books with Tag (ID: ${tagId})`;
      } else {
        // Default: get all books
        response = await getBooks({ page: 1, limit: 20 });
      }

      if (response?.data?.books) {
        setBooks(response.data.books);
        setPageTitle(title);
      } else if (response?.data && Array.isArray(response.data)) {
        // Some APIs might return books directly in data array
        setBooks(response.data);
        setPageTitle(title);
      } else {
        setBooks([]);
        setPageTitle('No Books Found');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Failed to load books. Please try again.');
      setBooks([]);
      setPageTitle('Error Loading Books');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [
    searchQuery,
    authorId,
    categoryId,
    genreId,
    tagId,
    searchType,
    isNew,
    isTrending,
    isPopular,
    isBestSeller,
    featured,
  ]);
  return (
    <section className='section-b-space shop-section -mt-8 md:-mt-16'>
      <div className='container-fluid-lg'>
        <div className='row !mt-6'>
          <div className='col-12'>
            {/* Search Bar Section Start */}
            <section className='search-section pt-0'>
              <div className='container-fluid-lg'>
                <div className='row'>
                  <div className=' mx-auto'>
                    <div className='title d-block text-center mb-0'>
                      <h2>{pageTitle}</h2>
                      <span className='title-leaf'>
                        <svg className='icon-width'>
                          <use xlinkHref='/assets/svg/leaf.svg#leaf'></use>
                        </svg>
                      </span>
                    </div>

                    <SearchForm />
                  </div>
                </div>
              </div>
            </section>
            {/* Top Filter Menu */}
            {/* <div className='show-button'>
              <div className='top-filter-menu-2'>
                <div className='sidebar-filter-menu'>
                  <button
                    onClick={() => setShowFilter(!showFilter)}
                    className='bg-stone-100 px-4 py-2 !rounded-sm text-gray-500 !text-base'
                  >
                    <i className='fa-solid fa-filter'></i> Filter Menu
                  </button>
                </div>
                <div className='ms-auto d-flex align-items-center'>
                  <div className='category-dropdown me-md-3'>
                    <h5 className='text-content'>Sort By :</h5>
                    <div className='dropdown'>
                      <button
                        className='dropdown-toggle'
                        type='button'
                        id='dropdownMenuButton1'
                        data-bs-toggle='dropdown'
                      >
                        <span>Most Popular</span> <i className='fa-solid fa-angle-down'></i>
                      </button>
                      <ul className='dropdown-menu'>
                        <li>
                          <a className='dropdown-item' href='#'>
                            Popularity
                          </a>
                        </li>
                        <li>
                          <a className='dropdown-item' href='#'>
                            Low - High Price
                          </a>
                        </li>
                        <li>
                          <a className='dropdown-item' href='#'>
                            High - Low Price
                          </a>
                        </li>
                        <li>
                          <a className='dropdown-item' href='#'>
                            Average Rating
                          </a>
                        </li>
                        <li>
                          <a className='dropdown-item' href='#'>
                            A - Z Order
                          </a>
                        </li>
                        <li>
                          <a className='dropdown-item' href='#'>
                            Z - A Order
                          </a>
                        </li>
                        <li>
                          <a className='dropdown-item' href='#'>
                            % Off - High To Low
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='grid-option grid-option-2'>
                    <ul>
                      <li className='three-grid'>
                        <a href='#'>
                          <img src='/assets/svg/grid-3.svg' alt='' />
                        </a>
                      </li>
                      <li className='grid-btn five-grid d-xxl-inline-block d-none'>
                        <a href='#'>
                          <img src='/assets/svg/grid-4.svg' alt='' />
                        </a>
                      </li>
                      <li className='five-grid d-xxl-inline-block d-none active'>
                        <a href='#'>
                          <img src='/assets/svg/grid-5.svg' alt='' />
                        </a>
                      </li>
                      <li className='list-btn'>
                        <a href='#'>
                          <img src='/assets/svg/list.svg' alt='' />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
            {/* Filter Box Toggle */}
            <div className={`top-filter-category ${showFilter && ' show'}`} id='collapseExample'>
              <div className='row g-sm-4 g-3'>
                <div className='col-xl-3 col-md-6'>
                  <div className='category-title'>
                    <h3>Book Categories</h3>
                  </div>
                  <ul className='category-list custom-padding custom-height'>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='cat-fiction' />
                        <label className='form-check-label' htmlFor='cat-fiction'>
                          <span className='name'>Fiction</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='cat-nonfiction' />
                        <label className='form-check-label' htmlFor='cat-nonfiction'>
                          <span className='name'>Non-Fiction</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='cat-classic' />
                        <label className='form-check-label' htmlFor='cat-classic'>
                          <span className='name'>Classic</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='cat-award' />
                        <label className='form-check-label' htmlFor='cat-award'>
                          <span className='name'>Award Winner</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='cat-mystery' />
                        <label className='form-check-label' htmlFor='cat-mystery'>
                          <span className='name'>Mystery</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='cat-romance' />
                        <label className='form-check-label' htmlFor='cat-romance'>
                          <span className='name'>Romance</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='cat-scifi' />
                        <label className='form-check-label' htmlFor='cat-scifi'>
                          <span className='name'>Science Fiction</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='cat-biography' />
                        <label className='form-check-label' htmlFor='cat-biography'>
                          <span className='name'>Biography</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='cat-children' />
                        <label className='form-check-label' htmlFor='cat-children'>
                          <span className='name'>Children's Books</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='cat-history' />
                        <label className='form-check-label' htmlFor='cat-history'>
                          <span className='name'>History</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='cat-fantasy' />
                        <label className='form-check-label' htmlFor='cat-fantasy'>
                          <span className='name'>Fantasy</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* Price Slider */}
                <div className='col-xl-3 col-md-6'>
                  <div className='category-title'>
                    <h3>Price</h3>
                  </div>
                  <div className='w-full space-y-3'>
                    {/* Top labels */}
                    <div className='flex justify-between text-sm font-semibold'>
                      <span className='px-2 py-1 bg-emerald-600 text-white rounded'>
                        $ {min.toLocaleString()}
                      </span>

                      <span className='px-2 py-1 bg-emerald-600 text-white rounded'>
                        $ {value[0].toLocaleString()}
                      </span>

                      <span className='px-2 py-1 bg-gray-200 text-gray-500 rounded'>
                        $ {max.toLocaleString()}
                      </span>
                    </div>

                    {/* Slider */}
                    <Slider
                      value={value}
                      onValueChange={setValue}
                      min={min}
                      max={max}
                      step={10000}
                      className='w-full'
                    />
                  </div>
                </div>
                <div className='col-xl-3 col-md-6'>
                  <div className='category-title'>
                    <h3>Book Tags</h3>
                  </div>
                  <ul className='category-list'>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='tag-fiction' />
                        <label className='form-check-label' htmlFor='tag-fiction'>
                          <span className='name'>Fiction</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='tag-classic' />
                        <label className='form-check-label' htmlFor='tag-classic'>
                          <span className='name'>Classic</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='tag-novel' />
                        <label className='form-check-label' htmlFor='tag-novel'>
                          <span className='name'>Novel</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='tag-award' />
                        <label className='form-check-label' htmlFor='tag-award'>
                          <span className='name'>Award Winner</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='tag-bestseller' />
                        <label className='form-check-label' htmlFor='tag-bestseller'>
                          <span className='name'>Bestseller</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className='col-xl-3 col-md-6'>
                  <div className='category-title'>
                    <h3>Book Formats</h3>
                  </div>
                  <ul className='category-list custom-padding custom-height'>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input
                          className='checkbox_animated'
                          type='checkbox'
                          id='format-hardcover'
                        />
                        <label className='form-check-label' htmlFor='format-hardcover'>
                          <span className='name'>Hardcover</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input
                          className='checkbox_animated'
                          type='checkbox'
                          id='format-paperback'
                        />
                        <label className='form-check-label' htmlFor='format-paperback'>
                          <span className='name'>Paperback</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='format-ebook' />
                        <label className='form-check-label' htmlFor='format-ebook'>
                          <span className='name'>eBook</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input
                          className='checkbox_animated'
                          type='checkbox'
                          id='format-audiobook'
                        />
                        <label className='form-check-label' htmlFor='format-audiobook'>
                          <span className='name'>Audiobook</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='format-comic' />
                        <label className='form-check-label' htmlFor='format-comic'>
                          <span className='name'>Comic</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='format-magazine' />
                        <label className='form-check-label' htmlFor='format-magazine'>
                          <span className='name'>Magazine</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='format-journal' />
                        <label className='form-check-label' htmlFor='format-journal'>
                          <span className='name'>Journal</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='format-graphic' />
                        <label className='form-check-label' htmlFor='format-graphic'>
                          <span className='name'>Graphic Novel</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='format-poetry' />
                        <label className='form-check-label' htmlFor='format-poetry'>
                          <span className='name'>Poetry</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input
                          className='checkbox_animated'
                          type='checkbox'
                          id='format-reference'
                        />
                        <label className='form-check-label' htmlFor='format-reference'>
                          <span className='name'>Reference</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='format-textbook' />
                        <label className='form-check-label' htmlFor='format-textbook'>
                          <span className='name'>Textbook</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input className='checkbox_animated' type='checkbox' id='format-manual' />
                        <label className='form-check-label' htmlFor='format-manual'>
                          <span className='name'>Manual</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className='form-check ps-0 m-0 category-list-box'>
                        <input
                          className='checkbox_animated'
                          type='checkbox'
                          id='format-encyclopedia'
                        />
                        <label className='form-check-label' htmlFor='format-encyclopedia'>
                          <span className='name'>Encyclopedia</span>
                          <span className='number'>(15)</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Loading/Results Counter */}
            <div className='flex justify-between items-center mt-6 mb-4'>
              {isLoading ? (
                <p className='text-sm text-gray-600'>Loading books...</p>
              ) : (
                <p className='text-sm text-gray-600'>
                  {books.length > 0 ? `Showing ${books.length} books` : 'No books found'}
                </p>
              )}
              {!isLoading && (searchQuery || authorId || categoryId || genreId || tagId) && (
                <button
                  onClick={() => navigate('/books')}
                  className='text-sm text-blue-600 hover:underline'
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Product List Section */}
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:!gap-4 product-list-section mt-4'>
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className='col'>
                    <ProductCardSkeleton />
                  </div>
                ))
              ) : books && books.length > 0 ? (
                books.map((book) => (
                  <div key={book.id} className='col'>
                    <AddProductBox product={book} idx={book.id} showOptions={true} />
                  </div>
                ))
              ) : (
                <div className='col-span-full text-center py-12'>
                  <h3 className='text-lg font-semibold text-gray-600 mb-2'>No books found</h3>
                  <p className='text-gray-500 mb-4'>
                    {searchQuery || authorId || categoryId || genreId || tagId
                      ? 'Try adjusting your search criteria or browse all books.'
                      : 'No books are currently available.'}
                  </p>
                  {(searchQuery || authorId || categoryId || genreId || tagId) && (
                    <button
                      onClick={() => navigate('/books')}
                      className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors'
                    >
                      Browse All Books
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BooksPage;
