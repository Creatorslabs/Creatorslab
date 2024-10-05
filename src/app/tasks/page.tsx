import React from 'react'
import newTask from '@/newTasks'
import TaskCard from '../components/TaskCard'


const page = () => {
  return (
    <div className="w-[80%] m-auto">
    <h1 className="text-3xl font-bold my-6">All Tasks</h1>
    <div className="flex items-center justify-between flex-wrap mx-4">
      {newTask.map((task) => (
        <TaskCard 
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            price={task.price}
            taskBanner={task.image}
            posterImage={task.userImage}
        />
      ))}
    </div>
  </div>
  )
}

export default page