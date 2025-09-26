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

export interface CartItem extends Book {
  quantity: number;
  total: number;
  saving: number;
}

export interface WishlistItem extends Book {
  rating: number;
}
