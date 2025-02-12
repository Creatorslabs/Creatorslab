import { User } from "@/models/user";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method Not Allowed" });

  try {
    await connectDB();
    const { userId, taskId } = req.query;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find the task in participatedTasks
    const taskData = user.participatedTasks.find(
      (t) => t.task.toString() === taskId
    );

    if (!taskData) return res.json({ status: "not_started" });

    res.json({ status: taskData.status });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}
