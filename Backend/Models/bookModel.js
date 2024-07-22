import mongoose from 'mongoose';

// Define the schema
const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
}, { timestamps: true });


const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

export default Book;
