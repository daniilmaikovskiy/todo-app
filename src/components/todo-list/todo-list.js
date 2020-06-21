import React from 'react';
import './todo-list.css';
import Task from '../task';

export default function TodoList({ tasks }) {
    
    const taskArr = tasks.map(taskData => {
        let { id, ...taskProps } = taskData;

        return <Task key={ id } { ...taskProps } />
    });

    return (
        <ul className="todo-list">
            { taskArr }
        </ul>
    );
}