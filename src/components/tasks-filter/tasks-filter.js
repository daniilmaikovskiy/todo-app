import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';

export default class TasksFilter extends Component {
  static propTypes = {
    filter:    PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
  }

  getClassName = name => this.props.filter === name ? 'selected' : '';

  onClick = e => this.props.setFilter(e.target.name);

  render() {
    const { getClassName, onClick } = this;

    return (
      <ul className="filters">
        <li>
          <button name='all' className={ getClassName('all') }
          onClick={ onClick }>All</button>
        </li>
        <li>
          <button name='active' className={ getClassName('active') }
          onClick={ onClick }>Active</button>
        </li>
        <li>
          <button name='completed' className={ getClassName('completed') }
          onClick={ onClick }>Completed</button>
        </li>
      </ul>
   );
  }
}
