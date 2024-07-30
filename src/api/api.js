// import axios from "axios";
// import {Todo} from "../redux/todoSlice";

export async function fetchTasks(_, { rejectWithValue }) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );

  if (!response.ok) {
    return rejectWithValue("Server error!");
  }
  const data = await response.json();
  return data;
}

export async function addNewTask(text, { rejectWithValue }) {
  const todo = {
    id: 1,
    title: text,
    completed: false,
  };
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    return rejectWithValue("Can't add new todo. Server error.");
  }
  return await response.json();
}

export async function ToggleStatusTask(id, { rejectWithValue, getState }) {
  const todo = getState().todos.list.find((todo) => todo.id === id);

  if (todo) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      }
    );
    if (!response.ok) {
      return rejectWithValue("Can't toggle status. Server error!");
    }
    return await response.json();
  }
  return rejectWithValue("No such todo on the list");
}

export async function editTitleTask(payload, { rejectWithValue, getState }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${payload.id}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) {
    return rejectWithValue("Can't edit todo. Server error!");
  }
  return await response.json();
}

export async function deleteTask(id, { rejectWithValue }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: "Delete",
    }
  );

  if (!response.ok) {
    return rejectWithValue("Can't delete todo. Server error!");
  }
  return id;
}
