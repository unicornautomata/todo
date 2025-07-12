import React, { useState, useEffect } from "react";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../api/api";
import "../components/TodoList.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const loadTodos = async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      console.error("Failed to load todos:", err.message);
      setError("Failed to load todos.");
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async () => {
    if (!title.trim()) return;

    try {
      await addTodo({ title, completed: false });
      setTitle("");
      loadTodos();
    } catch (err) {
      console.error("Failed to add todo:", err.message);
      setError("Failed to add todo.");
    }
  };

  const handleToggle = async (todo) => {
    try {
      await updateTodo(todo.id, { ...todo, completed: !todo.completed });
      loadTodos();
    } catch (err) {
      console.error("Failed to update todo:", err.message);
      setError("Failed to update todo.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (err) {
      console.error("Failed to delete todo:", err.message);
      setError("Failed to delete todo.");
    }
  };

  return (
    <div className="todo-container">
      <h2>📝 To-Do List</h2>
      {error && <p className="error">{error}</p>}
      <div className="todo-input">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
              />
              <span className={todo.completed ? "completed" : ""}>
                {todo.title}
              </span>
            </label>
            <button onClick={() => handleDelete(todo.id)} className="delete-btn">
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
