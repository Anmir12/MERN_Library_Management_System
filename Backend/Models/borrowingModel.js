import mongoose from 'mongoose';

const borrowingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Book',
    },
    borrowedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    returnDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['borrowed', 'returned'],
      default: 'borrowed',
    },
  },
  {
    timestamps: true,
  }
);

const Borrowing = mongoose.models.Borrowing || mongoose.model('Borrowing', borrowingSchema);

export default Borrowing;
