const updateTasks = (tasks, idx, newTaskProps = null) => {
  const before = tasks.slice(0, idx);
  const after = tasks.slice(idx + 1);

  if (newTaskProps === null) return [...before, ...after];

  return [...before, { ...newTaskProps }, ...after];
};

export { updateTasks as default };
