import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default class Task extends Component {
  static propTypes = {
    onDeleted:         PropTypes.func.isRequired,
    onCompleted:       PropTypes.func.isRequired,
    onClickEditButton: PropTypes.func.isRequired,

    className:   PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created:     PropTypes.objectOf(Date).isRequired,

    filter: PropTypes.string.isRequired,
  }

  getEditInput = (className, isCompleted) => {
    if (className.indexOf('editing') + 1) {
      let { onEdited, description } = this.props;

      let secondClass = 'edit-' + (isCompleted ? 'completed' : 'active');
      let editClassName = 'edit ' + secondClass;

      return (
        <form onSubmit={ e => { e.preventDefault(); onEdited(e.target.input.value) } }>
          <input type="text" className={ editClassName } 
            onChange={ e => e.target.value = e.target.value.trimLeft() }
            defaultValue={ description } name='input' />
        </form>
      );
    }

    return null;
  }

  render() {
    let { onDeleted, onCompleted, onClickEditButton, 
      className, description, created, filter } = this.props;
    let { getEditInput } = this;

    let isCompleted = className.indexOf('completed') + 1;
    let isHidden = ((filter === 'completed' && !isCompleted) ||
                    (filter === 'active' && isCompleted));
      
    return (
      <li className={ className + (isHidden ? ' hidden' : '') }>
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
        { getEditInput(className, isCompleted) }
      </li>
    );
  }
}