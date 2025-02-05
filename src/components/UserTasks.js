import React, { useState, useEffect } from "react";

const UserTasks = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newUserTask, setNewUserTask] = useState({ username: "", task: "" });

  // Fetch user tasks, users, and tasks
  useEffect(() => {
    fetch("https://todo-backend-jveq.onrender.com/usertasks")
      .then((response) => response.json())
      .then((data) => setUserTasks(data))
      .catch((error) => console.error("Error fetching user tasks:", error));

    fetch("https://todo-backend-jveq.onrender.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));

    fetch("https://todo-backend-jveq.onrender.com/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Function to assign a task to a user
  const handleAssignTask = () => {
    if (!newUserTask.username || !newUserTask.task) {
      alert("Please select both a user and a task.");
      return;
    }

    fetch("https://todo-backend-jveq.onrender.com/userstasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to assign task");
        }
        return response.json();
      })
      .then((data) => {
        setUserTasks([...userTasks, data]);
        setNewUserTask({ username: "", task: "" });
      })
      .catch((error) => console.error("Error assigning task:", error));
  };

  // Function to delete a user-task assignment
  const handleDelete = (id) => {
    fetch(`https://todo-backend-jveq.onrender.com/usertasks${id}`, { method: "DELETE" })
      .then(() => setUserTasks(userTasks.filter((ut) => ut.id !== id)))
      .catch((error) => console.error("Error deleting user task:", error));
  };

  return (
    <div>
      <h2>User Tasks</h2>

      {/* Assign User Task Form */}
      <div>
        <label>User:</label>
        <select
          value={newUserTask.username}
          onChange={(e) => setNewUserTask({ ...newUserTask, username: e.target.value })}
        >
          <option value="">Select a User</option>
          {users.map((user) => (
            <option key={user.id} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>

        <label>Task:</label>
        <select
          value={newUserTask.task}
          onChange={(e) => setNewUserTask({ ...newUserTask, task: e.target.value })}
        >
          <option value="">Select a Task</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.title}>
              {task.title}
            </option>
          ))}
        </select>

        <button onClick={handleAssignTask}>Assign Task</button>
      </div>

      {/* List of Assigned User Tasks */}
      <ul>
        {userTasks.map((ut) => (
          <li key={ut.id}>
            {ut.username} - {ut.task}
            <button onClick={() => handleDelete(ut.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTasks;
