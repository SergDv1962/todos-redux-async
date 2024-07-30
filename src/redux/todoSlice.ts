import { PayloadAction, UnknownAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodosState = {
  list: Todo[];
  loading: boolean;
  error: string | null;
  isEdit: boolean;
  idEditTodo: string;
};

export const fetchTodos = createAsyncThunk<
  Todo[],
  undefined,
  { rejectValue: string }
>("todos/fetchTodos", async function (_, { rejectWithValue }) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );

  if (!response.ok) {
    return rejectWithValue("Server error!");
  }
  const data = await response.json();
  return data;
});

export const addNewTodo = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string }
>("todos/addNewTodo", async function (text, { rejectWithValue }) {
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
  return (await response.json()) as Todo;
});

export const toggleStatus = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string, state: { todos: TodosState } }
>(
  "todos/toggleStatus",
  async function (id, { rejectWithValue, getState }) {
    const todo = getState().todos.list.find(todo => todo.id === id);

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
      if(!response.ok) {
         return rejectWithValue('Can\'t toggle status. Server error!')
      };
      return (await response.json()) as Todo;
    }
    return rejectWithValue('No such todo on the list')
  }
);

export const editTitleTodo = createAsyncThunk<Todo, Todo, {rejectValue: string, state: {todos: TodosState}}>(
  'todos/editTitleTodo',
  async function (payload, {rejectWithValue, getState}) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${payload.id}`, {
      method: "PUT",
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(payload)
    });
    if(!response.ok){
      return rejectWithValue('Can\'t edit todo. Server error!')
    };
    return (await response.json()) as Todo; 
  }
)

export const deleteTodo = createAsyncThunk<string, string, {rejectValue: string}>(
  'todos/deleteTodo',
  async function (id, {rejectWithValue}) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'Delete',
    });

    if(!response.ok) {
      return rejectWithValue('Can\'t delete todo. Server error!')
    };
    return id;
  }
)

const initialState: TodosState = {
  list: [],
  loading: false,
  error: null,
  isEdit: false,
  idEditTodo: '',
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    reducerIsEdit (state, action: PayloadAction<boolean>) {
      state.isEdit = action.payload
    },
    getIdEditTodo (state, action: PayloadAction<string>) {
      state.idEditTodo = action.payload;
      console.log(action.payload)
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        state.loading=false;
         const toggleCompleted = state.list.find(todo => todo.id === action.payload.id);
         if(toggleCompleted) {
            toggleCompleted.completed = !toggleCompleted.completed
         }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading=false;
        state.list=state.list.filter(todo=>todo.id!==action.payload)
      })
      .addCase(editTitleTodo.fulfilled, (state, action) =>{
        state.loading = false;
        state.list = state.list.map(todo => todo.id !== action.payload.id ? todo : action.payload)
      })
      .addMatcher(isPinding, (state) => {
        state.loading= true;
        state.error= null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading= false;
        state.error = action.payload;
      })
  },
});

export const { reducerIsEdit, getIdEditTodo } = todoSlice.actions;

export default todoSlice.reducer;

function isPinding (action: UnknownAction) {
  return action.type.endsWith('pending')
}

function isError (action : UnknownAction) {
 return action.type.endsWith('rejected')
}
