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
    </div>
  )
}

export default Tasks