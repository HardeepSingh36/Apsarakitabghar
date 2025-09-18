import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBooks } from '@/services/bookService';
import type { Book } from '@/types/types';

interface BooksState {
  items: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await getBooks({});
  return response.books;
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default booksSlice.reducer;
