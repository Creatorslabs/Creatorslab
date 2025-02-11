import express, { Request, Response } from "express";
import { signup, login, registerUser, verifyEmail, getProfile } from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware";
import passport from "../config/passport";

const router = express.Router();

// @route   POST /api/auth/signup
router.post('/signup', signup);

// @route   POST /api/auth/login
router.post('/login', login);

// User Registration
router.post("/register", registerUser);

// Email Verification
router.post("/verify-email", verifyEmail);

// @route   GET /api/auth/profile
router.get("/profile", authMiddleware, getProfile);

router.get("/", (_req: Request, res: Response) => {
  res.send("Welcome Home!");
});

// Example login route
// router.get("/login", (_req: Request, res: Response) => {
//   res.send("Please log in.");
// });

console.log(passport);

// Twitter Authentication
router.get("/twitter", passport.authenticate("twitter"));
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "/api/auth/profile",
    failureMessage: true,
    failureRedirect: "/api/auth/",
  })
);

// Discord Authentication
router.get("/auth/discord", passport.authenticate("discord"));
router.get(
  "/auth/discord/callback",
  passport.authenticate("discord", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

export default router;
