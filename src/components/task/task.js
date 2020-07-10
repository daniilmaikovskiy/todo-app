import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import EditInput from '../edit-input';
import IconButton from '../icon-button';

export default function Task({
  onDeleted,
  onCompleted,
  onClickEditButton,
  onEdited,
  className,
  description,
  created,
  filter,
  timer,
  decreaseTimer,
  setTimerActive,
  dateNow,
}) {
  useEffect(() => {
    if (timer.active) {
      decreaseTimer();
    }
    // decreaseTimer and timer.active will be missed to avoid wrong calling the function
    // that generates an extra call of decreaseTimer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow]);

  const onClick = (value) => {
    setTimerActive(value);
  };

  const isCompleted = className.indexOf('completed') + 1;
  const isHidden = (filter === 'completed' && !isCompleted) || (filter === 'active' && isCompleted);

  const getTimerString = ({ min, sec }) => {
    const secStr = sec < 10 ? `0${Number(sec)}` : sec;
    const minStr = min < 10 ? `0${Number(min)}` : min;

    return `${minStr}:${secStr}`;
  };

  return (
    <li className={className + (isHidden ? ' hidden' : '')}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <button type="button" className="description" onClick={onCompleted}>
            {description}
          </button>
          <div className="timer-panel">
            <button
              type="button"
              className="icon icon-play"
              onClick={() => {
                onClick(true);
              }}
            >
              ▶
            </button>
            <button
              type="button"
              className="icon icon-pause"
              onClick={() => {
                onClick(false);
              }}
            >
              ⏸
            </button>
            <span className="time">{getTimerString(timer)}</span>
          </div>
          <span className="created">{formatDistanceToNow(created, { addSuffix: true })}</span>
        </label>
        <IconButton icon="✎" modifier="edit" onClick={onClickEditButton} />
        <IconButton icon="×" modifier="destroy" onClick={onDeleted} />
      </div>
      <EditInput
        className={className}
        isCompleted={!!isCompleted}
        description={description}
        onEdited={onEdited}
      />
    </li>
  );
}

Task.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onClickEditButton: PropTypes.func.isRequired,
  onEdited: PropTypes.func.isRequired,
  decreaseTimer: PropTypes.func.isRequired,
  setTimerActive: PropTypes.func.isRequired,

  className: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  created: PropTypes.objectOf(Date).isRequired,
  timer: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    sec: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
  }).isRequired,

  filter: PropTypes.string.isRequired,
  dateNow: PropTypes.number.isRequired,
};
