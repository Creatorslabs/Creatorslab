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
        style={{
          color: row.original.status === 'Verified' ? '#00ff00' : '#ff0000',
          backgroundColor:
            row.original.status === 'Verified' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
          padding: '2px 8px',
          borderRadius: '12px',
        }}
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
    <div>
      <AdminHeader 
        title='Users' 
      />

      <div className='flex flex-col md:flex-row items-center gap-4 my-8  p-5'>
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
        <div className='flex justify-between items-center my-5'>
          <h2>Users</h2>
        </div>

        <div>
          <DataTable
            data={data}
            columns={columns}
            // pageSize={10}
            // pageIndex={page}
            // totalCount={data.length}
            // onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Users