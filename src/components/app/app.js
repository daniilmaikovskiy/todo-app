import React from 'react';
import './app.css';
import updateTasks from './app-helper';
import { DEFAULT_TASKS, DEFAULT_MAX_ID } from './settings';
import NewTaskForm from '../new-task-form';
import TodoList from '../todo-list';
import Footer from '../footer';

export default class App extends React.Component {
  maxId = DEFAULT_MAX_ID;

  state = {
    tasks: DEFAULT_TASKS,
    newTaskInput: '',
    newTaskSeconds: '',
    newTaskMinutes: '',
    filter: 'all',
  };

  onDeleted = (id) =>
    this.setState(({ tasks }) => ({
      tasks: updateTasks(
        tasks,
        tasks.findIndex((el) => el.id === id)
      ),
    }));

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      let idx = tasks.findIndex((el) => el.className.indexOf('completed') + 1);
      let currentTasks = [...tasks];

      while (idx + 1) {
        currentTasks = updateTasks(currentTasks, idx);
        idx = currentTasks.findIndex((el) => el.className.indexOf('completed') + 1);
      }

      return { tasks: currentTasks };
    });
  };

  getCompletedCount = () => {
    const { tasks } = this.state;

    return tasks.reduce(
      (acc, task) => (task.className.indexOf('completed') + 1 ? acc + 1 : acc),
      0
    );
  };

  onEdited = (id, text) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const className = tasks[idx].className.indexOf('completed') + 1 ? 'completed' : 'active';
      let newText = text.trim();

      newText = newText.length ? newText : tasks[idx].description;

      return {
        tasks: updateTasks(tasks, idx, {
          ...tasks[idx],
          description: newText,
          className,
        }),
      };
    });
  };

  onCompleted = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const className = tasks[idx].className === 'completed' ? 'active' : 'completed';

      return {
        tasks: updateTasks(tasks, idx, { ...tasks[idx], className }),
      };
    });
  };

  onClickEditButton = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const className = `${tasks[idx].className}-before-edit editing`;

      return {
        tasks: updateTasks(tasks, idx, { ...tasks[idx], className }),
      };
    });
  };

  addNewTask = () => {
    const { newTaskInput, newTaskSeconds, newTaskMinutes } = this.state;

    const text = newTaskInput.trim();

    if (!text.length) return;

    this.setState(({ tasks }) => ({
      tasks: [...tasks, this.createNewTask(text, newTaskSeconds, newTaskMinutes)],
      newTaskInput: '',
      newTaskSeconds: '',
      newTaskMinutes: '',
    }));
  };

  onNewTaskInputChanged = (value) => this.setState({ newTaskInput: value });

  onNewTaskSecondsChanged = (value) => this.setState({ newTaskSeconds: value });

  onNewTaskMinutesChanged = (value) => this.setState({ newTaskMinutes: value });

  setFilter = (value) => this.setState({ filter: value });

  decreaseTimer = (id, value) => {
    if (value >= 60 || value <= 0) return;

    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const { timer } = tasks[idx];

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

      return {
        tasks: updateTasks(tasks, idx, { ...tasks[idx], timer: newTimer }),
      };
    });
  };

  setTimerActive = (id, value) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const newTimer = { ...tasks[idx].timer, active: value };

      return {
        tasks: updateTasks(tasks, idx, { ...tasks[idx], timer: newTimer }),
      };
    });
  };

  createNewTask(txt, sec, min) {
    const task = {
      id: (this.maxId += 1),
      className: 'active',
      description: txt,
      created: new Date(),
      timer: { active: true, sec, min },
    };

    return task;
  }

  render() {
    const { tasks, newTaskInput, newTaskSeconds, newTaskMinutes, filter } = this.state;
    const {
      addNewTask,
      onNewTaskInputChanged,
      onNewTaskSecondsChanged,
      onNewTaskMinutesChanged,
      onDeleted,
      onEdited,
      onClickEditButton,
      onCompleted,
      setFilter,
      clearCompleted,
      getCompletedCount,
      decreaseTimer,
      setTimerActive,
    } = this;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm
            addNewTask={addNewTask}
            onChangeTask={onNewTaskInputChanged}
            onChangeSeconds={onNewTaskSecondsChanged}
            onChangeMinutes={onNewTaskMinutesChanged}
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
}
