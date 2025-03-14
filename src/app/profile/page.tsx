"use client";

import React, { Suspense, useEffect, useState } from "react";
import UserProfile from "./_component/UserProfile";
import CreatorProfile from "./_component/CreatorProfile";

import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import Skeleton from "../components/skeleton-loader";
import { IUser } from "@/models/user";
import { clipBeforeLastColon } from "@/actions/clip-privy-id";

export default function MyComponent() {
  const { ready, authenticated, user } = usePrivy();
  const router = useRouter();
  const [dbUser, setDbUser] = useState<IUser>();

  const fetchUser = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/user/get-user`,
        {
          method: "POST",
          body: JSON.stringify({ privyId: clipBeforeLastColon(user?.id) }),
        }
      );

      if (!res.ok) return null;

      const data = await res.json();
      return data.user;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  useEffect(() => {
    if (ready && authenticated) {
      fetchUser().then(setDbUser);
    }
  }, [ready, authenticated]);

  if (!ready) {
    return (
      <div className="creator-content">
        {" "}
        <>
          <Skeleton height="440px" />
          <Skeleton height="440px" />
        </>
      </div>
    );
  }

  if (ready && !authenticated) {
    router.push("/login");
    return null;
  }

  if (ready && authenticated && dbUser) {
    if (dbUser.role === "creator") {
      return (
        <Suspense
          fallback={
            <div className="creator-content">
              {" "}
              <>
                <Skeleton height="440px" />
                <Skeleton height="440px" />
              </>
            </div>
          }
        >
          <CreatorProfile dbUser={dbUser} user={user} />
        </Suspense>
      );
    } else if (dbUser.role === "user") {
      return (
        <Suspense
          fallback={
            <div className="creator-content">
              {" "}
              <>
                <Skeleton height="440px" />
                <Skeleton height="440px" />
              </>
            </div>
          }
        >
          <UserProfile dbUser={dbUser} user={user} />
        </Suspense>
      );
    } else {
      router.refresh();
      return (
        <div className="creator-content">
          {" "}
          <>
            <Skeleton height="440px" />
            <Skeleton height="440px" />
          </>
        </div>
      );
    }
  }

  return (
    <div className="creator-content">
      {" "}
      <>
        <Skeleton height="440px" />
        <Skeleton height="440px" />
      </>
    </div>
  );
}
