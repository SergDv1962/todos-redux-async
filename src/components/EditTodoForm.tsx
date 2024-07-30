import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Todo, editTitleTodo, reducerIsEdit } from '../redux/todoSlice';

const EditTodoForm = () => {
  const idEditTodo= useAppSelector(state => state.todos.idEditTodo); 
  const todos = useAppSelector(state => state.todos.list); 
  const oldEditTodo = todos.find(todo => todo.id === idEditTodo)
  const [text, setText] = useState<string>(oldEditTodo ? oldEditTodo.title : '')
   const dispatch = useAppDispatch();

    const newEditTodo: Todo = {
      id: oldEditTodo ? oldEditTodo.id : '',
      title: text,
      completed: oldEditTodo ? oldEditTodo.completed : false,
    } 

   const handleSave = () => {
    dispatch(editTitleTodo(newEditTodo))
    dispatch(reducerIsEdit(false));
   }
   console.log(text)
  return (
    <div>
      <input 
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        />
      <button onClick={handleSave}>save</button>
    </div>
  )
}

export default EditTodoForm
