import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap importu

function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const toggleTaskStatus = (taskId, currentStatus) => {
    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone: !currentStatus }),
    })
      .then(res => res.json())
      .then(updatedTask => {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
      });
  };
  
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const handleAddTask = () => {
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    })
      .then(res => res.json())
      .then(newTask => setTasks(prev => [...prev, newTask]));

    setTitle('');
    setDescription('');
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Task Manager</h1>
      
      <div className="mb-4">
        <input 
          className="form-control mb-2"
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Task Title" 
        />
        <input 
          className="form-control mb-2"
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          placeholder="Task Description" 
        />
        <button className="btn btn-primary w-100" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      <div className="row">
      <ul>
  {tasks.map(task => (
    <li key={task.id}>
      <span style={{ textDecoration: task.isDone ? 'line-through' : 'none' }}>
        {task.title} - {task.description}
      </span>
      <button 
        className="btn btn-sm btn-success ms-2"
        onClick={() => toggleTaskStatus(task.id, task.isDone)}
      >
        {task.isDone ? "Mark as Pending" : "Mark as Done"}
      </button>
    </li>
  ))}
</ul>

      </div>
    </div>
  );
}

export default Home;
