import { useState, useEffect } from 'react';
import { RefreshCw, Calendar, User, Book } from 'react-feather';
import { getBookQueries } from '@/services/bookService';
import type { BookQuery } from '@/types/types';
import toast from 'react-hot-toast';

const BookQueries = () => {
  const [queries, setQueries] = useState<BookQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '' as 'received' | 'under_review' | 'approved' | 'rejected' | 'published' | '',
    category_id: '',
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 1,
    has_next: false,
    has_prev: false,
  });

  const fetchQueries = async () => {
    setLoading(true);
    try {
      // Filter out empty status
      const apiFilters = {
        ...filters,
        status: filters.status || undefined,
        category_id: filters.category_id ? parseInt(filters.category_id) : undefined,
      };
      const response = await getBookQueries(apiFilters);
      if (response.status === 'success') {
        setQueries(response.data.queries);
        setPagination(response.data.pagination);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch book queries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, [filters]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      received: 'bg-info text-white',
      under_review: 'bg-warning text-dark',
      approved: 'bg-success text-white',
      rejected: 'bg-danger text-white',
      published: 'bg-primary text-white',
    };
    return statusClasses[status as keyof typeof statusClasses] || 'bg-secondary text-white';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received':
        return '📥';
      case 'under_review':
        return '🔍';
      case 'approved':
        return '✅';
      case 'rejected':
        return '❌';
      case 'published':
        return '📚';
      default:
        return '📄';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='dashboard-book-queries'>
      <div className='dashboard-bg'>
        <div className='title title-flex'>
          <div>
            <h2>My Book Publication Requests</h2>
            <span className='title-leaf'>
              <svg className='icon-width bg-gray'>
                <use xlinkHref='/assets/svg/leaf.svg#leaf'></use>
              </svg>
            </span>
          </div>
          <button
            className='btn btn-theme rounded-3 text-white'
            onClick={fetchQueries}
            disabled={loading}
          >
            <RefreshCw className={`me-2 ${loading ? 'animate-spin' : ''}`} size={16} />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className='filter-options mb-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
            <div className='custom-select'>
              <select
                className='form-select bg-white border rounded-lg py-2 px-3 w-full focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value=''>All Statuses</option>
                <option value='received'>Received</option>
                <option value='under_review'>Under Review</option>
                <option value='approved'>Approved</option>
                <option value='rejected'>Rejected</option>
                <option value='published'>Published</option>
              </select>
            </div>
            <div className='custom-select'>
              <select
                className='form-select bg-white border rounded-lg py-2 px-3 w-full focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                value={filters.category_id}
                onChange={(e) => handleFilterChange('category_id', e.target.value)}
              >
                <option value=''>All Categories</option>
                <option value='1'>Fiction</option>
                <option value='2'>Non-Fiction</option>
                <option value='3'>Academic</option>
                <option value='4'>Textbook</option>
                <option value='5'>Reference</option>
                <option value='6'>Children's Books</option>
                <option value='7'>Biography</option>
                <option value='8'>History</option>
                <option value='9'>Science</option>
                <option value='10'>Technology</option>
                <option value='11'>Religion & Spirituality</option>
                <option value='12'>Self Help</option>
                <option value='13'>Poetry</option>
                <option value='14'>Other</option>
              </select>
            </div>
            <div className='custom-select'>
              <select
                className='form-select bg-white border rounded-lg py-2 px-3 w-full focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                value={filters.limit}
                onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
              >
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className='text-center py-8'>
              <div className='spinner-border text-emerald-600' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
              <p className='mt-3 text-gray-600'>Loading your book queries...</p>
            </div>
          ) : queries.length > 0 ? (
            <>
              <div className='grid gap-4'>
                {queries.map((query) => (
                  <div
                    key={query.id}
                    className='bg-white rounded-lg shadow-sm p-4 transition-all hover:shadow-md'
                  >
                    <div className='flex flex-col md:flex-row md:items-start gap-4'>
                      <div className='flex-grow space-y-3'>
                        <div className='flex items-start gap-3'>
                          <span className='text-2xl'>{getStatusIcon(query.status)}</span>
                          <div className='flex-grow'>
                            <h5 className='text-lg font-semibold flex items-center gap-2 text-gray-800'>
                              <Book size={18} className='text-emerald-600' />
                              {query.book_title}
                            </h5>
                            <p className='text-gray-600 flex items-center gap-1'>
                              <User size={14} className='text-gray-500' />
                              {query.anonymous ? 'Anonymous Submission' : query.author_name}
                            </p>
                          </div>
                        </div>

                        <div className='flex flex-wrap gap-2'>
                          <span className='px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700'>
                            📚 {query.category_name || 'No Category'}
                          </span>
                          <span className='px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700'>
                            🌐{' '}
                            {query.book_language === 'en'
                              ? 'English'
                              : query.book_language === 'hi'
                              ? 'Hindi'
                              : query.book_language === 'pa'
                              ? 'Punjabi'
                              : 'Other'}
                          </span>
                          {query.genre_name && (
                            <span className='px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700'>
                              🎭 {query.genre_name}
                            </span>
                          )}
                        </div>

                        {query.book_description && (
                          <p className='text-gray-600 text-sm'>
                            {query.book_description.length > 100
                              ? `${query.book_description.substring(0, 100)}...`
                              : query.book_description}
                          </p>
                        )}
                      </div>

                      <div className='md:text-right space-y-2'>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusBadge(
                            query.status
                          )}`}
                        >
                          {query.status.replace('_', ' ').toUpperCase()}
                        </span>
                        <div className='text-gray-500 text-sm'>
                          <div className='flex items-center gap-1 md:justify-end'>
                            <Calendar size={12} />
                            {formatDate(query.created_at)}
                          </div>
                          {query.reviewed_at && (
                            <div className='flex items-center gap-1 md:justify-end mt-1'>
                              📝 Reviewed: {formatDate(query.reviewed_at)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {query.admin_response && (
                      <div className='mt-4 pt-4 border-t border-gray-200'>
                        <h6 className='text-emerald-600 font-medium mb-2 flex items-center gap-2'>
                          <i className='fa-solid fa-reply'></i>
                          Admin Response:
                        </h6>
                        <p className='text-gray-600'>{query.admin_response}</p>
                      </div>
                    )}

                    {query.notes && (
                      <div className='mt-3 pt-3 border-t border-gray-200'>
                        <p className='text-gray-600 text-sm'>
                          <strong>Your Notes:</strong> {query.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.total_pages > 1 && (
                <div className='flex flex-col items-center gap-4 mt-6'>
                  <nav className='flex justify-center' aria-label='Book queries pagination'>
                    <ul className='flex gap-2'>
                      <li>
                        <button
                          className={`px-4 py-2 rounded-lg border ${
                            !pagination.has_prev
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => handlePageChange(pagination.current_page - 1)}
                          disabled={!pagination.has_prev}
                        >
                          Previous
                        </button>
                      </li>

                      {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map(
                        (page) => (
                          <li key={page}>
                            <button
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                page === pagination.current_page
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-white text-gray-700 hover:bg-gray-50'
                              }`}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          </li>
                        )
                      )}

                      <li>
                        <button
                          className={`px-4 py-2 rounded-lg border ${
                            !pagination.has_next
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => handlePageChange(pagination.current_page + 1)}
                          disabled={!pagination.has_next}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>

                  {/* Summary */}
                  <div className='text-gray-600 text-sm'>
                    Showing {(pagination.current_page - 1) * pagination.per_page + 1} to{' '}
                    {Math.min(
                      pagination.current_page * pagination.per_page,
                      pagination.total_items
                    )}{' '}
                    of {pagination.total_items} book queries
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className='text-center py-12'>
              <div className='mb-6'>
                <div className='w-16 h-16 mx-auto text-gray-400'>
                  <Book size={64} className='mx-auto' />
                </div>
              </div>
              <h4 className='text-xl font-semibold text-gray-700 mb-2'>No Book Queries Found</h4>
              <p className='text-gray-600 mb-6'>
                You haven't submitted any book publication requests yet.
              </p>
              <a
                href='/publish-book'
                className='inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors'
              >
                <i className='fa-solid fa-plus me-2'></i>
                Submit Your First Book
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookQueries;
