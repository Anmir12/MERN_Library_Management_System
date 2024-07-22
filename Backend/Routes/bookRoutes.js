import express from "express";
import { check } from "express-validator";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../Controllers/bookController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validate from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getBooks);

router.get("/:id", authMiddleware, getBookById);

router.post(
  "/",
  authMiddleware,
  validate([
    check("title").notEmpty().withMessage("Title is required"),
    check("author").notEmpty().withMessage("Author is required"),
    check("isbn")
      .notEmpty()
      .withMessage("ISBN is required")
      .custom((isbn) => {
        const regex = /^(97(8|9))?\d{9}(\d|X)$/;
        if (!regex.test(isbn)) {
          throw new Error("ISBN is invalid");
        }
        return true;
      }),
    check("quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ]),
  createBook
);

router.put(
  "/:id",
  authMiddleware,
  validate([
    check("title").optional().notEmpty().withMessage("Title cannot be empty"),
    check("author").optional().notEmpty().withMessage("Author cannot be empty"),
    check("isbn")
      .optional()
      .notEmpty()
      .withMessage("ISBN cannot be empty")
      .custom((isbn) => {
        const regex = /^(97(8|9))?\d{9}(\d|X)$/;
        if (!regex.test(isbn)) {
          throw new Error("ISBN is invalid");
        }
        return true;
      }),
    check("quantity")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ]),
  updateBook
);

router.delete("/:id", authMiddleware, deleteBook);

export default router;
