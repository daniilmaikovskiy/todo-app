import React, { Component } from 'react';
import './app.css';
import NewTaskForm from '../new-task-form';
import TodoList from '../todo-list';
import Footer from '../footer';

export default class App extends Component {
  maxId = 10;
  
  state = {
    tasks: [
      {
        id: 1,
        className: 'completed',
        description: 'Completed task',
        created: new Date('June 21, 2020 10:24:18'),
      },
      {
        id: 2,
        className: 'editing',
        description: 'Editing task',
        created: new Date('June 21, 2020 10:48:43'),
      },
      {
        id: 3,
        className: 'active',
        description: 'Active task',
        created: new Date('June 21, 2020 11:17:21'),
      },
    ],

    newTaskInput: '',
  };

  onDeleted = id => {
    this.setState(state => {
      let index = state.tasks.findIndex(el => id === el.id);

      let before = state.tasks.slice(0, index);
      let after  = state.tasks.slice(index + 1);

      return { tasks: [ ...before, ...after ] };
    });
  }

  createNewTask(text) {
    return {
      id: this.maxId++,
      className: 'active',
      description: text,
      created: new Date(),
    }
  }

  addNewTask = text => {
    this.setState(state => ({ 
      tasks: [...state.tasks, this.createNewTask(text)],
      newTaskInput: '',
    }));
  }

  onNewTaskInputChanged = value => {
    this.setState({ newTaskInput: value });
  };

  onEdited = (id, text) => {
    this.setState(state => {
      const { tasks } = state;

      let idx = tasks.findIndex(el => el.id === id);
      let newTask = { ...tasks[idx], description: text, className: 'active', };

      return {
        tasks: [
          ...tasks.slice(0, idx),
          newTask,
          ...tasks.slice(idx + 1),
        ],
      }
    });
  }

  onCompleted = id => {
    this.setState(state => {
      const { tasks } = state;

      let idx = tasks.findIndex(el => el.id === id);
      let newTask = { ...tasks[idx], className: 'completed', };

      return {
        tasks: [
          ...tasks.slice(0, idx),
          newTask,
          ...tasks.slice(idx + 1),
        ],
      }
    });
  }

  onClickEditButton = id => {
    this.setState(state => {
      const { tasks } = state;

      let idx = tasks.findIndex(el => el.id === id);
      let newTask = { ...tasks[idx], className: 'editing', };

      return {
        tasks: [
          ...tasks.slice(0, idx),
          newTask,
          ...tasks.slice(idx + 1),
        ],
      }
    });
  }

  render() {
    let { tasks, newTaskInput } = this.state;
    let { addNewTask, onNewTaskInputChanged, 
      onDeleted, onEdited, onClickEditButton, onCompleted } = this;

    return (
      <section className='todoapp'>
        <NewTaskForm addNewTask={ addNewTask } 
          onChange={ onNewTaskInputChanged }  value={ newTaskInput } />
        <section className='main'>
            <TodoList tasks={ tasks } 
              onDeleted={ onDeleted } 
              onEdited={ onEdited }
              onCompleted={ onCompleted } 
              onClickEditButton={ onClickEditButton } />
            <Footer />
        </section>
      </section>
    );
  }
};