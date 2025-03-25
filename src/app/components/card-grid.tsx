import React from "react";
import Image from "next/image"
import Link from "next/link";
import { FaHeart } from "react-icons/fa6";

const CardGrid = ({tasks}) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task, index) => (
          <React.Fragment key={index}>
            {/* Render the card */}
            <Link href={`/tasks/${task._id}`} key={index} className="w-full flex-1 shadow-md p-2 pb-0 rounded-lg dark:border-[#FFFFFF]">
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
                  <h3 className="font-syne text-xl">{ task.title}</h3>
                  <p className="text-sm text-gray-500">
                    {task.description}
                  </p>
                  <div className="flex justify-between">
                    <div className="flex flex-row gap-1 rounded-md bg-[#5D3FD1] text-white py-1  px-2 text-sm items-center whitespace-no-wrap">
                      {task.rewardPoints} $CLS
                      <Image
                        src="/images/coin.svg"
                        width={20}
                        height={20}
                        alt="CLS coin image"
                      />
                    </div>
                    <div className="flex flex-row gap-1 rounded-md bg-[#222222] text-white px-2 text-sm items-center">
                      <FaHeart /> {task.participants.length} of {task.maxParticipants} Joined
                    </div>
                  </div>
                </div>
              </Link>

            {/* Insert full-width iframe after the 5th card */}
            {index === 2 && (
              <div className="py-6 md:py-8 grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-full w-full">
                      <div className="relative flex-1 rounded-md p-4 flex flex-row justify-between overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/images/button-bg05.jpeg')] bg-cover bg-center -z-30"></div>
                        <div className="flex flex-col gap-3 flex-1 items-start justify-center">
                          <h3 className="text-lg font-syne">Purchase $CLS</h3>
                          <p className="text-xs">
                            Buy creatorslab seeds to boost content visibility and engagement.
                          </p>
                          <button className="p-2 rounded-md bg-white bg-opacity-15 text-xs">
                            Buy $CLS
                          </button>
                        </div>
                        <Image
                          src="/images/landing-page/Group 11.png"
                          width={200}
                          height={200}
                          alt="coin sack"
                          className="h-28 w-auto"
                        />
                      </div>
                      <div className="relative flex-1 rounded-md p-4 flex flex-row justify-between overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/images/button-bg02.jpeg')] bg-cover bg-center -z-30 "></div>
                        <div className="flex flex-col gap-3 flex-1 items-start justify-center">
                          <h3 className="text-lg font-syne">Burn $CLS</h3>
                          <p className="text-xs">Burn CLS to earn SOL. (Coming Soon)</p>
                          <button className="p-2 rounded-md bg-white bg-opacity-15 text-xs">
                            Burn now
                          </button>
                        </div>
                        <Image
                          src="/images/landing-page/Group 11.png"
                          width={200}
                          height={200}
                          alt="coin sack"
                          className="h-auto w-auto"
                        />
                      </div>
                    </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
