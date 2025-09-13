import { BOOKS_AUTHORS, BOOKS_LIST, BOOKS_SEARCH } from './API';

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


export const searchBooks = async (params: {
  q?: string;
  category?: string;
  author?: string;
}) => {
  const query = new URLSearchParams();

  if (params.q) query.append('q', params.q);
  if (params.category) query.append('category', params.category);
  if (params.author) query.append('author', params.author);

  const res = await fetch(`${BOOKS_SEARCH}?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to search books');
  return res.json();
};

export const getAuthors = async () => {
  const res = await fetch(BOOKS_AUTHORS);
  if (!res.ok) throw new Error('Failed to fetch authors');
  return res.json();
};
