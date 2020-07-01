import React from 'react';
import PropTypes from 'prop-types';
import './todo-list.css';
import Task from '../task';

export default class TodoList extends React.PureComponent {
  static propTypes = {
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        className: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        created: PropTypes.objectOf(Date).isRequired,
      })
    ).isRequired,

    filter: PropTypes.string.isRequired,
    onDeleted: PropTypes.func.isRequired,
    onEdited: PropTypes.func.isRequired,
    onCompleted: PropTypes.func.isRequired,
    onClickEditButton: PropTypes.func.isRequired,
  };

  render() {
    const { tasks, filter, onDeleted, onEdited, onCompleted, onClickEditButton } = this.props;

    const taskArr = tasks.map((taskData) => {
      const { id, ...taskProps } = taskData;

      return (
        <Task
          key={id}
          {...taskProps}
          filter={filter}
          onDeleted={() => onDeleted(id)}
          onEdited={(text) => onEdited(id, text)}
          onCompleted={() => {
            onCompleted(id);
          }}
          onClickEditButton={() => {
            onClickEditButton(id);
          }}
        />
      );
    });

    return <ul className="todo-list">{taskArr}</ul>;
  }
}
