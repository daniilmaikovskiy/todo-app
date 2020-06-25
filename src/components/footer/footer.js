import React from 'react';
import './footer.css';
import TasksFilter from '../tasks-filter';

export default function Footer({ setFilter, filter, clearCompleted }) {
    return (
        <footer className="footer">
            <span className="todo-count">1 items left</span>
            <TasksFilter setFilter={ setFilter } filter={ filter } />
            <button className="clear-completed" onClick={ clearCompleted } >
                Clear completed
            </button>
        </footer>
    );
}