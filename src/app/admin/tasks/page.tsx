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
}

const taskData: TaskData[] = [
  {
    title: 'Follow on Twitter',
    creator: 'John Doe',
    taskLink: 'https://twitter.com/johndoe',
    socialPlatform: 'Twitter',
    engagementType: 'Follow',
    status: 'Active'
  },
  {
    title: 'Like Facebook Post',
    creator: 'Jane Smith',
    taskLink: 'https://facebook.com/post/123',
    socialPlatform: 'Facebook',
    engagementType: 'Like',
    status: 'Completed'
  },
  {
    title: 'Subscribe YouTube',
    creator: 'Tech Channel',
    taskLink: 'https://youtube.com/tech',
    socialPlatform: 'YouTube',
    engagementType: 'Subscribe',
    status: 'Active'
  }
];

const taskColumns: ColumnDef<TaskData>[] = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'creator',
    header: 'Creator'
  },
  {
    accessorKey: 'socialPlatform',
    header: 'Platform'
  },
  {
    accessorKey: 'engagementType',
    header: 'Type'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-xl text-sm ${
          row.original.status === 'Active'
            ? 'bg-green-500/10 text-green-500'
            : 'bg-blue-500/10 text-blue-500'
        }`}
      >
        {row.original.status}
      </span>
    ),
  }
];

const Tasks = () => {
  const [page, setPage] = useState(0);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <AdminHeader 
        title='Tasks' 
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-5'>
        <AdminCard 
          icon='/images/admin/totaltasks.svg'
          title='Total Tasks'
          value={20000}
        />

        <AdminCard 
          icon='/images/admin/completedtasks.svg'
          title='Completed Tasks'
          value={12001}
        />

        <AdminCard 
          icon='/images/admin/pendingtasks.svg'
          title='Pending Tasks'
          value={25100}
        />
      </div>

      <div className='p-4 sm:p-5'>
        <div className='rounded-lg p-4 sm:p-5 border border-gray-600'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5'>
            <h2 className="text-lg font-semibold">Tasks List</h2>
            <button className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition text-sm sm:text-base whitespace-nowrap'>
              Create Task
            </button>
          </div>

          <div className="overflow-hidden">
            <DataTable
              data={taskData}
              columns={taskColumns}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks