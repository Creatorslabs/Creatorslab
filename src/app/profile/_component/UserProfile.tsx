"use client";
import { IUser } from "@/models/user";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import myImageLoader from "@/actions/image/loader";
import TaskList, { IParticipatedTask } from "./tasklist";
import { signOut } from "next-auth/react";

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [participatedTasks, setParticipatedTasks] = useState<
    IParticipatedTask[] | null
  >(null);

  useEffect(() => {
    if (!userId) return; // Prevent unnecessary calls

    let isMounted = true;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/user/get-user", {
          method: "POST",
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();

        // console.log(data);

        setUser(data.user);
        const remappedTasks = data.user.participatedTasks.map((task) => {
          return {
            creator: {
              username: task.task.creator.username,
              id: task.task.creator._id.toString(), // ensure it's a string
            },
            type: task.task.type,
            platform: task.task.platform,
            target: task.task.target,
            rewardPoints: task.task.rewardPoints,
            maxParticipants: task.task.maxParticipants,
            // Convert each participant ObjectId to a string
            participants: task.task.participants.map((participant: any) =>
              participant.toString()
            ),
            status: task.status,
            expiration: task.task.expiration
              ? new Date(task.task.expiration)
              : undefined,
          };
        });

        setParticipatedTasks(remappedTasks);
      } catch (err) {
        if (isMounted) {
          setError("Failed to fetch user.");
          console.error("Error fetching user:", err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (loading) {
    return (
      <div className="animate-pulse bg-[#161616] w-full max-w-[1440px] mx-auto min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#161616] w-full max-w-[1440px] mx-auto min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#161616] w-full">
      <div className="w-full py-4 min-h-screen">
        {/* header navigation section */}
        <div className="sm:flex justify-between items-center my-6 block">
          <div className="p-3 rounded-lg bg-[#242424] w-fit">
            <Link href={"/"}>
              <Image
                src="/images/back-arrow.svg"
                alt="back"
                width={20}
                height={20}
              />
            </Link>
          </div>
          <div className="flex justify-between items-center flex-1 sm:ml-5 sm:text-xl font-medium mt-4 sm:mt-0">
            <p>User profile</p>
            <button className="border border-[#606060] rounded-lg p-2 sm:px-4 sm:py-2 bg-[#242424] text-white flex justify-center items-center gap-2 text-xs sm:text-base">
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
                  src={user?.photo || "/images/dp.svg"}
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
                <p className="my-2 text-xl">{user?.username}</p>
                <button className="bg-[#2D2D2D] h-fit py-1 px-3 rounded-lg flex gap-2 items-center">
                  <Image
                    src="/images/verified.svg"
                    alt="verified"
                    height={20}
                    width={20}
                  />
                  <span className="text-sm">Verified</span>
                </button>
              </div>
              <button className="bg-[#222222] h-fit py-2 px-4 rounded-lg flex gap-2 items-center">
                <span>Invite Link</span>
                <div className="bg-white bg-opacity-10 rounded-lg w-8 h-8 flex items-center justify-center">
                  <Image
                    src="/images/copy.svg"
                    alt="copy"
                    height={20}
                    width={20}
                  />
                </div>
              </button>
            </div>
            <hr className="border-[#606060] my-8 border-t-[0.5px]" />
            <div className="mb-8">
              <p className="text-lg mb-2">Social Media Accounts</p>
              <div className="flex gap-6 flex-col md:flex-row lg:flex-col xl:flex-row">
                <div className="flex justify-between items-center border-[#606060] border rounded-lg p-2 sm:p-5 md:w-[320px]">
                  <div className="flex gap-3 items-center">
                    <Image
                      src="/images/x-icon.svg"
                      alt="x-icon"
                      height={30}
                      width={30}
                    />
                    babriexy
                  </div>
                  <button className="bg-[#272727] h-fit py-1 px-2 rounded-sm flex gap-2 items-center">
                    <span className="text-sm text-[#606060]">Linked</span>
                  </button>
                </div>
                <div className="flex justify-between items-center border-[#606060] border rounded-lg p-2 sm:p-5 md:w-[320px]">
                  <div className="flex gap-3 items-center">
                    <Image
                      src="/images/discord.svg"
                      alt="discord"
                      height={35}
                      width={35}
                    />
                    Link Discord Account
                  </div>
                  <div className="p-3 rounded-lg bg-white">
                    <Image
                      src="/images/forward-arrow.svg"
                      alt="forward"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-lg mb-1">Email Address</p>
              <span className="text-[#787878] text-xs mb-2 block">
                Link your Email to get latest updates on Creatorslab
              </span>
              <div className="flex gap-6">
                <div className="flex flex-wrap gap-2 justify-between items-center border-[#606060] border rounded-lg p-2 sm:p-5 md:w-[320px]">
                  <div className="flex gap-3 items-center">
                    <Image
                      src="/images/email.svg"
                      alt="email"
                      height={30}
                      width={30}
                    />
                    babriexy@gmail.com
                  </div>
                  <button className="bg-[#272727] h-fit py-1 px-2 rounded-sm flex gap-2 items-center">
                    <span className="text-sm text-[#606060]">Linked</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="relative">
              <Image
                src="/images/walletcard.svg"
                alt="walletcard"
                width={425}
                height={220}
                className="w-[425px] sm:h-[220px]"
              />
              <div className="absolute top-0 p-5 sm:p-8">
                <span className="text-[#606060]">Wallet Balance</span>
                <p className="text-xl sm:text-4xl flex gap-8 items-center my-3 sm:mt-3 sm:mb-6">
                  $CLS {isBalanceVisible ? user?.balance : "****"}
                  <button
                    onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                  >
                    <Image
                      src="/images/eye.svg"
                      alt="eye"
                      width={20}
                      height={20}
                    />
                  </button>
                </p>
                <div className="flex gap-2 font-semibold text-base">
                  <button className="p-2 sm:px-6 sm:py-2 rounded-lg bg-gradient-to-r from-[#5d3fd1] to-[#03abff]">
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
            onClick={() => signOut()}
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
