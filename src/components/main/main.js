import React from 'react';
import './main.css';
import TodoList from '../todo-list';
import Footer from '../footer';

export default function Main({ tasks }) {
    return (
        <section className='main'>
            <TodoList tasks={ tasks } />
            <Footer />
        </section>
    );
}