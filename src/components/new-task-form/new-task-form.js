import React from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default function NewTaskForm({
  addNewTask,
  onChangeTask,
  onChangeSeconds,
  onChangeMinutes,
  value,
  seconds,
  minutes,
}) {
  const onSubmit = (e) => {
    e.preventDefault();
    addNewTask();
  };

  const onChangeSecondsInput = (e) => {
    const inputString = e.target.value.trim();

    if (inputString === '') {
      onChangeSeconds('');
      return;
    }

    const number = Number(inputString);

    if (!Number.isNaN(number) && number < 60) {
      onChangeSeconds(Math.floor(number).toString());
    }
  };

  const onChangeMinutesInput = (e) => {
    const inputString = e.target.value.trim();

    if (inputString === '') {
      onChangeMinutes('');
      return;
    }

    const number = Number(inputString);

    if (!Number.isNaN(number) && number < 100) {
      onChangeMinutes(Math.floor(number).toString());
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <form onSubmit={onSubmit}>
        <input
          className="new-todo"
          name="input"
          value={value}
          onChange={(e) => onChangeTask(e.target.value)}
          placeholder="What needs to be done?"
        />
      </form>
      <input
        name="minutes"
        className="new-todo-form__timer"
        placeholder="Min"
        value={minutes}
        onChange={onChangeMinutesInput}
      />
      <input
        name="seconds"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={seconds}
        onChange={onChangeSecondsInput}
      />
    </div>
  );
}

NewTaskForm.propTypes = {
  value: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  addNewTask: PropTypes.func.isRequired,
  onChangeTask: PropTypes.func.isRequired,
  onChangeSeconds: PropTypes.func.isRequired,
  onChangeMinutes: PropTypes.func.isRequired,
};
