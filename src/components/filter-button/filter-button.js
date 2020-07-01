import React from 'react';
import PropTypes from 'prop-types';
import './filter-button.css';

export default function FilterButton({ name, filter, setFilter }) {
  const getClassName = () => `${name === filter ? 'selected ' : ''}first-upper-letter`;
  const onClick = (e) => setFilter(e.target.name);

  return (
    <button type="button" name={name} className={getClassName()} onClick={onClick}>
      {name}
    </button>
  );
}

FilterButton.propTypes = {
  name: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};
