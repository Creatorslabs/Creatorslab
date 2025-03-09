"use client";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@solana/wallet-adapter-react-ui/styles.css";
import { TiSocialTwitter } from "react-icons/ti";
import { FaDiscord, FaWallet } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useRouter } from "next/navigation";
import { InputOtp } from "@heroui/input-otp";

import {
  useLoginWithEmail,
  useLoginWithOAuth,
  useConnectWallet,
} from "@privy-io/react-auth";
import { DarkThemeToggle } from "flowbite-react";
// import { useWallet } from '@solana/wallet-adapter-react'

const Login: FC = () => {
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    sendCode: sendCodeEmail,
    loginWithCode: loginWithCodeEmail,
    state: stateEmail,
  } = useLoginWithEmail({
    onComplete: ({ user, isNewUser, wasAlreadyAuthenticated, loginMethod }) => {
      console.log("🔑 ✅ User successfully logged in with email", {
        user,
        isNewUser,
        wasAlreadyAuthenticated,
        loginMethod,
      });
      router.push("/tasks");
    },
    onError: (error) => {
      console.log(error);
      setError(error);
    },
  });

  const { initOAuth } = useLoginWithOAuth({
    onComplete: ({ user, isNewUser, wasAlreadyAuthenticated, loginMethod }) => {
      console.log("🔑 ✅ User successfully logged in with email", {
        user,
        isNewUser,
        wasAlreadyAuthenticated,
        loginMethod,
      });
      router.push("/tasks");
    },
    onError: (error) => {
      console.log(error);
      setError(error);
    },
  });

  const { connectWallet } = useConnectWallet({
    onSuccess: ({ wallet }) => {
      console.log(wallet.address);

      router.push("/tasks");
    },
    onError: (error) => {
      console.log(error);
      setError(error);
    },
  });

  const [loginType, setLoginType] = useState(1);
  const [email, setEmail] = useState("");
  const [codeEmail, setCodeEmail] = useState("");
  const [emailState, setEmailState] = useState(stateEmail.status as string);

  // Update email status
  useEffect(() => {
    if (stateEmail.status === "error" && stateEmail.error) {
      const message = `Error ${stateEmail.error.message}`;
      setEmailState(message);
    } else {
      setEmailState(stateEmail.status);
    }
  }, [stateEmail]);

  return (
    <div className="w-full h-screen overflow-hidden flex flex-row">
      <div className="w-full flex-1 h-full z-50">
        {/** Header section*/}
        <div className="flex justify-between px-6 py-4 md:pl-16 md:py-8 items-start md:items-center">
          <div className="flex flex-row gap-2 items-center">
            <Image
            src="/images/logo.png"
            width={30}
            height={30}
            alt="CreatorslLab lgo"
          />
            <p className="text-lg">Creatorslab</p>
          </div>
          
          <DarkThemeToggle />
          <div className="flex flex-row gap-2 items-center flex-wrap justify-end">
            <p className="text-sm text-[#3f3f3f] dark:text-[#F1F2F4]">New to CreatorsLab? </p>
            <Link
              href="/signup"
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
            <div className="flex flex-col my-4 text-sm">Login with wallet</div>
          ) : (
            <div className="w-ful py-2">
              {emailState === "awaiting-code-input" ? (
                <>
                  <div className="flex items-center justify-center py-4">
                    <InputOtp
                      length={6}
                      value={codeEmail}
                      onChange={(e: any) => setCodeEmail(e.target.value)}
                      className="self-center"
                    />
                  </div>
                  <button
                    className="w-full bg-gradient-to-b from-[#5D3FD1] to-[#03ABFF] p-2 rounded-md"
                    onClick={() => loginWithCodeEmail({ code: codeEmail })}
                    disabled={emailState !== "awaiting-code-input"}
                  >
                    {emailState !== "awaiting-code-input"
                      ? "Loging in"
                      : "Login"}
                  </button>
                </>
              ) : (
                <>
                  <label className="block my-1 text-xs">
                    Email address
                    <input
                      type="text"
                      className="flex justify-between w-full p-3 rounded border border-[#606060] bg-inherit my-2 text-[#606060] text-sm"
                      placeholder="address@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <button
                    className="w-full bg-gradient-to-b from-[#5D3FD1] to-[#03ABFF] p-2 rounded-md text-white"
                    onClick={() => sendCodeEmail({ email })}
                    disabled={emailState !== "initial"}
                  >
                    {emailState !== "initial"
                      ? "Requesting OTP"
                      : "Request OTP"}
                  </button>
                </>
              )}
              {error && (
                <p style={{ color: "red" }} className="text-xs py-2">
                  {error}
                </p>
              )}
              {emailState === "awaiting-code-input" && (
                <p style={{ color: "green" }} className="text-xs py-2">
                  OTP sent successfully, please check your email!
                </p>
              )}
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
              <button
                onClick={() =>
                  initOAuth({ provider: "twitter", disableSignup: true })
                }
                className="flex flex-row p-2 flex-1 bg-gradient-to-r from-[#5D3FD1] to-[#191919] rounded-md items-center gap-2 text-xs max-w-[128px] w-full text-white"
              >
                <TiSocialTwitter className="text-[#55ACEE]" /> Twitter
              </button>
              <button
                onClick={() =>
                  initOAuth({ provider: "discord", disableSignup: true })
                }
                className="flex flex-row p-2 flex-1 bg-gradient-to-r from-[#5D3FD1] to-[#191919] rounded-md items-center gap-2 text-xs max-w-[128px] w-full text-white"
              >
                <FaDiscord className="text-[#55ACEE]" /> Discord
              </button>
              {loginType === 1 ? (
                <button
                  onClick={() =>
                    connectWallet({
                      walletList: [
                        "detected_solana_wallets",
                        "backpack",
                        "phantom",
                        "solflare",
                        "metamask",
                      ],
                      walletChainType: "solana-only",

                    })
                  }
                  className="flex flex-row p-2 flex-1 bg-gradient-to-r from-[#5D3FD1] to-[#191919] rounded-md items-center gap-2 text-xs max-w-[128px] w-full text-white"
                >
                  <FaWallet className="text-[#55ACEE]" /> Wallet
                </button>
              ) : (
                <button
                  onClick={() => setLoginType(1)}
                  className="flex flex-row p-2 flex-1 bg-gradient-to-r from-[#5D3FD1] to-[#191919] rounded-md items-center gap-2 text-xs max-w-[128px] w-full text-white"
                >
                  <IoMdMail className="dark:text-[#55ACEE]" /> Email
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden md:block flex-1 h-full">
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

export default Login;
