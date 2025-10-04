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
    <div className='dashboard-right-sidebar'>
      <div className='dashboard-main'>
        <div className='dashboard-main'>
          <div className='d-flex align-items-center justify-content-between mb-4'>
            <div className='title'>
              <h2>My Book Publication Requests</h2>
              <span className='title-leaf'>
                <svg className='icon-width bg-gray'>
                  <use xlinkHref='/assets/svg/leaf.svg#leaf'></use>
                </svg>
              </span>
            </div>
            <button className='btn btn-animation btn-sm' onClick={fetchQueries} disabled={loading}>
              <RefreshCw className={`me-2 ${loading ? 'animate-spin' : ''}`} size={16} />
              Refresh
            </button>
          </div>

          {/* Filters */}
          <div className='row mb-4'>
            <div className='col-md-4'>
              <select
                className='form-select'
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
            <div className='col-md-4'>
              <select
                className='form-select'
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
            <div className='col-md-4'>
              <select
                className='form-select'
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
            <div className='text-center py-5'>
              <div className='spinner-border text-primary' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
              <p className='mt-3 text-muted'>Loading your book queries...</p>
            </div>
          ) : queries.length > 0 ? (
            <>
              <div className='row'>
                {queries.map((query) => (
                  <div key={query.id} className='col-12 mb-3'>
                    <div className='card border-0 shadow-sm'>
                      <div className='card-body'>
                        <div className='row align-items-center'>
                          <div className='col-md-8'>
                            <div className='d-flex align-items-start'>
                              <div className='me-3'>
                                <span className='fs-3'>{getStatusIcon(query.status)}</span>
                              </div>
                              <div className='flex-grow-1'>
                                <h5 className='mb-1'>
                                  <Book className='me-2' size={18} />
                                  {query.book_title}
                                </h5>
                                <p className='text-muted mb-2'>
                                  <User className='me-1' size={14} />
                                  {query.anonymous ? 'Anonymous Submission' : query.author_name}
                                </p>
                                <div className='d-flex flex-wrap gap-2'>
                                  <small className='badge bg-light text-dark'>
                                    📚 {query.category_name || 'No Category'}
                                  </small>
                                  <small className='badge bg-light text-dark'>
                                    🌐{' '}
                                    {query.book_language === 'en'
                                      ? 'English'
                                      : query.book_language === 'hi'
                                      ? 'Hindi'
                                      : query.book_language === 'pa'
                                      ? 'Punjabi'
                                      : 'Other'}
                                  </small>
                                  {query.genre_name && (
                                    <small className='badge bg-light text-dark'>
                                      🎭 {query.genre_name}
                                    </small>
                                  )}
                                </div>
                                {query.book_description && (
                                  <p className='mt-2 mb-0 text-muted small'>
                                    {query.book_description.length > 100
                                      ? `${query.book_description.substring(0, 100)}...`
                                      : query.book_description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className='col-md-4 text-md-end'>
                            <div className='mb-2'>
                              <span className={`badge ${getStatusBadge(query.status)}`}>
                                {query.status.replace('_', ' ').toUpperCase()}
                              </span>
                            </div>
                            <small className='text-muted d-block'>
                              <Calendar className='me-1' size={12} />
                              {formatDate(query.created_at)}
                            </small>
                            {query.reviewed_at && (
                              <small className='text-muted d-block mt-1'>
                                📝 Reviewed: {formatDate(query.reviewed_at)}
                              </small>
                            )}
                          </div>
                        </div>

                        {query.admin_response && (
                          <div className='mt-3 pt-3 border-top'>
                            <h6 className='text-primary mb-2'>
                              <i className='fa-solid fa-reply me-2'></i>
                              Admin Response:
                            </h6>
                            <p className='mb-0 text-muted'>{query.admin_response}</p>
                          </div>
                        )}

                        {query.notes && (
                          <div className='mt-2 pt-2 border-top'>
                            <small className='text-muted'>
                              <strong>Your Notes:</strong> {query.notes}
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.total_pages > 1 && (
                <nav aria-label='Book queries pagination'>
                  <ul className='pagination justify-content-center mt-4'>
                    <li className={`page-item ${!pagination.has_prev ? 'disabled' : ''}`}>
                      <button
                        className='page-link'
                        onClick={() => handlePageChange(pagination.current_page - 1)}
                        disabled={!pagination.has_prev}
                      >
                        Previous
                      </button>
                    </li>

                    {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((page) => (
                      <li
                        key={page}
                        className={`page-item ${page === pagination.current_page ? 'active' : ''}`}
                      >
                        <button className='page-link' onClick={() => handlePageChange(page)}>
                          {page}
                        </button>
                      </li>
                    ))}

                    <li className={`page-item ${!pagination.has_next ? 'disabled' : ''}`}>
                      <button
                        className='page-link'
                        onClick={() => handlePageChange(pagination.current_page + 1)}
                        disabled={!pagination.has_next}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}

              {/* Summary */}
              <div className='mt-4 text-center text-muted'>
                <small>
                  Showing {(pagination.current_page - 1) * pagination.per_page + 1} to{' '}
                  {Math.min(pagination.current_page * pagination.per_page, pagination.total_items)}{' '}
                  of {pagination.total_items} book queries
                </small>
              </div>
            </>
          ) : (
            <div className='text-center py-5'>
              <div className='mb-4'>
                <Book size={64} className='text-muted mx-auto' />
              </div>
              <h4 className='text-muted'>No Book Queries Found</h4>
              <p className='text-muted mb-4'>
                You haven't submitted any book publication requests yet.
              </p>
              <a href='/publish-book' className='btn btn-animation'>
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
