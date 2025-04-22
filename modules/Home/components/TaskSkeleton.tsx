import Skeleton from "@/src/app/components/skeleton-loader";
import React from "react";

function TaskSkeleton() {
  return (
    <div className="w-full flex-1 shadow-md p-2 pb-0 rounded-lg dark:border-[#FFFFFF]">
      <div className="relative">
        <Skeleton height="170px" className="w-full rounded-md" />
        <Skeleton
          height="10"
          width="10"
          className="w-10 h-10 absolute right-0 -bottom-4"
          variant="circle"
        />
      </div>
      <Skeleton height="100px" className="w-full my-2"/>
    </div>
  );
}

export default TaskSkeleton;
