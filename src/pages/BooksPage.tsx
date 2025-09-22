import Breadcrumb from '../components/ui/Breadcrumb';
import AddProductBox from '../components/general/AddProductBox';

import { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import type { Book } from '@/types/types';
import { getBooks } from '@/services/bookService';

const BooksPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const min = 0;
  const max = 1000000;
  const [value, setValue] = useState([550000]);

  useEffect(() => {
    getBooks({ page: 1, limit: 20 })
      .then(({ data }) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <section className='section-b-space shop-section -mt-8 md:-mt-16'>
      <Breadcrumb
        title='Shop Books'
        items={[{ label: '', href: '/', iconClass: 'fa-solid fa-house' }, { label: 'Books' }]}
      />
      <div className='container-fluid-lg'>
        <div className='row !mt-6'>
          <div className='col-12'>
            {/* Search Bar Section Start */}
            <section className='search-section pt-0 mb-4'>
              <div className='container-fluid-lg'>
                <div className='row'>
                  <div className=' mx-auto'>
                    <div className='title d-block text-center mb-0'>
                      <h2>Search for books</h2>
                      <span className='title-leaf'>
                        <svg className='icon-width'>
                          <use xlinkHref='/assets/svg/leaf.svg#leaf'></use>
                        </svg>
                      </span>
                    </div>

                    <div className='search-box'>
                      <div className='input-group'>
                        <input type='text' className='form-control' placeholder='' />
                        <button
                          className='btn theme-bg-color text-white m-0'
                          type='button'
                          id='button-addon1'
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Top Filter Menu */}
            <div className='show-button'>
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
            </div>
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
            {/* Product List Section */}
            <div className='row g-sm-4 g-3 row-cols-xxl-5 row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2 product-list-section mt-2'>
              {books.map((book) => (
                <div key={book.id} className='col'>
                  <AddProductBox product={book} idx={book.id} showOptions={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BooksPage;
