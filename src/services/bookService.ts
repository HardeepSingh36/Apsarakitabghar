import { BOOKS_LIST } from './API';

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
