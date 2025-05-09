'use client'

import React, { useState, useEffect } from 'react'
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

const Users = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<UserData | null>(null);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    setLoading(true);
    fetch('/api/admin/users')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then((users) => setData(users))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

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

  async function createUser(newUser: UserData) {
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    if (!res.ok) throw new Error('Failed to create user');
    return await res.json();
  }

  async function updateUser(id: string, updatedUser: UserData) {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return await res.json();
  }

  async function deleteUser(id: string) {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete user');
    return await res.json();
  }

  function handleAddUser() {
    setEditUser(null);
    setShowForm(true);
  }

  function handleEditUser(user: UserData) {
    setEditUser(user);
    setShowForm(true);
  }

  async function handleSaveUser(user: UserData) {
    try {
      if (editUser) {
        await updateUser((user as any).id, user);
      } else {
        await createUser(user);
      }
      setShowForm(false);
      setEditUser(null);
      setLoading(true);
      fetch('/api/admin/users')
        .then((res) => res.json())
        .then((users) => setData(users))
        .finally(() => setLoading(false));
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function handleDeleteUser(id: string) {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteUser(id);
      setLoading(true);
      fetch('/api/admin/users')
        .then((res) => res.json())
        .then((users) => setData(users))
        .finally(() => setLoading(false));
    } catch (err: any) {
      alert(err.message);
    }
  }

  function UserForm({ initialUser, onSave, onCancel }: { initialUser?: UserData, onSave: (user: UserData) => void, onCancel: () => void }) {
    const [form, setForm] = useState<UserData>(initialUser || { username: '', email: '', walletAddress: '', accountType: '', status: '' });
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">{initialUser ? 'Edit User' : 'Add User'}</h2>
          <form onSubmit={e => { e.preventDefault(); onSave(form); }}>
            <input className="w-full mb-2 p-2 bg-gray-800 rounded" placeholder="Username" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} required />
            <input className="w-full mb-2 p-2 bg-gray-800 rounded" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            <input className="w-full mb-2 p-2 bg-gray-800 rounded" placeholder="Wallet Address" value={form.walletAddress} onChange={e => setForm(f => ({ ...f, walletAddress: e.target.value }))} required />
            <input className="w-full mb-2 p-2 bg-gray-800 rounded" placeholder="Account Type" value={form.accountType} onChange={e => setForm(f => ({ ...f, accountType: e.target.value }))} required />
            <input className="w-full mb-4 p-2 bg-gray-800 rounded" placeholder="Status" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} required />
            <div className="flex gap-2 justify-end">
              <button type="button" className="px-4 py-2 rounded bg-gray-700 text-white" onClick={onCancel}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-purple-600 text-white">{initialUser ? 'Update' : 'Add'}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

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
            <button className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700' onClick={handleAddUser}>
              Add User
            </button>
          </div>

          <div className="overflow-hidden">
            {loading ? (
              <div className="py-8 text-center">Loading users...</div>
            ) : error ? (
              <div className="py-8 text-center text-red-500">{error}</div>
            ) : (
              <DataTable
                data={data}
                columns={[
                  ...columns,
                  {
                    id: 'actions',
                    header: 'Actions',
                    cell: ({ row }) => (
                      <div className="flex gap-2">
                        <button className="px-2 py-1 bg-blue-600 rounded text-white text-xs" onClick={() => handleEditUser(row.original)}>Edit</button>
                        <button className="px-2 py-1 bg-red-600 rounded text-white text-xs" onClick={() => handleDeleteUser((row.original as any).id)}>Delete</button>
                      </div>
                    ),
                  },
                ]}
              />
            )}
          </div>
        </div>
      </div>
      {showForm && (
        <UserForm
          initialUser={editUser || undefined}
          onSave={handleSaveUser}
          onCancel={() => { setShowForm(false); setEditUser(null); }}
        />
      )}
    </div>
  )
}

export default Users