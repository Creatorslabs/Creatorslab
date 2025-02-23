import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authoptions";
import Signup from "./_comp/Signup";

export default async function Page() {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user) {
      redirect("/tasks");
      return null;
    }

    return <Signup />;
  } catch (error) {
    console.error("Error fetching session:", error);
    redirect("/login");
    return null;
  }
}
