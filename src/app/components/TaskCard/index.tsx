import React from 'react';
import taskImage1 from '../../../../public/images/Rectangle 3.png'
import posterImage from '../../../../public/images/profileImg.svg'
import linkImage from '../../../../public/images/link.svg'
import Image from 'next/image';

interface TaskCardProps {
  title: string;
  price: number;
  description: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, price, description }) => (
  <div className=" rounded-lg shadow-lg p-4 w-80 border border-solid-grey">
    <div className='relative'>
      <Image src={taskImage1} alt='' width={500} height={300}/>
      <Image src={posterImage} alt='' width={40} height={40} className='absolute right-0 bottom-[-10px]'/>
    </div>
    
    <h3 className="text-xl font-semibold mt-4">{title}</h3>
    <p>{description}</p>
    
    <span className="text-sm text-white bg-[#5D3FD1] py-2 px-2 mt-4 rounded-lg ">{price} $CLS</span>
    <button className='rounded-lg border mx-2'>
      <Image src={linkImage} alt='' width={20} height={20} />
    </button>

  </div>
);

export default TaskCard;

  