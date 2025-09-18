export interface Category {
  created_at: string;
  description: string;
  id: number;
  name: string;
  parent_id: number | null;
  slug: string;
  status: string;
  updated_at: string;
}

export interface Book {
  id: number;
  title: string;
  subtitle: string | null;
  slug: string | null;
  description: string;
  isbn: string;
  language: string;
  publisher_id: number;
  published_date: string;
  edition: string | null;
  pages: number;
  format: 'hardcover' | 'paperback' | 'ebook' | string;
  price: number;
  discount: number;
  stock: number;
  cover_image: string | null;
  sample_file: string | null;
  author_ids: string[];
  category_ids: string[];
  status: 'active' | 'inactive' | string;
  created_by: number;
  created_at: string;
  updated_at: string;
  publisher_name: string;
  author_names: string;
  discounted_price: number;
  cover_image_url: string;
  trending: number;
  top: number;
  popular: number;
  isBest?: boolean;
}

export interface CartItem {
  id: number | string;
  name: string;
  author: string;
  img: string;
  soldBy: string;
  quantity: number;
  pages: number;
  price: number;
  oldPrice: number;
  saving: number;
  total: number;
}

export interface WishlistItem {
  id: number;
  name: string;
  author: string;
  img: string;
  price: number;
  oldPrice: number;
  rating: number;
  pages: number;
}
