export default function moveElement(event, element) {
  const closest = document.elementFromPoint(event.clientX, event.clientY);
  const { top } = closest.getBoundingClientRect();

  if (closest.classList.contains('task-list-item')) {
    if (event.pageY > window.scrollY + top + closest.offsetHeight / 2) {
      closest
        .closest('.list__task-list')
        .insertBefore(element, closest.nextElementSibling);
    } else {
      closest.closest('.list__task-list').insertBefore(element, closest);
    }
  } else if (closest.classList.contains('list__task-list') && !closest.querySelector('.task-list-item')) {
    closest.append(element);
  }
}
