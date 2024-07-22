import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const BookList = ({ books, onBorrow, onReturn, borrowedBooks }) => {
  return (
    <>
      {books.map((book) => (
        <Card
          key={book._id}
          style={{ marginBottom: "20px", position: "relative" }}
        >
          <CardContent>
            <Typography variant="h6">{book.title}</Typography>
            <Typography variant="subtitle1">Author: {book.author}</Typography>
            <Typography variant="body2">ISBN: {book.isbn}</Typography>
            <Typography variant="body2">Quantity: {book.quantity}</Typography>
          </CardContent>
          <CardActions
            style={{ position: "absolute", bottom: "10px", right: "10px" }}
          >
            {book.quantity > 0 && !borrowedBooks.has(book._id) ? (
              <Button
                size="small"
                color="primary"
                onClick={() => onBorrow(book._id)}
                disabled={borrowedBooks.has(book._id)}
              >
                Borrow
              </Button>
            ) : borrowedBooks.has(book._id) ? (
              <Button
                size="small"
                color="secondary"
                onClick={() => onReturn(book._id)}
              >
                Return
              </Button>
            ) : null}
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default BookList;
