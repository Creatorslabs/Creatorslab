'use client'

import React, { useState, useEffect } from 'react'
import AdminHeader from '../../components/admin-header'
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../components/table';

interface EngagementData {
  name: string;
  socialPlatform: string;
  engagementType: string;
  status: string;
}

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
  const [engagementData, setEngagementData] = useState<EngagementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editEngagement, setEditEngagement] = useState<EngagementData | null>(null);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  async function createEngagement(newEngagement: EngagementData) {
    const res = await fetch('/api/admin/engagements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEngagement),
    });
    if (!res.ok) throw new Error('Failed to create engagement');
    return await res.json();
  }

  async function updateEngagement(id: string, updatedEngagement: EngagementData) {
    const res = await fetch(`/api/admin/engagements/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEngagement),
    });
    if (!res.ok) throw new Error('Failed to update engagement');
    return await res.json();
  }

  async function deleteEngagement(id: string) {
    const res = await fetch(`/api/admin/engagements/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete engagement');
    return await res.json();
  }

  function handleAddEngagement() {
    setEditEngagement(null);
    setShowForm(true);
  }

  function handleEditEngagement(engagement: EngagementData) {
    setEditEngagement(engagement);
    setShowForm(true);
  }

  async function handleSaveEngagement(engagement: EngagementData) {
    try {
      if (editEngagement) {
        await updateEngagement((engagement as any).id, engagement);
      } else {
        await createEngagement(engagement);
      }
      setShowForm(false);
      setEditEngagement(null);
      setLoading(true);
      fetch('/api/admin/engagements')
        .then((res) => res.json())
        .then((engagements) => setEngagementData(engagements))
        .finally(() => setLoading(false));
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function handleDeleteEngagement(id: string) {
    if (!window.confirm('Are you sure you want to delete this engagement type?')) return;
    try {
      await deleteEngagement(id);
      setLoading(true);
      fetch('/api/admin/engagements')
        .then((res) => res.json())
        .then((engagements) => setEngagementData(engagements))
        .finally(() => setLoading(false));
    } catch (err: any) {
      alert(err.message);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetch('/api/admin/engagements')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch engagement types');
        return res.json();
      })
      .then((engagements) => setEngagementData(engagements))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function EngagementForm({ initialEngagement, onSave, onCancel }: { initialEngagement?: EngagementData, onSave: (engagement: EngagementData) => void, onCancel: () => void }) {
    const [form, setForm] = useState<EngagementData>(initialEngagement || { name: '', socialPlatform: '', engagementType: '', status: '' });
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">{initialEngagement ? 'Edit Engagement' : 'Add Engagement'}</h2>
          <form onSubmit={e => { e.preventDefault(); onSave(form); }}>
            <input className="w-full mb-2 p-2 bg-gray-800 rounded" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            <input className="w-full mb-2 p-2 bg-gray-800 rounded" placeholder="Social Platform" value={form.socialPlatform} onChange={e => setForm(f => ({ ...f, socialPlatform: e.target.value }))} required />
            <input className="w-full mb-2 p-2 bg-gray-800 rounded" placeholder="Engagement Type" value={form.engagementType} onChange={e => setForm(f => ({ ...f, engagementType: e.target.value }))} required />
            <input className="w-full mb-4 p-2 bg-gray-800 rounded" placeholder="Status" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} required />
            <div className="flex gap-2 justify-end">
              <button type="button" className="px-4 py-2 rounded bg-gray-700 text-white" onClick={onCancel}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-purple-600 text-white">{initialEngagement ? 'Update' : 'Add'}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto">
      <AdminHeader 
        title='Engagements'
      />

      <div className='p-4 sm:p-5'>
        <div className='rounded-lg p-4 sm:p-5 border border-gray-600'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5'>
            <h2 className="text-lg font-semibold">Engagement Types</h2>
            <button className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700' onClick={handleAddEngagement}>
              Add Engagement
            </button>
          </div>

          <div className="overflow-hidden">
            {loading ? (
              <div className="py-8 text-center">Loading engagement types...</div>
            ) : error ? (
              <div className="py-8 text-center text-red-500">{error}</div>
            ) : (
              <DataTable
                data={engagementData}
                columns={[
                  ...engagementColumns,
                  {
                    id: 'actions',
                    header: 'Actions',
                    cell: ({ row }) => (
                      <div className="flex gap-2">
                        <button className="px-2 py-1 bg-blue-600 rounded text-white text-xs" onClick={() => handleEditEngagement(row.original)}>Edit</button>
                        <button className="px-2 py-1 bg-red-600 rounded text-white text-xs" onClick={() => handleDeleteEngagement((row.original as any).id)}>Delete</button>
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
        <EngagementForm
          initialEngagement={editEngagement || undefined}
          onSave={handleSaveEngagement}
          onCancel={() => { setShowForm(false); setEditEngagement(null); }}
        />
      )}
    </div>
  )
}

export default Engagement