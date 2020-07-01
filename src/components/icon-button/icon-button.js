import React from 'react';
import PropTypes from 'prop-types';
import './icon-button.css';

export default function IconButton({ onClick, modifier, icon }) {
  return (
    <button type="button" className={`icon icon-${modifier}`} onClick={onClick}>
      {icon}
    </button>
  );
}

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  modifier: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
