import express from "express";
import { createEngagementType, getEngagementTypes, getEngagementTypeById, updateEngagementType, deleteEngagementType } from "../controllers/engagementTypeController";

const router = express.Router();

router.post("/", createEngagementType);
router.get("/", getEngagementTypes);
router.get("/:id", getEngagementTypeById);
router.put("/:id", updateEngagementType);
router.delete("/:id", deleteEngagementType);

export default router;
