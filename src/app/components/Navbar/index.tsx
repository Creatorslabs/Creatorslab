import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css'; // Wallet styles
import React from 'react';
import Image from 'next/image';
import  logo  from '../../logo.svg';
import profileImg from '../../../../public/images/profileImg.svg'


const Navbar: React.FC = () => {
  const { connected } = useWallet();

  return (
    <nav className="flex justify-between items-center p-6 ">
      {/* <div className="text-2xl font-bold">creatorslab</div> */}
      <Image src={logo} alt='' width={150} height={200}/>
      
      <input
        type="text"
        placeholder="Search projects, articles, creators"
        className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none w-[300px]"
      />
      <div className="flex items-center space-x-4"> 
        <button className=' p-3 rounded-lg font-bold bg-gradient-to-r from-[#5d3fd1] to-[#03abff]'>Post Task</button>
        <WalletMultiButton>Connect Wallet</WalletMultiButton>
        {/* {connected ? (
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Post Task</button>
        ) : null} */}
        <Image src={profileImg} alt='' width={40} height={40} />

      </div>

    </nav>
  );
};

export default Navbar;
