import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useCreateBookMutation,
  useUpdateBookMutation,
  useGetBookByIdQuery,
} from "../api/bookApi";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useParams } from "react-router-dom";

const BookForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // For editing a specific book
  const { data: book, error } = useGetBookByIdQuery(id, { skip: !id });

  const [createBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: 1,
  });

  useEffect(() => {
    if (book) {
      setBookDetails({
        title: book.title || "",
        author: book.author || "",
        isbn: book.isbn || "",
        quantity: book.quantity || 1,
      });
    }
  }, [book]);

  const handleChange = (e) => {
    setBookDetails({ ...bookDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      try {
        await updateBook({ id, ...bookDetails }).unwrap();
      } catch (error) {
        console.error("Failed to update book:", error);
      }
    } else {
      try {
        await createBook(bookDetails).unwrap();
      } catch (error) {
        console.error("Failed to create book:", error);
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">{id ? "Edit Book" : "Add Book"}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Title"
          value={bookDetails.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="author"
          label="Author"
          value={bookDetails.author}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="isbn"
          label="ISBN"
          value={bookDetails.isbn}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="quantity"
          label="Quantity"
          type="number"
          value={bookDetails.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {id ? "Update Book" : "Add Book"}
        </Button>
      </form>
    </Container>
  );
};

export default BookForm;
