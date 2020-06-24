export const updateTasks = (tasks, idx, newTaskProps) => {
    let before = tasks.slice(0, idx);
    let after  = tasks.slice(idx + 1);

    if (newTaskProps === null) return { tasks: [ ...before, ...after ] };

    let newTask = { ...newTaskProps };

    return { tasks: [ ...before, newTask, ...after ], };
}