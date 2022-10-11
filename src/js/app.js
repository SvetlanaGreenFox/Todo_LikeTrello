const textareaElements = document.querySelectorAll('.form-control');

textareaElements.forEach((elem) =>
  elem.addEventListener('keyup', (event) => {
    elem.style.height = 'auto';
    let scHeight = event.target.scrollHeight;
    elem.style.height = `${scHeight}px`;
  })
);

const highlightCard = function () {
  this.classList.toggle('highlight');
  const parentEl = this.parentElement;
  const closeBtn = this.querySelector('.delete-button');
  closeBtn.classList.toggle('hidden');
  closeBtn.addEventListener('click', () => {
    this.remove();
    const taskList = parentEl.querySelectorAll('.task');
    if (taskList.length < 1) {
      const previoslyTask = parentEl.querySelector('.pre-task');
      previoslyTask.classList.remove('hidden');
    }
  });
};

const dragDrop = function () {
  const draggedEl = this;
  const ghostEl = this.cloneNode(true);

  this.addEventListener('mousedown', () => {
    ghostEl.classList.add('dragged');
    document.body.append(ghostEl);
  });

  this.addEventListener('mousemove', (event) => {
    event.preventDefault();
    if (!draggedEl) return;
    ghostEl.style.left = event.pageX - ghostEl.offsetWidth / 2 + 'px';
    ghostEl.style.top = event.pageY - ghostEl.offsetHeight / 2 + 'px';
  });

  this.addEventListener('mouseup', (event) => {
    if (!draggedEl) return;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  });
};

const addCard = function (event) {
  const targetParent = this.closest('.card-group');
  const targetForm = targetParent.querySelector('form');

  const targetTextarea = targetForm.querySelector('.form-control');

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
    targetParent.querySelector('.adding__cards').classList.remove('hidden');
    newTask.addEventListener('click', highlightCard);
    newTask.addEventListener('mousedown', dragDrop);
  }
  const taskList = targetParent.querySelectorAll('.task');
  const previoslyTask = targetParent.querySelector('.pre-task');

  if (taskList.length > 0) {
    previoslyTask.classList.add('hidden');
  }

  targetTextarea.value = '';
};

const adding__cards = document.querySelectorAll('.adding__cards');

adding__cards.forEach((elem) => {
  elem.addEventListener('click', () => {
    const targetParent = elem.parentElement;
    const targetForm = targetParent.querySelector('form');

    if (targetForm.classList.contains('hidden')) {
      targetForm.classList.remove('hidden');
      elem.classList.add('hidden');
    }

    const targetButtonAdd = targetForm.querySelector('.add__task');
    const targetCloseButton = targetForm.querySelector('.close-button');

    targetButtonAdd.addEventListener('click', addCard);

    targetCloseButton.addEventListener('click', () => {
      targetForm.classList.add('hidden');
      elem.classList.remove('hidden');
    });
  });
});
