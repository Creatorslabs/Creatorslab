import React from 'react'
import AdminHeader from '../../components/admin-header'
import AdminCard from '../../components/admin-card'

const Users = () => {
  return (
    <div>
      <AdminHeader 
        title='Users' 
      />

      <div className='flex items-center gap-4 my-8  p-5'>
        <AdminCard 
          icon='images/admin/totalusers.svg'
          title='Total Users'
          value={32001}
        />

        <AdminCard 
          icon='images/admin/verifiedusers.svg'
          title='Verified Users'
          value={12001}
        />

        <AdminCard 
          icon='images/admin/unverifiedusers.svg'
          title='Unverified Users'
          value={25100}
        />

      </div>

      <div className='rounded-lg p-5 border border-gray-600'>
        <div className='flex justify-between items-center'>
          <h2>Users</h2>
          <button className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition'>View all</button>
        </div>
      </div>
    </div>
  )
}

export default Users