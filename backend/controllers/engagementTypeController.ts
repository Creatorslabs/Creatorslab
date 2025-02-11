import { Request, Response } from "express";
import EngagementType from "../models/EngagementType";

// Create a new engagement type
export const createEngagementType = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({
        status: "error",
        message: "Name is required.",
        data: null,
      });
    }
    const engagementType = new EngagementType({ name });
    await engagementType.save();
    res.status(201).json({
      status: "success",
      message: "Engagement created successfully.",
      data: engagementType,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating engagement type" });
  }
};

// Get all engagement types
export const getEngagementTypes = async (req: Request, res: Response) => {
  try {
    const engagementTypes = await EngagementType.find();
    res.status(200).json({
      status: "success",
      message: "Engagements retrieved successfully.",
      data: engagementTypes,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching engagement types.",
      data: "",
    });
  }
};

// Get an engagement type by ID
export const getEngagementTypeById = async (req: Request, res: Response) => {
  try {
    const engagementType = await EngagementType.findById(req.params.id);
    if (!engagementType) {
      res.status(404).json({
        status: "error",
        message: "Engagement type not found.",
        data: "",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Engagement retrieved successfully.",
      data: engagementType,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching engagement type.",
      data: "",
    });
  }
};

// Update an engagement type
export const updateEngagementType = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const engagementType = await EngagementType.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!engagementType) {
      res.status(404).json({
        status: "error",
        message: "Engagement type not found.",
        data: "",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Engagement updated successfully.",
      data: engagementType,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error updating engagement type.",
      data: "",
    });
  }
};

// Delete an engagement type
export const deleteEngagementType = async (req: Request, res: Response) => {
  try {
    const engagementType = await EngagementType.findByIdAndDelete(
      req.params.id
    );
    if (!engagementType) {
      res.status(404).json({
        status: "error",
        message: "Engagement type not found.",
        data: "",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Engagement type deleted.",
      data: "",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting engagement type.",
      data: "",
    });
  }
};
