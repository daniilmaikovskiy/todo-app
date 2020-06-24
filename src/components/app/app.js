import React, { Component } from 'react';
import './app.css';
import { getIndex, updateTasks } from './app-helper';
import { DEFAULT_TASKS, DEFAULT_MAX_ID } from './settings';
import NewTaskForm from '../new-task-form';
import TodoList from '../todo-list';
import Footer from '../footer';

export default class App extends Component {
  maxId = DEFAULT_MAX_ID;
  
  state = {
    tasks: DEFAULT_TASKS,
    newTaskInput: '',
    filter: 'all',
  };

  onDeleted = id => this.setState(state => 
    updateTasks(state.tasks, getIndex(state.tasks, id), null));

  onEdited = (id, text) => {
    this.setState(state => {
      let idx = getIndex(state.tasks, id);
      let className 
        = state.tasks[idx].className.indexOf('completed') + 1 ? 'completed' : 'active';
      let newText = text.trim();

      newText = newText.length ? newText : state.tasks[idx].description;

      return updateTasks(state.tasks, idx, 
        { ...state.tasks[idx], description: newText, className, });
    });
  }

  onCompleted = id => {
    this.setState(state => {
      let idx = getIndex(state.tasks, id);
      let className = state.tasks[idx].className === 'completed' ? 'active' : 'completed';

      return updateTasks(state.tasks, idx, { ...state.tasks[idx], className, });
    });
  }

  onClickEditButton = id => {
    this.setState(state => {
      let idx = getIndex(state.tasks, id);
      let className = state.tasks[idx].className + '-before-edit editing';

      return updateTasks(state.tasks, idx, { ...state.tasks[idx], className, });
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