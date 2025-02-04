import React, { useState } from 'react';

const AddUser = () => {
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://your-api.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName })
    })
    .then(response => response.json())
    .then(data => alert('User added successfully'))
    .catch(error => console.error('Error adding user:', error));
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
