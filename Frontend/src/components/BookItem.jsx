import React from "react";
import { Button, Typography } from "@mui/material";
import { useBorrowBookMutation, useReturnBookMutation } from "../api/bookApi";

const BookItem = ({ book, onEdit, onDelete, borrowedBooks }) => {
  const [borrowBook] = useBorrowBookMutation();
  const [returnBook] = useReturnBookMutation();

  // Check if the book is borrowed by the current user
  const isBorrowed = borrowedBooks.has(book._id);

  // Handle click event for the borrow/return button
  const handleClick = () => {
    if (isBorrowed) {
      returnBook(String(book._id));
    } else {
      borrowBook(String(book._id));
    }
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <Typography variant="h6">{book.title}</Typography>
      <Typography>Category: {book.category}</Typography>
      <Typography>ISBN: {book.isbn}</Typography>
      <Typography>Quantity: {book.quantity}</Typography>
      <div style={{ marginTop: "10px" }}>
        <Button
          variant="outlined"
          onClick={() => onEdit(book)}
          style={{ marginRight: "10px" }}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => onDelete(book._id)}
          style={{ marginRight: "10px" }}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color={isBorrowed ? "secondary" : "primary"}
          onClick={handleClick}
        >
          {isBorrowed ? "Return" : "Borrow"}
        </Button>
      </div>
    </div>
  );
};

export default BookItem;
