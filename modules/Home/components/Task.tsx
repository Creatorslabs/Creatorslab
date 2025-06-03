"use client";

import React from "react";
import TaskCard from "@/modules/common/TaskCard";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import { IoArrowForward } from "react-icons/io5";
import useSWR from "swr";
import EmptyState from "@/modules/common/EmptyState";
import { fetcher } from "@/utils/fetcher";
import TaskSkeleton from "./TaskSkeleton";

function Task() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useSWR("/api/tasks/get-all", fetcher); 

  return (
    <div className="relative p-6 md:py-8 md:px-14 flex flex-col gap-4">
      <Image
        src="/images/landing-page/Ellipse 49.png"
        width={500}
        height={500}
        alt="bottom"
        className="absolute right-0 md:right-20 -z-10"
      />
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3 w-[60%] md:w-[45%]">
          <h3 className="font-syne text-5xl">Join the fun</h3>
          <p className="text-gray-500">
            This is your moment. Jump into the Web3 revolution and make your
            mark.
          </p>
        </div>
        <Link
          href="/tasks"
          className="rounded-lg py-2 px-4 bg-gradient-to-br from-[#5D3FD1] to-[#03ABFF] text-sm text-white"
        >
          Get started
        </Link>
      </div>
      <div>
        <div className="flex items-center justify-between py-4">
          <p className="flex-1">Engage</p>
          <div className="flex flex-row gap-2 items-center">
            <Link href="/tasks" className="text-gray-500 text-sm underline">
              {"Show all (20)"}
            </Link>
            <div className="rounded-full bg-gray-700 text-gray-400 w-6 h-6 flex justify-center items-center">
              <IoMdArrowBack />
            </div>
            <div className="rounded-full bg-gray-700 text-gray-400 w-6 h-6 flex justify-center items-center">
              <IoArrowForward />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {error ? (
            <EmptyState message="Oops! No tasks at the moment." />
          ) : isLoading ? (
            [...Array(3)].map((_, index) => ( <TaskSkeleton key={index}/>))
          ) : (
            tasks
              .slice(0, 3)
              .map((task, index) => <TaskCard task={task} key={index} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default Task;
