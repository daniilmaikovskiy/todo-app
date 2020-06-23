import React, { Component } from 'react';
import './todo-list.css';
import Task from '../task';

export default class TodoList extends Component {
    render() {
        let { tasks, onDeleted, onEdited } = this.props;

        const taskArr = tasks.map(taskData => {
            let { id, ...taskProps } = taskData;
    
            return <Task key={ id } { ...taskProps } 
                onDeleted={ () => onDeleted(id) } 
                onEdited={ text => onEdited(id, text) } />
        });
    
        return (
            <ul className="todo-list">
                { taskArr }
            </ul>
        );
    }
}