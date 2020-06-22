import React, { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
    onSubmit = e => {
        e.preventDefault();
        this.props.addNewTask(e.target.input.value);
    };

    onChange = e => {
        this.props.onChange(e.target.value);
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <form onSubmit={ this.onSubmit }>
                    <input className="new-todo" name="input" 
                        value={ this.props.value } onChange={ this.onChange }
                        placeholder="What needs to be done?" autoFocus />
                </form>
            </header>
        );
    }
}