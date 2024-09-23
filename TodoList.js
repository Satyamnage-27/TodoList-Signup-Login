import React from 'react'

function TodoList(props) {
    const item= props.item
    console.log('list item', item);
    
    return (
        <li className='list-item'>
            {item.todo}
            <span className='icons'>
                <i className="fa-solid fa-trash-can icon-delete"
                    onClick={e => {
                        props.deleteItem(props.index)
                    }}></i>
            </span>
        </li>
    )
}

export default TodoList