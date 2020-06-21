import React from 'react';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function Task({ className, description, created }) {

  let editInput = className === 'editing' 
    ? <input type="text" className="edit" defaultValue={ description } /> : null;
    
  return (
    <li className={ className }>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{ description }</span>
          <span className="created">
            { formatDistanceToNow(created, { addSuffix: true }) }
          </span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      { editInput }
    </li>
  );
}