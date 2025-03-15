import React from 'react'
import AdminHeader from '../../components/admin-header'

const Engagement = () => {
  return (
    <div>
      <AdminHeader 
        title='Engagements'
      />

      <div className='rounded-lg p-5 border border-gray-600'>
        <div className='flex justify-between items-center'>
          <h2>Users</h2>
          <button className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition'>View all</button>
        </div>
      </div>
    </div>
  )
}

export default Engagement