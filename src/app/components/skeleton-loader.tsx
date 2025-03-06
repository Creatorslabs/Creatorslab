import React from "react";
import clsx from "clsx";

type SkeletonProps = {
  width?: string;
  height?: string;
  variant?: "rect" | "circle";
  className?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "20px",
  variant = "rect",
  className,
}) => {
  return (
    <div
      className={clsx(
        "animate-pulse bg-gray-300 dark:bg-gray-700",
        variant === "circle" ? "rounded-full" : "rounded-md",
        className
      )}
      style={{ width, height }}
    ></div>
  );
};

export default Skeleton;
