"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { DarkThemeToggle } from "flowbite-react";
import SearchBar from "./search-bar";
import TaskModal from "./Modals/CreateTask";
import { useConnectWallet, useLinkAccount, usePrivy } from "@privy-io/react-auth";
import { toast } from "react-toastify";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { authenticated, user, login, ready } = usePrivy();

  const { linkWallet} = usePrivy()

  return (
    <>
      <nav className="flex justify-between items-center py-6 md:px-14 gap-4">
        {/* Logo */}
        <Link href="/" className="flex flex-row gap-2 items-center">
          <Image
            src="/images/logo.png"
            width={30}
            height={30}
            alt="CreatorsLab logo"
          />
          <p className="text-lg">Creatorslab</p>
        </Link>

        <div className="flex-1 flex flex-row items-center justify-end gap-2">
          <SearchBar />
          {ready && authenticated ? (
            <div className="flex items-center space-x-4">
              <DarkThemeToggle />

              <button
                className="md:hidden p-2 bg-[#F7F8F9] dark:bg-[#242424] dark:text-white rounded-lg"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <GiHamburgerMenu />
              </button>
              <div className="hidden md:flex items-center gap-3">
                <button
                  className="p-2 text-white text-xs rounded-md bg-gradient-to-br from-[#5d3fd1] to-[#03abff]"
                  onClick={() => setModalOpen(true)}
                >
                  Plant Seeds
                </button>
                {user?.wallet ? <button className="p-2 rounded-md bg-[#3f3f3f]/30 backdrop-filter backdrop-blur-sm flex items-center justify-around gap-2 text-xs">
                  {user?.wallet?.address.slice(0, 6)}
                </button> : <button className="p-2 rounded-md bg-[#3f3f3f]/30 backdrop-filter backdrop-blur-sm flex items-center justify-around gap-2 text-xs" onClick={() =>
                    linkWallet({
                      walletList: [
                        "detected_solana_wallets",
                        "backpack",
                        "phantom",
                        "solflare",
                        "metamask",
                      ],
                      walletChainType: "solana-only",
                    })
                  }>
                  Connect
                </button>}
                <Link href="/profile">
                  <Image
                    src="/images/profileImg.svg"
                    alt="Profile"
                    width={30}
                    height={30}
                  />
                </Link>
              </div>
            </div>
          ) : (
            <button
              className="p-2 text-white text-xs rounded-md bg-gradient-to-br from-[#5d3fd1] to-[#03abff]"
              onClick={() => login()}
            >
              Connect wallet
            </button>
          )}
        </div>

        {/* Mobile Menu (visible when hamburger is clicked) */}
        {menuOpen && (
          <div className="absolute top-16 right-4 bg-gray-800 flex flex-col gap-2 text-white p-4 rounded-lg md:hidden z-50">
            {ready && authenticated ? (
              <>
                {user?.wallet ? <button className="p-2 rounded-md bg-[#3f3f3f]/30 backdrop-filter backdrop-blur-sm flex items-center justify-around gap-2 text-xs">
                  {user?.wallet?.address.slice(0, 6)}
                </button> : <button className="p-2 rounded-md bg-[#3f3f3f]/30 backdrop-filter backdrop-blur-sm flex items-center justify-around gap-2 text-xs" onClick={() =>
                    linkWallet({
                      walletList: [
                        "detected_solana_wallets",
                        "backpack",
                        "phantom",
                        "solflare",
                        "metamask",
                      ],
                      walletChainType: "solana-only",
                    })
                  }>
                  Connect
                </button>}
                
                <button className="block w-full text-left p-3 mb-2 font-bold bg-gradient-to-r from-[#5d3fd1] to-[#03abff] rounded-lg">
                  Plant Seeds
                </button>
                <div className="flex gap-2 justify-between">
                  <DarkThemeToggle />
                  <div className="flex justify-center">
                    <Image
                      src="/images/profileImg.svg"
                      alt="Profile"
                      width={30}
                      height={30}
                    />
                  </div>
                </div>
              </>
            ) : (
              <button
                className="p-2 text-white text-xs rounded-md bg-gradient-to-br from-[#5d3fd1] to-[#03abff]"
                onClick={() => login()}
              >
                Connect wallet
              </button>
            )}
          </div>
        )}
      </nav>

      <TaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Navbar;
