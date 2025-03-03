import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authoptions";
import { fetchUserTasks } from "@/actions/fetch-task";
import Home from "./_comp/TaskPage";
import { redirect } from "next/navigation";

export default async function TasksPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect("/login");

  const userId = session.user?.id;
  console.log("userId", userId);

  const tasks = await fetchUserTasks(userId);

  console.log("tasks", tasks);

  return <Home tasks={tasks} />;
}
