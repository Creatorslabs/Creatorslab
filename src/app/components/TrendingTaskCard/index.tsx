import React from 'react';
import linkImage from '../../../../public/images/link.svg'
import Image from 'next/image';
import userIcon from '../../../../public/images/user.svg'
import fireIcon from '../../../../public/images/fire.svg'
import twitterBird from '../../../../public/images/twitter-bird.svg'

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
  <div className=" rounded-lg shadow-lg p-4 w-[32%] border border-[#3f3f3f]">
    <div className='relative'>
      <Image src={taskBanner} alt='' width={500} height={300} className='w-[500px] h-[150px]'/>
      <Image src={posterImage} alt='' width={40} height={40} className='absolute right-0 bottom-[-10px]  w-10 h-10 rounded-[50%]'/>
    </div>
    
    <h3 className="text-xl font-semibold mt-4">{title}</h3>
    <p className='mb-2 text-[#787878]'>{description}</p>
    <div className=' flex items-center justify-between'>
      <div className=' flex items-center justify-between w-[70%]'>
        <div className='flex items-center justify-between w-20% rounded-lg bg-[#222222] p-1'>
          <Image src={userIcon} alt='' width={20} height={20}/>
          <span className='mx-2'>{participants}k</span>
        </div>
        
        <div className='flex items-center justify-between w-20% rounded-lg bg-[#222222] p-1'>
         <Image src={fireIcon} alt='' width={20} height={20}/>
          <span className='mx-2'>{trending}</span>  
        </div>
      
        <div className='flex items-center justify-between w-20% rounded-lg bg-[#222222] p-1'>
          <Image src={twitterBird} alt='' width={20} height={20}/>
          <span className='mx-2'>{retweets}k</span>
        </div>
        
        <div className='flex items-center justify-between w-20% rounded-lg bg-[#222222] p-1'>
          <Image src={linkImage} alt='' width={20} height={20} />
        </div>
      </div>

      <span className="text-sm text-white bg-[#5D3FD1] py-2 px-2 rounded-lg ">{price} $CLS</span>
    </div>
  </div>
);

export default TrendingTaskCard;