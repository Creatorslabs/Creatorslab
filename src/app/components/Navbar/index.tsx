// import { useWallet } from '@solana/wallet-adapter-react';

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TaskModal from "../Modals/CreateTask";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchBar from "../search-bar";
// import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  // const { connected } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false); // State to control the hamburger menu
  const [modalOpen, setModalOpen] = useState(false); // State to control the modal visibility

  return (
    <>
      <nav className="flex justify-between items-center p-6 md:px-14 gap-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Creatorslab Logo"
            width={150}
            height={200}
          />
        </Link>

        <div className="flex-1 flex flex-row items-center justify-end gap-2">
          {/* Search Box */}
          <SearchBar />

          {/* Hamburger Icon and Profile/Button Section */}
          <div className="flex items-center space-x-4">
            {/* Hamburger Icon (visible on small screens) */}
            <button
              className="md:hidden p-2 bg-gray-800 rounded-lg"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <GiHamburgerMenu />
            </button>

            {/* Full Menu (hidden on small screens) */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/auth/login"
                className="p-2 rounded-md bg-[#3f3f3f]/30 backdrop-filter backdrop-blur-sm flex items-center justify-around gap-2 text-xs"
              >
                <Image
                  src="/images/coin.svg"
                  alt="coin"
                  width={15}
                  height={15}
                />
                Earn $CLS
              </Link>
              <button
                className="p-2 text-xs rounded-md bg-gradient-to-br from-[#5d3fd1] to-[#03abff]"
                onClick={() => setModalOpen(true)}
              >
                Plant Seeds
              </button>
              <WalletMultiButton
                style={{
                  padding: "0.5rem",
                  borderRadius: "0.375rem",
                  alignItems: "center",
                  justifyContent: "space-around",
                  gap: "0.5rem",
                  fontSize: "0.75rem",
                  height: "2rem",
                  backgroundColor: "#222222",
                }}
                className="p-2 text-xs rounded-md "
              ></WalletMultiButton>
              <Link href="/userprofile">
                <Image
                  src="/images/profileImg.svg"
                  alt="Profile"
                  width={30}
                  height={30}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu (visible when hamburger is clicked) */}
        {menuOpen && (
          <div className="absolute top-16 right-4 bg-gray-800 flex flex-col gap-2 text-white p-4 rounded-lg md:hidden z-50">
            <button className="block w-full text-left p-3 mb-2 font-bold bg-gradient-to-r from-[#5d3fd1] to-[#03abff] rounded-lg">
              Plant Seeds
            </button>
            <WalletMultiButton className="block w-full text-left p-3 mb-2 bg-blue-500 rounded-lg">
              Connect Wallet
            </WalletMultiButton>
            <div className="flex justify-center">
              <Image
                src="/images/profileImg.svg"
                alt="Profile"
                width={30}
                height={30}
              />
            </div>
          </div>
        )}
      </nav>

      {/* Modal Component */}
      <TaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Navbar;
