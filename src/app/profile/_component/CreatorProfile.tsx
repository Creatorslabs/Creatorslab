"use client";
import { ITask, IUser } from "@/models/user";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CreatorProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [createdTasks, setCreatedTasks] = useState<ITask[] | null>(null);

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
  }, [userId]);

  if (loading) {
    return (
      <div className="animate-pulse bg-[#161616] w-full max-w-[1440px] mx-auto min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading user profile...</p>
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
    <div className="bg-[#161616] w-full max-w-[1440px] mx-auto">
      <div className="w-[88%] mx-auto py-4 min-h-screen">
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
                      src="/images/dp.svg"
                      alt="profile"
                      width={136}
                      height={136}
                      className="z-0 w-[70px] sm:w-[136px] h-[70px] sm:h-[136px] mx-auto sm:ml-0"
                    />
                    <div className="bg-white rounded-md p-1 w-fit sm:flex right-2 -mt-6 z-10 absolute hidden">
                      <Image
                        src="/images/camera.svg"
                        alt="camera"
                        height={20}
                        width={20}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-4 justify-center items-center sm:justify-start sm:items-start">
                    <div className="flex xl:flex-col flex-row xl: gap-5">
                      <p className="sm:text-xl my-0">{user?.username}</p>
                      <button className="bg-[#2D2D2D] w-fit h-fit py-1 px-3 rounded-lg flex gap-1 sm:gap-2 items-center justify-center">
                        <Image
                          src="/images/verified.svg"
                          alt="verified"
                          height={20}
                          width={20}
                        />
                        <span className="text-xs sm:text-sm">Verified</span>
                      </button>
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
                      <div className="bg-white bg-opacity-10 rounded-lg w-8 h-8 flex items-center justify-center">
                        <Image
                          src="/images/copy.svg"
                          alt="copy"
                          height={20}
                          width={20}
                          className="w-[15px] sm:w-[20px] h-[15px] sm:h-[20px]"
                        />
                      </div>
                    </button>
                  </div>
                </div>
                <button className="bg-white bg-opacity-20 h-fit py-2 px-4 rounded-lg hidden gap-2 items-center xl:flex">
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
          </div>
          <div className="creator-content">
            <div className="creator-tasks-table">
              <div className="flex justify-between items-center p-4 flex-wrap gap-2">
                <p>All Tasks</p>
                <div className="border border-[#3F3F3F] p-2 flex gap-1 rounded-xl w-80">
                  <Image
                    src="/images/search.svg"
                    alt="search"
                    height={20}
                    width={20}
                  />
                  <input
                    type="text"
                    className="outline-none bg-transparent px-1 w-full"
                    placeholder="Search projects, quests, creators"
                  />
                </div>
              </div>
              <table className="w-full text-center">
                <thead className="p-2">
                  <tr className="bg-[#222222]">
                    <td className="p-2 min-w-[130px]">S/N</td>
                    <td className="p-2 min-w-[130px]">Platform</td>
                    <td className="p-2 min-w-[130px]">Amount to Earn</td>
                    <td className="p-2 min-w-[130px]">Status</td>
                    <td className="p-2 min-w-[130px]">Task Details</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4">1</td>
                    <td className="p-4 flex items-center gap-2 justify-center">
                      <Image
                        src="/images/discord.svg"
                        alt="discord"
                        width={20}
                        height={20}
                      />
                      Discord
                    </td>
                    <td className="p-4">$CLS 0.5</td>
                    <td className="p-4 text-[#FFC107]">Ongoing</td>
                    <td className="p-4">
                      <button className="bg-[#03ABFF] bg-opacity-10 border border-[#03ABFF] text-[#03ABFF] py-1 px-8 rounded-md">
                        View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">1</td>
                    <td className="p-4 flex items-center gap-2 justify-center">
                      <Image
                        src="/images/discord.svg"
                        alt="discord"
                        width={20}
                        height={20}
                      />
                      Discord
                    </td>
                    <td className="p-4">$CLS 0.5</td>
                    <td className="p-4 text-[#FFC107]">Ongoing</td>
                    <td className="p-4">
                      <button className="bg-[#03ABFF] bg-opacity-10 border border-[#03ABFF] text-[#03ABFF] py-1 px-8 rounded-md">
                        View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">1</td>
                    <td className="p-4 flex items-center gap-2 justify-center">
                      <Image
                        src="/images/discord.svg"
                        alt="discord"
                        width={20}
                        height={20}
                      />
                      Discord
                    </td>
                    <td className="p-4">$CLS 0.5</td>
                    <td className="p-4 text-[#FFC107]">Ongoing</td>
                    <td className="p-4">
                      <button className="bg-[#03ABFF] bg-opacity-10 border border-[#03ABFF] text-[#03ABFF] py-1 px-8 rounded-md">
                        View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">1</td>
                    <td className="p-4 flex items-center gap-2 justify-center">
                      <Image
                        src="/images/discord.svg"
                        alt="discord"
                        width={20}
                        height={20}
                      />
                      Discord
                    </td>
                    <td className="p-4">$CLS 0.5</td>
                    <td className="p-4 text-[#FFC107]">Ongoing</td>
                    <td className="p-4">
                      <button className="bg-[#03ABFF] bg-opacity-10 border border-[#03ABFF] text-[#03ABFF] py-1 px-8 rounded-md">
                        View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">1</td>
                    <td className="p-4 flex items-center gap-2 justify-center">
                      <Image
                        src="/images/discord.svg"
                        alt="discord"
                        width={20}
                        height={20}
                      />
                      Discord
                    </td>
                    <td className="p-4">$CLS 0.5</td>
                    <td className="p-4 text-[#FFC107]">Ongoing</td>
                    <td className="p-4">
                      <button className="bg-[#03ABFF] bg-opacity-10 border border-[#03ABFF] text-[#03ABFF] py-1 px-8 rounded-md">
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
