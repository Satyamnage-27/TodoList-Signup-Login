import React, { useState } from 'react'

function TodoInput(props) {
  const [todo, setTodos] = useState('');
  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      props.addList(todo)
      setTodos("")
    }
  }

  return (
    <div className='input-container'>
      <input type='text' className='input-box-todo'
        placeholder='Enter Your Todo'
        value={todo}
        onChange={e => {
          setTodos(e.target.value)
        }}
        onKeyDown={handleEnterPress}
      />

      <button className='add-btn'
        onClick={() => {
          props.addList(todo)
          setTodos("")
        }}>+</button>
    </div>
  )
}

export default TodoInput