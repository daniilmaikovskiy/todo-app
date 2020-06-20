import React from 'react';
import './app.css';
import Header from '../header';
import Main from '../main';
import TodoList from '../todo-list';

export default function App() {
    return (
      <section className='todoapp'>
        <Header />
        <Main>
          <TodoList>
            
          </TodoList>
        </Main>
      </section>
    );
  };