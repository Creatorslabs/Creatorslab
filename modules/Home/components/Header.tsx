import { DarkThemeToggle } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="flex justify-between px-6 py-4 md:px-16 md:py-8 items-center">
      <Link href="/" className="flex flex-row gap-2 items-center">
        <Image
          src="/images/logo.png"
          width={30}
          height={30}
          alt="CreatorsLab logo"
        />
        <p className="text-lg">Creatorslab</p>
      </Link>
      <div className="flex items-center justify-center gap-2 flex-row">
        <DarkThemeToggle />
        <Link
          href="/tasks"
          className="rounded-lg py-2 px-4 bg-gradient-to-br from-[#5D3FD1] to-[#03ABFF] text-sm text-white"
        >
          Get started
        </Link>
      </div>
    </div>
  );
}

export default Header;
