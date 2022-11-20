export default function addNewTask(parentElement, description) {
  if (description !== '') {
    const newTask = document.createElement('div');
    newTask.className = 'task-list__item';
    newTask.innerHTML = `
        ${description}
        <div class="delete-task hidden">X</div>
      `;
    parentElement.appendChild(newTask);
  }
}
