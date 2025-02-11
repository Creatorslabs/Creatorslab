import { Request, Response } from "express";
import mongoose from "mongoose";
import Task from "../models/Task";
import SocialPlatform from "../models/SocialPlatform";
import EngagementType from "../models/EngagementType";

// Function to check if an ID is a valid ObjectId
const isValidObjectId = (id: string): boolean =>
  mongoose.Types.ObjectId.isValid(id);

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req: Request, res: Response) => {
  try {
    const {
      title,
      image,
      socialPlatform,
      engagementType,
      rate,
      description,
      taskLink,
      taskPrice,
    } = req.body;

    if (
      !title ||
      !image ||
      !rate ||
      !description ||
      !taskLink ||
      taskPrice == null
    ) {
      res.status(400).json({
        status: "error",
        message: "All fields are required.",
        data: null,
      });
    }

    const validSocialPlatformIds = socialPlatform.filter(isValidObjectId);
    const validEngagementTypeIds = engagementType.filter(isValidObjectId);

    const socialPlatforms = await SocialPlatform.find({
      _id: { $in: validSocialPlatformIds },
    });
    const engagementTypes = await EngagementType.find({
      _id: { $in: validEngagementTypeIds },
    });

    if (
      socialPlatforms.length !== socialPlatform.length ||
      engagementTypes.length !== engagementType.length
    ) {
      res.status(400).json({
        status: "error",
        message: "Invalid Social Platform or Engagement Type IDs.",
        data: null,
      });
    }

    const task = new Task({
      title,
      image,
      socialPlatform,
      engagementType,
      rate,
      description,
      taskLink,
      taskPrice,
      user: req.user!.id,
    });

    await task.save();
    res.status(201).json({
      status: "success",
      message: "Task created successfully!",
      data: task,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error creating task", data: null });
  }
};

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks/user
// @access  Private
export const getLoggedInUserTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user!.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      status: "success",
      message: "Tasks retrieved successfully!",
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error fetching tasks", data: null });
  }
};

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
export const getTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      status: "success",
      message: "Tasks retrieved successfully!",
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error fetching tasks", data: null });
  }
};

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Private
export const getTaskById = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      res
        .status(400)
        .json({ status: "error", message: "Invalid task ID.", data: null });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      res
        .status(404)
        .json({ status: "error", message: "Task not found.", data: null });
    }

    if (task.user.toString() !== req.user?._id) {
      res
        .status(403)
        .json({ status: "error", message: "Not authorized.", data: null });
    }

    res.status(200).json({
      status: "success",
      message: "Task retrieved successfully!",
      data: task,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error fetching task", data: null });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      res
        .status(400)
        .json({ status: "error", message: "Invalid task ID.", data: null });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      res
        .status(404)
        .json({ status: "error", message: "Task not found.", data: null });
    }

    if (task.user.toString() !== req.user!.id) {
      res
        .status(403)
        .json({ status: "error", message: "Not authorized.", data: null });
    }

    Object.assign(task, req.body);
    await task.save();

    res.status(200).json({
      status: "success",
      message: "Task updated successfully!",
      data: task,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error updating task", data: null });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      res
        .status(400)
        .json({ status: "error", message: "Invalid task ID.", data: null });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      res
        .status(404)
        .json({ status: "error", message: "Task not found.", data: null });
    }

    if (task.user.toString() !== req.user!.id) {
      res
        .status(403)
        .json({ status: "error", message: "Not authorized.", data: null });
    }

    await task.deleteOne();
    res.status(200).json({
      status: "success",
      message: "Task deleted successfully!",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error deleting task", data: null });
  }
};
