import { BOOKS_CATEGORIES } from './API';

export interface Category {
  id: number;
  category_name: string;
  parent_id: number | null;
  status: 'active' | 'inactive';
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

export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    try {
      const res = await fetch(BOOKS_CATEGORIES);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data: CategoriesResponse = await res.json();
      if (data.status === 'success') {
        return data.data.categories;
      }
      return [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  getCategory: async (id: number): Promise<Category | null> => {
    try {
      const res = await fetch(`${BOOKS_CATEGORIES}?id=${id}`);
      if (!res.ok) throw new Error('Failed to fetch category');
      const data = await res.json();
      if (data.status === 'success') {
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  }
};