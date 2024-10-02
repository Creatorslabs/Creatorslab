'use client'
import React, { useState } from 'react'
import newTask from '@/newTasks'
import Link from 'next/link';
import TrendingTaskCard from '../TrendingTaskCard';
import leftArrow from '../../../../public/images/leftarrow.svg';
import rightArrow from '../../../../public/images/rightarrow.svg';
import Image from 'next/image';


const TrendingTasks: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const CARDS_PER_PAGE = 3; 
    const totalPages = Math.ceil(newTask.length / CARDS_PER_PAGE);

    const handleNext = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const handlePrev = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    };

    const displayedCards = newTask.slice(
        currentPage * CARDS_PER_PAGE,
        (currentPage + 1) * CARDS_PER_PAGE
    );
    
  return (
    <>
      <section className='my-5'>
        <div className=' flex items-center justify-between m-4'>
          <h2 className="text-2xl font-bold">Trending Tasks</h2>
          <div className="flex items-center justify-between w-[15%]">
            <Link href={'/'} className='underline text-[14px]'>Show all ({newTask.length})</Link>
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="text-white bg-[#222222] p-2 w-[40px] h-[40px] rounded-full"
            >
              {/* {"<--"} */}
              <Image src={leftArrow} alt='' width={20} height={20}/>
            </button>
           {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="text-white bg-[#222222] p-2 w-[40px] h-[40px] rounded-full"
            >
              {/* {"-->"} */}
              <Image src={rightArrow} alt='' width={20} height={20}/>
            </button>
          </div>
        </div>
        
       
          {/* Display the current cards */}
          <div className="flex items-center justify-between flex-grow mx-4">
            {displayedCards.map((card, index) => (
              <TrendingTaskCard key={index} title={card.title} price={card.price} description={card.description} posterImage={card.userImage} taskBanner={card.image} retweets={card.retweets} participants={card.participants} trending={card.trending}/>
            ))}
          </div>

          
          </section>
    </>
  )
}

export default TrendingTasks;