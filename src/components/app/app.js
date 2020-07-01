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

  addNewTask = (text) => {
    const newTaskText = text.trim();

    if (!newTaskText.length) return;

    this.setState(({ tasks }) => ({
      tasks: [...tasks, this.createNewTask(newTaskText)],
      newTaskInput: '',
    }));
  };

  onNewTaskInputChanged = (value) => this.setState({ newTaskInput: value });

  setFilter = (value) => this.setState({ filter: value });

  createNewTask(text) {
    const task = {
      id: (this.maxId += 1),
      className: 'active',
      description: text,
      created: new Date(),
    };

    return task;
  }

  render() {
    const { tasks, newTaskInput, filter } = this.state;
    const {
      addNewTask,
      onNewTaskInputChanged,
      onDeleted,
      onEdited,
      onClickEditButton,
      onCompleted,
      setFilter,
      clearCompleted,
      getCompletedCount,
    } = this;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm
            addNewTask={addNewTask}
            onChange={onNewTaskInputChanged}
            value={newTaskInput}
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
