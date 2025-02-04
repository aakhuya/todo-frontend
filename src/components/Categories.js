import React, { useState, useEffect } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  const handleAddCategory = () => {
    fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCategory }),
    })
      .then(response => response.json())
      .then(data => {
        setCategories([...categories, data]);
        setNewCategory('');
      });
  };

  const handleDelete = (id) => {
    fetch(`/api/categories/${id}`, { method: 'DELETE' })
      .then(() => setCategories(categories.filter(category => category.id !== id)));
  };

  return (
    <div>
      <h2>Categories</h2>

      {/* Add Category */}
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Category Name"
      />
      <button onClick={handleAddCategory}>Add Category</button>

      {/* List of Categories */}
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
