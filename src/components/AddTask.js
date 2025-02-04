import React, { useState } from 'react';

const AddTask = () => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://your-api.com/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: taskName })
    })
    .then(response => response.json())
    .then(data => alert('Task added successfully'))
    .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Task Name:
          <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
