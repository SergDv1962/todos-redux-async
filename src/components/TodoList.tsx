import React from 'react'
import { useAppSelector } from '../hooks'
import TodoItem from './TodoItem'

const TodoList = () => {
   const todos = useAppSelector(state => state.todos.list)


  return (
    <div>
      {todos.map(todo => <TodoItem key={todo.id} {...todo}/>)}
    </div>
  )
}

export default TodoList
