import React from 'react';
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
}) {
  const isCompleted = className.indexOf('completed') + 1;
  const isHidden = (filter === 'completed' && !isCompleted) || (filter === 'active' && isCompleted);

  return (
    <li className={className + (isHidden ? ' hidden' : '')}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <button type="button" className="description" onClick={onCompleted}>
            {description}
          </button>
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

  className: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  created: PropTypes.objectOf(Date).isRequired,

  filter: PropTypes.string.isRequired,
};
