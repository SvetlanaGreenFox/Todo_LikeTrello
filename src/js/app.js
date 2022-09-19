const textareaElements = document.querySelectorAll('.form-control');

Array.from(textareaElements).forEach((textArea) => textArea.addEventListener('keyup', (event) => {
  textArea.style.height = 'auto';
  const scHeight = event.target.scrollHeight;
  textArea.style.height = `${scHeight}px`;
}));

const addingCards = document.querySelectorAll('.adding__cards');
Array.from(addingCards).forEach((elem) => {
  elem.addEventListener('click', () => {
    const targetParent = elem.parentElement;
    const targetForm = targetParent.querySelector('form');

    if (targetForm.classList.contains('hidden')) {
      targetForm.classList.remove('hidden');
      elem.classList.add('hidden');
    }

    const targetButtonAdd = targetForm.querySelector('.add__task');
    const targetCloseButton = targetForm.querySelector('.close-button');
    const targetTextarea = targetForm.querySelector('.form-control');

    targetButtonAdd.addEventListener('click', (event) => {
      event.preventDefault();
      if (targetTextarea.value.length !== 0) {
        const taskGroup = targetParent.querySelector('.task-group');
        const newTask = document.createElement('li');
        newTask.classList.add('task');
        newTask.innerHTML = `<div class="task-description">
        <span class="task-title">${targetTextarea.value}</span>
        <span class="material-symbols-outlined delete-button hidden">
          disabled_by_default
        </span>
      </div>
      <span class="material-symbols-outlined task-menu">
      density_medium
    </span>`;

        taskGroup.appendChild(newTask);
        targetForm.classList.add('hidden');
        elem.classList.remove('hidden');
      }

      const taskList = targetParent.querySelectorAll('.task');
      const previoslyTask = targetParent.querySelector('.pre-task');

      if (taskList.length >= 1) {
        previoslyTask.classList.add('hidden');
        Array.from(taskList).forEach((elem) => elem.addEventListener('click', () => {
          if (elem.classList.contains('pre-task')) return;
          elem.classList.toggle('highlight');
          const closeBtn = elem.querySelector('.delete-button');
          closeBtn.classList.toggle('hidden');
          closeBtn.addEventListener('click', () => {
            elem.remove();
            const taskList = targetParent.querySelectorAll('.task');
            if (taskList.length < 1) {
              previoslyTask.classList.remove('hidden');
            }
          });
        }));
      }

      targetTextarea.value = '';
    });

    targetCloseButton.addEventListener('click', () => {
      targetForm.classList.add('hidden');
      elem.classList.remove('hidden');
    });
  });
});
