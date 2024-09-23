import React, { useEffect, useState } from 'react'
import "./App.css"
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList';
import axios from 'axios'

function Todo() {
    const [todos, setTodos] = useState([])
    const [listTodo, setListTodo] = useState([]);
    console.log(todos);

    useEffect(() => {
        getTodoList()
    }, [])

    function getTodoList() {
        axios.get('http://localhost:3001/todo/list')
            .then(todos => {
                console.log(todos)
                setListTodo(todos.data)
            })
            .catch(err => console.log(err))
    }

    
    let addList = (todo) => {
        console.log("add todo >>>>", todo);

        if (todo !== '') {
            axios.post('http://localhost:3001/todo', {
                todo: todo
            })
                .then(todos => {
                    console.log('add');
                    
                    setListTodo([{todo}, ...listTodo]);
                })
                .catch(err => console.log(err))

        }

    }
    const deleteListItem = (key) => {
        let newListTodo = [...listTodo];
        newListTodo.splice(key, 1)
        setListTodo([...newListTodo])
    }
    const deleteTodoList = (id) => {
        axios.delete(`http://localhost:3001/todo/${id}`);
    };

    return (
        <div className='main-container'>
            <div className='center-container'>
                <TodoInput
                    addList={addList} />
                <h1 className='app-heading'>TODO</h1>
                <hr />
                {listTodo.map((listItem, i) => {
                    return (
                        <TodoList  key={i} item={listItem} deleteItem={deleteListItem} />
                    )
                })}
            </div>
        </div>
    )
}

export default Todo;