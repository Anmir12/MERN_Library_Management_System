import React, { useState, useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useGetBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useReturnBookMutation,
  useGetUserBorrowingsQuery,
} from "../api/bookApi";
import Header from "../components/Header";
import BookItem from "../components/BookItem";
import Pagination from "../components/Pagination";
import EditBookForm from "../components/EditBookForm";

const HomePage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  const { data: books = [], error, isLoading, refetch } = useGetBooksQuery();
  const {
    data: borrowings = [],
    isLoading: borrowingsLoading,
    error: borrowingsError,
  } = useGetUserBorrowingsQuery();
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const [borrowBook] = useBorrowBookMutation();
  const [returnBook] = useReturnBookMutation();
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState(new Set());

  useEffect(() => {
    if (borrowings) {
      setBorrowedBooks(
        new Set(borrowings.map((borrowing) => borrowing.book._id))
      );
    }
  }, [borrowings]);

  const handleEdit = (book) => setSelectedBook(book);

  const handleDelete = async (id) => {
    try {
      await deleteBook(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  const handleBorrow = async (bookId) => {
    try {
      const response = await borrowBook({ bookId }).unwrap();
      console.log("Book borrowed successfully:", response);
      refetch();
    } catch (error) {
      console.error("Failed to borrow book:", error);
    }
  };

  const handleReturn = async (bookId) => {
    try {
      await returnBook({ bookId }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to return book:", error);
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const handleAddBook = () => navigate("/add-book");

  const handleUpdate = async (updatedBook) => {
    try {
      await updateBook({ id: updatedBook._id, ...updatedBook }).unwrap();
      setSelectedBook(null);
      refetch();
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  const handleClose = () => setSelectedBook(null);

  const paginatedBooks = books.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  return (
    <div>
      <Header />
      <Container>
        <Typography variant="h4" style={{ margin: "20px 0" }}>
          Books
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddBook}
          style={{ marginBottom: "20px" }}
        >
          Add Book
        </Button>
        {isLoading && <Typography>Loading books...</Typography>}
        {error && <Typography>Error loading books</Typography>}
        {borrowingsLoading && <Typography>Loading borrowings...</Typography>}
        {borrowingsError && <Typography>Error loading borrowings</Typography>}
        {paginatedBooks.map((book) => (
          <BookItem
            key={book._id}
            book={book}
            onEdit={handleEdit}
            onDelete={() => handleDelete(book._id)}
            onBorrow={() => handleBorrow(book._id)}
            onReturn={() => handleReturn(book._id)}
            borrowedBooks={borrowedBooks}
          />
        ))}
        {books.length > booksPerPage && (
          <Pagination
            totalBooks={books.length}
            booksPerPage={booksPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
      {selectedBook && (
        <EditBookForm
          open={!!selectedBook}
          onClose={handleClose}
          book={selectedBook}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default HomePage;
