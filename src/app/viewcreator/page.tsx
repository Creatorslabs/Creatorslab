import Link from "next/link";
import Image from "next/image";
import { IoMdArrowBack, IoMdArrowRoundBack } from "react-icons/io";

import { MdCameraEnhance, MdVerified } from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";
import { FaDiscord, FaHeart, FaSquareXTwitter } from "react-icons/fa6";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

function AllTask() {
  return Array.from({ length: 9 }, (_, i) => (
    <div className="w-full flex-1 shadow-md p-2 pb-0 rounded-lg dark:border-[#FFFFFF]">
      <div className="relative">
        <Image
          src="/images/landing-page/Rectangle 3.png"
          width={300}
          height={250}
          alt="image"
          className="w-full rounded-md"
        />
        <Image
          src="/images/user01.jpeg"
          width={10}
          height={10}
          alt="image"
          className="w-10 h-10 absolute right-0 -bottom-4 rounded-full"
        />
      </div>
      <div className="flex flex-col py-3 gap-2">
        <h3 className="font-syne text-xl">Task on X</h3>
        <p className="text-sm text-gray-500">Like a Post</p>
        <div className="flex justify-between">
          <div className="flex flex-row gap-1 rounded-md bg-[#5D3FD1] text-white py-1  px-2 text-sm items-center whitespace-no-wrap">
            4 $CLS
            <Image
              src="/images/coin.svg"
              width={20}
              height={20}
              alt="CLS coin image"
            />
          </div>
          <div className="flex flex-row gap-1 rounded-md bg-[#222222] text-white px-2 text-sm items-center">
            <FaHeart /> 3 of 20 Joined
          </div>
        </div>
      </div>
    </div>
  ));
}

const Page = () => {
  const verified = true;
  return (
    <div className="w-full">
      <div className="w-full py-4 min-h-screen">
        {/* header navigation section */}
        <div className="sm:flex justify-between items-center my-6 block">
          <div className="p-3 rounded-lg bg-[#F7F8F9] dark:bg-[#242424] dark:text-white w-fit">
            <Link href={"/"}>
              <IoMdArrowRoundBack />
            </Link>
          </div>
          <div className="flex justify-between items-center flex-1 sm:ml-5 sm:text-xl font-medium mt-4 sm:mt-0">
            <p>View Creator</p>
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
        <div>
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
              <div className="creator-profile-img" style={{ width: "100%" }}>
                <div className="relative">
                  <Image
                    src={"/images/dp.svg"}
                    alt="profile"
                    width={136}
                    height={136}
                    className="z-0 w-[70px] sm:w-[136px] h-[70px] sm:h-[136px] mx-auto sm:ml-0 rounded-full"
                  />
                  <div className="bg-white rounded-md p-1 w-fit sm:flex right-2 -mt-6 z-10 absolute hidden">
                    <MdCameraEnhance color="#000" size={24} />
                  </div>
                </div>
                <div className="flex items-center justify-between flex-1 flex-wrap gap-4">
                  <div className="flex flex-col gap-2 sm:gap-4 justify-center items-center sm:justify-start sm:items-start">
                    <div className="flex xl:flex-col flex-row xl: gap-5">
                      <p className="sm:text-xl my-0 text-white font-bold">
                        Barbie_xy
                      </p>
                      {verified && (
                        <p className="bg-[#F7F8F9] dark:bg-[#242424] dark:text-white w-fit h-fit py-1 px-3 rounded-lg flex gap-1 sm:gap-2 items-center justify-center">
                          <MdVerified height={30} width={30} color="#1a56db" />
                          <span className="text-xs sm:text-sm">Creator</span>
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <div className="flex justify-between items-center border-[#606060] border rounded-lg p-2 gap-1 text-xs text-white">
                        <FaSquareXTwitter size={20} />
                        barbie_xy
                      </div>
                      <div className="flex justify-between items-center border-[#606060] border rounded-lg p-2 gap-1 text-xs text-white">
                        <FaDiscord size={20} />
                        barbie_xy
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <button className="bg-white bg-opacity-20 w-fit h-fit p-2 sm:px-4 rounded-lg flex gap-2 items-center text-sm">
                      <span>Follow</span>
                    </button>
                    <button className="bg-white bg-opacity-20 w-fit h-fit p-2 sm:px-4 rounded-lg flex gap-2 items-center text-sm">
                      <HiOutlineQuestionMarkCircle size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pb-6 mt-8">
            <p className="flex-1">All taks</p>
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
            <AllTask />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
