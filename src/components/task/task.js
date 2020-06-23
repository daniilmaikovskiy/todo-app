import React, { Component } from 'react';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default class Task extends Component {
  constructor(props) {
    super(props);
    
    let { className, description, created } = props;

    this.state = { className, description, created };
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

  labelOnClick = () => {
    this.props.onCompleted();
    this.isActive = !this.isActive;
  };

  editingFormOnSubmit = e => {
    e.preventDefault();

    let value = e.target.input.value;
    this.props.onEdited(value);

    this.setState({
      className: 'active',
      description: value,
    });
  }

  onClickEditButton = () => {
    this.props.onClickEditButton();
    this.setState({ className: 'editing', });
  }

  render() {
    let { className, description, created } = this.state;
    let { onDeleted } = this.props;
    let { labelOnClick, onClickEditButton } = this;

    let editInput = null;

    if (className === 'editing') {
      editInput = (
        <form onSubmit={ this.editingFormOnSubmit }>
          <input type="text" className="edit" defaultValue={ description } name='input' />
        </form>
      );
    }
    
    return (
      <li className={ className }>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label onClick={ labelOnClick }>
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
}