import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import EditInput from '../edit-input';

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

  render() {
    const { onDeleted, onCompleted, onClickEditButton, onEdited,
      className, description, created, filter } = this.props;

    const isCompleted = className.indexOf('completed') + 1;
    const isHidden = ((filter === 'completed' && !isCompleted) ||
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
        <EditInput 
          className={ className } 
          isCompleted={ !!isCompleted } 
          description={ description }
          onEdited={ onEdited } />
      </li>
    );
  }
}
