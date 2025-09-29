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
  cart_item_id?: number;
  cart_id: number;
  book_id: number;
  title: string;
  slug: string;
  price: number;
  discount_percent: number;
  discounted_price: number;
  quantity: number;
  line_total: number;
  stock_quantity: number;
  cover_image_name: string;
  author_name?: string;
  author_pen_name?: string;
  publisher_name?: string;
  pages?: number;
  saving?: number;
  price_at_add?: number;
  added_at?: string;
  cart_subtotal?: string;
  cart_discount?: string;
  cart_total?: string;
  current_discounted_price?: number;
  discounted_price_at_add?: number;
  current_line_total?: number;
  price_changed?: boolean;
  price_difference?: number;
  in_stock?: boolean;
  max_quantity?: number;
  availability_status?: string;
  book_status?: string;
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
