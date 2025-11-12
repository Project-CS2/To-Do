import express from "express";
import User from "../models/user.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Lista użytkowników
router.get("/", authMiddleware, async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

export default router;
