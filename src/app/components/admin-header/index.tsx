import React from 'react'
import AdminSearchBar from '../admin-searchbar';
import Image from 'next/image';

interface AdminHeaderProps {
    title: string;
    buttonText?: string;
    onButtonClick?: () => void;
}

const AdminHeader:React.FC<AdminHeaderProps> = ({title, buttonText, onButtonClick}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 p-4 text-white">
      {/* Title */}
      <h1 className="text-xl font-semibold">{title}</h1>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
        {/* Search Bar */}
        <div className="flex-1 sm:flex-initial min-w-[200px]">
          <AdminSearchBar />
        </div>

        <div className='flex items-center gap-2'>
          {/* Conditional Button */}
          {buttonText && onButtonClick && (
            <button
              onClick={onButtonClick}
              className="bg-purple-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md hover:bg-purple-700 transition whitespace-nowrap"
            >
              {buttonText}
            </button>
          )}

          {/* Avatar/Settings Icon */}
          <button className="focus:outline-none">
            <Image
              src="/images/admin/profile.svg" 
              width={40}
              height={40}
              alt="Settings/Avatar"
              className="rounded-full w-10 h-10 sm:w-[50px] sm:h-[50px]"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader