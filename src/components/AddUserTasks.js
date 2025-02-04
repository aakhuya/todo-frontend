import React, { useState, useEffect } from 'react';

const AddUserTasks = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTask, setSelectedTask] = useState('');

  useEffect(() => {
    fetch('https://your-api.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));

    fetch('https://your-api.com/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://your-api.com/user-tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: selectedUser, taskId: selectedTask })
    })
    .then(response => response.json())
    .then(data => alert('User-Task assigned successfully'))
    .catch(error => console.error('Error assigning task:', error));
  };

  return (
    <div>
      <h2>Assign Task to User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select User:
          <select onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Select Task:
          <select onChange={(e) => setSelectedTask(e.target.value)}>
            <option value="">Select a task</option>
            {tasks.map(task => (
              <option key={task.id} value={task.id}>{task.name}</option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Assign Task</button>
      </form>
    </div>
  );
}

export default AddUserTasks;
