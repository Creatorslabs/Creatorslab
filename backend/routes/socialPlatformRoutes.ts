import express from "express";
import { createSocialPlatform, getSocialPlatforms, getSocialPlatformById, updateSocialPlatform, deleteSocialPlatform } from "../controllers/socialPlatformController";


const router = express.Router();

router.post("/", createSocialPlatform);
router.get("/", getSocialPlatforms);
router.get("/:id", getSocialPlatformById);
router.put("/:id", updateSocialPlatform);
router.delete("/:id", deleteSocialPlatform);

export default router;
