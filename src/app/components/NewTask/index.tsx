'use client'
import React, { useState } from 'react'
import newTask from '@/newTasks'
import TaskCard from '../TaskCard';

const NewTasks: React.FC = () => {
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
      <section>
            <h2 className="text-2xl font-bold mb-4">New Tasks</h2>
            <div className="flex items-center justify-between">
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                className="text-white bg-blue-500 p-2 rounded-full"
              >
                {"<"}
              </button>

              {/* Display the current cards */}
              <div className="flex items-center justify-around flex-grow mx-4">
                {displayedCards.map((card, index) => (
                  <TaskCard key={index} title={card.title} price={card.price} description={card.description}/>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                className="text-white bg-blue-500 p-2 rounded-full"
              >
                {">"}
              </button>
            </div>
          </section>
    </>
  )
}

export default NewTasks