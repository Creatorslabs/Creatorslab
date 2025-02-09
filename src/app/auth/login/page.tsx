"use client";
import React, { FC } from "react";
import floatingBall from "../../../../public/images/float1.png";
import floatingball2 from "../../../../public/images/float2.png";
import logo from "../../logo.svg";
import Link from "next/link";
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { TiSocialTwitter } from "react-icons/ti";
import { FaDiscord } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
// import { useWallet } from '@solana/wallet-adapter-react'

const LogIn: FC = () => {
  // const { connected } = useWallet();
  // return (
  //   <div className="w-[100vw] h-[100vh] flex items-center justify-between">
  //     <div className="w-2/4  h-full">
  //       <div className="my-10 w-[60%] mx-auto">
  //         <nav className="flex items-center justify-between py-6">
  //           <Link href={"/"}>
  //             <Image src={logo} alt="" width={150} height={200} />
  //           </Link>

  //           <div>
  //             <span className="text-[#606060]">New to CreatorsLab?</span>
  //             <Link
  //               href={"/auth/sign-up"}
  //               className="mx-4 border p-4 rounded-lg border-[#606060]"
  //             >
  //               Create an account
  //             </Link>
  //           </div>
  //         </nav>

  //         <div className="my-[100px]">
  //           <form
  //             action=""
  //             className="border border-[#606060] rounded-lg w-full m-auto p-8 bg-[#3f3f3f]/10 backdrop-filter backdrop-blur-sm z-40"
  //           >
  //             <h2 className="font-syne font-bold text-xl">
  //               Log in to CreatorsLab
  //             </h2>
  //             <p className="text-sm text-[#606060]">Welcome back.</p>
  //             <label className="block my-4">Log in with Wallet</label>
  //             <WalletMultiButton
  //               style={{ background: "#222222", width: "500px" }}
  //             >
  //               Connect with wallet
  //             </WalletMultiButton>
  //             <div className="flex items-center justify-between my-4">
  //               <div className=" w-[40%] border border-[#606060] "></div>
  //               <span>OR</span>
  //               <div className=" w-[40%] border border-[#606060] "></div>
  //             </div>
  //             <label className="block my-4">Log in with social accounts</label>
  //             <div className="mb-20">
  //               <button className="p-3 rounded mr-4 w-[150px] bg-gradient-to-r from-[#5d3fd1] to-[#191919]">
  //                 Twitter
  //               </button>
  //               <button className="p-3 rounded mr-4 w-[150px] bg-gradient-to-r from-[#5d3fd1] to-[#191919]">
  //                 Discord
  //               </button>
  //               <button className="p-3 rounded mr-4 w-[150px] bg-gradient-to-r from-[#5d3fd1] to-[#191919]">
  //                 Email
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="w-2/4  h-full bg-[url(/images/signin-upbg.png)] bg-cover bg-no-repeat relative z-[-9999]">
  //       <Image
  //         src={floatingball2}
  //         alt=""
  //         width={400}
  //         height={400}
  //         className="absolute top-0 right-0 scale-x-[-1]"
  //       />
  //       <Image
  //         src={floatingBall}
  //         alt=""
  //         width={800}
  //         height={800}
  //         className="absolute bottom-0 left-[-300px] z-[-999]"
  //       />
  //     </div>
  //   </div>
  // );

  return (
    <div className="w-full h-screen overflow-hidden flex flex-row">
      <div className="w-full flex-1 h-full z-50">
        {/** Header section*/}
        <div className="flex justify-between px-6 py-4 md:pl-16 md:py-8 items-start md:items-center">
          <Image
            src="/images/logo.svg"
            width={150}
            height={150}
            alt="CreatorslLab lgo"
          />
          <div className="flex flex-row gap-2 items-center flex-wrap justify-end">
            <p className="text-sm text-[#3f3f3f]">New to CreatorsLab? </p>
            <Link
              href="/auth/signup"
              className="py-2 px-4 rounded-md border border-[#606060] bg-[#3f3f3f]/10 backdrop-filter backdrop-blur-sm"
            >
              Create an account
            </Link>
          </div>
        </div>
        <form
          action=""
          className="border border-[#606060] rounded-lg max-w-[350px] w-full mx-auto p-4 md:p-8 bg-[#3f3f3f]/10 backdrop-filter backdrop-blur-sm z-50"
        >
          <h2 className="font-syne font-bold text-xl">Login to CreatorsLab</h2>
          <p className="text-sm text-[#606060]">Welcome back!</p>
          <label className="block my-4 text-sm">
            Login with wallet
            <input
              type="text"
              className="w-full p-3 rounded border border-[#606060] bg-inherit my-2 text-[#606060]"
              placeholder="address@email.com"
            />
          </label>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex-1 border-t border-[#3f3f3f]"></div>
            <p className="text-sm text-[#3f3f3f] font-bold">OR</p>
            <div className="flex-1 border-t border-[#3f3f3f]"></div>
          </div>
          <div className="flex flex-col gap-4 py-4">
            <p className="text-xs">Log in with Social account</p>
            <div className="flex flex-row gap-4 items-center">
              <button className="flex flex-row p-2 flex-1 bg-gradient-to-r from-[#5D3FD1] to-[#191919] rounded-md items-center gap-2 text-xs">
                <TiSocialTwitter className="text-[#55ACEE]" /> Twitter
              </button>
              <button className="flex flex-row p-2 flex-1 bg-gradient-to-r from-[#5D3FD1] to-[#191919] rounded-md items-center gap-2 text-xs">
                <FaDiscord className="text-[#55ACEE]" /> Discord
              </button>
              <button className="flex flex-row p-2 flex-1 bg-gradient-to-r from-[#5D3FD1] to-[#191919] rounded-md items-center gap-2 text-xs">
                <IoMdMail className="text-[#55ACEE]" /> Email
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="relative hidden md:block flex-1 h-full -z-50">
        <Image
          src="/images/login/signin-upbg.png"
          width={600}
          height={600}
          alt="main side image"
          className="w-full bg-cover h-full -z-20"
        />
        <Image
          src="/images/login/float1.png"
          width={300}
          height={300}
          alt="top image"
          className="absolute -bottom-10 -left-32"
        />
        <Image
          src="/images/login/float2.png"
          width={200}
          height={200}
          alt="Bottom image"
          className="absolute top-10 right-0 -rotate-90"
        />
      </div>
    </div>
  );
};

export default LogIn;
