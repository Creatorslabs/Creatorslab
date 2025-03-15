import Image from 'next/image';
import React from 'react'

interface AdminCardProps {
    title: string;
    value: number;
    icon: string;
}

const AdminCard:React.FC<AdminCardProps> = ({title, value, icon}) => {
  return (
    <div className='rounded-lg px-5 flex w-full md:w-1/4 justify-between items-center flex-1 border border-gray-600 py-10 bg-gray-900'>
        <Image 
            src={icon}
            width={50}
            height={50}
            alt='icon'
        />

        <div>
            <p className='text-[#787878] text-sm font-light'>{title}</p>
            <h2 className='font-bold text-2xl text-end'>{value}</h2>
        </div>
    </div>
  )
}

export default AdminCard