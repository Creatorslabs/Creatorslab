import express from "express";
import { createTask, getTasks, getLoggedInUserTasks, getTaskById, updateTask, deleteTask } from "../controllers/taskController";
import authMiddleware from "../middleware/authMiddleware";


const router = express.Router();

// @route   POST /api/tasks
router.post("/", authMiddleware, createTask);

// @route   GET /api/tasks
router.get("/", authMiddleware, getTasks);

// @route   GET /api/tasks/getMyTask
router.get("/getMyTask", authMiddleware, getLoggedInUserTasks);

// @route   GET /api/tasks/:id
router.get("/:id", authMiddleware, getTaskById);

// @route   PUT /api/tasks/:id
router.put("/:id", authMiddleware, updateTask);

// @route   DELETE /api/tasks/:id
router.delete("/:id", authMiddleware, deleteTask);

export default router;
