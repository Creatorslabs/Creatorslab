"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { ITask } from "@/models/user";
import TopCreators from "../components/top-creators";
import TaskCard from "./_comp/task-card";
import Skeleton from "../components/skeleton-loader";

export default function Page() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [loading, setLoading] = useState(true)

    useEffect(() => {
    const fetchTasks = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/tasks/get-all`);

      if (!res.ok) throw new Error("Failed to fetch tasks")
      
      const data = await res.json();
      console.log("Tasks:", data);
      
      setTasks(data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false)
    }
  };

  fetchTasks();
  }, []);

  const { newTasks, trendingTasks } = useMemo(() => {
    const sortedTasks = [...tasks];

    const newTasks = sortedTasks.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const trendingTasks = [...sortedTasks].sort(
      (a, b) => b.participants.length - a.participants.length
    );

    return { newTasks, trendingTasks };
  }, [tasks]);

  return (
    <div className="flex flex-col gap-4">
      {/** Categories section */}
      <div className="py-6 md:py-8 flex-wrap flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col gap-4 border border-[#3F3F3F] rounded-md p-4 w-full md:w-[370px] ">
          <p className="flex flex-row justify-between text-sm">
            Browse by categories<span className="text-[#5D3FD1]">View all</span>
          </p>
          <div className="flex flex-row items-center justify-between gap-2">
            <button className="text-xs rounded-md border border-[#E3E3E3] px-3 py-2 relative overflow-hidden flex-1">
              <div className="absolute inset-0 bg-[url('/images/greenlemonbg.jpeg')] bg-cover bg-center"></div>

              {/* Button Text */}
              <span className="relative z-10 text-white font-semibold">
                Trending
              </span>
            </button>
            <button className="text-xs rounded-md border border-[#E3E3E3] px-3 py-2 relative overflow-hidden flex-1">
              <div className="absolute inset-0 bg-[url('/images/button-bg01.jpeg')] bg-cover bg-center"></div>

              {/* Button Text */}
              <span className="relative z-10 text-white font-semibold">
                Promoted
              </span>
            </button>
            <button className="text-xs rounded-md border border-[#E3E3E3] px-3 py-2 relative overflow-hidden flex-1">
              <div className="absolute inset-0 bg-[url('/images/button-bg02.jpeg')] bg-cover bg-center"></div>

              {/* Button Text */}
              <span className="relative z-10 text-white font-semibold">
                Projects
              </span>
            </button>
            <button className="text-xs rounded-md border border-[#E3E3E3] px-3 py-2 relative overflow-hidden flex-1">
              <div className="absolute inset-0 bg-[url('/images/button-bg03.jpeg')] bg-cover bg-center"></div>

              {/* Button Text */}
              <span className="relative z-10 text-white font-semibold">
                Articles
              </span>
            </button>
          </div>
        </div>
        <TopCreators />
      </div>

      {/** New tasks section */}
      <div className="relative py-6 flex flex-col gap-4">
        <div>
          <div className="flex items-center justify-between py-4">
            <p className="flex-1 text-lg font-bold">New tasks</p>
            <div className="flex flex-row gap-2 items-center">
              <Link href="#" className="text-gray-500 text-sm underline">
                {`Show all (${newTasks.length})`}
              </Link>
              <div className="rounded-full bg-[#F7F8F9] dark:bg-[#242424] dark:text-white w-6 h-6 flex justify-center items-center">
                <IoMdArrowBack />
              </div>
              <div className="rounded-full bg-[#F7F8F9] dark:bg-[#242424] dark:text-white w-6 h-6 flex justify-center items-center">
                <IoArrowForward />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? <><Skeleton height="200px"/><Skeleton height="200px"/><Skeleton height="200px"/></>: newTasks.slice(0,6).map((task, index) => (
          <React.Fragment key={index}>
            {/* Render the card */}
            <TaskCard task={task} key={index}/>

            {/* Insert full-width iframe after the 3rd card */}
            {index === 2 && (
              <div className="py-6 md:py-8 grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-full w-full">
                      <div className="relative flex-1 rounded-md p-4 flex flex-row justify-between overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/images/button-bg05.jpeg')] bg-cover bg-center -z-30"></div>
                        <div className="flex flex-col gap-3 flex-1 items-start justify-center">
                          <h3 className="text-lg font-syne">Purchase $CLS</h3>
                          <p className="text-xs">
                            Buy creatorslab seeds to boost content visibility and engagement.
                          </p>
                          <button className="p-2 rounded-md bg-white bg-opacity-15 text-xs">
                            Buy $CLS
                          </button>
                        </div>
                        <Image
                          src="/images/landing-page/Group 11.png"
                          width={200}
                          height={200}
                          alt="coin sack"
                          className="h-28 w-auto"
                        />
                      </div>
                      <div className="relative flex-1 rounded-md p-4 flex flex-row justify-between overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/images/button-bg02.jpeg')] bg-cover bg-center -z-30 "></div>
                        <div className="flex flex-col gap-3 flex-1 items-start justify-center">
                          <h3 className="text-lg font-syne">Burn $CLS</h3>
                          <p className="text-xs">Burn CLS to earn SOL. (Coming Soon)</p>
                          <button className="p-2 rounded-md bg-white bg-opacity-15 text-xs">
                            Burn now
                          </button>
                        </div>
                        <Image
                          src="/images/landing-page/Group 11.png"
                          width={200}
                          height={200}
                          alt="coin sack"
                          className="h-auto w-auto"
                        />
                      </div>
                    </div>
            )}
          </React.Fragment>
        ))}
          </div>
        </div>
      </div>

      {/** Trending section */}
      <div className="relative py-6 md:py-8 flex flex-col gap-4">
        <div>
          <div className="flex items-center justify-between py-4">
            <p className="flex-1 text-lg font-bold">Trending tasks</p>
            <div className="flex flex-row gap-2 items-center">
              <Link href="#" className="text-gray-500 text-sm underline">
                {`Show all (${trendingTasks.length})`}
              </Link>
              <div className="rounded-full bg-[#F7F8F9] dark:bg-[#242424] dark:text-white w-6 h-6 flex justify-center items-center">
                <IoMdArrowBack />
              </div>
              <div className="rounded-full bg-[#F7F8F9] dark:bg-[#242424] dark:text-white w-6 h-6 flex justify-center items-center">
                <IoArrowForward />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? <><Skeleton height="200px"/><Skeleton height="200px"/><Skeleton height="200px"/></>: trendingTasks.slice(0,6).map((task, index) => (
          <React.Fragment key={index}>
            <TaskCard task={task} key={index}/>
          </React.Fragment>
        ))}
          </div>
        </div>
      </div>

      {/** Bottom banner section */}
      <div className="my-6 md:my-8 rounded-md p-4 flex flex-row justify-between bg-blue-500">
        <div className="flex flex-col gap-3 w-[60%] md:w-[40%] items-start justify-center">
          <h3 className="text-2xl font-syne">
            Earn, Engage and Expand with Creatorslab.
          </h3>
          <p className="text-sm">
            Creating a long term relationship among builders and content
            creators, to a wider global web3 communities.
          </p>
          <button className="p-2 rounded-md bg-white bg-opacity-15">
            Become a member
          </button>
        </div>
        <Image
          src="/images/landing-page/Group 11.png"
          width={100}
          height={100}
          alt="coin sack"
          className="h-28 w-28"
        />
      </div>

      {/** Footer */}
      <div className="text-center text-gray-500 text-sm p-4">
        Copyright {new Date().getFullYear()}
      </div>
    </div>
  );
}
