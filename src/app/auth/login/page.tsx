"use client";
import React, { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { TiSocialTwitter } from "react-icons/ti";
import { FaArrowRight, FaDiscord, FaWallet } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
// import { useWallet } from '@solana/wallet-adapter-react'

const LogIn: FC = () => {
  const [loginType, setLoginType] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
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
        <div className="border border-[#606060] rounded-lg max-w-[350px] w-full mx-auto p-4 md:p-8 bg-[#3f3f3f]/10 backdrop-filter backdrop-blur-sm z-50 mt-10 md:mt-0">
          <h2 className="font-syne font-bold text-xl">Login to CreatorsLab</h2>
          <p className="text-sm text-[#606060]">Welcome back!</p>
          {loginType === 2 ? (
            <div className="flex flex-col my-4 text-sm">
              Login with wallet
              <WalletMultiButton
                style={{
                  width: "100%", // w-full
                  padding: "12px", // p-3 (assuming 1rem = 16px, p-3 = 3 * 4px)
                  borderRadius: "6px", // rounded
                  border: "1px solid #606060", // border-[#606060]
                  background: "inherit", // bg-inherit
                  marginTop: "8px", // my-2 (margin-y = 2 * 4px)
                  marginBottom: "8px",
                  color: "#606060", // text-[#606060]
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "space-between",
                }}
              >
                <p className="w-full flex justify-between items-center text-xs">
                  Connect with wallet <FaArrowRight />
                </p>
              </WalletMultiButton>
            </div>
          ) : (
            <div className="w-ful">
              {" "}
              <label className="block my-1 text-xs">
                Email address
                <input
                  type="text"
                  className="w-full p-3 rounded border border-[#606060] bg-inherit my-2 text-[#606060]"
                  placeholder="address@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="block my-1 text-xs">
                Verification code
                <input
                  type="text"
                  className="w-full p-3 rounded border border-[#606060] bg-inherit my-2 text-[#606060]"
                  placeholder="address@email.com"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
                />
              </label>
            </div>
          )}

          <div className="flex flex-row gap-2 items-center">
            <div className="flex-1 border-t border-[#3f3f3f]"></div>
            <p className="text-sm text-[#3f3f3f] font-bold">OR</p>
            <div className="flex-1 border-t border-[#3f3f3f]"></div>
          </div>
          <div className="flex flex-col gap-4 py-4">
            <p className="text-xs">Log in with Social account</p>
            <div className="flex flex-row gap-4 items-center flex-wrap">
              <button className="flex flex-row p-2 flex-1 bg-gradient-to-r from-[#5D3FD1] to-[#191919] rounded-md items-center gap-2 text-xs max-w-[128px] w-full">
                <TiSocialTwitter className="text-[#55ACEE]" /> Twitter
              </button>
              <button className="flex flex-row p-2 flex-1 bg-gradient-to-r from-[#5D3FD1] to-[#191919] rounded-md items-center gap-2 text-xs max-w-[128px] w-full">
                <FaDiscord className="text-[#55ACEE]" /> Discord
              </button>
              {loginType === 1 ? (
                <button
                  onClick={() => setLoginType(2)}
                  className="flex flex-row p-2 flex-1 bg-gradient-to-r from-[#5D3FD1] to-[#191919] rounded-md items-center gap-2 text-xs max-w-[128px] w-full"
                >
                  <FaWallet className="text-[#55ACEE]" /> Wallet
                </button>
              ) : (
                <button
                  onClick={() => setLoginType(1)}
                  className="flex flex-row p-2 flex-1 bg-gradient-to-r from-[#5D3FD1] to-[#191919] rounded-md items-center gap-2 text-xs max-w-[128px] w-full"
                >
                  <IoMdMail className="text-[#55ACEE]" /> Email
                </button>
              )}
            </div>
          </div>
        </div>
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
