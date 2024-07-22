import express from "express";
import { checkUserExists } from "../Controllers/authController.js";

const router = express.Router();

router.get("/exists", checkUserExists);

export default router;
