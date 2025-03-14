"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

// Icons
import { FaHeart } from "react-icons/fa6";
import { IoIosRocket } from "react-icons/io";
import { FaLink } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { IoArrowForward } from "react-icons/io5";
import { DarkThemeToggle, useThemeMode } from "flowbite-react";
import { ITask } from "@/models/user";
import { generateTaskTitle } from "@/actions/generate-task-title";
import Skeleton from "./components/skeleton-loader";
import TaskCard from "./tasks/_comp/task-card";

function LandingPage() {
  const { computedMode } = useThemeMode()
  const [tasks, setTasks] = useState<ITask[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tasks/get-all`, {
        method: "GET",
      });

      if (!res.ok) return;

      const data = await res.json();
      setTasks(data.slice(0, 3));

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="relative w-full">
      {/** background overlay */}
      {/* <div className="absolute top-0 bottom-0 left-0 right-0 -z-50 bg-black backdrop:blur-lg opacity-20"></div> */}
      {/** Header section*/}
      <div className="flex justify-between px-6 py-4 md:px-16 md:py-8 items-center">
        <Link href="/" className="flex flex-row gap-2 items-center">
          <Image
            src="/images/logo.png"
            width={30}
            height={30}
            alt="CreatorsLab logo"
          />
          <p className="text-lg">Creatorslab</p>
        </Link>
        <div className="flex items-center justify-center gap-2 flex-row">
          <DarkThemeToggle />
          <Link
          href="/tasks"
          className="rounded-lg py-2 px-4 bg-gradient-to-br from-[#5D3FD1] to-[#03ABFF] text-sm text-white"
        >
          Get started
        </Link>
        </div>
              </div>

      {/** Hero section */}
      <div className="flex flex-col md:flex-row py-6 md:py-8 max-w-full overflow-hidden place-items-center place-content-center">
        <div className="flex-1 md:pl-14 flex flex-col justify-center items-center md:items-start gap-4 px-6 text-center md:text-left md:px-0">
          <h1 className="text-6xl font-syne lg:text-8xl text-extrabold">
            Empowering Global Creativity with{" "}
            <span className="bg-gradient-to-br from-[#5D3FD1] to-[#03ABFF] bg-clip-text text-transparent">
              Web3
            </span>
          </h1>
          <p className="text-md text-gray-500">
            Join the movement to enable creators worldwide to grow, engage, and
            earn.
          </p>

          <Link
            href="/tasks"
            className="rounded-lg py-2 px-4 bg-gradient-to-br from-[#5D3FD1] to-[#03ABFF] text-sm text-white"
          >
            Get started
          </Link>
        </div>

        <div className="relative hidden md:block">
          {/* Blurred Gradient Shadow */}
          <div
            className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-[110%] h-[40%] bg-gradient-to-br from-[#03ABFF] via-[#2DB865] to-[#5D3FD1] 
        blur-[50px] opacity-40 rounded-full rotate-45 z-[-1]"
          ></div>

          <Image
            src="/images/landing-page/Group 266.png"
            width={400}
            height={400}
            alt="coins"
            className="drop-shadow-lg"
          />
        </div>
      </div>

      <div className="relative p-6 md:py-8 md:px-14 flex flex-col gap-4">
        <Image
          src="/images/landing-page/Ellipse 47.png"
          width={500}
          height={500}
          alt="bottom"
          className="absolute -left-20 -z-10"
        />
        <div className="text-center p-4 flex flex-col justify-center items-center gap-3">
          <h2 className="md:w-[80%] text-5xl font-syne">
            Built on the lightning-fast, low-fee Solana blockchain
          </h2>
          <p className="text-center text-sm text-gray-500 md:w-[50%]">
            Creators Lab is backed by our powerhouse partners Solana Foundation
            and SuperteamNG. Together, we are crafting a digital playground
            where creators rule.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          <div className="relative text-center rounded-lg">
            {/* Blue Box Behind the Card */}
            <div className="absolute top-[-3px] left-1/2 transform -translate-x-1/2 w-16 h-5 bg-[#03ABFF] rounded-sm -z-40"></div>
            <div className="w-full h-full  z-40 px-4 py-6 flex flex-col justify-center items-center gap-3 rounded-lg border dark:bg-[#161616]/90 backdrop-filter backdrop-blur-sm sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl dark:border-[#3F3F3F]">
              <IoIosRocket size={30} />
              <p className="text-xl">Fast & Smooth Transactions</p>
              <p className="text-sm text-gray-500">
                {
                  "Solana's speed means no waiting around, transactions happen in the blink of an eye."
                }
              </p>
            </div>
          </div>
          <div className="relative text-center rounded-lg">
            {/* Green Box Behind the Card */}
            <div className="absolute top-[-3px] left-1/2 transform -translate-x-1/2 w-16 h-5 bg-[#4CDE86] rounded-sm -z-40"></div>
            <div className="w-full h-full  z-40 px-4 py-6 flex flex-col justify-center items-center gap-3 rounded-lg border dark:bg-[#161616]/90 backdrop-filter backdrop-blur-sm sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl dark:border-[#3F3F3F]">
              <FaHeart size={30} />
              <p className="text-xl">Earn & Grow</p>
              <p className="text-sm text-gray-500">
                {
                  "Every like, comment, and share earns you Seeds. More Seeds = more visibility!"
                }
              </p>
            </div>
          </div>
          <div className="relative text-center rounded-lg">
            {/* Green Box Behind the Card */}
            <div className="absolute top-[-3px] left-1/2 transform -translate-x-1/2 w-16 h-5 bg-[#7985FF] rounded-sm -z-40"></div>
            <div className="w-full h-full  z-40 px-4 py-6 flex flex-col justify-center items-center gap-3 rounded-lg border dark:bg-[#161616]/90 backdrop-filter backdrop-blur-sm sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl dark:border-[#3F3F3F]">
              <FaLink size={30} />
              <p className="text-xl">Wallet Integration</p>
              <p className="text-sm text-gray-500">
                {
                  "Seamless sign-ins with Solflare, Phantom, or even your email—your call!"
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/** Join the fun section */}
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
              <Link href="#" className="text-gray-500 text-sm underline">
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
            {loading ? <><Skeleton height="200px"/><Skeleton height="200px"/><Skeleton height="200px"/></>: tasks.map((task, index) => (
              <TaskCard task={task} key={index}/>
            ))}
          </div>
        </div>
      </div>

      {/** Bottom banner section */}
      <div className="relative m-6 md:m-8 rounded-md p-4 flex flex-row flex-wrap justify-between bg-gradient-to-br from-[#5D3FD1] via-[#5D3FD1] via-[#03ABFF] to-[#F4B30C gap-4">
        <div className="absolute inset-0 bg-black opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="flex flex-col gap-3 w-full md:w-[40%] items-start justify-center text-white">
          <h3 className="text-2xl font-syne text-bold">
            Earn, Engage and Expand with Creatorslab.
          </h3>
          <p className="text-sm">
            We are building more than just a platform, we&apos;re creating a decentralized social network where builders and content creators thrive.
          </p>
          <p className="text-sm">
            Expand your reach, grow your influence, and connect with a global Web3 community that values engagement.
          </p>
          <Link href="/tasks" className="p-2 rounded-md bg-white bg-opacity-15">
            Become a member
          </Link>
        </div>
        <Image
          src="/images/landing-page/Group 11.png"
          width={200}
          height={100}
          alt="coin sack"
          className="w-[200px] h-auto"
        />
      </div>

      {/** Powered By Section */}
                  <div className="text-center text-gray-500 text-lg p-4 flex flex-col py-6 items-center justify-center gap-4">
                    <p>Powered By:</p>
              <div className="flex items-center justify-center gap-4">
                <Image
                  src="/images/landing-page/Group.png"
                  width={70}
                  height={70}
                  alt="coin sack"
                  className="w-[100px] h-auto object-cover rounded-md"
                />
                {
                            computedMode === "dark" ? <Image
                            src="/images/landing-page/st-light.png"
                            width={70}
                            height={70}
                            alt="coin sack"
                            className="w-[100px] h-auto object-cover rounded-md"
                          /> : <Image
                            src="/images/landing-page/st-dark.png"
                            width={70}
                            height={70}
                            alt="coin sack"
                            className="w-[100px] h-auto object-cover rounded-md"
                          />
                          }
                    </div>
                  </div>

      {/** Footer */}
      <div className="text-center text-gray-500 text-sm p-4">
        Copyright {new Date().getFullYear()}
      </div>
    </div>
  );
}

export default LandingPage;
