import React, { FC } from 'react'
import { useAppDispatch } from '../hooks';
import { deleteTodo, getIdEditTodo, reducerIsEdit, toggleStatus } from '../redux/todoSlice';

interface TodoItemProps {
   id: string;
   title: string;
   completed: boolean;
}

const TodoItem:FC<TodoItemProps> = ({ id, title, completed }) => {
   const dispatch = useAppDispatch();

   const handleEdit = () => {
    dispatch(getIdEditTodo(id))
    dispatch(reducerIsEdit(true))
   }
   
  return (
    <div>
      <input 
         type='checkbox' 
         checked={completed} 
         onChange={() => dispatch(toggleStatus(id))}
      />
      <span>{title}</span>
      <button onClick={handleEdit}>edit</button>
      <button onClick={() => dispatch(deleteTodo(id))}>delete</button>
    </div>
  )
}

export default TodoItem
