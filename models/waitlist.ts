import mongoose, { Document, Model, Schema } from "mongoose";

// Define the interface for the waitlist document
interface IWaitlist extends Document {
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose schema
const waitlistSchema = new Schema<IWaitlist>(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Define the Mongoose model
const Waitlist: Model<IWaitlist> =
  mongoose.models.Waitlist ||
  mongoose.model<IWaitlist>("Waitlist", waitlistSchema);

export default Waitlist;
