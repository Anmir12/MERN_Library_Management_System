import React from "react";
import {
  useGetBooksQuery,
  useBorrowBookMutation,
  useReturnBookMutation,
  useGetUserBorrowingsQuery,
} from "../api/bookApi";
import BookList from "./BookList";
import { CircularProgress } from "@mui/material";

const ManageBooks = () => {
  const { data: books, isLoading } = useGetBooksQuery();
  const { data: borrowedBooks, isLoading: borrowingLoading } =
    useGetUserBorrowingsQuery();
  const [borrowBook] = useBorrowBookMutation();
  const [returnBook] = useReturnBookMutation();

  const borrowedBookIds = new Set(borrowedBooks?.map((b) => b.book._id));

  const handleBorrow = async (bookId) => {
    try {
      await borrowBook(bookId).unwrap();
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  };

  const handleReturn = async (bookId) => {
    try {
      await returnBook(bookId).unwrap();
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  if (isLoading || borrowingLoading) return <CircularProgress />;

  return (
    <BookList
      books={books}
      onBorrow={handleBorrow}
      onReturn={handleReturn}
      borrowedBooks={borrowedBookIds}
    />
  );
};

export default ManageBooks;
