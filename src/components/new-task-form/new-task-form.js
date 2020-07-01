import React from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    addNewTask: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  onSubmit = (e) => {
    const { addNewTask } = this.props;

    e.preventDefault();
    addNewTask(e.target.input.value);
  };

  onChange = (e) => {
    const { onChange } = this.props;

    onChange(e.target.value);
  };

  render() {
    const { value } = this.props;
    const { onSubmit, onChange } = this;

    return (
      <form onSubmit={onSubmit}>
        <input
          className="new-todo"
          name="input"
          value={value}
          onChange={onChange}
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}
