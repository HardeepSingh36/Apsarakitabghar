export interface Item {
  id: number;
  name: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
  author: string;
  description: string;
  isBest?: boolean;
};

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
