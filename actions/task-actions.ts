import { User, Task } from "@/models/user";
import mongoose from "mongoose";

/**
 * Unfollow a creator (deducts 5 from balance)
 */
export const unfollowCreator = async (userId: string, creatorId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findById(userId).session(session);
    const creator = await User.findById(creatorId).session(session);

    if (!user || !creator) throw new Error("User or creator not found");

    // Check if user is following the creator
    const index = user.followingCreators.indexOf(creatorId);
    if (index === -1) throw new Error("You are not following this creator");

    // Charge 5 units and remove from followers list
    if (user.balance < 5) throw new Error("Insufficient balance to unfollow");

    user.balance -= 5;
    user.followingCreators.splice(index, 1);
    creator.followers = creator.followers.filter(
      (id) => id.toString() !== userId
    );

    await user.save({ session });
    await creator.save({ session });

    await session.commitTransaction();
    return { success: true, message: "Unfollowed successfully" };
  } catch (error) {
    await session.abortTransaction();
    return { success: false, message: (error as Error).message };
  } finally {
    session.endSession();
  }
};

/**
 * Get tasks by a specific creator
 */
export const getTasksByCreator = async (creatorId: string) => {
  return await Task.find({ creator: creatorId }).sort({ createdAt: -1 });
};

/**
 * Get most recent tasks from all creators
 */
export const getRecentTasks = async (limit: number = 10) => {
  return await Task.find().sort({ createdAt: -1 }).limit(limit);
};

/**
 * Get tasks pending claim for a user
 */
export const getTasksPendingClaim = async (userId: string) => {
  return await User.findById(userId)
    .select("participatedTasks")
    .populate({
      path: "participatedTasks.task",
      match: { "participatedTasks.status": "pending" },
    });
};
