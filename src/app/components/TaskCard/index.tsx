import React from 'react';
import taskImage1 from '../../../../public/images/Rectangle 3.png'
import posterImage from '../../../../public/images/profileImg.svg'
import Image from 'next/image';

interface TaskCardProps {
  title: string;
  price: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, price }) => (
  <div className=" rounded-lg shadow-lg p-4 w-72 border border-solid-white">
    <div className='relative'>
      <Image src={taskImage1} alt='' width={500} height={300}/>
      <Image src={posterImage} alt='' width={40} height={40} className='absolute right-0 bottom-[-10px]'/>

    </div>
    
    <h3 className="text-xl font-semibold mt-4">{title}</h3>
    <p className="text-sm text-gray-400">{price} $CLS</p>
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg">
      View Task
    </button>
  </div>
);

export default TaskCard;

  