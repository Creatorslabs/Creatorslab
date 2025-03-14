"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import myImageLoader from "@/actions/image/loader";
import TaskList, { IParticipatedTask } from "./tasklist";
import { useLinkAccount, useLogout, useUser } from "@privy-io/react-auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CopyButton from "../../components/copy-button";
import { isVerified } from "@/actions/isUserVerified";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoArrowForward } from "react-icons/io5";

const UserProfile = ({ dbUser, user }) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [participatedTasks, setParticipatedTasks] = useState<
    IParticipatedTask[] | null
    >(null);
  
  const router = useRouter()
  
  const {refreshUser} = useUser()
  const { logout } = useLogout({
    onSuccess() {
      router.push("/login")
    },
  })
  const { linkDiscord, linkTwitter, linkEmail } = useLinkAccount({
    onSuccess: ({ linkMethod }) => {
      toast.success(`${linkMethod} linked successfully!`)
      refreshUser()
    },
    onError: (error, details) => {
      toast.success(`Failed to link ${details.linkMethod}`)
      console.log("Failed to link:", error);
    }
  })


  useEffect(() => {
  if (!dbUser?.participatedTasks) return;

  const remappedTasks = dbUser.participatedTasks.map((task) => ({
    creator: {
      username: task.task.creator.username,
      id: task.task.creator._id.toString(), 
    },
    type: task.task.type,
    platform: task.task.platform,
    target: task.task.target,
    rewardPoints: task.task.rewardPoints,
    maxParticipants: task.task.maxParticipants,
    participants: task.task.participants.map((participant: any) =>
      participant.toString()
    ),
    status: task.status,
    expiration: task.task.expiration ? new Date(task.task.expiration) : undefined,
  }));

  setParticipatedTasks((prevTasks) => {
    // Avoid unnecessary state updates
    const isSame = JSON.stringify(prevTasks) === JSON.stringify(remappedTasks);
    return isSame ? prevTasks : remappedTasks;
  });
}, [dbUser]);


  return (
    <div className="w-full">
      <div className="w-full py-4 min-h-screen">
        {/* header navigation section */}
        <div className="sm:flex justify-between items-center my-6 block">
          <div  className="p-3 rounded-lg bg-[#F7F8F9] dark:bg-[#242424] dark:text-white w-fit">
            <Link href={"/"}>
              <IoMdArrowRoundBack />
            </Link>
          </div>
          <div className="flex justify-between items-center flex-1 sm:ml-5 sm:text-xl font-medium mt-4 sm:mt-0">
            <p>User profile</p>
            <button className="dark:border border-[#606060] rounded-lg p-2 sm:px-4 sm:py-2 bg-[#F7F8F9] dark:bg-[#242424] dark:text-white flex justify-center items-center gap-2 text-xs sm:text-base">
              <Image
                src="/images/coin.svg"
                alt="coin"
                width={30}
                height={30}
                className="w-[15px] sm:w-[30px] h-[15px] sm:h-[30px]"
              />
              Earn $CLS
            </button>
          </div>
        </div>
        {/* details section */}
        <div className="grid lg:grid-cols-[minmax(425px,_1fr)_425px] gap-8 grid-cols-1">
          <div className="border-[0.5px] border-[#606060] p-4 sm:p-8 rounded-xl">
            <div className="flex justify-between flex-wrap gap-4">
              <div className="relative">
                <Image
                  src={dbUser?.photo || "/images/dp.svg"}
                  loader={myImageLoader}
                  quality={75}
                  alt="profile"
                  height={50}
                  width={100}
                  className="z-0"
                />
                <div className="bg-white rounded-md p-1 w-fit flex right-0 -mt-6 z-10 absolute">
                  <Image
                    src="/images/camera.svg"
                    alt="camera"
                    height={20}
                    width={20}
                  />
                </div>
                <p className="my-2 text-xl font-bold">{dbUser?.username}</p>
                {isVerified(user) ? (
                                            <p className="bg-[#F7F8F9] dark:bg-[#242424] dark:text-white w-fit h-fit py-1 px-3 rounded-lg flex gap-1 sm:gap-2 items-center justify-center">
                                              <MdVerified
                                                height={30}
                                                width={30}
                                                color="#1a56db"
                                              />
                                              <span className="text-xs sm:text-sm">
                                                Verified
                                              </span>
                                            </p>
                                          ) : (
                                            <p className="bg-[#F7F8F9] dark:bg-[#242424] dark:text-white w-fit h-fit py-1 px-3 rounded-lg flex gap-1 sm:gap-2 items-center justify-center">
                                              <GoUnverified
                                                height={30}
                                                width={30}
                                                color="#e02424"
                                              />
                                              <span className="text-xs sm:text-sm">
                                                Not verified
                                              </span>
                                            </p>
                                          )}
              </div>
              <button className="bg-[#F7F8F9] dark:bg-[#242424] dark:text-white h-fit py-2 px-4 rounded-lg flex gap-2 items-center">
                <span>Invite Link</span>
                <CopyButton
                            link={`${process.env.NEXT_PUBLIC_URL}login?referralCode=${dbUser?.referralCode}`}
                          />
              </button>
            </div>
            <hr className="border-[#606060] my-8 border-t-[0.5px]" />
            <div className="mb-8">
              <p className="text-lg mb-2">Social Media Accounts</p>
              <div className="flex gap-6 flex-col md:flex-row lg:flex-col xl:flex-row">
                {user.twitter ? <div className="flex justify-between items-center border-[#606060] border rounded-lg p-2 sm:p-5 md:w-[320px]">
                  <div className="flex gap-3 items-center">
                    <Image
                      src="/images/x-icon.svg"
                      alt="x-icon"
                      height={30}
                      width={30}
                    />
                    {user.twitter.username}
                  </div>
                  <button className="bg-[#F7F8F9] dark:bg-[#242424] dark:text-whiteh-fit py-1 px-2 rounded-sm flex gap-2 items-center" disabled>
                    <span className="text-sm">Linked</span>
                  </button>
                </div> : <div className="flex justify-between items-center border-[#606060] border rounded-lg p-2 sm:p-5 md:w-[320px]">
                  <div className="flex gap-3 items-center">
                    <Image
                      src="/images/x-icon.svg"
                      alt="x-icon"
                      height={30}
                      width={30}
                    />
                    Link twitter
                  </div>
                  <button className="p-3 rounded-lg bg-[#F7F8F9] dark:bg-[#242424] dark:text-white" onClick={linkTwitter}>
                    <IoArrowForward />
                  </button>
                </div>}
                {user.discord ? <div className="flex justify-between items-center border-[#606060] border rounded-lg p-2 sm:p-5 md:w-[320px]">
                  <div className="flex gap-3 items-center">
                    <Image
                      src="/images/discord.svg"
                      alt="discord"
                      height={35}
                      width={35}
                    />
                    {user.discord.username}
                  </div>
                  <button className="bg-[#F7F8F9] dark:bg-[#242424] dark:text-white h-fit py-1 px-2 rounded-sm flex gap-2 items-center" disabled>
                    <span className="text-sm">Linked</span>
                  </button>
                </div> : <div className="flex justify-between items-center border-[#606060] border rounded-lg p-2 sm:p-5 md:w-[320px]">
                  <div className="flex gap-3 items-center">
                    <Image
                      src="/images/discord.svg"
                      alt="discord"
                      height={35}
                      width={35}
                    />
                    Link Discord Account
                  </div>
                  <button className="p-3 rounded-lg bg-[#F7F8F9] dark:bg-[#242424] dark:text-white" onClick={linkDiscord}>
                    <IoArrowForward />
                  </button>
                </div>}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-lg mb-1">Email Address</p>
              <span className="text-[#787878] text-xs mb-2 block">
                Link your Email to get latest updates on Creatorslab
              </span>
              <div className="flex gap-6">
                {user.email ? <div className="flex gap-2 justify-between items-center border-[#606060] border rounded-lg p-2 sm:p-5 w-full max-w-[450px]">
                  <div className="flex gap-3 items-center">
                    <Image
                      src="/images/email.svg"
                      alt="email"
                      height={30}
                      width={30}
                    />
                    {user.email.address}
                  </div>
                  <button className="bg-[#F7F8F9] dark:bg-[#242424] dark:text-white dark:bg-[#242424] dark:text-white h-fit py-1 px-2 rounded-sm flex gap-2 items-center" disabled>
                    <span className="text-sm">Linked</span>
                  </button>
                </div> : <div className="flex flex-wrap gap-2 justify-between items-center border-[#606060] border rounded-lg p-2 sm:p-5 md:w-[320px]">
                  <div className="flex gap-3 items-center">
                    <Image
                      src="/images/email.svg"
                      alt="email"
                      height={30}
                      width={30}
                    />
                    Email not linked
                  </div>
                  <button className="p-3 rounded-lg bg-[#F7F8F9] dark:bg-[#242424] dark:text-white" onClick={linkEmail}>
                    <IoArrowForward />
                  </button>
                </div>}
              </div>
            </div>
          </div>
          <div className="rounded-md overflow-hidden">
            <div className="relative bg-[#F7F8F9] dark:bg-[#101214] dark:text-white rounded-md overflow-hidden">
              <Image
                src="/images/walletcard.svg"
                alt="walletcard"
                width={425}
                height={220}
                className="w-[425px] sm:h-[220px] rounded-md"
              />
              <div className="absolute top-0 p-5 sm:p-8">
                <span className="dark:text-[#606060]">Wallet Balance</span>
                <p className="text-xl sm:text-4xl flex gap-8 items-center my-3 sm:mt-3 sm:mb-6">
                  $CLS {isBalanceVisible ? dbUser?.balance : "****"}
                  <button
                    onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                  >
                    <Image
                      src="/images/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                      className="dark:text-[#606060]"
                    />
                  </button>
                </p>
                <div className="flex gap-2 font-semibold text-base">
                  <button className="p-2 sm:px-6 sm:py-2 rounded-lg bg-gradient-to-r from-[#5d3fd1] to-[#03abff] text-white">
                    Buy $CLS
                  </button>
                  <button className="p-2 sm:px-6 sm:py-2 rounded-lg bg-[#F4B30C] text-black">
                    Claim $CLS
                  </button>
                </div>
              </div>
            </div>
            <div className="border-[0.5px] border-[#606060] p-3 sm:p-6 rounded-xl mt-6 overflow-y-scroll h-[400px] scrollbar-hide">
              <p className="text-lg mb-2">My Rewards</p>
              <TaskList tasks={participatedTasks} />
            </div>
          </div>
        </div>
        <div className="w-full flex py-4 px-2">
          <button
            onClick={() => logout()}
            className="p-4 bg-gradient-to-b from-[#5D3FD1] to-[#03ABFF] text-white rounded-md w-full md:w-[40%] self-end"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
