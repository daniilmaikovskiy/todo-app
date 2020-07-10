import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './todo-list.css';
import Task from '../task';

export default function TodoList({
  tasks,
  filter,
  onDeleted,
  onEdited,
  onCompleted,
  onClickEditButton,
  decreaseTimer,
  setTimerActive,
}) {
  const [dateNow, setDateNow] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const timerId = setInterval(() => {
      const newDateNow = Math.floor(Date.now() / 1000);

      if (newDateNow !== dateNow) {
        setDateNow(newDateNow);
      }
    }, 10);

    return () => clearInterval(timerId);
    // component did mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const taskArr = tasks.map((taskData) => {
    const { id, ...taskProps } = taskData;

    return (
      <Task
        key={id}
        {...taskProps}
        filter={filter}
        onDeleted={() => onDeleted(id)}
        onEdited={(text) => onEdited(id, text)}
        onCompleted={() => {
          onCompleted(id);
        }}
        onClickEditButton={() => {
          onClickEditButton(id);
        }}
        decreaseTimer={(value) => {
          decreaseTimer(id, value);
        }}
        setTimerActive={(value) => {
          setTimerActive(id, value);
        }}
        dateNow={dateNow}
      />
    );
  });

  return <ul className="todo-list">{taskArr}</ul>;
}

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      className: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      created: PropTypes.objectOf(Date).isRequired,
      timer: PropTypes.shape({
        active: PropTypes.bool.isRequired,
        sec: PropTypes.string.isRequired,
        min: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,

  filter: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdited: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onClickEditButton: PropTypes.func.isRequired,
  decreaseTimer: PropTypes.func.isRequired,
  setTimerActive: PropTypes.func.isRequired,
};
