import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './footer.css';
import TasksFilter from '../tasks-filter';

export default class Footer extends Component {
    static propTypes = {
        setFilter:      PropTypes.func.isRequired, 
        clearCompleted: PropTypes.func.isRequired, 
        filter:         PropTypes.string.isRequired, 
        completedCount: PropTypes.number.isRequired,
    }

    render() {
        let { setFilter, filter, clearCompleted, completedCount } = this.props;

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
}