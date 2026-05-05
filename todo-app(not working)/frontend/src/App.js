import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const API = process.env.REACT_APP_API_URL;

  // Wrap getTasks in useCallback so React knows it doesn't change every render
  const getTasks = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [API]);

  // Fetch tasks on component mount
  useEffect(() => {
    getTasks();
  }, [getTasks]); // Now safe, ESLint warning gone

  // Add a task
  const addTask = async () => {
    if (!title) return;
    await axios.post(`${API}/tasks`, { title });
    setTitle("");
    getTasks(); // refresh list
  };

  // Delete a task
  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    getTasks(); // refresh list
  };

  return (
    <div className="container">
      <h1>To Do App</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Add new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title}
            <button
              className="delete-btn"
              onClick={() => deleteTask(t.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;