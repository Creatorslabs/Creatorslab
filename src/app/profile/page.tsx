import React from "react";
import UserProfile from "./_component/UserProfile";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authoptions";
import CreatorProfile from "./_component/CreatorProfile";

export default async function Page() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      redirect("/login");
      return null;
    }

    const { id: userId, role } = session.user;

    switch (role) {
      case "creator":
        return <CreatorProfile />;
      case "user":
        return <UserProfile userId={userId} />;
      default:
        redirect("/login");
        return null;
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    redirect("/login");
    return null;
  }
}
