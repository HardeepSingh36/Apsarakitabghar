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
}
