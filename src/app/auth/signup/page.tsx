"use client";
import Image from "next/image";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";

function Page() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const verifyOtp = (e: SyntheticEvent) => {
    e.preventDefault();
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
    </div>
  );
}

export default Page;
