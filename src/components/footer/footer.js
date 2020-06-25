import React from 'react';
import './footer.css';
import TasksFilter from '../tasks-filter';

export default function Footer({ setFilter, filter, clearCompleted, completedCount }) {
    return (
        <footer className="footer">
            <span className="todo-count">{ completedCount } items left</span>
            <TasksFilter setFilter={ setFilter } filter={ filter } />
            <button className="clear-completed" onClick={ clearCompleted } >
                Clear completed
            </button>
        </footer>
    );
}