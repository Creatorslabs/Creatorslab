import Image from 'next/image';
import React from 'react'

interface AdminCardProps {
    title: string;
    value: number;
    icon: string;
}

const AdminCard:React.FC<AdminCardProps> = ({title, value, icon}) => {
  // Format the value with commas for better readability
  const formattedValue = value.toLocaleString();

  return (
    <div className='rounded-lg px-3 sm:px-5 flex w-full sm:flex-1 justify-between items-center border border-gray-600 py-6 sm:py-10 bg-gray-900 hover:bg-gray-800 transition-colors'>
        <div className="flex items-center gap-3 sm:gap-4">
            <div className="min-w-[40px] sm:min-w-[50px]">
                <Image 
                    src={icon}
                    width={50}
                    height={50}
                    alt={`${title} icon`}
                    className="w-full h-auto"
                />
            </div>

            <div className="flex flex-col">
                <p className='text-[#787878] text-xs sm:text-sm font-light'>{title}</p>
                <h2 className='font-bold text-lg sm:text-2xl'>{formattedValue}</h2>
            </div>
        </div>
    </div>
  )
}

export default AdminCard