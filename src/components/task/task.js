import React, { Component } from 'react';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }

  set isActive(value) {
    if (value)
      this.setState(() => ({ className: 'active' }));
    else
      this.setState(() => ({ className: 'completed' }));
  }

  get isActive() {
    return this.state.className === 'active';
  }

  onClick = () => {
    this.isActive = !this.isActive;
  }

  render() {
    let { className, description, created } = this.state;

    let editInput = className === 'editing' 
      ? <input type="text" className="edit" defaultValue={ description } /> : null;
    
    return (
      <li className={ className }>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label onClick={ this.onClick }>
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
}