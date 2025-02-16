import { generateReferralCode } from "@/actions/generate-referal-code";
import { Schema, model, Document, models, Types } from "mongoose";

// User Interface
export interface IUser extends Document {
  providers: string[];
  providerIds: { [provider: string]: string };
  photo?: string;
  name?: string;
  username?: string;
  role: "user" | "creator";
  email?: string; // Made optional for OAuth compatibility
  otpExpires: Date | null;
  referralCode?: string;
  referredBy?: Schema.Types.ObjectId | null;
  referralCount: number;
  balance: number;
  isVerified: boolean;
  verificationCode?: string | null;
  discordVerified: boolean;
  twitterVerified: boolean;
  emailVerified: boolean;
  lastLoginDate: Date | null;
  followingCreators: Types.ObjectId[];
  followers: Types.ObjectId[];
  createdTasks: Types.ObjectId[];
  participatedTasks: {
    task: Types.ObjectId;
    status: "pending" | "completed" | "claimed";
  }[];
}

export interface ITask {
  creator: Types.ObjectId;
  type: "like" | "follow" | "comment" | "repost" | "quote";
  platform: "twitter" | "youtube" | "tiktok" | "facebook";
  target: string; // e.g., Twitter post URL, YouTube channel ID
  rewardPoints: number;
  maxParticipants: number;
  participants: Types.ObjectId[]; // Optional array of participant IDs
  status?: "active" | "completed"; // Default is "active"
  expiration?: Date; // Optional
}

// User Schema
const UserSchema = new Schema<IUser>(
  {
    providers: {
      type: [String],
      default: [],
      required: true,
    },
    providerIds: {
      type: Map,
      of: String,
      default: {},
      required: true,
    },
    photo: String,
    name: String,
    username: {
      type: String,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      index: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      index: true,
      sparse: true, // Allows null/undefined for OAuth providers without email
    },
    otpExpires: { type: Date, default: null },
    referralCode: {
      type: String,
      unique: true,
      sparse: true,
      default: function () {
        return generateReferralCode();
      },
    },
    referredBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    referralCount: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 3,
      min: [0, "Balance cannot be negative"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: null,
    },
    discordVerified: {
      type: Boolean,
      default: false,
    },
    twitterVerified: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    lastLoginDate: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "creator"],
      default: "user",
      required: [true, "User role is required"],
    },
    followingCreators: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdTasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    participatedTasks: [
      {
        task: { type: Schema.Types.ObjectId, ref: "Task", required: true },
        status: {
          type: String,
          enum: ["pending", "completed", "claimed"],
          default: "pending",
        },
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Task Schema
const TaskSchema = new Schema<ITask>({
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: {
    type: String,
    enum: ["like", "follow", "comment", "repost", "quote"],
  },
  platform: {
    type: String,
    enum: ["twitter", "youtube", "tiktok", "facebook"],
  },
  target: { type: String, required: true }, // e.g., Twitter post URL, YouTube channel ID
  rewardPoints: { type: Number, required: true },
  maxParticipants: { type: Number, required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  status: { type: String, enum: ["active", "completed"], default: "active" },
  expiration: Date, // Optional
});

// Pre-save hook to check if task is filled
TaskSchema.pre("save", function (next) {
  if (this.participants.length >= this.maxParticipants) {
    this.status = "completed";
  }
  next();
});

// Create and export models
const User = models.User || model<IUser>("User", UserSchema);
const Task = models.Task || model<ITask>("Task", TaskSchema);

export { User, Task };
