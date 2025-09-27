// Base URL (local or production)
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL + '/api' || 'http://localhost/apsra/simple-api';

// ------------- Health & Info -------------
export const API_INDEX = `${API_BASE_URL}/index`;
export const API_HEALTH = `${API_BASE_URL}/health`;

// ------------- Authentication -------------
export const AUTH_REGISTER = `${API_BASE_URL}/auth/register`;
export const AUTH_LOGIN = `${API_BASE_URL}/auth/login`;
export const AUTH_ME = `${API_BASE_URL}/auth/me`;

// ------------- Public Books -------------
export const BOOKS_LIST = `${API_BASE_URL}/books-list`;
export const BOOKS_SINGLE = `${API_BASE_URL}/books/single`;
export const BOOKS_SEARCH = `${API_BASE_URL}/books/search`;
export const BOOKS_AUTHORS = `${API_BASE_URL}/books/authors`;
export const BOOKS_CATEGORIES = `${API_BASE_URL}/categories-list`;
export const IMAGE_PATH = 'https://apsrakitabghar.com/uploads/';

// ------------- Admin / Publisher -------------
export const ADMIN_BOOKS = `${API_BASE_URL}/admin/books`;
export const ADMIN_CREATE_BOOK = `${API_BASE_URL}/admin/create-book`;
export const ADMIN_UPDATE_BOOK = `${API_BASE_URL}/admin/update-book`; // use ?id=
export const ADMIN_DELETE_BOOK = `${API_BASE_URL}/admin/delete-book`; // use ?id=
