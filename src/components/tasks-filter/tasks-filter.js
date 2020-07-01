import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';

export default class TasksFilter extends Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
  };

  getClassName = (name) => {
    const { filter } = this.props;

    return filter === name ? 'selected' : '';
  };

  onClick = (e) => {
    const { setFilter } = this.props;

    setFilter(e.target.name);
  };

  render() {
    const { getClassName, onClick } = this;

    return (
      <ul className="filters">
        <li>
          <button type="button" name="all" className={getClassName('all')} onClick={onClick}>
            All
          </button>
        </li>
        <li>
          <button type="button" name="active" className={getClassName('active')} onClick={onClick}>
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            name="completed"
            className={getClassName('completed')}
            onClick={onClick}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
