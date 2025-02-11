"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import serif from "../../../../public/images/serif.png";
import creator from "../../../../public/images/user03.jpeg";
import coin from "../../../../public/images/coin.svg";
import X from "../../../../public/images/X.svg";
import telegram from "../../../../public/images/telegram.svg";
import discord from "../../../../public/images/discord.svg";
import paper from "../../../../public/images/thxjoin.svg";
import { IoIosLock, IoMdArrowRoundBack } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { Progress } from "@heroui/progress";
import CustomModal from "../../components/Modals/custom-modal";
import { HiLightBulb } from "react-icons/hi";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="px-6 md:px-14">
      <div className="w-full pb-10">
        <div className="flex items-center justify-start my-6">
          <Link href={"/"} className="p-3 rounded-lg bg-[#242424]">
            <IoMdArrowRoundBack />
          </Link>
        </div>
        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4">
          <div className="w-full md:flex-1 p-4 md:px-20 md:py-14 bg-[#1c1c1c] rounded-xl flex flex-col gap-4">
            <div className="rounded-lg w-full bg-[url(/images/taskbg.jpeg)] bg-no-repeat bg-cover p-4 flex flex-col gap-6">
              <Image
                src={serif}
                alt=""
                width={80}
                height={80}
                className="rounded-xl"
              />
              <h2 className="text-lg font-bold tracking-widest">
                Follow CEO Abayaomi Chukwudi on X
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
                  <p className="font-bold text-sm">Barbie_xy</p>
                </div>
              </div>
              <button className=" px-4 py-2 bg-[#222222] rounded-lg text-sm">
                Follow
              </button>
            </div>

            <div className="border border-[#606060] p-3 md:px-6 md:py-4 flex items-center justify-between rounded-lg bg-[#5D3FD126] text-sm gap-2">
              <p className="text-[#5d3fd1] flex-1">
                Ending In <span>12</span>h:<span>40</span>m:<span>24</span>s
              </p>
              <button className="p-2 bg-gradient-to-br from-[#5d3fd1] to-[#03abff] rounded-lg flex items-center justify-between gap-1 flex-nowrap text-xs">
                <IoIosLock />
                $CLS 10
                <Image src={coin} alt="" width={20} height={20} />
              </button>
            </div>

            <div className="flex flex-col gap-10 py-4 text-sm">
              <p>
                Follow TH CEO Abayomi Chukwudi on X! If you are already
                following Abayomi, simply complete the quest again to claim the
                $CLS.
              </p>
              <p>
                To learn more:{" "}
                <a href="" className="text-[#2aabee]">
                  https://www.CreatorsLab?node-id=80-586&node-type=frame&t=Myuuav
                </a>
              </p>
            </div>

            <div className="border border-[#606060] p-3 md:px-6 md:py-4 flex flex-row flex-nowrap items-center justify-between rounded-lg gap-2 text-sm">
              <div className="flex items-center justify-between flex-1 gap-1">
                <FaCheckCircle size={30} className="pr-1 aspect-square h-8" />
                <p>
                  Follow{" "}
                  <a href="" className="text-[#2aabee]">
                    CEO Abayomi Chukwudi
                  </a>{" "}
                  on X
                </p>
              </div>
              <button className="p-2 bg-[#222222] rounded-lg">
                Link & Verify
              </button>
            </div>

            <div className="border border-[#606060] rounded-lg p-3 md:px-6 md:py-4 text-sm flex flex-col gap-3">
              <p className="font-bold">Visit link</p>
              <div className="border border-[#606060] flex items-center justify-between p-2 rounded-md gap-2">
                <Link href="" className="text-xs text-[#606060]">
                  /CreatorsLab?node-id=80-586&Myuuav8cuClSt0FM-0
                </Link>
                <FaLink
                  size={24}
                  className="border border-[#606060] rounded-md p-1 bg-[#222222] aspect-square"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold">Connect your X</p>
                <button className=" flex items-center justify-center p-2 rounded-lg w-full bg-white text-black font-bold">
                  <Image
                    src={X}
                    alt=""
                    width={20}
                    height={20}
                    className="mr-4"
                  />
                  Connect Twitter
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-bold">Connect your Telegram</p>
                <button className="flex items-center justify-center p-2 rounded-lg w-full bg-gradient-to-tr from-[#2aabee] to-[#229ed9] font-bold">
                  <Image
                    src={telegram}
                    alt=""
                    width={20}
                    height={20}
                    className="mr-4"
                  />
                  Connect Telegram
                </button>
              </div>
            </div>

            {/* <button className="p-4 bg-[#222222] text-[#606060] rounded-md w-full md:w-[40%] self-end">
              Complete
                      </button> */}

            {/** delete this in production */}
            <button
              className="p-4 bg-gradient-to-b from-[#5D3FD1] to-[#03ABFF] text-white rounded-md w-full md:w-[40%] self-end"
              onClick={() => setIsModalOpen(true)}
            >
              Complete
            </button>
          </div>
          <div className="w-full md:w-[35%]  p-4 md:py-14 md:px-8  bg-[#1c1c1c] rounded-xl flex flex-col gap-4">
            <div className="border border-[#606060] p-3 md:px-6 md:py-4 rounded-lg bg-[#5D3FD126] flex flex-col gap-2">
              <h2 className="text-lg font-syne">Other tasks from TH</h2>
              <p className="text-[#787878] text-xs">
                Get started with more task to earn more $CLS
              </p>
              <p className="text-xs">0/3</p>
              <Progress
                aria-label="Task progress"
                className="w-full"
                value={Math.floor((1 / 3) * 100)}
                size="sm"
              />
            </div>

            <div className="my-4 border border-[#606060] rounded-md flex items-center justify-between p-3 md:px-6 md:py-4 gap-3">
              <div className="flex flex-col gap-2 text-sm flex-1">
                <p>Follow CEO Abayomi Chukwudi on X</p>
                <Image
                  src={X}
                  alt=""
                  width={20}
                  height={20}
                  className="rounded-md bg-white p-1"
                />
              </div>

              <button className="p-2 bg-gradient-to-br from-[#5d3fd1] to-[#03abff] rounded-lg flex items-center justify-between gap-1 flex-nowrap text-xs">
                $CLS 0.8
                <Image src={coin} alt="" width={20} height={20} />
              </button>
            </div>
            <div className="my-4 border border-[#606060] rounded-md flex items-center justify-between p-3 md:px-6 md:py-4 gap-3">
              <div className="flex flex-col gap-2 text-sm flex-1">
                <p>Join the TH community Discord server</p>
                <Image src={discord} alt="" width={24} height={24} />
              </div>

              <button className="p-2 bg-gradient-to-br from-[#5d3fd1] to-[#03abff] rounded-lg flex items-center justify-between gap-1 flex-nowrap text-xs">
                $CLS 0.5
                <Image src={coin} alt="" width={20} height={20} />
              </button>
            </div>
            <div className="my-4 border border-[#606060] rounded-md flex items-center justify-between p-3 md:px-6 md:py-4 gap-3">
              <div className="flex flex-col gap-2 text-sm flex-1">
                <p>Sign up for THX</p>
                <Image src={paper} alt="" width={24} height={24} />
              </div>

              <button className="p-2 bg-gradient-to-br from-[#5d3fd1] to-[#03abff] rounded-lg flex items-center justify-between gap-1 flex-nowrap text-xs">
                $CLS 0.7
                <Image src={coin} alt="" width={20} height={20} />
              </button>
            </div>
          </div>
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
            <>
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
            </>
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default Page;
