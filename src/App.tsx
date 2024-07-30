
import { useEffect } from 'react';
import './App.css';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchTodos } from './redux/todoSlice';
import EditTodoForm from './components/EditTodoForm';


function App() {
  const {loading, error, isEdit} = useAppSelector(state=> state.todos)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])
 
  return (
    <div className='App'>
      <div className="App-header">
        {isEdit
          ? <EditTodoForm/>
          : <>
              <NewTodoForm/>
              {loading && <h2>Loading...</h2>}
              {error && <h2>An error occurred: {error}</h2>}
              <TodoList/>
            </>
        }
      </div>
    </div>
  );
}

export default App;
