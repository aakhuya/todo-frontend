import React, { useState, useEffect } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'pending', category: '' });

  // Fetch tasks and categories on component mount
  useEffect(() => {
    fetch('http://localhost:5555/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));

    fetch('http://localhost:5555/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.description || !newTask.category) {
      alert('Please fill in all fields.');
      return;
    }

    fetch('http://localhost:5555/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then(response => response.json())
      .then(data => {
        setTasks([...tasks, data]);
        setNewTask({ title: '', description: '', status: 'pending', category: '' });
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5555/tasks/${id}`, { method: 'DELETE' })
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div>
      <h2>Tasks</h2>

      {/* Add Task Form */}
      <div>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Title"
        />
        <input
          type="text"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Description"
        />

        {/* Status Dropdown */}
        <select value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {/* Category Dropdown */}
        <select value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}>
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>

        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* List of Tasks */}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.description} - {task.status} - {task.category}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
