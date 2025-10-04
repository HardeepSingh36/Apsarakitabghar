export interface Category {
  id: number;
  category_name: string;
  parent_id: number | null;
  status: string;
  created_at: string;
  updated_at: string;
  book_count: number;
  parent_name: string | null;
  children: Category[];
}

export interface Genre {
  id: number;
  genre_name: string;
  slug: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  book_count: number;
  avg_rating: number;
  avg_price: number;
  min_price: number;
  max_price: number;
  total_sales: number;
}

export interface Book {
  id: number;
  title: string;
  slug: string;
  description: string;
  isbn: string;
  language: string;
  price: number;
  discount_percent: number;
  stock_quantity: number;
  pages: number;
  publisher_name: string;
  publish_date: string;
  cover_image_name: string;
  featured: number;
  views_count: number;
  sales_count: number;
  rating_avg: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
  author_id: number;
  category_id: number;
  genre_id: number;
  author_table_id: number | null;
  author_name: string | null;
  author_pen_name: string | null;
  category_table_id: number;
  category_name: string;
  genre_table_id: number | null;
  genre_name: string | null;
  tags: any[];
  discounted_price: number;
}

export interface CartItem {
  cart_item_id: number;
  cart_id: number;
  book_id: number;
  quantity: number;
  price_at_add: number;
  added_at: string;
  cart_subtotal: string;
  cart_discount: string;
  cart_total: string;
  title: string;
  slug: string;
  price: number;
  discount_percent: number;
  cover_image_name: string;
  stock_quantity: number;
  book_status: string;
  author_name: string;
  author_pen_name: string;
  current_discounted_price: number;
  discounted_price_at_add: number;
  line_total: number;
  current_line_total: number;
  price_changed: boolean;
  price_difference: number;
  in_stock: boolean;
  max_quantity: number;
  availability_status: string;
}

export interface WishlistItem extends Book {
  rating: number;
}

// captcha config
export interface CaptchaConfig {
  site_key: string;
  version: string;
  theme: string;
  size: string;
  callback: string | null;
  expired_callback: string | null;
  error_callback: string | null;
  badge: string;
  instructions: {
    frontend_integration: string;
    script_url: string;
    verification_endpoint: string;
    required_fields: string[];
  };
}

// Forgot Password API Types
export interface ForgotPasswordResponse {
  status: string;
  message: string;
  data: {
    email: string;
    expires_in: number; // in seconds (3600 = 1 hour)
    note: string;
    support_email: string;
  };
}

export interface ForgotPasswordErrorResponse {
  status: string;
  message: string;
  errors?: {
    email?: string[];
    captcha_token?: string[];
  };
}

export interface ForgotPasswordRequest {
  email: string;
  captcha_token: string;
}

// Related Books API Types
export interface Tag {
  id: number;
  tag_name: string;
  slug?: string;
}

export interface RelatedBook extends Book {
  relation_type: 'category' | 'genre' | 'tags' | 'author';
  relation_score: number;
  savings: number;
  in_stock: boolean;
  stock_status: string;
  author_display_name: string | null;
  active_flags: string[];
}

export interface SourceBook {
  id: number;
  title: string;
  author_name: string;
  category_name: string;
  genre_name: string;
  tags: Tag[];
}

export interface RelatedBooksResponse {
  status: string;
  message: string;
  data: {
    source_book: SourceBook;
    related_books: RelatedBook[];
    books_by_relation: {
      category: RelatedBook[];
      genre: RelatedBook[];
      tags: RelatedBook[];
      author: RelatedBook[];
    };
    summary: {
      total_related: number;
      by_category: number;
      by_genre: number;
      by_tags: number;
      by_author: number;
      relations_used: string[];
    };
    filters_applied: {
      include_category: boolean;
      include_genre: boolean;
      include_tags: boolean;
      include_author: boolean;
      limit: number;
    };
  };
}

// Book Query Types for Publication Requests
export interface BookQuery {
  id: number;
  anonymous: boolean;
  author_name: string;
  email: string;
  mobile: string;
  category_id: number;
  genre_id: number;
  book_language: string;
  book_title: string;
  book_description: string;
  pdf_file_name: string | null;
  notes: string;
  status: 'received' | 'under_review' | 'approved' | 'rejected' | 'published';
  admin_response: string | null;
  reviewed_at: string | null;
  created_at: string;
  category_name: string;
  genre_name: string;
}

export interface PublishBookRequest {
  book_title: string;
  book_language: string;
  book_description?: string;
  category_id?: number;
  genre_id?: number;
  author_name?: string;
  email?: string;
  mobile?: string;
  anonymous?: boolean;
  notes?: string;
  captcha_token: string;
}

export interface PublishBookResponse {
  status: string;
  message: string;
  data?: BookQuery;
}

export interface BookQueriesResponse {
  status: string;
  message: string;
  data: {
    queries: BookQuery[];
    pagination: {
      current_page: number;
      per_page: number;
      total_items: number;
      total_pages: number;
      has_next: boolean;
      has_prev: boolean;
    };
  };
}
