'use client'
import React from 'react'
import AdminHeader from '../../components/admin-header'
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../components/table';

interface EngagementData {
  name: string;
  socialPlatform: string;
  engagementType: string;
  status: string;
}

const engagementData: EngagementData[] = [
  {
    name: 'Twitter Follow',
    socialPlatform: 'Twitter',
    engagementType: 'Follow',
    status: 'Active'
  },
  {
    name: 'Facebook Like',
    socialPlatform: 'Facebook',
    engagementType: 'Like',
    status: 'Active'
  },
  {
    name: 'YouTube Subscribe',
    socialPlatform: 'YouTube',
    engagementType: 'Subscribe',
    status: 'Inactive'
  }
];

const engagementColumns: ColumnDef<EngagementData>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
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
            : 'bg-red-500/10 text-red-500'
        }`}
      >
        {row.original.status}
      </span>
    ),
  }
];

const Engagement = () => {
  // const [page, setPage] = useState(0);
  // const handlePageChange = (newPage: number) => {
  //   setPage(newPage);
  // };

  return (
    <div className="max-w-[1600px] mx-auto">
      <AdminHeader 
        title='Engagements'
      />

      <div className='p-4 sm:p-5'>
        <div className='rounded-lg p-4 sm:p-5 border border-gray-600'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5'>
            <h2 className="text-lg font-semibold">Engagement Types</h2>
            <button className='bg-purple-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md hover:bg-purple-700 transition whitespace-nowrap'>
              Create Engagement Type
            </button>
          </div>

          <div className="overflow-hidden">
            <DataTable
              data={engagementData}
              columns={engagementColumns}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Engagement