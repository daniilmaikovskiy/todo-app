import React from 'react';
import './app.css';
import Header from '../header';
import Main from '../main';

export default function App() {
    const tasks = [
      {
        id: 1,
        className: 'completed',
        description: 'Completed task',
        created: 'created 17 seconds ago',
      },
      {
        id: 2,
        className: 'editing',
        description: 'Editing task',
        created: 'created 5 minutes ago',
      },
      {
        id: 3,
        className: 'none',
        description: 'Active task',
        created: 'created 5 minutes ago',
      },
    ];

    return (
      <section className='todoapp'>
        <Header />
        <Main tasks={ tasks } />
      </section>
    );
  };