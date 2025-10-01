import { BOOKS_BY_FLAGS } from './API';

export interface BooksByFlagsParams {
  is_new?: boolean | number;
  is_trending?: boolean | number;
  is_popular?: boolean | number;
  is_best_seller?: boolean | number;
  featured?: boolean | number;
  category_id?: number;
  author_id?: number;
  genre_id?: number;
  min_price?: number;
  max_price?: number;
  language?: string;
  page?: number;
  limit?: number;
  sort?:
    | 'created_at'
    | 'title'
    | 'price'
    | 'rating_avg'
    | 'publish_date'
    | 'views_count'
    | 'sales_count';
  order?: 'ASC' | 'DESC';
}

export interface BookFlag {
  id: number;
  title: string;
  slug: string;
  price: number;
  discounted_price?: number;
  savings?: number;
  featured: boolean;
  is_new: boolean;
  is_trending: boolean;
  is_popular: boolean;
  is_best_seller: boolean;
  active_flags: string[];
  author_display_name: string;
  stock_status: string;
  in_stock: boolean;
  cover_image_name?: string;
  rating_avg?: number;
  language?: string;
  category_name?: string;
  genre_name?: string;
  publish_date?: string;
  views_count?: number;
  sales_count?: number;
}

export interface BooksByFlagsPagination {
  current_page: number;
  per_page: number;
  total_books: number;
  total_pages: number;
  has_next_page: boolean;
  has_prev_page: boolean;
  next_page: number | null;
  prev_page: number | null;
}

export interface BooksByFlagsFilters {
  active_flags: string[];
  sort_by: string;
  sort_order: string;
  applied_filters: string[];
}

export interface BooksByFlagsSummary {
  total_results: number;
  query_flags: string[];
  results_per_page: number;
}

export interface BooksByFlagsResponse {
  status: string;
  message: string;
  data: {
    books: BookFlag[];
    pagination: BooksByFlagsPagination;
    filters: BooksByFlagsFilters;
    summary: BooksByFlagsSummary;
  };
}

export const booksByFlagsService = {
  // Get books by flags with optional filters
  getBooksByFlags: async (params: BooksByFlagsParams = {}): Promise<BooksByFlagsResponse> => {
    const searchParams = new URLSearchParams();

    // Add flag parameters
    if (params.is_new !== undefined) {
      searchParams.append('is_new', params.is_new ? '1' : '0');
    }
    if (params.is_trending !== undefined) {
      searchParams.append('is_trending', params.is_trending ? '1' : '0');
    }
    if (params.is_popular !== undefined) {
      searchParams.append('is_popular', params.is_popular ? '1' : '0');
    }
    if (params.is_best_seller !== undefined) {
      searchParams.append('is_best_seller', params.is_best_seller ? '1' : '0');
    }
    if (params.featured !== undefined) {
      searchParams.append('featured', params.featured ? '1' : '0');
    }

    // Add filter parameters
    if (params.category_id) {
      searchParams.append('category_id', params.category_id.toString());
    }
    if (params.author_id) {
      searchParams.append('author_id', params.author_id.toString());
    }
    if (params.genre_id) {
      searchParams.append('genre_id', params.genre_id.toString());
    }
    if (params.min_price) {
      searchParams.append('min_price', params.min_price.toString());
    }
    if (params.max_price) {
      searchParams.append('max_price', params.max_price.toString());
    }
    if (params.language) {
      searchParams.append('language', params.language);
    }

    // Add pagination parameters
    if (params.page) {
      searchParams.append('page', params.page.toString());
    }
    if (params.limit) {
      searchParams.append('limit', params.limit.toString());
    }

    // Add sorting parameters
    if (params.sort) {
      searchParams.append('sort', params.sort);
    }
    if (params.order) {
      searchParams.append('order', params.order);
    }

    const url = `${BOOKS_BY_FLAGS}?${searchParams.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch books by flags');
    }

    return response.json();
  },

  // Convenience methods for specific flags
  getNewBooks: (params: Omit<BooksByFlagsParams, 'is_new'> = {}) =>
    booksByFlagsService.getBooksByFlags({ ...params, is_new: true }),

  getTrendingBooks: (params: Omit<BooksByFlagsParams, 'is_trending'> = {}) =>
    booksByFlagsService.getBooksByFlags({ ...params, is_trending: true }),

  getPopularBooks: (params: Omit<BooksByFlagsParams, 'is_popular'> = {}) =>
    booksByFlagsService.getBooksByFlags({ ...params, is_popular: true }),

  getBestSellerBooks: (params: Omit<BooksByFlagsParams, 'is_best_seller'> = {}) =>
    booksByFlagsService.getBooksByFlags({ ...params, is_best_seller: true }),

  getFeaturedBooks: (params: Omit<BooksByFlagsParams, 'featured'> = {}) =>
    booksByFlagsService.getBooksByFlags({ ...params, featured: true }),

  // Get books with multiple flags
  getNewAndTrendingBooks: (params: Omit<BooksByFlagsParams, 'is_new' | 'is_trending'> = {}) =>
    booksByFlagsService.getBooksByFlags({ ...params, is_new: true, is_trending: true }),

  getBestSellerAndFeaturedBooks: (
    params: Omit<BooksByFlagsParams, 'is_best_seller' | 'featured'> = {}
  ) => booksByFlagsService.getBooksByFlags({ ...params, is_best_seller: true, featured: true }),
};

// Helper function to convert flag name to readable text
export const getFlagDisplayName = (flag: string): string => {
  const flagMap: Record<string, string> = {
    is_new: 'New Arrivals',
    is_trending: 'Trending',
    is_popular: 'Popular',
    is_best_seller: 'Best Sellers',
    featured: 'Featured',
  };
  return flagMap[flag] || flag;
};

// Helper function to get all available flags
export const getAvailableFlags = () => [
  { key: 'is_new', label: 'New Arrivals', value: true },
  { key: 'is_trending', label: 'Trending', value: true },
  { key: 'is_popular', label: 'Popular', value: true },
  { key: 'is_best_seller', label: 'Best Sellers', value: true },
  { key: 'featured', label: 'Featured', value: true },
];
