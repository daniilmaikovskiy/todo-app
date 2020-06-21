import React, { Component } from 'react';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default class Task extends Component {
  constructor(props) {
    super(props);
    
    let { onDeleted, ...state } = props;

    this.state = { ...state };
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

  labelOnClick = () => this.isActive = !this.isActive;

  render() {
    const { className, description, created } = this.state;
    const { onDeleted } = this.props;

    const editInput = (
      className === 'editing' 
      ? <input type="text" className="edit" defaultValue={ description } /> 
      : null);
    
    return (
      <li className={ className }>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label onClick={ this.labelOnClick }>
            <span className="description">{ description }</span>
            <span className="created">
              { formatDistanceToNow(created, { addSuffix: true }) }
            </span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={ onDeleted }></button>
        </div>
        { editInput }
      </li>
    );
  }
}