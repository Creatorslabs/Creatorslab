"use client"

import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";

const WaitlistForm = () => {

    const [email, setEmail] = useState("");
      const [modalMessage, setModalMessage] = useState("");
      const [showModal, setShowModal] = useState(false);
      const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("/api/waitlist", { email });

            setModalMessage(response.data.message);
            setShowModal(true);

            if (response.status === 201) {
                setEmail("");
            }
        } catch (error) {
            console.error("Error submitting waitlist:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
            <div
                    className="relative p-6 md:py-8 md:px-14 flex flex-col gap-4"
                    id="waitlist"
                  >
                    <Image
                      src="/images/landing-page/Ellipse 49.png"
                      width={500}
                      height={500}
                      alt="bottom"
                      className="absolute right-0 md:right-20 -z-10"
                    />
                    <div className="relative p-6 md:py-8 md:px-14 flex flex-col gap-4 items-center">
                      <h3 className="font-syne text-6xl text-center">Join Our Waitlist</h3>
                      <p className="text-gray-400 text-center text-base">
                        This is your moment. Jump into the Web3 revolution and make your
                        mark. Be the first to experience our platform. Sign up below and get
                        exclusive early access!
                      </p>
                      <form
                        className="mt-4 flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
                        onSubmit={handleSubmit}
                      >
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="px-4 py-2 rounded-md dark:bg-gray-800 border border-gray-700 dark:text-white focus:outline-none w-full sm:w-1/2"
                          required
                        />
                        <button
                          disabled={loading}
                          type="submit"
                          className="rounded-lg py-2 px-4 bg-gradient-to-br from-[#5D3FD1] to-[#03ABFF] text-sm text-white"
                        >
                          {loading ? "Joining..." : "Join Waitlist"}
                        </button>
                      </form>
            </div>
            
            {showModal && (
        <>
          <style>{`body { overflow: hidden; }`}</style>

          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-black p-8 rounded-lg shadow-xl w-96 text-center text-white text-base">
              <p>{modalMessage}</p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-6 bg-gray-700 text-white py-3 px-6 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
                  </div>
    )
}

export default WaitlistForm;