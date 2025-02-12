import { Schema, model, Document, models, Types } from "mongoose";

// User Interface
export interface IUser extends Document {
  providers: string[];
  providerIds: { [provider: string]: string };
  photo?: string;
  username?: string;
  role: "user" | "creator";
  email: string;
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

// Task Interface
export interface ITask extends Document {
  title: string;
  description: string;
  creator: Types.ObjectId;
  maxParticipants: number;
  participants: Types.ObjectId[];
  isFilled: boolean;
  createdAt: Date;
}

// User Schema
const UserSchema = new Schema<IUser>(
  {
    providers: {
      type: [String],
      default: [],
    },
    providerIds: {
      type: Map,
      of: String,
      default: {},
    },
    photo: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      default: "",
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    otpExpires: { type: Date, default: null },
    referralCode: {
      type: String,
      default: "",
      unique: true,
      sparse: true,
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
      default: 0,
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
const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required"],
    },
    maxParticipants: {
      type: Number,
      required: [true, "Maximum number of participants is required"],
      min: [1, "At least one participant is required"],
      max: [1000, "Maximum participants cannot exceed 1000"],
    },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isFilled: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Pre-save hook to check if task is filled
TaskSchema.pre("save", function (next) {
  if (this.participants.length >= this.maxParticipants) {
    this.isFilled = true;
  }
  next();
});

// Create and export models
const User = models.User || model<IUser>("User", UserSchema);
const Task = models.Task || model<ITask>("Task", TaskSchema);

export { User, Task };
