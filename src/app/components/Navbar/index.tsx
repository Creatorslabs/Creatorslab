
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// import '@solana/wallet-adapter-react-ui/styles.css'; // Wallet styles
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../logo.svg';
import profileImg from '../../../../public/images/profileImg.svg';
import Link from 'next/link';
import TaskModal from '../Modals/CreateTask';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const { connected } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false); // State to control the hamburger menu
  const [modalOpen, setModalOpen] = useState(false); // State to control the modal visibility

  return (
    <>
      <nav className="flex justify-between items-center p-6 text-white w-[90%] m-auto ">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="Creatorslab Logo" width={150} height={200} />
        </Link>

        {/* Search Box */}
        <div className="border border-[#3F3F3F] p-2 flex gap-1 rounded-xl w-80">
            <Image
              src="/images/search.svg"
              alt="search"
              height={20}
              width={20}
            />
            <input
              type="text"
              className="outline-none bg-transparent px-1 w-full"
              placeholder="Search projects, quests, creators"
            />
          </div>

        {/* Hamburger Icon and Profile/Button Section */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Icon (visible on small screens) */}
          <button
            className="md:hidden p-2 bg-gray-800 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Full Menu (hidden on small screens) */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-3 rounded-lg font-bold bg-gradient-to-r from-[#5d3fd1] to-[#03abff]"  onClick={() => setModalOpen(true)}> 
              Post Task
            </button>
            <WalletMultiButton style={{background:"#222222"}}>Connect Wallet</WalletMultiButton>
            <Link href='/auth/sign-up'>
              <Image src={profileImg} alt="Profile" width={40} height={40} />
            </Link>
            
          </div>
        </div>

        {/* Mobile Menu (visible when hamburger is clicked) */}
        {menuOpen && (
          <div className="absolute top-16 right-4 bg-gray-800 text-white p-4 rounded-lg md:hidden">
            <button className="block w-full text-left p-3 mb-2 font-bold bg-gradient-to-r from-[#5d3fd1] to-[#03abff] rounded-lg">
              Plant Seeds
            </button>
            <WalletMultiButton className="block w-full text-left p-3 mb-2 bg-blue-500 rounded-lg">
              Connect Wallet
            </WalletMultiButton>
            <div className="flex justify-center">
              <Image src={profileImg} alt="Profile" width={40} height={40} />
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

