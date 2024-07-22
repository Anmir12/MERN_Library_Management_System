import { createSlice } from "@reduxjs/toolkit";
import { bookApi } from "../../api/bookApi";

const initialState = {
  books: [],
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(bookApi.endpoints.getBooks.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        bookApi.endpoints.getBooks.matchFulfilled,
        (state, action) => {
          state.books = action.payload;
          state.loading = false;
        }
      )
      .addMatcher(bookApi.endpoints.getBooks.matchRejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default bookSlice.reducer;
export const selectBooks = (state) => state.books.books;
export const selectBookById = (state, id) =>
  state.books.books.find((book) => book._id === id);
