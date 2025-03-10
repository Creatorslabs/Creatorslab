"use client";
import React, { FC, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@solana/wallet-adapter-react-ui/styles.css";
import { TiSocialTwitter } from "react-icons/ti";
import { FaDiscord, FaWallet } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import { InputOtp } from "@heroui/input-otp";

import {
  useLoginWithEmail,
  useLoginWithOAuth,
  useConnectWallet,
} from "@privy-io/react-auth";
import { DarkThemeToggle } from "flowbite-react";

const Login: FC = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/tasks";

  const {
    sendCode: sendCodeEmail,
    loginWithCode: loginWithCodeEmail,
    state: stateEmail,
  } = useLoginWithEmail({
    onComplete: ({ user, isNewUser , wasAlreadyAuthenticated, loginMethod }) => {
      console.log("🔑 ✅ User successfully logged in with email", {
        user,
        isNewUser ,
        wasAlreadyAuthenticated,
        loginMethod,
      });
      router.push(redirectTo);
    },
    onError: (error) => {
      console.log(error);
      setError(error);
    },
  });

  const { initOAuth } = useLoginWithOAuth({
    onComplete: ({ user, isNewUser , wasAlreadyAuthenticated, loginMethod }) => {
      console.log("🔑 ✅ User successfully logged in with email", {
        user,
        isNewUser ,
        wasAlreadyAuthenticated,
        loginMethod,
      });
      router.push(redirectTo);
    },
    onError: (error) => {
      console.log(error);
      setError(error);
    },
  });

  const { connectWallet } = useConnectWallet({
    onSuccess: ({ wallet }) => {
      console.log(wallet.address);
      router.push(redirectTo);
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
    <Suspense>
    <div className="w-full h-screen flex flex-col">
      {/** Header section*/}
      <div className="flex justify-between px-6 py-4 md:pl-16 md:py-8 items-start md:items-center w-full">
        <Link href="/" className="flex flex-row gap-2 items-center">
          <Image
            src="/images/logo.png"
            width={30}
            height={30}
            alt="CreatorsLab logo"
          />
          <p className="text-lg">Creatorslab</p>
        </Link>
        <DarkThemeToggle />
      </div>
      <div className="flex-grow flex items-center justify-center md:pt-10">
        <div className="border border-[#F1F2F4] rounded-lg max-w-[350px] md:max-w-[450px] w-full m-auto p-4 md:p-8  mt-10 md:mt-0 shadow-lg">
          <h2 className="font-syne font-bold text-xl">Welcome to CreatorsLab</h2>
          <p className="text-sm text-[#606060]">Join the global community of content creators and earn.</p>
          {loginType === 2 ? (
            <div className="flex flex-col my-4 text-sm">Login with wallet</div>
          ) : (
            <div className="w-full py-2">
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
                      ? "Logging in"
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
      </div>
      </Suspense>
  );
};

export default Login;