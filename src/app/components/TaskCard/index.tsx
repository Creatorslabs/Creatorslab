import React from 'react';
import linkImage from '../../../../public/images/link.svg';
import coin from '../../../../public/images/coin.svg'
import Image from 'next/image';
import Link from 'next/link';

interface TaskCardProps {
  id: number;
  title: string;
  price: number;
  description: string;
  taskBanner: string;
  posterImage: string;
  
}

const TaskCard: React.FC<TaskCardProps> = ({ title, price, description, taskBanner, posterImage, id }) => (
  <>
      <div className=" rounded-lg shadow-lg p-4 w-[32%] border border-[#3f3f3f] my-2">
        <Link href={'/tasks'}>
          <div className='relative'>
          <Image src={taskBanner} alt='' width={500} height={300} className='w-[500px] h-[150px]'/>
          <Image src={posterImage} alt='' width={40} height={40} className='absolute right-0 bottom-[-10px] w-10 h-10 rounded-[50%]'/>
        </div>
        </Link>
      
      
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className='mb-2 text-[#787878]'>{description}</p>
      
      <div className='w-[35%] flex items-center justify-between'>
        <span className="text-sm text-white bg-[#5D3FD1] py-2 px-2 rounded-lg flex items-center justify-between w-[70%]">
          {price} $CLS 
          <Image src={coin} alt='' width={20} height={20}/>
        </span>
        <div className='border p-2 rounded-lg border-[#606060]'>
          <Image src={linkImage} alt='' width={20} height={20} />
        </div>
      </div>
    </div>
  </>
 
);

export default TaskCard;

  