import {
  BOOKS_AUTHORS,
  BOOKS_LIST,
  BOOKS_SEARCH,
  BOOKS_GET,
  BOOKS_BY_SLUG,
  BOOKS_BY_CATEGORY,
  BOOKS_BY_AUTHOR,
  BOOKS_BY_GENRE,
  BOOKS_BY_TAGS,
  BOOKS_RELATED,
  GENRES_SEARCH,
  TAGS_SEARCH,
  BOOK_QUERIES,
} from './API';
import type { PublishBookRequest, PublishBookResponse, BookQueriesResponse } from '@/types/types';

export const getBooks = async (params: {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
}) => {
  const query = new URLSearchParams({
    page: String(params.page ?? 1),
    limit: String(params.limit ?? 10),
    sort: params.sort ?? 'title',
    order: params.order ?? 'asc',
  });

  const res = await fetch(`${BOOKS_LIST}?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
};

export const getBookById = async (id: string | number) => {
  const res = await fetch(`${BOOKS_GET}?id=${id}`);
  if (!res.ok) throw new Error('Failed to fetch book');
  return res.json();
};

export const searchBooks = async (params: {
  q?: string;
  category?: string;
  author?: string;
  genre?: string;
  tag?: string;
}) => {
  const query = new URLSearchParams();

  if (params.q) query.append('q', params.q);
  if (params.category) query.append('category', params.category);
  if (params.author) query.append('author', params.author);
  if (params.genre) query.append('genre', params.genre);
  if (params.tag) query.append('tag', params.tag);

  const res = await fetch(`${BOOKS_SEARCH}?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to search books');
  return res.json();
};

export const getAuthors = async () => {
  const res = await fetch(BOOKS_AUTHORS);
  if (!res.ok) throw new Error('Failed to fetch authors');
  return res.json();
};

export const getBookBySlug = async (slug: string) => {
  const res = await fetch(`${BOOKS_BY_SLUG}?slug=${slug}`);
  if (!res.ok) throw new Error('Failed to fetch book by slug');
  return res.json();
};

export const getBooksByCategory = async (
  categoryId: string | number,
  params?: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: string;
  }
) => {
  const query = new URLSearchParams({
    category_id: String(categoryId),
    page: String(params?.page ?? 1),
    limit: String(params?.limit ?? 20),
    sort: params?.sort ?? 'title',
    order: params?.order ?? 'asc',
  });

  const res = await fetch(`${BOOKS_BY_CATEGORY}?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch books by category');
  return res.json();
};

export const getBooksByAuthor = async (
  authorId: string | number,
  params?: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: string;
  }
) => {
  const query = new URLSearchParams({
    author_id: String(authorId),
    page: String(params?.page ?? 1),
    limit: String(params?.limit ?? 20),
    sort: params?.sort ?? 'title',
    order: params?.order ?? 'asc',
  });

  const res = await fetch(`${BOOKS_BY_AUTHOR}?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch books by author');
  return res.json();
};

export const getBooksByGenre = async (
  genreId: string | number,
  params?: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: string;
  }
) => {
  const query = new URLSearchParams({
    genre_id: String(genreId),
    page: String(params?.page ?? 1),
    limit: String(params?.limit ?? 20),
    sort: params?.sort ?? 'title',
    order: params?.order ?? 'asc',
  });

  const res = await fetch(`${BOOKS_BY_GENRE}?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch books by genre');
  return res.json();
};

export const getBooksByTags = async (
  tagId: string | number,
  params?: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: string;
  }
) => {
  const query = new URLSearchParams({
    tag_id: String(tagId),
    page: String(params?.page ?? 1),
    limit: String(params?.limit ?? 20),
    sort: params?.sort ?? 'title',
    order: params?.order ?? 'asc',
  });

  const res = await fetch(`${BOOKS_BY_TAGS}?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch books by tags');
  return res.json();
};

export const searchGenres = async (params: { q?: string }) => {
  const query = new URLSearchParams();
  if (params.q) query.append('q', params.q);

  const res = await fetch(`${GENRES_SEARCH}?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to search genres');
  return res.json();
};

export const searchTags = async (params: { q?: string }) => {
  const query = new URLSearchParams();
  if (params.q) query.append('q', params.q);

  const res = await fetch(`${TAGS_SEARCH}?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to search tags');
  return res.json();
};

export const getRelatedBooks = async (
  bookId: string | number,
  params?: {
    limit?: number;
    include_category?: boolean;
    include_genre?: boolean;
    include_tags?: boolean;
    include_author?: boolean;
  }
): Promise<{ status: string; data: any }> => {
  const query = new URLSearchParams({
    book_id: String(bookId),
    limit: String(params?.limit ?? 12),
    include_category: params?.include_category !== false ? '1' : '0',
    include_genre: params?.include_genre !== false ? '1' : '0',
    include_tags: params?.include_tags !== false ? '1' : '0',
    include_author: params?.include_author === true ? '1' : '0',
  });

  const res = await fetch(`${BOOKS_RELATED}?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch related books');
  return res.json();
};



export const publishBook = async (requestData: PublishBookRequest): Promise<PublishBookResponse> => {
  const token = localStorage.getItem('auth_token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add Authorization header (required for this endpoint)
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(BOOK_QUERIES, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to submit book for publication');
  }

  return res.json();
};

export const getBookQueries = async (params?: {
  status?: 'received' | 'under_review' | 'approved' | 'rejected' | 'published';
  category_id?: number;
  page?: number;
  limit?: number;
}): Promise<BookQueriesResponse> => {
  const token = localStorage.getItem('auth_token');
  
  const query = new URLSearchParams();
  if (params?.status) query.append('status', params.status);
  if (params?.category_id) query.append('category_id', String(params.category_id));
  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));

  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = query.toString() ? `${BOOK_QUERIES}?${query.toString()}` : BOOK_QUERIES;
  const res = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch book queries');
  }

  return res.json();
};
