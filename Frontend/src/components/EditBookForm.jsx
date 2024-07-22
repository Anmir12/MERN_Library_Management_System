import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const EditBookForm = ({ open, onClose, book, onUpdate }) => {
  const [updatedBook, setUpdatedBook] = useState({ ...book });

  useEffect(() => {
    setUpdatedBook(book);
  }, [book]);

  const handleChange = (e) => {
    setUpdatedBook({ ...updatedBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedBook);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Book</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            value={updatedBook.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="author"
            label="Author"
            value={updatedBook.author}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="isbn"
            label="ISBN"
            value={updatedBook.isbn}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="quantity"
            label="Quantity"
            value={updatedBook.quantity}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookForm;
