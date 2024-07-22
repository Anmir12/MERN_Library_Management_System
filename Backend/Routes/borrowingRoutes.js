import express from "express";
import { check } from "express-validator";
import {
  borrowBook,
  returnBook,
  getBorrowings,
} from "../Controllers/borrowingController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validate from "../middleware/validationMiddleware.js";

const router = express.Router();

// Validation rules for borrow and return operations
const bookIdValidation = [
  check("bookId")
    .notEmpty()
    .withMessage("Book ID is required")
    .isMongoId()
    .withMessage("Invalid Book ID"),
];

router.post("/borrow", authMiddleware, validate(bookIdValidation), borrowBook);

router.post("/return", authMiddleware, validate(bookIdValidation), returnBook);

router.get("/borrowed", authMiddleware, getBorrowings);

export default router;
