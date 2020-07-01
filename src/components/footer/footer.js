import React from 'react';
import PropTypes from 'prop-types';
import './footer.css';
import TasksFilter from '../tasks-filter';

export default function Footer({ setFilter, filter, clearCompleted, completedCount }) {
  return (
    <footer className="footer">
      <span className="todo-count">{completedCount} items left</span>
      <TasksFilter setFilter={setFilter} filter={filter} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  setFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  completedCount: PropTypes.number.isRequired,
};
