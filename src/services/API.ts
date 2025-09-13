// Base URL (local or production)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/apsra/simple-api';
// ------------- Health & Info -------------
export const API_INDEX = `${API_BASE_URL}/index.php`;
export const API_HEALTH = `${API_BASE_URL}/health.php`;

// ------------- Authentication -------------
export const AUTH_REGISTER = `${API_BASE_URL}/auth/register.php`;
export const AUTH_LOGIN = `${API_BASE_URL}/auth/login.php`;
export const AUTH_ME = `${API_BASE_URL}/auth/me.php`;

// ------------- Public Books -------------
export const BOOKS_LIST = `${API_BASE_URL}/books/list.php`;
export const BOOKS_SINGLE = `${API_BASE_URL}/books/single.php`; 
export const BOOKS_SEARCH = `${API_BASE_URL}/books/search.php`;
export const BOOKS_AUTHORS = `${API_BASE_URL}/books/authors.php`;
export const BOOKS_CATEGORIES = `${API_BASE_URL}/books/categories.php`;
export const IMAGE_PATH= 'https://apsrakitabghar.com/uploads/';

// ------------- Admin / Publisher -------------
export const ADMIN_BOOKS = `${API_BASE_URL}/admin/books.php`;
export const ADMIN_CREATE_BOOK = `${API_BASE_URL}/admin/create-book.php`;
export const ADMIN_UPDATE_BOOK = `${API_BASE_URL}/admin/update-book.php`; // use ?id=
export const ADMIN_DELETE_BOOK = `${API_BASE_URL}/admin/delete-book.php`; // use ?id=
