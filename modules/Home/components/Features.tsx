import Image from "next/image";
import React from "react";
import { FaHeart } from "react-icons/fa6";
import { IoIosRocket } from "react-icons/io";
import { FaLink } from "react-icons/fa";

function Features() {
  return (
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
          and SuperteamNG. Together, we are crafting a digital playground where
          creators rule.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <div className="relative text-center rounded-lg">
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
  );
}

export default Features;
