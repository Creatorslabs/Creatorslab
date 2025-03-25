'use client'
import React, { useState } from 'react'
import AdminHeader from '../../components/admin-header'
import AdminCard from '../../components/admin-card'
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../components/table';

interface UserData {
  username: string;
  email: string;
  walletAddress: string;
  accountType: string;
  status: string;
}

const data: UserData[] = [
  {
    username: 'John-Dre',
    email: 'Jondre@email.com',
    walletAddress: 'Dx45u_0b87',
    accountType: 'Creator',
    status: 'Verified',
  },
  {
    username: 'John-Dre',
    email: 'Jondre@email.com',
    walletAddress: 'Dx45u_0b87',
    accountType: 'Creator',
    status: 'Verified',
  },
  {
    username: 'John-Dre',
    email: 'Jondre@email.com',
    walletAddress: 'Dx45u_0b87',
    accountType: 'Creator',
    status: 'Unverified',
  },
  {
    username: 'John-Dre',
    email: 'Jondre@email.com',
    walletAddress: 'Dx45u_0b87',
    accountType: 'Creator',
    status: 'Verified',
  },
  {
    username: 'John-Dre',
    email: 'Jondre@email.com',
    walletAddress: 'Dx45u_0b87',
    accountType: 'Creator',
    status: 'Verified',
  },
  {
    username: 'John-Dre',
    email: 'Jondre@email.com',
    walletAddress: 'Dx45u_0b87',
    accountType: 'Creator',
    status: 'Unverified',
  },
];

const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'walletAddress',
    header: 'Wallet address',
  },
  {
    accessorKey: 'accountType',
    header: 'Account type',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-xl text-sm ${
          row.original.status === 'Verified'
            ? 'bg-green-500/10 text-green-500'
            : 'bg-red-500/10 text-red-500'
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
];

const Users = () => {
  const [page, setPage] = useState(0);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <AdminHeader 
        title='Users' 
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-5'>
        <AdminCard 
          icon='/images/admin/totalusers.svg'
          title='Total Users'
          value={32001}
        />

        <AdminCard 
          icon='/images/admin/verifiedusers.svg'
          title='Verified Users'
          value={12001}
        />

        <AdminCard 
          icon='/images/admin/unverifiedusers.svg'
          title='Unverified Users'
          value={25100}
        />
      </div>

      <div className='p-4 sm:p-5'>
        <div className='rounded-lg p-4 sm:p-5 border border-gray-600'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5'>
            <h2 className="text-lg font-semibold">Users List</h2>
          </div>

          <div className="overflow-hidden">
            <DataTable
              data={data}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users