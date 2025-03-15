'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface NavItem {
    href: string;
    label: string;
    icon: string; 
  }


const SideBar:React.FC = () => {

  const router = useRouter();

    const navItems: NavItem[] = [
        { href: '/admin', label: 'Dashboard', icon: '/images/admin/dashboard.svg' },
        { href: '/admin/users', label: 'Users', icon: '/images/admin/users.svg' },
        { href: '/admin/tasks', label: 'Tasks', icon: '/images/admin/tasks.svg' },
        { href: '/admin/engagement', label: 'Engagement', icon: '/images/admin/engagement.svg' },
    ];

    // Handle logout
  const handleLogout = () => {
    // Add any logout logic here (e.g., clear cookies, localStorage, etc.)
    // For example:
    // localStorage.removeItem('auth-token');
    // document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Redirect to login page or home page
    router.push('/login'); // Replace '/login' with your desired route
  };

    
  return (
    <div className=' w-1/5 p-10 bg-[#212121]'>
        {/* Logo */}
        <Link href="/" className="flex flex-row gap-2 items-center my-5">
          <Image
            src="/images/logo.png"
            width={30}
            height={30}
            alt="CreatorsLab logo"
          />
          <p className="text-lg">Creatorslab</p>
        </Link>

        <div className='flex flex-col items-center justify-between  p-5 h-4/5'>
            <nav className=''>
                <ul>
                    {navItems.map((item, index) => (
                    <li key={index} className="mb-4">
                        <Link href={item.href} className="flex flex-row gap-2 items-center p-2 hover:bg-gray-700 rounded">
                            <Image
                            src={item.icon}
                            width={30} // Adjust size as needed
                            height={30} // Adjust size as needed
                            alt={`${item.label} icon`}
                            />
                            <span>{item.label}</span>
                        </Link>
                    </li>
                    ))}    
                </ul>
            </nav>

            <button className='flex flex-row gap-2 items-center p-2 ' onClick={handleLogout}>
              <Image 
                src='/images/admin/logout.svg'
                width={30}
                height={30}
                alt='Logout icon'
              />
              Logout
            </button>
        </div>
        
    </div>
  )
}

export default SideBar;