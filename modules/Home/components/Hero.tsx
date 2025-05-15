import Image from "next/image";
import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="flex flex-col md:flex-row py-6 md:py-8 max-w-full overflow-hidden place-items-center place-content-center">
      <div className="flex-1 md:pl-14 flex flex-col justify-center items-center md:items-start gap-4 px-6 text-center md:text-left md:px-0">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-syne font-extrabold leading-tight">
          Empowering Global Creativity with{" "}
          <span className="bg-gradient-to-br from-[#5D3FD1] to-[#03ABFF] bg-clip-text text-transparent">
            Web3
          </span>
        </h1>
        <p className="text-md text-gray-500">
          Join the movement to enable creators worldwide to grow, engage, and
          earn.
        </p>

        <Link
          href="/tasks"
          className="rounded-lg py-2 px-4 bg-gradient-to-br from-[#5D3FD1] to-[#03ABFF] text-sm text-white"
        >
          Get started
        </Link>
      </div>

      <div className="relative hidden md:block">
        <div
          className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-[110%] h-[40%] bg-gradient-to-br from-[#03ABFF] via-[#2DB865] to-[#5D3FD1] 
        blur-[50px] opacity-40 rounded-full rotate-45 z-[-1]"
        ></div>

        <Image
          src="/images/landing-page/Group 266.png"
          width={400}
          height={400}
          alt="coins"
          className="drop-shadow-lg"
        />
      </div>
    </div>
  );
}

export default Hero;
