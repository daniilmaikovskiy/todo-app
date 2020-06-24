import React from 'react';
import './todo-list.css';
import Task from '../task';

export default function TodoList(
    { tasks, onDeleted, onEdited, onCompleted, onClickEditButton }) {

    const taskArr = tasks.map(taskData => {
        let { id, ...taskProps } = taskData;
    
        return <Task key={ id } { ...taskProps } 
            onDeleted={ () => onDeleted(id) } 
            onEdited={ text => onEdited(id, text) } 
            onCompleted={ () => { onCompleted(id) } }
            onClickEditButton={ () => { onClickEditButton(id) } } />
    });
    
    return (
        <ul className="todo-list">
            { taskArr }
        </ul>
    );
}