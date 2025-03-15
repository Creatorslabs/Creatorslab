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
    </div>
  )
}

export default Users