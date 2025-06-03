import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";

function Sponsor() {
  const theme = cookies().get("theme")?.value || "light";
  return (
    <div className="text-center text-gray-500 text-lg p-4 flex flex-col py-6 items-center justify-center gap-4">
      <p>Powered By:</p>
      <div className="flex items-center justify-center gap-4">
        <Image
          src="/images/landing-page/Group.png"
          width={70}
          height={70}
          alt="coin sack"
          className="w-[100px] h-auto object-cover rounded-md"
        />
        <Image
          src={
            theme === "dark"
              ? "/images/landing-page/st-light.png"
              : "/images/landing-page/st-dark.png"
          }
          width={70}
          height={70}
          alt="coin sack"
          className="w-[100px] h-auto object-cover rounded-md"
        />
      </div>
    </div>
  );
}

export default Sponsor;
