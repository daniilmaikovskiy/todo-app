import React from 'react';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function Task(
  { onDeleted, onCompleted, onEdited, onClickEditButton, className, description, created }) {

  let editInput = null;

  if (className === 'editing') {
    editInput = (
      <form onSubmit={ e => { e.preventDefault(); onEdited(e.target.input.value) } }>
        <input type="text" className="edit" defaultValue={ description } name='input' />
      </form>
    );
  }
    
  return (
    <li className={ className }>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label onClick={ onCompleted }>
          <span className="description">{ description }</span>
          <span className="created">
            { formatDistanceToNow(created, { addSuffix: true }) }
          </span>
        </label>
        <button className="icon icon-edit" onClick={ onClickEditButton }></button>
        <button className="icon icon-destroy" onClick={ onDeleted }></button>
      </div>
      { editInput }
    </li>
  );
}