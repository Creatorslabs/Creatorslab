"use client";
import { ITask } from "@/models/user";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdCameraEnhance, MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import CopyButton from "../../components/copy-button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoArrowForward, IoEye, IoEyeOff } from "react-icons/io5";
import CreatorTasksTable from "./creator-task-table";
import { isVerified } from "@/actions/isUserVerified";
import { useUser, useLogout, useLinkAccount } from "@privy-io/react-auth";
import { toast } from "react-toastify";
import { FaDiscord } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import RoleToggleButton from "./switch-role";

const CreatorProfile = ({ dbUser, user }) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [createdTasks, setCreatedTasks] = useState<ITask[] | null>(null);
 
  
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
    const fetchUser = async () => {
      try {
        const remappedTasks = dbUser.createdTasks.map((task) => {
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
       
          console.error("Error fetching user:", err);
      } 
    };

    fetchUser();
  }, [dbUser, router]);

  return (
    <div className="w-full">
      <div className="w-[88%] mx-auto py-4 min-h-screen">
        {/* header navigation section */}
        <div className="sm:flex justify-between items-center my-6 block">
          <div  className="p-3 rounded-lg bg-[#F7F8F9] dark:bg-[#242424] dark:text-white w-fit">
            <Link href={"/"}>
              <IoMdArrowRoundBack />
            </Link>
          </div>
          <div className="flex justify-between items-center flex-1 sm:ml-5 sm:text-xl font-medium mt-4 sm:mt-0">
            <p>Creator profile</p>
            <RoleToggleButton 
              userId={user.id} 
              currentRole={dbUser.role} 
              onRoleSwitch={() => router.refresh()}
            />
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
                          src={dbUser?.photo || "/images/dp.svg"}
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
                      <p className="sm:text-xl my-0 text-white font-bold">{dbUser?.username}</p>
                       {dbUser?.followers?.length ?? 0} {dbUser?.followers?.length === 1 ? "follower" : "followers"}
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
                        <div className="flex gap-2">
                          <div className="flex justify-between items-center border-[#606060] border rounded-lg p-2 gap-1 text-xs text-white">
                              <FaSquareXTwitter size={20}/>
                              {user?.twitter ? user?.twitter?.username : "Not linked"}
                          </div>
                          <div className="flex justify-between items-center border-[#606060] border rounded-lg p-2 gap-1 text-xs text-white">
                              <FaDiscord size={20}/>
                             {user?.discord ? user?.discord?.username : "Not linked"}
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
                <div className="relative relative bg-[#F7F8F9] dark:bg-[#101214] dark:text-white rounded-md overflow-hidden w-fit">
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
                      $CLS {isBalanceVisible ? dbUser?.balance : "****"}
                      <button
                        onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                      >
                        {isBalanceVisible ? (
                          <IoEyeOff size={20} />
                        ) : (
                          <IoEye size={20} />
                        )}
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
                <CreatorTasksTable />
                <div className="border-[0.5px] border-[#606060] p-4 sm:p-8 rounded-xl mt-8">
                  <div className="mb-8">
                    <p className="text-lg mb-2">Social Media Accounts</p>
                    <div className="flex flex-col gap-6">
                      {user.twitter ? <div className="flex justify-between items-center border-[#606060] border rounded-lg p-2 sm:p-5 w-full max-w-[450px]">
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
                                      </div> : <div className="flex justify-between items-center border-[#606060] border rounded-lg p-2 sm:p-5 w-full max-w-[450px]">
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
                                      {user.discord ? <div className="flex justify-between items-center border-[#606060] border rounded-lg p-2 sm:p-5 w-full max-w-[450px]">
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
                                      </div> : <div className="flex justify-between items-center border-[#606060] border rounded-lg p-2 sm:p-5 w-full max-w-[450px]">
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

export default CreatorProfile;
