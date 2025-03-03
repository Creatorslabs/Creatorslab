import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authoptions";
import Signup from "./_comp/Signup";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return redirect("/tasks");
  }

  return <Signup />;
}
