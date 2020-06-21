import React, { Component } from 'react';
import './todo-list.css';
import Task from '../task';

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        
        let { tasks } = props;

        this.state = { ...tasks };
    }

    render() {
        let { tasks } = this.props;

        const taskArr = tasks.map(taskData => {
            let { id, ...taskProps } = taskData;
    
            return <Task key={ id } { ...taskProps } 
                onDeleted={ () => this.props.onDeleted(id) } />
        });
    
        return (
            <ul className="todo-list">
                { taskArr }
            </ul>
        );
    }
}