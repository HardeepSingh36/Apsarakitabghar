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
  GENRES_SEARCH,
  TAGS_SEARCH,
} from './API';

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
