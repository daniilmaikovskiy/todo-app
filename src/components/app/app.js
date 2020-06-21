import React, { Component } from 'react';
import './app.css';
import NewTaskForm from '../new-task-form';
import Main from '../main';

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

  render() {
    return (
      <section className='todoapp'>
        <NewTaskForm />
        <Main tasks={ this.state.tasks } />
      </section>
    );
  }
};