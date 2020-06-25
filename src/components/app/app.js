import React, { Component } from 'react';
import './app.css';
import { updateTasks } from './app-helper';
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

  onDeleted = id => this.setState(({ tasks }) => 
    ({ tasks: updateTasks(tasks, tasks.findIndex(el => el.id === id), null) }));

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      let idx = tasks.findIndex(el => el.className === 'completed');
      let currentTasks = [ ...tasks ];

      while (idx + 1) {
        currentTasks = updateTasks(currentTasks, idx, null);
        idx = currentTasks.findIndex(el => el.className === 'completed');
      }

      return { tasks: currentTasks, };
    });
  }

  getCompletedCount = () => 
    this.state.tasks.reduce((acc, task) => 
      task.className.indexOf('completed') + 1 ? acc + 1 : acc, 0);

  onEdited = (id, text) => {
    this.setState(({ tasks }) => {
      let idx = tasks.findIndex(el => el.id === id);
      let className = tasks[idx].className.indexOf('completed') + 1 ? 'completed' : 'active';
      let newText = text.trim();

      newText = newText.length ? newText : tasks[idx].description;

      return { 
        tasks: updateTasks(tasks, idx, { ...tasks[idx], description: newText, className, })
      };
    });
  }

  onCompleted = id => {
    this.setState(({ tasks }) => {
      let idx = tasks.findIndex(el => el.id === id);
      let className = tasks[idx].className === 'completed' ? 'active' : 'completed';

      return { 
        tasks: updateTasks(tasks, idx, { ...tasks[idx], className, })
      };
    });
  }

  onClickEditButton = id => {
    this.setState(({ tasks }) => {
      let idx = tasks.findIndex(el => el.id === id);
      let className = tasks[idx].className + '-before-edit editing';

      return { 
        tasks: updateTasks(tasks, idx, { ...tasks[idx], className, })
      };
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

    this.setState(({ tasks }) => ({ 
      tasks: [...tasks, this.createNewTask(newTaskText)],
      newTaskInput: '',
    }));
  }

  onNewTaskInputChanged = value => this.setState({ newTaskInput: value });

  setFilter = value => this.setState(({ filter: value, }));

  render() {
    let { tasks, newTaskInput, filter } = this.state;
    let { addNewTask, onNewTaskInputChanged, onDeleted, onEdited, onClickEditButton, 
      onCompleted, setFilter, clearCompleted, getCompletedCount } = this;

    return (
      <section className='todoapp'>
        <NewTaskForm 
          addNewTask={ addNewTask } 
          onChange={ onNewTaskInputChanged }  
          value={ newTaskInput } />
        <section className='main'>
            <TodoList 
              tasks={ tasks } 
              filter={ filter }
              onDeleted={ onDeleted } 
              onEdited={ onEdited }
              onCompleted={ onCompleted } 
              onClickEditButton={ onClickEditButton } />
            <Footer 
              setFilter={ setFilter } 
              filter={ filter }
              clearCompleted={ clearCompleted }
              completedCount={ getCompletedCount() }/>
        </section>
      </section>
    );
  }
};