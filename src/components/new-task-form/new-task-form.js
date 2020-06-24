import React from 'react';
import './new-task-form.css';

export default function NewTaskForm({ addNewTask, onChange, value }) {
    return (
        <header className="header">
            <h1>todos</h1>
            <form onSubmit={ e => { e.preventDefault(); addNewTask(e.target.input.value) } }>
                <input className="new-todo" name="input" 
                    value={ value } onChange={ e => { onChange(e.target.value) } }
                    placeholder="What needs to be done?" autoFocus />
            </form>
        </header>
    );
}