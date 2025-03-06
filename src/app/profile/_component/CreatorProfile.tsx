"use client";
import { ITask, IUser } from "@/models/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "../../components/skeleton-loader";
import { MdCameraEnhance, MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import CopyButton from "../../components/copy-button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5";
import CreatorTasksTable from "./creator-task-table";

const CreatorProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [createdTasks, setCreatedTasks] = useState<ITask[] | null>(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(loading, error, session, status);

  useEffect(() => {
    if (!userId) router.push("login"); // Prevent unnecessary calls

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

        console.log("User:", data);

        setUser(data.user);
        const remappedTasks = data.user.createdTasks.map((task) => {
          console.log("Created Task:", task);
          return {
            type: task.type,
            platform: task.platform,
            target: task.target,
            rewardPoints: task.rewardPoints,
            maxParticipants: task.maxParticipants,
            // Convert each participant ObjectId to a string
            participants: task.participants.map((participant: any) =>
              participant.toString()
            ),
            status: task.status,
            expiration: task.expiration ? new Date(task.expiration) : undefined,
          };
        });

        // remove in full in production
        if (!createdTasks) setCreatedTasks(remappedTasks);
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
  }, [createdTasks, userId]);

  return (
    <div className="bg-[#161616] w-full max-w-[1440px] mx-auto">
      <div className="w-[88%] mx-auto py-4 min-h-screen">
        {/* header navigation section */}
        <div className="sm:flex justify-between items-center my-6 block">
          <div className="p-3 rounded-lg bg-[#242424] w-fit">
            <Link href={"/"}>
              <IoMdArrowRoundBack />
            </Link>
          </div>
          <div className="flex justify-between items-center flex-1 sm:ml-5 sm:text-xl font-medium mt-4 sm:mt-0">
            <p>Creator profile</p>
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
        <div>
          <div className="creator-content">
            {status === "loading" ? (
              <>
                <Skeleton height="220px" />
                <Skeleton height="220px" />
              </>
            ) : (
              <>
                <div className="relative">
                  <Image
                    src="/images/creator-bg.svg"
                    alt="creator-bg"
                    width={830}
                    height={200}
                    className="w-full h-[220px] object-cover rounded-2xl hidden sm:block"
                  />

                  <Image
                    src="/images/profile-bkg.svg"
                    alt="creator-bg"
                    width={380}
                    height={200}
                    className="w-full h-[244px] object-cover rounded-2xl block sm:hidden"
                  />
                  <div className="bkg-creator-profile">
                    <div className="creator-profile-img">
                      <div className="relative">
                        <Image
                          src={user?.photo || "/images/dp.svg"}
                          alt="profile"
                          width={136}
                          height={136}
                          className="z-0 w-[70px] sm:w-[136px] h-[70px] sm:h-[136px] mx-auto sm:ml-0 rounded-full"
                        />
                        <div className="bg-white rounded-md p-1 w-fit sm:flex right-2 -mt-6 z-10 absolute hidden">
                          <MdCameraEnhance color="#000" size={24} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 sm:gap-4 justify-center items-center sm:justify-start sm:items-start">
                        <div className="flex xl:flex-col flex-row xl: gap-5">
                          <p className="sm:text-xl my-0">{user?.username}</p>
                          {user?.isVerified ? (
                            <p className="bg-[#2D2D2D] w-fit h-fit py-1 px-3 rounded-lg flex gap-1 sm:gap-2 items-center justify-center">
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
                            <p className="bg-[#2D2D2D] w-fit h-fit py-1 px-3 rounded-lg flex gap-1 sm:gap-2 items-center justify-center">
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
                        <div className="flex gap-2">
                          <div className="flex justify-between items-center border-[#606060] border rounded-lg py-1 px-2 sm:py-2 sm:px-4">
                            <div className="flex gap-1 sm:gap-3 items-center text-xs sm:text-base">
                              <Image
                                src="/images/x-icon.svg"
                                alt="x-icon"
                                height={30}
                                width={30}
                                className="w-[15px] sm:w-[30px] h-[15px] sm:h-[30px]"
                              />
                              babriexy
                            </div>
                          </div>
                          <div className="flex justify-between items-center border-[#606060] border rounded-lg py-2 px-4">
                            <div className="flex gap-2 sm:gap-3 items-center">
                              <Image
                                src="/images/discord.svg"
                                alt="discord"
                                height={30}
                                width={30}
                                className="w-[15px] sm:w-[30px] h-[15px] sm:h-[30px]"
                              />
                              babexy
                            </div>
                          </div>
                        </div>
                        <button className="bg-white bg-opacity-20 w-fit h-fit p-2 sm:px-4 rounded-lg flex gap-2 items-center xl:hidden text-sm">
                          <span>Invite Link</span>
                          <CopyButton
                            link={`${process.env.NEXT_PUBLIC_URL}signup?referralCode=${user?.referralCode}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
                        {isBalanceVisible ? <IoEyeOff size={20}/> : <IoEye size={20}/>}
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
              </>
            )}
          </div>
          <div className="creator-content">
            {status === "loading" ? (
              <>
                <Skeleton height="300px" className="mt-8" />
                <Skeleton height="300px" className="mt-8" />
              </>
            ) : (
              <>
                {" "}
                <CreatorTasksTable />
                <div className="border-[0.5px] border-[#606060] p-4 sm:p-8 rounded-xl mt-8">
                  <div className="mb-8">
                    <p className="text-lg mb-2">Social Media Accounts</p>
                    <div className="flex flex-col gap-6">
                      <div className="flex justify-between items-center border-[#606060] border rounded-lg p-5">
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
                      <div className="flex justify-between items-center border-[#606060] border rounded-lg p-5 ">
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
                      <div className="flex justify-between items-center border-[#606060] border rounded-lg p-5 w-full">
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
