import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  expirationDate?: any; // Accepts ISO string format from API
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ expirationDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | "Task has ended" | "No expiration date">(
    calculateTimeLeft(expirationDate)
  );

  useEffect(() => {
    if (!expirationDate) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expirationDate));
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, [expirationDate]);

  if (timeLeft === "No expiration date") return <p>No expiration date provided</p>;
  if (timeLeft === "Task has ended") return <p>Task has ended</p>;

  return (
    <p>
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </p>
  );
};

// Helper function to calculate time remaining
export const calculateTimeLeft = (expirationDate?: any): TimeLeft | "Task has ended" | "No expiration date" => {
  if (!expirationDate) return "No expiration date"; // Handle undefined case

  const expiryTime = new Date(expirationDate).getTime(); // Convert to Date then get timestamp
  const now = Date.now(); // Current timestamp

  if (isNaN(expiryTime)) return "No expiration date"; // Handle invalid dates
  if (expiryTime - now <= 0) return "Task has ended"; // If expired, return message

  return {
    days: Math.floor((expiryTime - now) / (1000 * 60 * 60 * 24)),
    hours: Math.floor(((expiryTime - now) / (1000 * 60 * 60)) % 24),
    minutes: Math.floor(((expiryTime - now) / (1000 * 60)) % 60),
    seconds: Math.floor(((expiryTime - now) / 1000) % 60),
  };
};

export default CountdownTimer;
