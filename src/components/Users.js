import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '' });

  useEffect(() => {
    fetch('https://todo-backend-jveq.onrender.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const handleAddUser = () => {
    fetch('https://todo-backend-jveq.onrender.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        setUsers([...users, data]);
        setNewUser({ username: '', email: '' });
      });
  };

  const handleDelete = (id) => {
    fetch(`https://todo-backend-jveq.onrender.com/users${id}`, { method: 'DELETE' })
      .then(() => setUsers(users.filter(user => user.id !== id)));
  };

  return (
    <div>
      <h2>Users</h2>

      {/* Add User */}
      <div>
        <input
          type="text"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          placeholder="Username"
        />
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Email"
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      {/* List of Users */}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} - {user.email}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
