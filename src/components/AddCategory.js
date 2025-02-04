import React, { useState } from 'react';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://your-api.com/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: categoryName })
    })
    .then(response => response.json())
    .then(data => alert('Category added successfully'))
    .catch(error => console.error('Error adding category:', error));
  };

  return (
    <div>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category Name:
          <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}

export default AddCategory;
