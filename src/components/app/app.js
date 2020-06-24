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
    filter: 'all',
  };

  getIndex = (arr, id) => arr.findIndex(el => el.id === id);

  updateTasks = (tasks, idx, newTaskProps) => {
    let before = tasks.slice(0, idx);
    let after  = tasks.slice(idx + 1);

    if (newTaskProps === null) return { tasks: [ ...before, ...after ] };

    let newTask = { ...newTaskProps };

    return { tasks: [ ...before, newTask, ...after ], };
  }

  onDeleted = id => this.setState(state => 
    this.updateTasks(state.tasks, this.getIndex(state.tasks, id), null));

  onEdited = (id, text) => {
    this.setState(state => {
      let idx = this.getIndex(state.tasks, id);

      return this.updateTasks(state.tasks, idx, 
        { ...state.tasks[idx], description: text, className: 'active', });
    });
  }

  onCompleted = id => {
    this.setState(state => {
      let idx = this.getIndex(state.tasks, id);
      let className = state.tasks[idx].className === 'completed' ? 'active' : 'completed';

      return this.updateTasks(state.tasks, idx, { ...state.tasks[idx], className, });
    });
  }

  onClickEditButton = id => {
    this.setState(state => {
      let idx = this.getIndex(state.tasks, id);

      return this.updateTasks(state.tasks, idx, 
        { ...state.tasks[idx], className: 'editing', });
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
    let newTaskText = text.trim();

    if (!newTaskText.length) return;

    this.setState(state => ({ 
      tasks: [...state.tasks, this.createNewTask(newTaskText)],
      newTaskInput: '',
    }));
  }

  onNewTaskInputChanged = value => this.setState({ newTaskInput: value });

  setFilter = value => this.setState(() => ({ filter: value, }));

  render() {
    let { tasks, newTaskInput, filter } = this.state;
    let { addNewTask, onNewTaskInputChanged, onDeleted, onEdited, onClickEditButton, 
      onCompleted, setFilter } = this;

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
            <Footer setFilter={ setFilter } filter={ filter }/>
        </section>
      </section>
    );
  }
};