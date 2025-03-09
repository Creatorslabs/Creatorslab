import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TaskModal from "../Modals/CreateTask";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchBar from "../search-bar";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false); 
  const [modalOpen, setModalOpen] = useState(false); 

  return (
    <>
      <nav className="flex justify-between items-center py-6 md:px-14 gap-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Creatorslab Logo"
            width={30}
            height={30}
          />
        </Link>

        <div className="flex-1 flex flex-row items-center justify-end gap-2">
          <SearchBar />
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden p-2 bg-gray-800 rounded-lg"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <GiHamburgerMenu />
            </button>
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

      <TaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Navbar;
