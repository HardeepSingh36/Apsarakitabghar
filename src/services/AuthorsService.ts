import { AUTHORS_SEARCH } from './API';

export const searchAuthors = async (params: { q?: string; category?: string; author?: string }) => {
  const query = new URLSearchParams();

  if (params.q) query.append('q', params.q);
  if (params.category) query.append('category', params.category);
  if (params.author) query.append('author', params.author);

  const res = await fetch(`${AUTHORS_SEARCH}?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to search authors');
  return res.json();
};
