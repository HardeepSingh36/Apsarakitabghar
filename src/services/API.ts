// Base URL (local or production)
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL + '/api' || 'http://localhost/apsra/simple-api';

// ------------- Health & Info -------------
export const API_INDEX = `${API_BASE_URL}/index`;
export const API_HEALTH = `${API_BASE_URL}/health`;

// ------------- Authentication -------------
export const AUTH_REGISTER = `${API_BASE_URL}/register`;
export const AUTH_LOGIN = `${API_BASE_URL}/login`;
export const AUTH_ME = `${API_BASE_URL}/profile`;

// ------------- Public Books -------------
export const BOOKS_LIST = `${API_BASE_URL}/books-list`;
export const BOOKS_SINGLE = `${API_BASE_URL}/books/single`;
export const BOOKS_GET = `${API_BASE_URL}/books-get`;
export const BOOKS_BY_SLUG = `${API_BASE_URL}/books-by-slug`;
export const BOOKS_BY_CATEGORY = `${API_BASE_URL}/books-by-category`;
export const BOOKS_BY_AUTHOR = `${API_BASE_URL}/books-by-author`;
export const BOOKS_BY_GENRE = `${API_BASE_URL}/books-by-genre`;
export const BOOKS_BY_TAGS = `${API_BASE_URL}/books-by-tags`;
export const BOOKS_BY_FLAGS = `${API_BASE_URL}/books-by-flags`;
export const BOOKS_SEARCH = `${API_BASE_URL}/books-search`;
export const BOOKS_AUTHORS = `${API_BASE_URL}/books-by-author`;
export const BOOKS_CATEGORIES = `${API_BASE_URL}/categories-list`;
export const BOOKS_GENRES = `${API_BASE_URL}/genres-list`;
export const IMAGE_PATH = 'https://apsrakitabghar.com/uploads/';

// ------------- Authors -------------
export const AUTHORS_LIST = `${API_BASE_URL}/authors-list`;
export const AUTHORS_SEARCH = `${API_BASE_URL}/authors-search`;

// ------------- Admin / Publisher -------------
export const ADMIN_BOOKS = `${API_BASE_URL}/admin/books`;
export const ADMIN_CREATE_BOOK = `${API_BASE_URL}/admin/create-book`;
export const ADMIN_UPDATE_BOOK = `${API_BASE_URL}/admin/update-book`; // use ?id=
export const ADMIN_DELETE_BOOK = `${API_BASE_URL}/admin/delete-book`; // use ?id=

// ------------- Cart Operations -------------
export const CART_ADD = `${API_BASE_URL}/cart-add`;
export const CART_LIST = `${API_BASE_URL}/cart-list`;
export const CART_UPDATE = `${API_BASE_URL}/cart-update`;
export const CART_REMOVE = `${API_BASE_URL}/cart-remove`;
export const CART_CLEAR = `${API_BASE_URL}/cart-clear`;

// ------------- CAPTCHA -------------
export const CAPTCHA_CONFIG = `${API_BASE_URL}/captcha-config`;
export const CAPTCHA_VERIFY = `${API_BASE_URL}/captcha-verify`;

// ------------- Addresses -------------
export const ADDRESSES_LIST = `${API_BASE_URL}/addresses-list`;
export const ADDRESSES_ADD = `${API_BASE_URL}/addresses-add`;
export const ADDRESSES_UPDATE = `${API_BASE_URL}/addresses-update`;
export const ADDRESSES_DELETE = `${API_BASE_URL}/addresses-delete`;
