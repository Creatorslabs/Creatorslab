import React from 'react';
import linkImage from '../../../../public/images/link.svg'
import Image from 'next/image';

interface TrendingTaskCardProps {
  title: string;
  price: number;
  description: string;
  taskBanner: string;
  posterImage : string;
  participants: number;
  retweets: number;
  trending: number
}

const TrendingTaskCard: React.FC<TrendingTaskCardProps> = ({ title, price, description, taskBanner, posterImage, participants, retweets, trending }) => (
  <div className=" rounded-lg shadow-lg p-4 w-[32%] border border-solid-grey">
    <div className='relative'>
      <Image src={taskBanner} alt='' width={500} height={300}/>
      <Image src={posterImage} alt='' width={40} height={40} className='absolute right-0 bottom-[-10px]'/>
    </div>
    
    <h3 className="text-xl font-semibold mt-4">{title}</h3>
    <p className='mb-2'>{description}</p>
    <div>
      <span className='mx-2'>{participants}k</span>
      <span className='mx-2'>{trending}</span>
      <span className='mx-2'>{retweets}k</span>
      <button className='rounded-lg border mx-2'>
        <Image src={linkImage} alt='' width={20} height={20} />
      </button>
    </div>
    
    <span className="text-sm text-white bg-[#5D3FD1] py-2 px-2 mt-4 rounded-lg ">{price} $CLS</span>
    

  </div>
);

export default TrendingTaskCard;