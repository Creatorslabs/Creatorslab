import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session"
import connectDB from "./config/db";
import passport from "passport";
import authRoutes from "./routes/authRoutes";
import engagementTypeRoutes from "./routes/engagementTypeRoutes";
import socialPlatformRoutes from "./routes/socialPlatformRoutes";
import taskRoutes from "./routes/taskRoutes";

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET as string, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/engagement-types", engagementTypeRoutes);
app.use("/api/social-platform", socialPlatformRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
