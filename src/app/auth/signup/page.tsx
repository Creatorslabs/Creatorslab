"use client";
import Image from "next/image";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import AccountCreationModal from "../../components/Modals/account-creation-modal";

function Page() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const verifyOtp = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
    setStep(1);
  };

  return (
    <div className="h-screen overflow-hidden w-full bg-gradient-to-b from-[#161616]/70 via-[#5d3fd1]/15 to-[#03abff]/15 p:6 md:p-8">
      {/** Header section*/}
      <div className="flex justify-between px-6 py-4 md:px-16 md:py-8 items-start md:items-center">
        <Image
          src="/images/logo.svg"
          width={150}
          height={150}
          alt="CreatorslLab lgo"
        />
        <div className="flex flex-row gap-2 items-center flex-wrap justify-end">
          <p className="text-sm">Already have an account? </p>
          <Link
            href="/auth/login"
            className="py-2 px-4 rounded-md border border-gray-500"
          >
            login
          </Link>
        </div>
      </div>

      {/** Sign up section */}
      <div className="mt-[20px] ">
        {step === 1 ? (
          <form
            action=""
            className="border border-[#606060] rounded-lg max-w-[350px] md:max-w-[500px] w-full mx-auto p-4 md:p-8 bg-[#3f3f3f]/10 backdrop-filter backdrop-blur-sm"
            onSubmit={handleSubmit}
          >
            <h2 className="font-syne font-bold text-xl">
              Welcome to CreatorsLab
            </h2>
            <p className="text-sm text-[#606060]">
              Join the global community of content creators and earn.
            </p>

            {/* {stage === 1 ? ( */}
            <>
              <label className="block my-4">
                Email address
                <input
                  type="text"
                  className="w-full p-3 rounded border border-[#606060] bg-inherit my-2 text-[#606060]"
                  placeholder="address@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <button className="w-full p-3 rounded border border-[#606060] bg-inherit my-2">
                Continue with email
              </button>
              <p className="text-xs text-[#606060] my-2">
                By continuing, you agree to our{" "}
                <span className="font-bold text-gray-500">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="font-bold text-gray-500">Privacy Policy</span>
              </p>
            </>
          </form>
        ) : (
          <form
            action=""
            className="border border-[#606060] rounded-lg max-w-[350px] md:max-w-[500px] w-full mx-auto p-4 md:p-8 bg-[#3f3f3f]/10 backdrop-filter backdrop-blur-sm"
            onSubmit={verifyOtp}
          >
            <h2 className="font-syne font-bold text-xl">Verify OTP</h2>
            <p className="text-sm text-[#606060]">
              A one-time password has been sent to your email address:{" "}
              <span>{email}</span>
            </p>

            {/* {stage === 1 ? ( */}
            <>
              <input
                type="number"
                className="block my-4 w-full p-3 rounded border border-[#606060] bg-inherit text-[#606060] no-arrows"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
              />
              <button className="w-full p-3 rounded border border-[#606060] bg-inherit my-2">
                Verify OTP
              </button>
            </>
          </form>
        )}
      </div>
      <AccountCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <Image
            src="/images/signup/noto_confetti-ball.png"
            width={50}
            height={50}
            alt="CreatorslLab lgo"
          />
          <div className="flex flex-col gap-2 p-4 bg-[#FFFFFF] bg-opacity-5 text-xs w-[80%] rounded-md">
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
          <button className="w-full bg-gradient-to-b from-[#5D3FD1] to-[#03ABFF] p-2 rounded-md">
            Lets go!
          </button>
        </div>
      </AccountCreationModal>
    </div>
  );
}

export default Page;

//0.3 labseeds  for  Liking  posts
// 0.5 labseeds for  Comments
// 0.8 labseeds for  Repost
// 0.8 labseeds to Read stories & Blog post
// 1 CLS for a Referral
