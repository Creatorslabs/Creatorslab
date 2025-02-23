"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRequestOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/user/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed to send OTP");
      setOtpSent(true);
      setMessage("OTP sent! Check your email.");
    } catch (error) {
      console.error((error as Error).message);
      setMessage("Error sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await signIn("credentials", { email, otp, redirect: false });
      if (res?.error) throw new Error(res.error);
      setMessage("Login successful! Redirecting...");
      window.location.reload();
    } catch (error) {
      console.error((error as Error).message);
      setMessage("Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 text-white">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-semibold">
            Welcome, {session.user?.name || "Guest"}
          </h1>
          <pre className="bg-gray-700 p-3 rounded-md text-sm mt-3">
            {JSON.stringify(session, null, 2)}
          </pre>
          <button
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
        {message && (
          <p className="text-center text-sm text-green-400">{message}</p>
        )}
        <div className="space-y-4">
          {!otpSent ? (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border p-2 rounded-md bg-gray-700 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                onClick={handleRequestOtp}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Get OTP"}
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full border p-2 rounded-md bg-gray-700 text-white"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login with OTP"}
              </button>
            </>
          )}
          <div className="flex items-center my-4">
            <div className="flex-1 border-b border-gray-600"></div>
            <p className="mx-2 text-gray-400">or</p>
            <div className="flex-1 border-b border-gray-600"></div>
          </div>
          <button
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
            onClick={() => signIn("discord")}
          >
            Sign in with Discord
          </button>
          <button
            className="w-full bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition"
            onClick={() => signIn("twitter")}
          >
            Sign in with Twitter
          </button>
        </div>
      </div>
    </div>
  );
}
