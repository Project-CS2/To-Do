import express from "express";
import Task from "../models/task.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Pobierz wszystkie zadania
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find().populate("ownerId", "name").populate("assignees", "name");
  res.json(tasks);
});

// Dodaj zadanie
router.post("/", authMiddleware, async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

// Aktualizuj zadanie
router.put("/:id", authMiddleware, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// Usuń zadanie
router.delete("/:id", authMiddleware, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Task deleted" });
});

export default router;
