'use client'
import React, { useState } from 'react'
import AdminHeader from '../../components/admin-header'
import AdminCard from '../../components/admin-card'
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../components/table';

interface TaskData {
  title: string;
  creator: string;
  taskLink: string;
  socialPlatform: string;
  engagementType: string;
  status: string;
};

const taskData: TaskData[] =[
  {
    title: 'Superteam Bounty',
    creator: 'Barbie_xy',
    taskLink: 'Barbie_xy',
    socialPlatform: 'X',
    engagementType: 'Follow',
    status: 'Active'
  },
  {
    title: 'Superteam Bounty',
    creator: 'Barbie_xy',
    taskLink: 'Barbie_xy',
    socialPlatform: 'X',
    engagementType: 'Follow',
    status: 'Inactive'
  },
  {
    title: 'Superteam Bounty',
    creator: 'Barbie_xy',
    taskLink: 'Barbie_xy',
    socialPlatform: 'X',
    engagementType: 'Follow',
    status: 'Active'
  },
];

const taskColumns: ColumnDef<TaskData>[] =[
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'creator',
    header: 'Creator'
  },
  {
    accessorKey: 'taskLink',
    header: 'Task Link'
  },
  {
    accessorKey: 'socialPlatform',
    header: 'Social Platform'
  },
  {
    accessorKey: 'engagementType',
    header: 'Engagement Type'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span
        style={{
          color: row.original.status === 'Active' ? '#00ff00' : '#ff0000',
          backgroundColor:
            row.original.status === 'Active' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
          padding: '2px 8px',
          borderRadius: '12px',
        }}
      >
        {row.original.status}
      </span>
    ),
  },
]


const Tasks = () => {
  const [page, setPage] = useState(0);
    const handlePageChange = (newPage: number) => {
      setPage(newPage);
    };
  return (
    <div>
      <AdminHeader 
        title='Tasks' 
      />

      <div className='flex flex-col md:flex-row items-center gap-4 my-8  p-5'>
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
          <div className='flex justify-between items-center my-5'>
            <h2>Users</h2>
            <button className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition'>Create Task</button>
          </div>

           <div>
              <DataTable
                data={taskData}
                columns={taskColumns}
                // pageSize={10}
                // pageIndex={page}
                // totalCount={taskData.length}
                // onPageChange={handlePageChange}
              />
            </div>
      </div>
    </div>
  )
}

export default Tasks