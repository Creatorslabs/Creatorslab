import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authoptions";
import Login from "./_comp/Login";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return redirect("/tasks");
  }

  return <Login />;
}
