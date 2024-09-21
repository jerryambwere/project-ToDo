import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./App.css";
const Tasks = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTask(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task)); // Corrected to "tasks"
  }, [task]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const taskNew = () => {
    if (newTask.trim() !== "") {
      setTask([
        ...task,
        { text: newTask, description: description, completed: false },
      ]);
      setNewTask("");
      setDescription("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        html: "<span style='font-size:90px;'>&#128545;</span><br />Fill the task!",
      });
    }
  };

  const toggleTask = (index) => {
    const newTasks = task.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTask(newTasks);
  };

  const deleteTask = (index) => {
    const deleted = task.filter((_, i) => i !== index); // Fixed filter
    setTask(deleted);
  };

  const handleTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className={`div ${theme}`}>
      <button className="toggle-btn" onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </button>
      <input
        required
        type="text"
        placeholder="create a task"
        value={newTask}
        onChange={handleTaskChange}
      />
      <input
        required
        type="text"
        placeholder="brief description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <button onClick={taskNew}> Create </button>

      <ul>
        {task.map((item, index) => (
          <li key={index} className={item.completed ? "completed" : ""}>
            <strong>{item.text}</strong> : {item.description}
            <span onClick={() => toggleTask(index)}>
              {item.completed ? " (Completed)" : " (Pending)"}
            </span>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
