import React, { FC, useState } from 'react'
import { useAppDispatch } from '../hooks';
import { addNewTodo } from '../redux/todoSlice';

const NewTodoForm:FC = () => {
  const [text, setText] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleAction = () => {
    if(text.trim().length) {
      dispatch(addNewTodo(text));
      setText('');
    }
  }

  return (
    <div>
      <input 
        type='text' 
        value={text} 
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAction}>add</button>
    </div>
  )
}

export default NewTodoForm
