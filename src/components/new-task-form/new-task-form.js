import React from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default function NewTaskForm({ addNewTask, onChange, value }) {
  const onSubmit = (e) => {
    e.preventDefault();
    addNewTask(e.target.input.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="new-todo"
        name="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What needs to be done?"
      />
    </form>
  );
}

NewTaskForm.propTypes = {
  value: PropTypes.string.isRequired,
  addNewTask: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
