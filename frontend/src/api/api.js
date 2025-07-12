// src/api/api.js

import { getAuthHeader } from "../utils/auth";

const BASE_URL = "https://todo-production-40cc.up.railway.app/api";

const request = async (endpoint, method = "GET", body = null) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: getAuthHeader(),
  };

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "API request failed");
  }

  return await response.json();
};

// 🧩 Exported functions you can use anywhere
export const fetchTodos = () => request("/todos");
export const addTodo = (todo) => request("/todos", "POST", todo);
export const updateTodo = (id, todo) => request(`/todos/${id}`, "PUT", todo);
export const deleteTodo = (id) => request(`/todos/${id}`, "DELETE");
