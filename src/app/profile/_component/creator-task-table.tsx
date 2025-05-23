"use client"

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const CreatorTasksTable = ({creatorId}: {creatorId: string}) => {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState("")

 useEffect(() => {
   const fetchTasks = async () => {
     try {
       setError("");
        const res = await fetch("/api/tasks/get-by-creator", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ creatorId }),
        });

        const data = await res.json();

        if (!res.ok || data.error) {
          setError(data.error || "Failed to fetch tasks");
          setTasks([]);
        } else {
          setTasks(data);
        }
      } catch (err: any) {
        console.error("Request failed:", err.message);
        setError("Something went wrong while fetching tasks.");
        setTasks([]);
      }
    };

    fetchTasks();
 }, [creatorId]);
  
  return (
    <div className="creator-tasks-table max-h-[500px] overflow-hidden w-full bg-white dark:bg-[#161616] text-black dark:text-white">
      {/* Header with Search */}
      <div className="flex flex-wrap justify-between items-center p-4 gap-2">
        <p className="text-lg font-medium">All Tasks</p>
        <div className="relative w-full max-w-[320px] md:max-w-[400px]">
          <Image
            src="/images/search.svg"
            alt="search"
            height={20}
            width={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          />
          <input
            type="text"
            className="w-full bg-gray-200 dark:bg-[#222] text-black dark:text-white pl-10 pr-3 py-2 border border-gray-300 dark:border-[#3F3F3F] rounded-xl outline-none placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Search projects, quests, creators"
          />
        </div>
      </div>

      {/* Table (No Horizontal Scroll) */}
      <div className="w-full overflow-x-hidden max-h-[400px] h-full overflow-y-scroll">
        <table className="w-full table-fixed text-center border-collapse">
          <thead>
            <tr className="bg-gray-300 dark:bg-[#222] text-black dark:text-white">
              <th className="p-2 w-[15%]">S/N</th>
              <th className="p-2 w-[40%]">Platform</th>
              <th className="p-2 w-[20%] hidden md:table-cell">Amount</th>
              <th className="p-2 w-[20%] hidden md:table-cell">Status</th>
              <th className="p-2 w-[25%]">Details</th>
            </tr>
          </thead>
          <tbody>
            {tasks ? tasks.map((_, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 dark:border-gray-700"
              >
                <td className="p-4">{index + 1}</td>
                <td className="p-4 flex items-center gap-2 justify-center">
                  <Image
                    src="/images/discord.svg"
                    alt="discord"
                    width={20}
                    height={20}
                  />
                  <span className="whitespace-nowrap">Discord</span>
                </td>
                <td className="p-4 hidden md:table-cell whitespace-nowrap">
                  $CLS 0.5
                </td>
                <td className="p-4 text-[#FFC107] hidden md:table-cell">
                  Ongoing
                </td>
                <td className="p-4">
                  <button className="bg-blue-500 dark:bg-[#03ABFF] bg-opacity-10 border border-blue-500 dark:border-[#03ABFF] text-blue-500 dark:text-white py-1 px-4 rounded-md text-sm md:text-base">
                    View
                  </button>
                </td>
              </tr>
            )) : <tr className="text-center text-sm">No tasks created yet!</tr>}
            {error && <p className="text-sm text-red">{ error }</p> }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatorTasksTable;
