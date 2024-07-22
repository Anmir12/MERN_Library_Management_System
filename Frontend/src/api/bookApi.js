import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery,
  tagTypes: ["Book", "Borrowing"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "books",
      providesTags: ["Book"],
    }),
    getBookById: builder.query({
      query: (id) => `books/${id}`,
      providesTags: (result, error, id) => [{ type: "Book", id }],
    }),
    createBook: builder.mutation({
      query: (newBook) => ({
        url: "books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...updatedBook }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: updatedBook,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Book", id }],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Book", id }],
    }),
    borrowBook: builder.mutation({
      query: (bookId) => ({
        url: "/borrowings/borrow",
        method: "POST",
        body: { bookId: String(bookId) }, // Ensure bookId is sent as a string
      }),
      invalidatesTags: ["Borrowing"],
    }),
    returnBook: builder.mutation({
      query: (bookId) => ({
        url: "/borrowings/return",
        method: "POST",
        body: { bookId: String(bookId) }, // Ensure bookId is sent as a string
      }),
      invalidatesTags: ["Borrowing"],
    }),
    getUserBorrowings: builder.query({
      query: () => "/borrowings/borrowed",
      providesTags: ["Borrowing"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useReturnBookMutation,
  useGetUserBorrowingsQuery,
} = bookApi;
