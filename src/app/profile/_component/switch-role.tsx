import { clipBeforeLastColon } from "@/actions/clip-privy-id";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState } from "react";
import { toast } from "react-toastify";

interface RoleToggleButtonProps {
  userId: string;
  currentRole: "user" | "creator";
  onRoleSwitch: () => void;
}

const RoleToggleButton: React.FC<RoleToggleButtonProps> = ({ userId, currentRole, onRoleSwitch }) => {
  const [loading, setLoading] = useState(false);

  const toggleRole = async () => {
    if (!userId) return toast.error("User ID is missing");

    setLoading(true);

    try {
      const res = await fetch("/api/user/switch-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: clipBeforeLastColon(userId) }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to toggle role");

      toast.success(`Role switched to ${data.role}`);
      onRoleSwitch(); // Refresh the client after success
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="dark:border border-[#606060] rounded-lg p-2 sm:px-4 sm:py-2 
                 bg-[#F7F8F9] dark:bg-[#242424] dark:text-white 
                 flex justify-center items-center gap-2 text-xs sm:text-base"
      onClick={toggleRole}
      disabled={loading}
    >
      {loading ? "Switching..." : `Switch to ${currentRole === "user" ? "Creator" : "User"}`}
    </button>
  );
};

export default RoleToggleButton;
