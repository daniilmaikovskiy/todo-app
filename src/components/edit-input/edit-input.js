import React from 'react';
import PropTypes from 'prop-types';
import './edit-input.css';

export default function EditInput({ className, isCompleted, description, onEdited }) {
  const onSubmit = (e) => {
    e.preventDefault();
    onEdited(e.target.input.value);
  };
  const onChange = (e) => {
    e.target.value = e.target.value.trimLeft();
  };

  if (className.indexOf('editing') + 1) {
    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className={`edit edit-${isCompleted ? 'completed' : 'active'}`}
          onChange={onChange}
          defaultValue={description}
          name="input"
        />
      </form>
    );
  }

  return null;
}

EditInput.propTypes = {
  className: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onEdited: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};
