'use client'
import React from 'react'
import AdminHeader from '../components/admin-header'
import { useRouter } from 'next/navigation';
import AdminCard from '../components/admin-card';


const Dashboard = () => {

  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/admin/engagement/');
  };

  return (
    <div>
      <AdminHeader 
        title='Dashboard' 
        buttonText='Create Engagement value'
        onButtonClick={handleButtonClick}
      />

      <div className='flex items-center gap-4 my-8  p-5'>
        <AdminCard 
          icon='images/admin/totalusers.svg'
          title='Total Users'
          value={32001}
        />

        <AdminCard 
          icon='images/admin/totalengagement.svg'
          title='Total Engagements'
          value={2450}
        />

        <AdminCard 
          icon='images/admin/taskcreated.svg'
          title='Task Created'
          value={25100}
        />

      </div>
    </div>
    
  )
}

export default Dashboard