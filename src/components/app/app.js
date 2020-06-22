import React, { Component } from 'react';
import './app.css';
import NewTaskForm from '../new-task-form';
import TodoList from '../todo-list';
import Footer from '../footer';

export default class App extends Component {
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
    ]
  };

  onDeleted = id => {
    this.setState(state => {
      let index = state.tasks.findIndex(el => id === el.id);

      let before = state.tasks.slice(0, index);
      let after  = state.tasks.slice(index + 1);

      return { tasks: [ ...before, ...after ] };
    });
  }

  render() {
    return (
      <section className='todoapp'>
        <NewTaskForm />
        <section className='main'>
            <TodoList tasks={ this.state.tasks } onDeleted={ this.onDeleted } />
            <Footer />
        </section>
      </section>
    );
  }
};