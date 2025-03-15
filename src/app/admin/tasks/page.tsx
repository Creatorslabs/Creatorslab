import React from 'react'
import AdminHeader from '../../components/admin-header'
import AdminCard from '../../components/admin-card'

const Tasks = () => {
  return (
    <div>
      <AdminHeader 
        title='Tasks' 
      />

      <div className='flex items-center gap-4 my-8  p-5'>
        <AdminCard 
          icon='images/admin/totaltasks.svg'
          title='Total Tasks'
          value={20000}
        />

        <AdminCard 
          icon='images/admin/completedtasks.svg'
          title='Completed Tasks'
          value={12001}
        />

        <AdminCard 
          icon='images/admin/pendingtasks.svg'
          title='Pending Tasks'
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

export default Tasks