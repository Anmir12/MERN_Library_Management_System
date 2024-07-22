import React from "react";
import {
  useGetBooksQuery,
  useBorrowBookMutation,
  useReturnBookMutation,
  useGetUserBorrowingsQuery,
} from "../api/bookApi";
import BookItem from "../components/BookItem";
import { CircularProgress, Container, Typography } from "@mui/material";

const BookListPage = () => {
  const {
    data: books = [],
    error: booksError,
    isLoading: booksLoading,
    refetch,
  } = useGetBooksQuery();
  const { data: borrowings = [], error: borrowingsError } =
    useGetUserBorrowingsQuery();
  const [borrowBook] = useBorrowBookMutation();
  const [returnBook] = useReturnBookMutation();

  if (booksLoading) return <CircularProgress />;
  if (booksError) return <p>Error: {booksError.message}</p>;
  if (borrowingsError) return <p>Error: {borrowingsError.message}</p>;

  const borrowedBooks = Array.isArray(borrowings)
    ? borrowings.map((borrowing) => borrowing.book)
    : [];

  const handleBorrow = async (bookId) => {
    try {
      await borrowBook(bookId).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to borrow book:", error);
    }
  };

  const handleReturn = async (bookId) => {
    try {
      await returnBook(bookId).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to return book:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Book List</Typography>
      {books.map((book) => (
        <BookItem
          key={book._id}
          book={book}
          onBorrow={handleBorrow}
          onReturn={handleReturn}
          borrowedBooks={borrowedBooks}
        />
      ))}
    </Container>
  );
};

export default BookListPage;
