"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import serif from "../../../../public/images/serif.png";
import creator from "../../../../public/images/user03.jpeg";
import coin from "../../../../public/images/coin.svg";
import X from "../../../../public/images/X.svg";
import telegram from "../../../../public/images/telegram.svg";
import { IoIosLock, IoMdArrowRoundBack } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { Progress } from "@heroui/progress";
import CustomModal from "../../components/Modals/custom-modal";
import { HiLightBulb } from "react-icons/hi";
import CopyButton from "../../components/copy-button";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useLinkAccount, usePrivy, useUser } from "@privy-io/react-auth";
import Skeleton from "../../components/skeleton-loader";
import { ITask } from "@/models/user";
import { clipBeforeLastColon } from "@/actions/clip-privy-id";
import CountdownTimer, { calculateTimeLeft } from "../../components/countdonw-timer";
import PlatformIcon from "../_comp/platform-image";
import FollowUnfollowButton from "../../components/followbutton";
import { toast } from "react-toastify";
import ImageUpload from "./_components/file-input";
import myImageLoader from "@/actions/image/loader";

const returnCreatorUsername = (creator) => {
  return creator.username
}

const returnCreatorid = (creator) => {
  return creator._id || creator.id;
}

const Page = () => {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [task, setTask] = useState<ITask>();
  const [otherTasks, setOtherTasks] = useState<ITask[]>([]);
  const [totalTasks, setTotalTasks] = useState<number>(0)
  const [loading, setLoading] = useState(true);
  const [hasParticipated, setHasParticipated] = useState(false)
  const [proofURL, setProofURL] = useState("")



  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname) {
      setRedirectUrl(pathname);
    }
  }, [pathname]);
  
  const { ready, authenticated, user } = usePrivy();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isNotLoggedIn, setIsNotloggedIn] = useState(true)

  const { taskId } = useParams();

  const {refreshUser} = useUser()
    const { linkTwitter, linkTelegram } = useLinkAccount({
      onSuccess: ({ linkMethod }) => {
        toast.success(`${linkMethod} linked successfully!`)
        refreshUser()
      },
      onError: (error, details) => {
        toast.error(`Failed to link ${details.linkMethod}`)
        console.log("Failed to link:", error);
      }
    })

  const updateProofUrl = (url: string) => {
    setProofURL(url)
  }

  const handleSubmit = async () => {
      try {
        const res = await fetch(`/api/tasks/submit`, {
          method: "POST",
          body: JSON.stringify({ userId: clipBeforeLastColon(user?.id), taskId, proof: proofURL }),
        });

        if (!res.ok) throw new Error("Failed to fetch.")

        const data = await res.json();
        
        setTask(data);
        setIsModalOpen(true)
      } catch (error) {
        console.error("Error submitting task:", error);
        // router.refresh()
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/get-task`, {
          method: "POST",
          body: JSON.stringify({ taskId }),
        });

        if (!res.ok) throw new Error("Failed to fetch.")

        const data = await res.json();
        console.log("Task:", data);
        
        setTask(data);
      } catch (error) {
        console.error("Error fetching task:", error);
        // router.refresh()
      } finally {
        setLoading(false);
      }
    };

    async function getOtherTasks(userId) {
      try {
        const response = await fetch("/api/tasks/get-other-task", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ taskId, userId }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        setOtherTasks(data.otherTasks)
        setTotalTasks(data.totalTasksByCreator)
      } catch (error) {
        console.error("Failed to fetch other tasks:", error);
      }
    }

    async function checkstatus(userId) {
      const response = await fetch("/api/tasks/get-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({taskId, userId})
      })

      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

      const data = await response.json();

      setHasParticipated(data.participated)
    }

    if (ready && authenticated) {
        const userId = clipBeforeLastColon(user?.id);
        
        fetchTask();
        getOtherTasks(userId)
        checkstatus(userId)
      }
  }, [ready, authenticated, user, taskId]);

  useEffect(() => {
    if (ready && !authenticated) {

      setIsNotloggedIn(true)
    
      setTimeout(() => {
        router.replace(`/login`);
      }, 5000);
  }
}, [ready, authenticated, redirectUrl, router]);

  if (!ready) {
    return (
      <div className="creator-content">
        {" "}
        <>
          <Skeleton height="440px" className="w-full"/>
          <Skeleton height="440px" className="w-[30%]"/>
        </>
      </div>
    );
  }

  if (ready && !authenticated) {
    return (
    <CustomModal onClose={() => setIsNotloggedIn(false)} isOpen={isNotLoggedIn}>
      <h2 className="text-lg font-bold">Not Logged In</h2>
          <p>Please log in to continue.</p>
          <p>Redirecting in 5 secs</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => router.push(`/login`)}
          >
            Go to Login
          </button>
    </CustomModal>
  )
  }

  if (ready && authenticated) { return (
    <div className="px-6 md:px-14">
      <div className="w-full pb-10">
        <div className="flex items-center justify-start my-6">
          <Link href={"/"} className="p-3 rounded-lg bg-[#F7F8F9] dark:bg-[#242424] dark:text-white">
            <IoMdArrowRoundBack />
          </Link>
        </div>
        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4">
          {loading || !task  ? <><Skeleton height="440px" className="flex-1"/><Skeleton height="440px" className="w-[35%]"/></> :
          
          <><div className="w-full md:flex-1 p-4 md:px-20 md:py-14 bg-[#F7F8F9] dark:bg-[#1c1c1c] rounded-xl flex flex-col gap-4">
            <div className="rounded-lg w-full bg-gradient-to-r from-blue-700 via-blue-400 to-blue-900
                  sm:bg-gradient-to-r sm:from-blue-700 sm:via-blue-300 sm:to-blue-900 
                  md:bg-gradient-to-r md:from-blue-900 md:via-blue-400 md:to-blue-900 md:via-40% md:to-pink-500 md:to-80% 
                  lg:bg-gradient-to-r lg:from-blue-900 lg:via-blue-400 lg:to-blue-900 lg:via-40% lg:to-pink-500 lg:to-70% lg:to-gray-500 bg-no-repeat bg-cover p-4 flex flex-col gap-6">
              <Image
                src={task.image}
                alt={task.title}
                loader={myImageLoader}
                quality={75}
                width={80}
                height={80}
                className="rounded-xl"
              />
              <h2 className="text-lg font-bold tracking-widest text-white">
                {task.title}
              </h2>
            </div>
            <div className="border border-[#606060] rounded-lg flex items-center justify-between p-3 md:px-6 md:py-4">
              <div className="flex flex-col gap-2">
                <p className="text-[#606060]">Creator</p>
                <div className="flex items-center justify-between flex-1 gap-2">
                  <Image
                    src={creator}
                    alt=""
                    width={30}
                    height={30}
                    className="rounded-full aspect-square"
                  />
                    <Link href={`/creator/${returnCreatorid(task.creator)}`} className="font-bold text-sm">{ returnCreatorUsername(task.creator) }</Link>
                </div>
              </div>
                {task && <FollowUnfollowButton user={user} creator={task.creator}/> }
            </div>

            <div className="border border-[#606060] p-3 md:px-6 md:py-4 flex items-center justify-between rounded-lg bg-[#5D3FD126] text-sm gap-2">
              <p className="text-[#5d3fd1] flex-1">
                  Ending In: <CountdownTimer expirationDate={task.expiration} />
              </p>
              <button className="p-2 bg-gradient-to-br from-[#5d3fd1] to-[#03abff] rounded-lg flex items-center justify-between gap-1 flex-nowrap text-xs text-white">
                <IoIosLock />
                $CLS 10
                <Image src={coin} alt="" width={20} height={20} />
              </button>
            </div>

            <div className="flex flex-col gap-10 py-4 text-sm">
              <p>
                {task.title}! If you are done that, simply complete the quest again to claim the
                $CLS.
              </p>
            </div>

            <div className="border border-[#606060] p-3 md:px-6 md:py-4 rounded-lg flex flex-col gap-6 text-sm">
              <div className="flex flex-row flex-nowrap items-center justify-between"><div className="flex items-center flex-1 gap-1">
                <FaCheckCircle size={30} className="pr-1 aspect-square h-8" />
                <p>
                  {task.title}
                </p>
              </div>
              <Link 
                  href={task.target} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#222222] rounded-lg text-white"
                >
                  visit
                </Link>
                </div>
                <ImageUpload handleSuccess={updateProofUrl} />
            </div>

            <div className="border border-[#606060] rounded-lg p-3 md:px-6 md:py-4 text-sm flex flex-col gap-3">
              <p className="font-bold">Visit link</p>
              <div className="border border-[#606060] flex items-center justify-between p-2 rounded-md gap-2">
                <Link href="" className="text-xs text-[#606060]">
                  {`${process.env.NEXT_PUBLIC_URL}tasks/${taskId}`}
                </Link>
                <CopyButton link={`${process.env.NEXT_PUBLIC_URL}tasks/${taskId}`} />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold">Connect your X</p>
                {user?.twitter ?  <button className=" flex items-center justify-center p-2 rounded-lg w-full bg-white text-black font-bold" disabled={user.twitter !== null}>
                  <Image
                    src={X}
                    alt=""
                    width={20}
                    height={20}
                    className="mr-4"
                  />
                  Linked to @{user.twitter?.username}
                </button> : <button className=" flex items-center justify-center p-2 rounded-lg w-full bg-white text-black font-bold" onClick={linkTwitter}>
                  <Image
                    src={X}
                    alt=""
                    width={20}
                    height={20}
                    className="mr-4"
                  />
                  Connect Twitter
                </button>}
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-bold">Connect your Telegram</p>
                {user?.telegram ? <button className="flex items-center justify-center p-2 rounded-lg w-full bg-gradient-to-tr from-[#2aabee] to-[#229ed9] font-bold" disabled={user.telegram !== null}>
                  <Image
                    src={telegram}
                    alt=""
                    width={20}
                    height={20}
                    className="mr-4"
                  />
                  Linked to {user.telegram.username}
                </button> : <button className="flex items-center justify-center p-2 rounded-lg w-full bg-gradient-to-tr from-[#2aabee] to-[#229ed9] font-bold" onClick={() => linkTelegram({ launchParams: { initDataRaw: "this is telegram login" } })} disabled>
                  <Image
                    src={telegram}
                    alt=""
                    width={20}
                    height={20}
                    className="mr-4"
                  />
                  Connect Telegram
                </button>}
              </div>
            </div>

            <button
              className="p-4 bg-gradient-to-b from-[#5D3FD1] to-[#03ABFF] text-white rounded-md w-full md:w-[40%] self-end disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={
                calculateTimeLeft(task.expiration) === "Task has ended" ||
                task.status === "completed" ||
                hasParticipated
              }
            >
              {calculateTimeLeft(task.expiration) === "Task has ended"
                ? "Task has ended"
                : task.status === "completed"
                ? "Task already claimed"
                : hasParticipated
                ? "Already participated"
                : "Claim"}
            </button>


          </div>
          <div className="w-full md:w-[35%]  p-4 md:py-14 md:px-8  bg-[#F7F8F9] dark:bg-[#1c1c1c] rounded-xl flex flex-col gap-4">
            <div className="border border-[#606060] p-3 md:px-6 md:py-4 rounded-lg bg-[#5D3FD126] flex flex-col gap-2">
              <h2 className="text-lg font-syne">Other tasks from TH</h2>
              <p className="text-[#787878] text-xs">
                Get started with more task to earn more $CLS
              </p>
                  <p className="text-xs">{ (totalTasks - otherTasks?.length) } / { totalTasks }</p>
              <Progress
                aria-label="Task progress"
                className="w-full"
                value={Math.floor(((totalTasks - otherTasks?.length) / totalTasks) * 100)}
                size="sm"
              />
                </div>
                
               {otherTasks.slice(0,6).map((task, index) => (
              <Link href={`/tasks/${task._id}`} key={index} className="my-4 border border-[#606060] rounded-md flex items-center justify-between p-3 md:px-6 md:py-4 gap-3 flex-wrap">
                <div className="flex flex-col gap-2 text-sm flex-1">
                  <p>{task.title}</p>
                  <PlatformIcon platform={task.platform} />
                </div>

                <button className="p-2 bg-gradient-to-br from-[#5d3fd1] to-[#03abff] rounded-lg flex items-center justify-between gap-1 flex-nowrap text-xs text-white">
                  $CLS {task.rewardPoints}
                  <Image src={coin} alt="" width={20} height={20} />
                </button>
              </Link>
            ))}
          </div></>}
        </div>
      </div>

      {/** Task completion modal */}
      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          {isCompleted ? (
            <>
              <Image
                src="/images/signup/noto_confetti-ball.png"
                width={50}
                height={50}
                alt="CreatorslLab lgo"
              />
              <h3 className="text-xl font-bold">
                You just earned <span className="text-[#03ABFF]">0.5 CLS</span>
              </h3>
              <p className="text-xs text-center">
                Go to the profile page and claim your amazing token rewards!
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-gradient-to-b from-[#5D3FD1] to-[#03ABFF] p-2 rounded-md"
              >
                Lets go!
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-4">
              <HiLightBulb
                size={50}
                className="bg-[#5D3FD1] p-2 rounded-full"
              />
              <p className="text-xs text-center">
                Please complete all mandatory tasks first.
              </p>

              <button
                onClick={() => setIsCompleted(true)}
                className="w-full bg-gradient-to-b from-[#5D3FD1] to-[#03ABFF] p-2 rounded-md"
              >
                Okay
              </button>
            </div>
          )}
        </div>
      </CustomModal>
    </div>
  );
  }
  
};

export default Page;
