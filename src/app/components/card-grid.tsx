import React from "react";
import Image from "next/image"

const cards = Array.from({ length: 10 }, (_, i) => `Card ${i + 1}`);

const CardGrid = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <React.Fragment key={index}>
            {/* Render the card */}
            <div className="bg-white dark:bg-gray-800 dark:text-white shadow-md p-6 rounded-lg text-center">
              {card}
            </div>

            {/* Insert full-width iframe after the 5th card */}
            {index === 2 && (
              <div className="py-6 md:py-8 grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-full w-full">
                      <div className="relative flex-1 rounded-md p-4 flex flex-row justify-between overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/images/button-bg05.jpeg')] bg-cover bg-center -z-30"></div>
                        <div className="flex flex-col gap-3 flex-1 items-start justify-center">
                          <h3 className="text-lg font-syne">Purchase $CLS</h3>
                          <p className="text-xs">
                            Buy creatorslab seeds to boost content visibility and engagement.
                          </p>
                          <button className="p-2 rounded-md bg-white bg-opacity-15 text-xs">
                            Buy $CLS
                          </button>
                        </div>
                        <Image
                          src="/images/landing-page/Group 11.png"
                          width={200}
                          height={200}
                          alt="coin sack"
                          className="h-28 w-auto"
                        />
                      </div>
                      <div className="relative flex-1 rounded-md p-4 flex flex-row justify-between overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/images/button-bg02.jpeg')] bg-cover bg-center -z-30 "></div>
                        <div className="flex flex-col gap-3 flex-1 items-start justify-center">
                          <h3 className="text-lg font-syne">Burn $CLS</h3>
                          <p className="text-xs">Burn CLS to earn SOL. (Coming Soon)</p>
                          <button className="p-2 rounded-md bg-white bg-opacity-15 text-xs">
                            Burn now
                          </button>
                        </div>
                        <Image
                          src="/images/landing-page/Group 11.png"
                          width={200}
                          height={200}
                          alt="coin sack"
                          className="h-auto w-auto"
                        />
                      </div>
                    </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
