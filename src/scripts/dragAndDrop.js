export function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  // Add event listener for dragging
  const header = document.getElementById(elmnt.id + "header");
  const dragTarget = header || elmnt;

  // Attach the mouse down event to the header or the element itself
  dragTarget.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    // Check if the clicked target is the element itself (or its header)
    if (e.target !== dragTarget && dragTarget.id == "board") {
      // Prevent dragging if the target is a child element
      return;
    }

    e = e || window.event;
    //   e.stopPropagation(); // Prevent parent elements from responding
    e.preventDefault(); // Prevent default browser actions like text selection

    // Record the initial mouse cursor position
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Attach event listeners for mouse movement and release
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    // Calculate new cursor position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Update element's position
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // Remove event listeners when dragging ends
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
