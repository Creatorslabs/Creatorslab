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
    <div className="flex items-center justify-between w-full  p-4 text-white">
      {/* Title */}
      <h1 className="text-xl  font-semibold">{title}</h1>

       <AdminSearchBar />

       <div className='flex justify-between items-center gap-2'>
          {/* Conditional Button */}
          {buttonText && onButtonClick && (
            <button
              onClick={onButtonClick}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition hidden md:"
            >
              {buttonText}
            </button>
          )}

          {/* Avatar/Settings Icon */}
          <button className="focus:outline-none">
            <Image
              src="/images/admin/profile.svg" 
              width={50}
              height={50}
              alt="Settings/Avatar"
              className="rounded-full"
            />
          </button>
       </div> 
        
      </div>
  )
}

export default AdminHeader