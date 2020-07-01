import React from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';
import FilterButton from '../filter-button';

export default function TasksFilter({ filter, setFilter }) {
  return (
    <ul className="filters">
      <li>
        <FilterButton name="all" filter={filter} setFilter={setFilter} />
      </li>
      <li>
        <FilterButton name="active" filter={filter} setFilter={setFilter} />
      </li>
      <li>
        <FilterButton name="completed" filter={filter} setFilter={setFilter} />
      </li>
    </ul>
  );
}

TasksFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};
