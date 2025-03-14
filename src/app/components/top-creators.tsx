import React from "react";
// import newTask from "@/newTasks";
import Link from "next/link";
import Image from "next/image";

const avatars = [
  "/images/user01.jpeg",
  "/images/user02.jpeg",
  "/images/user03.jpeg",
  "/images/user04.jpeg",
  "/images/user05.jpeg",
  "/images/user06.jpeg",
  "/images/user07.jpeg",
  "/images/user08.jpeg",
  "/images/user09.jpeg",
  "/images/Frame 10.png",
];

const TopCreators: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 border border-[#3F3F3F] rounded-md p-4 w-full md:w-[370px]">
      <p className="flex flex-row justify-between text-sm">
        Top Creators<span className="text-[#5D3FD1]">View all</span>
      </p>
      <div className="flex items-center">
        {avatars.map((src, index) => (
          <Link
            href="/"
            key={index}
            className={`relative w-10 h-10 ${
              index !== 0 ? "-ml-4 md:-ml-2" : ""
            } aspect-square`}
          >
            <Image
              src={src}
              alt={`Avatar ${index + 1}`}
              width={40}
              height={40}
              className="rounded-full aspect-square h-full"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopCreators;
