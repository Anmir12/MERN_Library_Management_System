import express from "express";
import { check } from "express-validator";
import { registerUser, loginUser } from "../Controllers/userController.js";
import validate from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  validate([
    check("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ]),
  registerUser
);

router.post(
  "/login",
  validate([
    check("username").notEmpty().withMessage("Username is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ]),
  loginUser
);

export default router;
