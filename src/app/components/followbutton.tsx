import { clipBeforeLastColon } from "@/actions/clip-privy-id";
import { User } from "@privy-io/react-auth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const FollowUnfollowButton = ({
  user,
  creator,
}: {user: User | null, creator: any}) => {
  const [loading, setLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
    console.log("creator:", creator._id);
    

  useEffect(() => {
    if (!user?.id) return;

    const checkFollowingStatus = async () => {
      try {
        const response = await fetch("/api/user/isfollowing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: clipBeforeLastColon(user.id), creatorId: creator._id }),
        });

        const data = await response.json();
        if (response.ok) {
          setIsFollowing(data.isFollowing);
        } else {
          console.error("Error checking follow status:", data.error);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
    };

    checkFollowingStatus();
  }, [user?.id, creator._id]);

  const handleFollowUnfollow = async () => {
    if (!user?.id) {
      toast.error("You need to log in to follow users.");
      return;
    }
    if (isFollowing === null) return;

    setLoading(true);
    const url = isFollowing ? "/api/user/unfollow" : "/api/user/follow";
    const method = isFollowing ? "DELETE" : "POST";

    try {
  const res = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: clipBeforeLastColon(user.id), creatorId: creator._id }),
  });

  // Try to parse the response error message
  if (!res.ok) {
    const errorData = await res.json().catch(() => null); // Prevents crashing if response is not JSON
    const errorMessage = errorData?.error || 
                         errorData?.message || 
                         (isFollowing ? "Failed to unfollow creator" : "Failed to follow creator");
    throw new Error(errorMessage);
  }

  setIsFollowing(!isFollowing);
  toast.success(!isFollowing ? "You just followed the creator!" : "You just unfollowed the creator!");
} catch (error) {
  toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
} finally {
  setLoading(false);
}

  };

  if (!user) {
    return (
      <button
        className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
        disabled
      >
        Log in to follow
      </button>
    );
  }

  if (isFollowing === null) {
    return <button className="px-4 py-2 text-white bg-gray-500 rounded-lg" disabled>Loading...</button>;
  }

  return (
    <button
      onClick={handleFollowUnfollow}
      disabled={loading}
      className={`px-4 py-2 text-white rounded-lg transition ${
        isFollowing
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      } disabled:opacity-50`}
    >
      {loading ? (isFollowing ? "Unfollowing..." : "Following...") : isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowUnfollowButton;
