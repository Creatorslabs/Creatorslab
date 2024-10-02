import React from 'react';
import linkImage from '../../../../public/images/link.svg';
import coin from '../../../../public/images/coin.svg'
import Image from 'next/image';

interface TaskCardProps {
  title: string;
  price: number;
  description: string;
  taskBanner: string;
  posterImage : string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, price, description, taskBanner, posterImage }) => (
  <div className=" rounded-lg shadow-lg p-4 w-[32%] border border-solid-grey">
    <div className='relative'>
      <Image src={taskBanner} alt='' width={500} height={300} className='w-[500px] h-[150px]'/>
      <Image src={posterImage} alt='' width={40} height={40} className='absolute right-0 bottom-[-10px] w-10 h-10 rounded-[50%]'/>
    </div>
    
    <h3 className="text-xl font-semibold mt-4">{title}</h3>
    <p className='mb-2'>{description}</p>
    
    <span className="text-sm text-white bg-[#5D3FD1] py-2 px-2 mt-4 rounded-lg ">{price} $CLS  </span>
    <button className='rounded-lg border mx-2'>
      <Image src={linkImage} alt='' width={20} height={20} />
    </button>

  </div>
);

export default TaskCard;

  