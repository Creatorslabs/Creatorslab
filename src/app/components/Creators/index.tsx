import React from "react";
import newTask from "@/newTasks";
import Link from "next/link";

const TopCreators: React.FC = () => {
  const avatars = [
    '/images/user01.jpeg',
    '/images/user02.jpeg',
    '/images/user03.jpeg',
    '/images/user04.jpeg',
    '/images/user05.jpeg',
    '/images/user06.jpeg',
    '/images/user07.jpeg',
    '/images/user08.jpeg',
    '/images/user09.jpeg',
  ];

  return (
    <div className=" p-4 rounded-lg w-full max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white font-semibold text-lg">Top Creators</h3>
        <a href="#" className="text-purple-500 hover:underline">View all</a>
      </div>
      <div className="flex items-center">
        {/* Avatars */}
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className={`w-10 h-10 rounded-full overflow-hidden border-2 border-gray-800
              ${index !== 0 ? '-ml-3' : ''}`} // Overlap from second avatar
          >
            <Link href={'/userprofile'} >
               <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
            </Link>
           
          </div>
        ))}
        {/* Ellipsis for more avatars */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 -ml-4 text-white">
          <span className="text-lg font-bold">...</span>
        </div>
      </div>
    </div>
  );
};

export default TopCreators;
