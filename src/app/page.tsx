"use client"
// import dynamic from 'next/dynamic';
import React from 'react';
import Navbar from './components/Navbar';
import { ContextProvider } from '../contexts/ContextProvider';
import NewTasks from './components/NewTask';
import Link from 'next/link';
import TrendingTasks from './components/TrendingTask';
import moneyBag from '../../public/images/moneybag.svg';
import Image from 'next/image'


// Dynamically import Solana wallet context provider
// const WalletContextProvider = dynamic(() => import('./components/WalletProvider'), { ssr: false });

const Home: React.FC = () => {
  return (
    
      <div className="w-[90%] m-auto">
        <ContextProvider>
        <Navbar />
        <main className="container mx-auto py-8">
      
          <section className=' flex items-center justify-between'>
            <div className='rounded-lg border border-solid border-grey-200 w-[70%]'>
              <div className=' flex justify-between m-2'>
                <p>Browse all categories</p>
                <Link href={'/'} className='font-bold text-[#5D3FD1]'>Show All</Link>
              </div>
              <button className='p-3 rounded-lg bg-[url(/images/greenlemonbg.jpeg)] bg-no-repeat bg-cover font-bold m-2 w-[100px]'>Trending</button>
              <button className='p-3 rounded-lg bg-[url(/images/button-bg01.jpeg)] bg-no-repeat bg-cover font-bold m-2 w-[100px]'>Promoted</button>
              <button className='p-3 rounded-lg bg-[url(/images/button-bg02.jpeg)] bg-no-repeat bg-cover font-bold m-2 w-[100px]'>Projects</button>
              <button className='p-3 rounded-lg bg-[url(/images/button-bg03.jpeg)] bg-no-repeat bg-cover font-bold m-2 w-[100px]'>Articles</button>
              <button className='p-3 rounded-lg bg-[url(/images/button-bg04.jpeg)] bg-no-repeat bg-cover font-bold m-2 w-[100px]'>Quest</button>
              <button className='p-3 rounded-lg bg-[url(/images/button-bg05.jpeg)] bg-no-repeat bg-cover font-bold m-2 w-[100px]'>All</button>
            </div>
            <div className='rounded-lg border border-solid border-grey-200 w-[25%]'>
              <div className=' flex justify-between'>
                <p>Top Creators</p>
                <Link href={'/'} className='font-bold text-[#5D3FD1]'>View All</Link>
              </div>
            </div>
          </section>

          <NewTasks />

          <section className="mt-8">
            {/* <h2 className="text-2xl font-bold mb-4">Purchase $CLS</h2> */}
            <div className="grid grid-cols-2 gap-6">
              <div className='flex items-center justify-between bg-[url(/images/banner-bg01.jpeg)] bg-no-repeat bg-cover p-6 rounded-lg'>
                <div className="">
                  <h3 className="text-xl font-semibold">Purchase $CLS</h3>
                  <p>Buy cryptocurrency to boost content visibility.</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Buy $CLS</button>
                </div>
                
                <Image src={moneyBag} alt='' width={100} height={100}/>

              </div>
              
              <div className='flex items-center justify-between bg-[url(/images/banner-bg02.jpeg)] bg-no-repeat bg-cover p-6 rounded-lg'>
                <div className="">
                  <h3 className="text-xl font-semibold">Stake SOL</h3>
                  <p>Stake SOL to enhance your rewards.</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Stake SOL</button>
                </div>

                <Image src={moneyBag} alt='' width={100} height={100}/>

              </div>
             
            </div>
          </section>

          <TrendingTasks />

          <div className='bg-[url(/images/banner-bg03.jpeg)] bg-no-repeat bg-cover p-6 rounded-lg flex items-center justify-between '>
            <div className="">
              <h3 className="text-xl font-semibold">Stake SOL</h3>
              <p>Stake SOL to enhance your rewards.</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Stake SOL</button>
            </div>

            <Image src={moneyBag} alt='' width={100} height={100}/>

          </div>
          
        </main>
        </ContextProvider>
      </div>
  );
};

export default Home;
