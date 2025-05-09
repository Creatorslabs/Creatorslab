'use client'

import React, { useState, useEffect } from 'react'
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
  const [taskData, setTaskData] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState<TaskData | null>(null);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  async function createTask(newTask: TaskData) {
    const res = await fetch('/api/admin/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    if (!res.ok) throw new Error('Failed to create task');
    return await res.json();
  }

  async function updateTask(id: string, updatedTask: TaskData) {
    const res = await fetch(`/api/admin/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    if (!res.ok) throw new Error('Failed to update task');
    return await res.json();
  }

  async function deleteTask(id: string) {
    const res = await fetch(`/api/admin/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete task');
    return await res.json();
  }

  function handleAddTask() {
    setEditTask(null);
    setShowForm(true);
  }

  function handleEditTask(task: TaskData) {
    setEditTask(task);
    setShowForm(true);
  }

  async function handleSaveTask(task: TaskData) {
    try {
      if (editTask) {
        await updateTask((task as any).id, task);
      } else {
        await createTask(task);
      }
      setShowForm(false);
      setEditTask(null);
      setLoading(true);
      fetch('/api/admin/tasks')
        .then((res) => res.json())
        .then((tasks) => setTaskData(tasks))
        .finally(() => setLoading(false));
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function handleDeleteTask(id: string) {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
      setLoading(true);
      fetch('/api/admin/tasks')
        .then((res) => res.json())
        .then((tasks) => setTaskData(tasks))
        .finally(() => setLoading(false));
    } catch (err: any) {
      alert(err.message);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetch('/api/admin/tasks')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tasks');
        return res.json();
      })
      .then((tasks) => setTaskData(tasks))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function TaskForm({ initialTask, onSave, onCancel }: { initialTask?: TaskData, onSave: (task: TaskData) => void, onCancel: () => void }) {
    const [form, setForm] = useState<TaskData>(initialTask || { title: '', creator: '', taskLink: '', socialPlatform: '', engagementType: '', status: '' });
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">{initialTask ? 'Edit Task' : 'Add Task'}</h2>
          <form onSubmit={e => { e.preventDefault(); onSave(form); }}>
            <input className="w-full mb-2 p-2 bg-gray-800 rounded" placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
            <input className="w-full mb-2 p-2 bg-gray-800 rounded" placeholder="Creator" value={form.creator} onChange={e => setForm(f => ({ ...f, creator: e.target.value }))} required />
            <input className="w-full mb-2 p-2 bg-gray-800 rounded" placeholder="Task Link" value={form.taskLink} onChange={e => setForm(f => ({ ...f, taskLink: e.target.value }))} required />
            <input className="w-full mb-2 p-2 bg-gray-800 rounded" placeholder="Social Platform" value={form.socialPlatform} onChange={e => setForm(f => ({ ...f, socialPlatform: e.target.value }))} required />
            <input className="w-full mb-2 p-2 bg-gray-800 rounded" placeholder="Engagement Type" value={form.engagementType} onChange={e => setForm(f => ({ ...f, engagementType: e.target.value }))} required />
            <input className="w-full mb-4 p-2 bg-gray-800 rounded" placeholder="Status" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} required />
            <div className="flex gap-2 justify-end">
              <button type="button" className="px-4 py-2 rounded bg-gray-700 text-white" onClick={onCancel}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-purple-600 text-white">{initialTask ? 'Update' : 'Add'}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

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
            <button className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700' onClick={handleAddTask}>
              Add Task
            </button>
          </div>

          <div className="overflow-hidden">
            {loading ? (
              <div className="py-8 text-center">Loading tasks...</div>
            ) : error ? (
              <div className="py-8 text-center text-red-500">{error}</div>
            ) : (
              <DataTable
                data={taskData}
                columns={[
                  ...taskColumns,
                  {
                    id: 'actions',
                    header: 'Actions',
                    cell: ({ row }) => (
                      <div className="flex gap-2">
                        <button className="px-2 py-1 bg-blue-600 rounded text-white text-xs" onClick={() => handleEditTask(row.original)}>Edit</button>
                        <button className="px-2 py-1 bg-red-600 rounded text-white text-xs" onClick={() => handleDeleteTask((row.original as any).id)}>Delete</button>
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
        <TaskForm
          initialTask={editTask || undefined}
          onSave={handleSaveTask}
          onCancel={() => { setShowForm(false); setEditTask(null); }}
        />
      )}
    </div>
  )
}

export default Tasks