"use client";

import React, { FC, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@solana/wallet-adapter-react-ui/styles.css";
import { TiSocialTwitter } from "react-icons/ti";
import { FaCheckCircle, FaDiscord, FaWallet } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import { InputOtp } from "@heroui/input-otp";

import {
  useConnectWallet,
  useLoginWithEmail,
  useLoginWithOAuth,
  User,
} from "@privy-io/react-auth";
import { DarkThemeToggle } from "flowbite-react";
import { clipBeforeLastColon } from "@/actions/clip-privy-id";

const Spinner = () => (
  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
);

const NewUserModal = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <Image
            src="/images/signup/noto_confetti-ball.png"
            width={50}
            height={50}
            alt="Welcome to CreatorsLab"
          />
          <div className="flex flex-col gap-2 p-4 bg-[#FFFFFF] bg-opacity-5 text-xs w-full rounded-md">
            <p className="font-bold">As a Newbie you can earn:</p>
            <p>
              0.3 labseeds for{" "}
              <span className="text-[#03ABFF]">Daily login</span>
            </p>
            <p>
              0.3 labseeds for <span className="text-[#03ABFF]">Comments</span>
            </p>
            <p>
              0.3 labseeds for <span className="text-[#03ABFF]">Repost</span>
            </p>
            <p>
              0.3 labseeds to{" "}
              <span className="text-[#03ABFF]">Read stories & Blog post</span>
            </p>
            <p>
              1 CLS for a Referral{" "}
              <span className="text-[#03ABFF]">Referral</span>
            </p>
            <p className="p-2 text-center w-full bg-[#03ABFF] rounded-md bg-opacity-20 border border-[#03ABFF]">
              50CLS = $1
            </p>
          </div>
          <button
            onClick={onContinue}
            className="w-full bg-gradient-to-b from-[#5D3FD1] to-[#03ABFF] p-2 rounded-md"
          >
            Let&apos;s go!
          </button>
        </div>
      </div>
    </div>
  );
};

const Login: FC = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("next") || "/tasks";

  const [newUser, setNewUser] = useState(false);

const handleContinue = () => {
  setNewUser(false);
  router.push(redirectTo);
};

const fetchUser = React.useCallback(async (user: User) => {
  const privyId = clipBeforeLastColon(user?.id);
  const cacheKey = `user-${privyId}`;
  
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);

    const res = await fetch(`/api/user/get-user`, {
      method: "POST",
      body: JSON.stringify({ privyId }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    sessionStorage.setItem(cacheKey, JSON.stringify(data.user));
    return data.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}, []);

const authCallback = async ({ user, isNewUser }) => {
  try {
    if (isNewUser) {
      const newUser = await fetchUser(user);
      if (newUser) {
        setNewUser(true);
      }
    } else {
      router.push(redirectTo);
    }
  } catch (error) {
    console.error("Error in authCallback:", error);
    setError("An unexpected error occurred");
  }
}

    const handleError = (error) => {
      console.error("Authentication Error:", error);
      setError(error.message || "An unexpected error occurred");
      setSocialLoading(null);
    };

const { sendCode: sendCodeEmail, loginWithCode: loginWithCodeEmail } = useLoginWithEmail({
  onComplete: authCallback,
  onError: handleError,
});

const { initOAuth } = useLoginWithOAuth({
  onComplete: authCallback,
  onError: handleError,
});

const { connectWallet } = useConnectWallet({
  onSuccess: ({ wallet }) => {
    console.log(wallet.address);
    router.push(redirectTo);
  },
  onError: handleError,
});

  const [loginType, setLoginType] = useState(1);
  const [email, setEmail] = useState("");
  const [codeEmail, setCodeEmail] = useState("");
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const [authState, setAuthState] = useState<{
    status: 'idle' | 'sending' | 'sent' | 'verifying' | 'success' | 'error';
    message?: string;
  }>({ status: 'idle' });
  
  // Update all auth handlers to use this state
  const handleSendCode = async () => {
    setAuthState({ status: 'sending', message: 'Sending OTP...' });
    try {
      await sendCodeEmail({ email });
      setAuthState({ status: 'sent' });
    } catch (error) {
      setAuthState({ status: 'error', message: (error as Error).message });

      const timer = setTimeout(() => {
        setAuthState({status: "idle"})
      }, 1000);
      return () => clearTimeout(timer);
    }
  };
  
  const handleVerifyCode = async () => {
    setAuthState({ status: 'verifying', message: 'Verifying OTP...' });
    try {
      await loginWithCodeEmail({ code: codeEmail });
      setAuthState({ status: 'success' });
    } catch (error) {
      setAuthState({ status: 'error', message: (error as Error).message });

      const timer = setTimeout(() => {
        setAuthState({status: "sent"})
      }, 1000);
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    if (authState.status === "sent" && !canResend) {
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [authState, canResend]);

  useEffect(() => {
    if (authState.status === 'success') {
      if (newUser) return

      const timer = setTimeout(() => {
        router.push(redirectTo);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [newUser]);

  return (
    <div className="w-full h-screen flex flex-col">
      {newUser && <NewUserModal onContinue={handleContinue} />}
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
              <div className="w-full py-2">
                {(authState.status === "idle" || authState.status === "sending") && (
                    <>
                      <label className="block my-1 text-xs">
                        Email address
                        <input
                          type="text"
                          className="flex justify-between w-full p-3 rounded border border-[#606060] bg-inherit my-2 text-[#606060] text-sm"
                          placeholder="address@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          onKeyDown={(e) => e.key === 'Enter' && handleSendCode()}
                        />
                      </label>
                      <button
                        className="w-full bg-gradient-to-b from-[#5D3FD1] to-[#03ABFF] p-2 rounded-md flex items-center justify-center gap-2"
                        onClick={handleSendCode}
                        disabled={authState.status === "sending" || !email}
                      >
                        {authState.status === "sending" ? (
                          <>
                            <Spinner />
                            Sending OTP...
                          </>
                        ) : (
                          "Request OTP"
                        )}
                      </button>
                    </>
                  )}

                  {(authState.status === "sent" || authState.status === "verifying") && (
                    <>
                      <div className="flex items-center justify-center py-4">
                        <InputOtp
                          length={6}
                          value={codeEmail}
                          onChange={(e: any) => setCodeEmail(e.target.value)}
                          className="self-center"
                          onComplete={handleVerifyCode}
                          autoFocus
                          disabled={authState.status === 'verifying'}
                        />
                      </div>
                      <button
                        className="w-full bg-gradient-to-b from-[#5D3FD1] to-[#03ABFF] p-2 rounded-md flex items-center justify-center gap-2"
                        onClick={handleVerifyCode}
                        disabled={authState.status === 'verifying' || codeEmail.length !== 6}
                      >
                        {authState.status === 'verifying' ? (
                          <>
                            <Spinner />
                            Verifying...
                          </>
                        ) : (
                          "Verify OTP"
                        )}
                      </button>
                      <div className="text-center mt-2 text-xs">
                        {canResend ? (
                          <button
                            onClick={() => {
                              sendCodeEmail({ email });
                              setCanResend(false);
                              setResendTimer(30);
                            }}
                            className="text-[#03ABFF] hover:underline"
                            disabled={authState.status === 'verifying'}
                          >
                            Resend OTP
                          </button>
                        ) : (
                          <p>Resend OTP in {resendTimer}s</p>
                        )}
                      </div>
                    </>
                  )}
                

            {authState.status === 
              'error' && (
                <p style={{ color: "red" }} className="text-xs py-2">
                  {authState?.message}
                </p>
                )}
              {error && (
                <p style={{ color: "red" }} className="text-xs py-2">
                  {error}
                </p>
                )}
                
              {authState.status === 'success' && (
                <div className="flex items-center justify-center">
                  <div className="p-6 text-center">
                    <FaCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Login Successful!</h3>
                    <p className="text-sm mt-2">Redirecting you to your dashboard...</p>
                  </div>
                </div>
              )}
            </div>

          <div className="flex flex-row gap-2 items-center">
            <div className="flex-1 border-t border-[#3f3f3f]"></div>
            <p className="text-sm text-[#3f3f3f] font-bold">OR</p>
            <div className="flex-1 border-t border-[#3f3f3f]"></div>
          </div>
          <div className="flex flex-col gap-4 py-4">
            <p className="text-xs">Log in with Social account</p>
            <div className="flex flex-row gap-4 items-center flex-wrap">
              <button
                onClick={() => {
                  setSocialLoading('twitter');
                  initOAuth({ provider: "twitter", disableSignup: true });
                }}
                disabled={!!socialLoading}
                className="flex flex-row p-2 flex-1 bg-gradient-to-r from-[#5D3FD1] to-[#191919] rounded-md items-center gap-2 text-xs max-w-[128px] w-full text-white"
              >
                {socialLoading === 'twitter' ? <Spinner /> : <TiSocialTwitter />}
                Twitter
              </button>
              <button
                onClick={() => {
                  setSocialLoading('discord');
                  initOAuth({ provider: "discord", disableSignup: true });
                }}
                disabled={!!socialLoading}
                className="flex flex-row p-2 flex-1 bg-gradient-to-r from-[#5D3FD1] to-[#191919] rounded-md items-center gap-2 text-xs max-w-[128px] w-full text-white"
              >
                {socialLoading === 'discord' ? <Spinner /> : <FaDiscord className="text-[#55ACEE]" />}
                Discord
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
  );
};

export default Login;