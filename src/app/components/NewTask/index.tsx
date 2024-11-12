"use client";

import React, { useState } from 'react';
import newTask from '@/newTasks'; // Assuming you import the tasks correctly
import TaskCard from '../TaskCard';
import Image from 'next/image';
import leftArrow from '../../../../public/images/leftarrow.svg';
import rightArrow from '../../../../public/images/rightarrow.svg';

const NewTasks: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [showAllTasks, setShowAllTasks] = useState(false); // State to toggle show all

    const CARDS_PER_PAGE = 3;
    const totalPages = Math.ceil(newTask.length / CARDS_PER_PAGE);

    const handleNext = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const handlePrev = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const toggleShowAll = () => {
        setShowAllTasks(!showAllTasks);
    };

    const displayedCards = showAllTasks
        ? newTask // Show all tasks when the user clicks "Show all"
        : newTask.slice(currentPage * CARDS_PER_PAGE, (currentPage + 1) * CARDS_PER_PAGE); // Otherwise, show only paginated tasks

    return (
      <>
        <section>
          <div className='flex items-center justify-between m-4'>
            <h2 className="text-2xl font-bold">New Tasks</h2>
            <div className="flex items-center justify-between w-[15%]">
              {/* Toggle between showing all or paginated tasks */}
              <button onClick={toggleShowAll} className='underline text-[14px]'>
                {showAllTasks ? `Show less` : `Show all (${newTask.length})`}
              </button>
             
              {!showAllTasks && (
                <>
                  <button
                    onClick={handlePrev}
                    className="text-white bg-[#222222] p-2 w-[40px] h-[40px] rounded-full"
                  >
                    <Image src={leftArrow} alt='Previous' width={20} height={20}/>
                  </button>
                  <button
                    onClick={handleNext}
                    className="text-white bg-[#222222] p-2 w-[40px] h-[40px] rounded-full"
                  >
                    <Image src={rightArrow} alt='Next' width={20} height={20}/>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Display the current cards */}
          <div className={` flex items-center justify-between flex-grow mx-4  ${showAllTasks ? 'flex items-center justify-between flex-wrap mx-4' : 'grid-cols-3'} `}>
            {displayedCards.map((card, index) => (
              <TaskCard 
                id = {card.id}
                key={index} 
                title={card.title} 
                price={card.price} 
                description={card.description} 
                posterImage={card.userImage} 
                taskBanner={card.image}
              />
            ))}
          </div>
        </section>
      </>
    );
};

export default NewTasks;
