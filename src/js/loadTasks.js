import addNewTask from './addNewTask';

export default function loadTasks(savedTasks) {
  const toDoTasks = document.querySelector('#todo .list__task-list');
  const inProgressTasks = document.querySelector('#inProgress .list__task-list');
  const doneTasks = document.querySelector('#done .list__task-list');

  const { todo, inProgress, done } = savedTasks;

  for (let i = 0; i < todo.length; i += 1) {
    addNewTask(toDoTasks, todo[i]);
  }

  for (let i = 0; i < inProgress.length; i += 1) {
    addNewTask(inProgressTasks, inProgress[i]);
  }

  for (let i = 0; i < done.length; i += 1) {
    addNewTask(doneTasks, done[i]);
  }
}
