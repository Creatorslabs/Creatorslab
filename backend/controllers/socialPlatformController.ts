import { Request, Response } from "express";
import SocialPlatform from "../models/SocialPlatform";

// Create a new Social Platform type
export const createSocialPlatform = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({
        status: "error",
        message: "Name is required.",
        data: null,
      });
    }

    const socialPlatform = new SocialPlatform({ name });
    await socialPlatform.save();
    res.status(201).json({
      status: "success",
      message: "Social Platform created successfully.",
      data: socialPlatform,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error creating Social Platform type.",
      data: "",
    });
  }
};

// Get all Social Platform types
export const getSocialPlatforms = async (req: Request, res: Response) => {
  try {
    const socialPlatforms = await SocialPlatform.find();
    res.status(200).json({
      status: "success",
      message: "Social Platforms retrieved successfully.",
      data: socialPlatforms,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching Social Platform types.",
      data: "",
    });
  }
};

// Get a Social Platform type by ID
export const getSocialPlatformById = async (req: Request, res: Response) => {
  try {
    const socialPlatform = await SocialPlatform.findById(req.params.id);
    if (!socialPlatform) {
      res.status(404).json({
        status: "error",
        message: "Social Platform type not found.",
        data: "",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Social Platform retrieved successfully.",
      data: socialPlatform,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching Social Platform type.",
      data: "",
    });
  }
};

// Update a Social Platform type
export const updateSocialPlatform = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const socialPlatform = await SocialPlatform.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!socialPlatform) {
      res.status(404).json({
        status: "error",
        message: "Social Platform type not found.",
        data: "",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Social Platform updated successfully.",
      data: socialPlatform,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error updating Social Platform type.",
      data: "",
    });
  }
};

// Delete a Social Platform type
export const deleteSocialPlatform = async (req: Request, res: Response) => {
  try {
    const socialPlatform = await SocialPlatform.findByIdAndDelete(
      req.params.id
    );
    if (!socialPlatform) {
      res.status(404).json({
        status: "error",
        message: "Social Platform type not found.",
        data: "",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Social Platform type deleted.",
      data: "",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting Social Platform type.",
      data: "",
    });
  }
};
