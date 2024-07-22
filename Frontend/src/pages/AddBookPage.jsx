import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../api/bookApi";
import { Container, TextField, Button, Typography } from "@mui/material";
import Header from "../components/Header";

const AddBookPage = () => {
  const navigate = useNavigate();
  const [createBook] = useCreateBookMutation();
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBook(newBook).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to create book:", error);
    }
  };

  return (
    <div>
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h4" style={{ margin: "20px 0" }}>
          Add Book
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            value={newBook.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="author"
            label="Author"
            value={newBook.author}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="isbn"
            label="ISBN"
            value={newBook.isbn}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="quantity"
            label="Quantity"
            value={newBook.quantity}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Book
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default AddBookPage;
