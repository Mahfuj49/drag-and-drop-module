let dragging;
const containers = document.querySelectorAll(".container");
const draggables = document.querySelectorAll(".draggable");
draggables.forEach(draggable => {
  draggable.addEventListener("dragstart", event => {
    dragging = event.target;
  });
});
containers.forEach(container => {
  container.addEventListener("dragover", event => {
    event.preventDefault();
    const dragAfterElement = getDragAfterElement(container.children, event.clientY, dragging);
    if(dragAfterElement == null) container.appendChild(dragging);
    else container.insertBefore(dragging, dragAfterElement);
  });
});
function getDragAfterElement(elements, y, dragging) {
  elements = [...elements];
  elements = elements.filter(element => element != dragging);

  return elements.reduce((closest, element) => {
    const box = element.getBoundingClientRect();
    offset = box.height / 2 + box.top - y;
    if(offset > 0 && offset < closest.offset) return {offset: offset, element: element};
    else return closest;
  }, {offset: Number.POSITIVE_INFINITY}).element;
}