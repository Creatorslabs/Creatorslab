'use client'
import React, { useState } from 'react'
import AdminHeader from '../../components/admin-header'
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../components/table';

interface EngagementData {
  name: string;
  socialPlatform: string;
  engagementType: string;
  status: string;
}

const engagementData: EngagementData[] =[
  {
    name: 'Telegram',
    socialPlatform: 'Telegram',
    engagementType: 'Page Follow',
    status: 'Active'
  },
  {
    name: 'Twitter',
    socialPlatform: 'Twitter',
    engagementType: 'Quote Tweet',
    status: 'Inactive'
  },
  {
    name: 'Discord',
    socialPlatform: 'Discord',
    engagementType: 'Retweet',
    status: 'Active'
  },
]

const engagementColumns: ColumnDef<EngagementData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'socialPlatForm',
    header: 'Social Platform',
  },
  {
    accessorKey: 'engagementType',
    header: 'Engagement Type',
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
];

const Engagement = () => {
  const [page, setPage] = useState(0);
    const handlePageChange = (newPage: number) => {
      setPage(newPage);
    };

  return (
    <div>
      <AdminHeader 
        title='Engagements'
      />

      <div className='rounded-lg p-5 border border-gray-600'>
        <div className='flex justify-between items-center my-5'>
          <h2>Users</h2>
          <button className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition'>Create Engagement Type</button>
        </div>

        <div>
          <DataTable
            data={engagementData}
            columns={engagementColumns}
            // pageSize={10}
            // pageIndex={page}
            // totalCount={engagementData.length}
            // onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Engagement