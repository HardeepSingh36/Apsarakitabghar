import { BOOKS_CATEGORIES } from './API';

export interface Category {
  id: number;
  category_name: string;
  parent_id: number | null;
  status: string;
  book_count: number;
  parent_name: string | null;
  children: Category[];
}

export interface CategoriesResponse {
  status: string;
  message: string;
  data: {
    categories: Category[];
    total_categories: number;
    hierarchy: boolean;
  };
}

export const categoriesService = {
  async getCategories(): Promise<CategoriesResponse> {
    try {
      const response = await fetch(BOOKS_CATEGORIES);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getCategories:', error);
      throw error;
    }
  },
};

export default categoriesService;
