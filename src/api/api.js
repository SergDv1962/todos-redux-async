import axios from "axios";

export async function fetchTasks(_, { rejectWithValue }) {
   try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5")
      return response.data
   } catch (error) {
      return rejectWithValue("Server error!");
   }
//   const response = await fetch(
//     "https://jsonplaceholder.typicode.com/todos?_limit=5"
//   );

//   if (!response.ok) {
//     return rejectWithValue("Server error!");
//   }
//   const data = await response.json();
//   return data;
}

export async function addNewTask(text, { rejectWithValue }) {
  const todo = {
    id:1,
    title: text,
    completed: false,
  };
  try {
    const response = await axios.post("https://jsonplaceholder.typicode.com/todos", todo);
    return response.data;
  } catch (error) {
    return rejectWithValue(`Can't add new todo. Server error. ${error}`);
  }
 
  // const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
  //   method: "POST",
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  //   body: JSON.stringify(todo),
  // });

  // if (!response.ok) {
  //   return rejectWithValue("Can't add new todo. Server error.");
  // }
  // return await response.json();
}

export async function ToggleStatusTask(id, { rejectWithValue, getState }) {
  const todo = getState().todos.list.find((todo) => todo.id === id);

  if (todo) {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        completed: !todo.completed,
      });
      return response.data
    } catch (error) {
      return rejectWithValue(`Can't toggle status. Server error! ${error}`);
    }
    // const response = await fetch(
    //   `https://jsonplaceholder.typicode.com/todos/${id}`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       completed: !todo.completed,
    //     }),
    //   }
    // );
    // if (!response.ok) {
    //   return rejectWithValue("Can't toggle status. Server error!");
    // }
    // return await response.json();
  }
  return rejectWithValue("No such todo on the list");
}

export async function editTitleTask(payload, { rejectWithValue }) {
  try {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${payload.id}`, payload)
    return response.data
  } catch (error) {
    return rejectWithValue(`Can't edit todo. Server error! ${error}`);
  }

  // const response = await fetch(
  //   `https://jsonplaceholder.typicode.com/todos/${payload.id}`,
  //   {
  //     method: "PUT",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   }
  // );
  // if (!response.ok) {
  //   return rejectWithValue("Can't edit todo. Server error!");
  // }
  // return await response.json();
}

export async function deleteTask(id, { rejectWithValue }) {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    return id
  } catch (error) {
    return rejectWithValue(`Can't delete todo. Server error! ${error}`);
  }
  // const response = await fetch(
  //   `https://jsonplaceholder.typicode.com/todos/${id}`,
  //   {
  //     method: "Delete",
  //   }
  // );

  // if (!response.ok) {
  //   return rejectWithValue("Can't delete todo. Server error!");
  // }
  // return id;
}
