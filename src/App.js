import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Users from './components/Users';
import Tasks from './components/Tasks';
import Categories from './components/Categories';
import UserTasks from './components/UserTasks';
import AddUser from './components/AddUser';
import AddTask from './components/AddTask';
import AddCategory from './components/AddCategory';
import AddUserTasks from './components/AddUserTasks';

const App = () => {
  return (
    <Router>
      <h1>Welcome to To-do List App</h1>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/user-tasks" element={<UserTasks />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/add-user-tasks" element={<AddUserTasks />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
