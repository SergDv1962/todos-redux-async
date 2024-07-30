import {
  PayloadAction,
  UnknownAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  ToggleStatusTask,
  addNewTask,
  deleteTask,
  editTitleTask,
  fetchTasks,
} from "../api/api";

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
>("todos/fetchTodos", fetchTasks);

export const addNewTodo = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string }
>("todos/addNewTodo", addNewTask);

export const toggleStatus = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string; state: { todos: TodosState } }
>("todos/toggleStatus", ToggleStatusTask);

export const editTitleTodo = createAsyncThunk<
  Todo,
  Todo,
  { rejectValue: string; state: { todos: TodosState } }
>("todos/editTitleTodo", editTitleTask);

export const deleteTodo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("todos/deleteTodo", deleteTask);

const initialState: TodosState = {
  list: [],
  loading: false,
  error: null,
  isEdit: false,
  idEditTodo: "",
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    reducerIsEdit(state, action: PayloadAction<boolean>) {
      state.isEdit = action.payload;
    },
    getIdEditTodo(state, action: PayloadAction<string>) {
      state.idEditTodo = action.payload;
      console.log(action.payload);
    },
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
        state.loading = false;
        const toggleCompleted = state.list.find(
          (todo) => todo.id === action.payload.id
        );
        if (toggleCompleted) {
          toggleCompleted.completed = !toggleCompleted.completed;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((todo) => todo.id !== action.payload);
      })
      .addCase(editTitleTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.map((todo) =>
          todo.id !== action.payload.id ? todo : action.payload
        );
      })
      .addMatcher(isPinding, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reducerIsEdit, getIdEditTodo } = todoSlice.actions;

export default todoSlice.reducer;

function isPinding(action: UnknownAction) {
  return action.type.endsWith("pending");
}

function isError(action: UnknownAction) {
  return action.type.endsWith("rejected");
}
