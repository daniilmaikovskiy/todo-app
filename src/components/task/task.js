import React from 'react';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function Task(
  { onDeleted, onCompleted, onEdited, onClickEditButton, className, description, created }) {

  let editInput = null;

  if (className.indexOf('editing') + 1) {
    let secondClass = 'edit-' + (className.indexOf('completed') + 1 ? 'completed' : 'active');
    let editClassName = 'edit ' + secondClass;

    editInput = (
      <form onSubmit={ e => { e.preventDefault(); onEdited(e.target.input.value) } }>
        <input type="text" className={ editClassName } 
          onChange={ e => e.target.value = e.target.value.trimLeft() }
          defaultValue={ description } name='input' />
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