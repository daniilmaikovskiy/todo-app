import React from 'react';
import './task.css';

export default function Task({ className, description, created }) {

    let editInput = null;
    
    if (className === 'editing')
        editInput = <input type="text" className="edit" defaultValue={ description } />

    return (
        <li className={ className }>
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>
                <span className="description">{ description }</span>
                <span className="created">{ created }</span>
              </label>
              <button className="icon icon-edit"></button>
              <button className="icon icon-destroy"></button>
            </div>
            { editInput }
        </li>
    );
}