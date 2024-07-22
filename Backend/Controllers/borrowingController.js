import Borrowing from '../Models/borrowingModel.js'; 
import Book from '../models/bookModel.js'; 


const borrowBook = async (req, res) => {
  const { bookId } = req.body;

  try {
    // Check if the user has already borrowed a book
    const existingBorrowing = await Borrowing.findOne({ user: req.user._id, status: 'borrowed' });
    if (existingBorrowing) {
      return res.status(400).json({ message: 'User can only borrow one book at a time' });
    }

    // Check if the book exists and is available
    const book = await Book.findById(bookId);
    if (!book || book.quantity <= 0) {
      return res.status(400).json({ message: 'Book is not available' });
    }

    // Create a new borrowing record
    const borrowing = new Borrowing({
      user: req.user._id,
      book: bookId,
    });

    await borrowing.save();

    // Decrease the book's quantity
    book.quantity -= 1;
    await book.save();

    res.status(201).json(borrowing);
  } catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const returnBook = async (req, res) => {
  const { bookId } = req.body;

  try {
    // Find the borrowing record
    const borrowing = await Borrowing.findOne({ book: bookId, user: req.user._id, status: 'borrowed' });

    if (!borrowing) {
      return res.status(404).json({ message: 'Borrowing record not found' });
    }

    // Update the borrowing record
    borrowing.status = 'returned';
    borrowing.returnDate = new Date();
    await borrowing.save();

    // Update the book quantity
    const book = await Book.findById(bookId);
    if (book) {
      book.quantity += 1;
      await book.save();
    }

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getBorrowings = async (req, res) => {
  try {
    const borrowings = await Borrowing.find({ user: req.user._id }).populate('book');
    res.status(200).json(borrowings);
  } catch (error) {
    console.error('Error fetching borrowings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { borrowBook, returnBook, getBorrowings };
