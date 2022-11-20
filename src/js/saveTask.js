export default function saveTask() {
  const toDoTasks = document.querySelectorAll('#todo .list__task-list .task-list__item');
  const inProgressTasks = document.querySelectorAll('#inProgress .list__task-list .task-list__item');
  const doneTasks = document.querySelectorAll('#done .list__task-list .task-list__item');

  const savedTasks = {
    todo: [],
    inProgress: [],
    done: [],
  };

  for (const task of toDoTasks) {
    savedTasks.todo.push(task.textContent);
  }

  for (const task of inProgressTasks) {
    savedTasks.inProgress.push(task.textContent);
  }

  for (const task of doneTasks) {
    savedTasks.done.push(task.textContent);
  }

  localStorage.setItem('tasksList', JSON.stringify(savedTasks));
}
