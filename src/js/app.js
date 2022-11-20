import addNewTask from './addNewTask';
import saveTask from './saveTask';
import loadTasks from './loadTasks';
import moveElement from './moveElement';

const board = document.querySelector('#board');

let draggedElement = null;
let cloneElement = null;
let elementWidth;
let elementHeight;
let elementTop;
let elementLeft;

document.addEventListener('DOMContentLoaded', () => {
  const storageData = JSON.parse(localStorage.getItem('tasksList'));
  if (storageData !== null) {
    loadTasks(storageData);
  }
});

board.addEventListener('mousedown', (event) => {
  const targetElement = event.target;

  if (targetElement.classList.contains('task-list__item')) {
    event.preventDefault();
    targetElement.querySelector('.delete-task').classList.add('hidden');
    const { top, left } = targetElement.getBoundingClientRect();
    draggedElement = targetElement;
    elementWidth = draggedElement.offsetWidth;
    elementHeight = draggedElement.offsetHeight;
    elementLeft = event.pageX - left;
    elementTop = event.pageY - top;

    cloneElement = targetElement.cloneNode(true);
    cloneElement.innerHTML = '';
    cloneElement.style.backgroundColor = '#D5DBDE';
    cloneElement.style.border = 'none';
    cloneElement.style.width = `${elementWidth}px`;
    cloneElement.style.height = `${elementHeight}px`;

    draggedElement.classList.add('dragged');
    targetElement.parentNode.insertBefore(cloneElement, targetElement.nextElementSibling);

    draggedElement.style.left = `${event.pageX - elementLeft}px`;
    draggedElement.style.top = `${event.pageY - elementTop}px`;
    draggedElement.style.width = `${elementWidth}px`;
    draggedElement.style.height = `${elementHeight}px`;
  } else if (targetElement.classList.contains('list__add-card')) {
    targetElement.parentNode.querySelector('.list__input').classList.remove('hidden');
    targetElement.classList.add('hidden');
  } else if (targetElement.classList.contains('list__input__add')) {
    const parentList = targetElement
      .closest('.list')
      .querySelector('.list__task-list');
    const input = targetElement.closest('.list__input').querySelector('#task-description');
    const description = input.value;
    addNewTask(parentList, description);
    input.value = '';
    targetElement
      .closest('.list')
      .querySelector('.list__add-card')
      .classList.remove('hidden');
    targetElement.parentNode.classList.add('hidden');
    saveTask();
  } else if (targetElement.classList.contains('delete-task')) {
    const taskToDelete = targetElement.parentNode;
    taskToDelete.parentNode.removeChild(taskToDelete);
    saveTask();
  } else if (targetElement.classList.contains('list__input__cancel')) {
    targetElement
      .closest('.list')
      .querySelector('.list__add-card')
      .classList.remove('hidden');
    targetElement.parentNode.classList.add('hidden');
  } else if (targetElement.classList.contains('list__input__cancel')) {
    targetElement
      .closest('.list')
      .querySelector('.list__add-card')
      .classList.remove('hidden');
    targetElement.parentNode.classList.add('hidden');
  }
});

board.addEventListener('mouseleave', (event) => {
  if (draggedElement) {
    event.preventDefault();
    cloneElement.parentNode.removeChild(cloneElement);
    draggedElement.classList.remove('dragged');
    draggedElement.style = '';
    cloneElement = null;
    draggedElement = null;
  }
});

board.addEventListener('mousemove', (event) => {
  if (draggedElement) {
    event.preventDefault();
    moveElement(event, cloneElement);
    draggedElement.style.left = `${event.pageX - elementLeft}px`;
    draggedElement.style.top = `${event.pageY - elementTop}px`;
  }
});

board.addEventListener('mouseup', (event) => {
  if (draggedElement) {
    moveElement(event, draggedElement);

    cloneElement.parentNode.removeChild(cloneElement);
    draggedElement.classList.remove('dragged');
    draggedElement.style = '';
    cloneElement = null;
    draggedElement = null;

    saveTask();
  }
});
