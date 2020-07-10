import React, { useState } from 'react';
import './app.css';
import updateTasks from './app-helper';
import { DEFAULT_TASKS, DEFAULT_MAX_ID } from './settings';
import NewTaskForm from '../new-task-form';
import TodoList from '../todo-list';
import Footer from '../footer';

export default function App() {
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [maxId, setMaxId] = useState(DEFAULT_MAX_ID);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [newTaskSeconds, setNewTaskSeconds] = useState('');
  const [newTaskMinutes, setNewTaskMinutes] = useState('');
  const [filter, setFilter] = useState('all');

  const createNewTask = (txt, sec, min) => {
    const task = {
      id: maxId,
      className: 'active',
      description: txt,
      created: new Date(),
      timer: { active: true, sec, min },
    };

    setMaxId((state) => state + 1);

    return task;
  };

  const onDeleted = (id) =>
    setTasks(
      updateTasks(
        tasks,
        tasks.findIndex((el) => el.id === id)
      )
    );

  const clearCompleted = () => {
    setTasks((state) => {
      let idx = state.findIndex((el) => el.className.indexOf('completed') + 1);
      let currentTasks = [...state];

      while (idx + 1) {
        currentTasks = updateTasks(currentTasks, idx);
        idx = currentTasks.findIndex((el) => el.className.indexOf('completed') + 1);
      }

      return currentTasks;
    });
  };

  const getCompletedCount = () => {
    return tasks.reduce(
      (acc, task) => (task.className.indexOf('completed') + 1 ? acc + 1 : acc),
      0
    );
  };

  const onEdited = (id, text) => {
    setTasks((state) => {
      const idx = state.findIndex((el) => el.id === id);
      const className = state[idx].className.indexOf('completed') + 1 ? 'completed' : 'active';
      let newText = text.trim();

      newText = newText.length ? newText : state[idx].description;

      return updateTasks(state, idx, { ...state[idx], description: newText, className });
    });
  };

  const onCompleted = (id) => {
    setTasks((state) => {
      const idx = state.findIndex((el) => el.id === id);
      const className = state[idx].className === 'completed' ? 'active' : 'completed';

      return updateTasks(state, idx, { ...state[idx], className });
    });
  };

  const onClickEditButton = (id) => {
    setTasks((state) => {
      const idx = state.findIndex((el) => el.id === id);
      const className = `${state[idx].className}-before-edit editing`;

      return updateTasks(state, idx, { ...state[idx], className });
    });
  };

  const addNewTask = () => {
    const text = newTaskInput.trim();

    if (!text.length) return;

    setNewTaskInput('');
    setNewTaskSeconds('');
    setNewTaskMinutes('');
    setTasks((state) => [...state, createNewTask(text, newTaskSeconds, newTaskMinutes)]);
  };

  const decreaseTimer = (id, value = 1) => {
    if (value >= 60 || value <= 0) return;

    setTasks((state) => {
      const idx = state.findIndex((el) => el.id === id);
      const { timer } = state[idx];

      let newSec = Number(timer.sec);
      let newMin = Number(timer.min);
      let active = true;

      if (timer.sec >= value) {
        newSec -= value;
      } else if (timer.min > 0) {
        newMin -= 1;
        newSec += 60 - value;
      } else {
        newSec = '';
        newMin = '';
        active = false;
      }

      const newTimer = { active, sec: String(newSec), min: String(newMin) };

      return updateTasks(state, idx, { ...state[idx], timer: newTimer });
    });
  };

  const setTimerActive = (id, value) => {
    setTasks((state) => {
      const idx = state.findIndex((el) => el.id === id);
      const newTimer = { ...state[idx].timer, active: value };

      return updateTasks(state, idx, { ...state[idx], timer: newTimer });
    });
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm
          addNewTask={addNewTask}
          onChangeTask={setNewTaskInput}
          onChangeSeconds={setNewTaskSeconds}
          onChangeMinutes={setNewTaskMinutes}
          value={newTaskInput}
          seconds={newTaskSeconds}
          minutes={newTaskMinutes}
        />
      </header>
      <section className="main">
        <TodoList
          tasks={tasks}
          filter={filter}
          onDeleted={onDeleted}
          onEdited={onEdited}
          onCompleted={onCompleted}
          onClickEditButton={onClickEditButton}
          decreaseTimer={decreaseTimer}
          setTimerActive={setTimerActive}
        />
        <Footer
          setFilter={setFilter}
          filter={filter}
          clearCompleted={clearCompleted}
          completedCount={getCompletedCount()}
        />
      </section>
    </section>
  );
}
