"use client"
// import dynamic from 'next/dynamic';
import React from 'react';
import TaskCard from './components/TaskCard';
import Navbar from './components/Navbar';
import { ContextProvider } from '../contexts/ContextProvider';


// Dynamically import Solana wallet context provider
// const WalletContextProvider = dynamic(() => import('./components/WalletProvider'), { ssr: false });

const Home: React.FC = () => {
  return (
    
      <div className="w-[90%] m-auto">
        <ContextProvider>
        <Navbar />
        <main className="container mx-auto py-8">
          <section>
            <div></div>
            <div></div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">New Tasks</h2>
            <div className="flex items-center justify-around">
              <TaskCard title="Task/Article Title here" price={100} /> 
              <TaskCard title="Task/Article Title here" price={100} />
              <TaskCard title="Task/Article Title here" price={100} /> 
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Purchase $CLS</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-6 rounded-lg">
                <h3 className="text-xl font-semibold">Purchase $CLS</h3>
                <p>Buy cryptocurrency to boost content visibility.</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Buy $CLS</button>
              </div>
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-6 rounded-lg">
                <h3 className="text-xl font-semibold">Stake SOL</h3>
                <p>Stake SOL to enhance your rewards.</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Stake SOL</button>
              </div>
            </div>
          </section>

          <section className='m-8'>
            <h2 className="text-2xl font-bold mb-4">Trending Tasks</h2>
            <div className="flex items-center justify-around">
              <TaskCard title="Task/Article Title here" price={100} /> 
              <TaskCard title="Task/Article Title here" price={100} />
              <TaskCard title="Task/Article Title here" price={100} /> 
            </div>
          </section>

          <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-6 rounded-lg">
                <h3 className="text-xl font-semibold">Stake SOL</h3>
                <p>Stake SOL to enhance your rewards.</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Stake SOL</button>
              </div>
        </main>
        </ContextProvider>
      </div>
  );
};

export default Home;
