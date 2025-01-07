export function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  let currentX = 0,
    currentY = 0;

  const header = document.getElementById(elmnt.id + "header");
  const dragTarget = header || elmnt;

  dragTarget.onmousedown = dragMouseDown;
  dragTarget.ontouchstart = dragTouchStart;

  function dragMouseDown(e) {
    if (e.target !== dragTarget && dragTarget.id === "board") {
      return;
    }

    e = e || window.event;
    // e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;

    // Adding the "dragging" class to all snippets to prevent unintended code highlighting when dragging a snippet
    document.querySelectorAll(".snippet").forEach((snippet) => {
      snippet.classList.add("dragging");
    });

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function dragTouchStart(e) {
    if (e.target !== dragTarget && dragTarget.id === "board") {
      return;
    }

    e = e || window.event;
    // e.preventDefault();

    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;

    document.ontouchend = closeDragElement;
    document.ontouchmove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // e.preventDefault();

    // For mouse events
    if (e.clientX && e.clientY) {
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
    }
    // For touch events
    else if (e.touches && e.touches.length > 0) {
      pos1 = pos3 - e.touches[0].clientX;
      pos2 = pos4 - e.touches[0].clientY;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
    }

    currentX -= pos1;
    currentY -= pos2;

    elmnt.style.transform = `translate(${currentX}px, ${currentY}px)`;
  }

  function closeDragElement() {
    // Removing the "dragging" class from all snippets
    document.querySelectorAll(".snippet").forEach((snippet) => {
      snippet.classList.remove("dragging");
    });

    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
}

//old code
// export function dragElement(elmnt) {
//   let pos1 = 0,
//     pos2 = 0,
//     pos3 = 0,
//     pos4 = 0;

//   let currentX = 0; // Initialize the current X position
//   let currentY = 0; // Initialize the current Y position

//   const header = document.getElementById(elmnt.id + "header");
//   const dragTarget = header || elmnt;
//   console.log("called?!!");

//   dragTarget.onmousedown = dragMouseDown;
//   dragTarget.ontouchstart = dragTouchStart

//   function dragMouseDown(e) {
//     if (e.target !== dragTarget && dragTarget.id == "board") {
//       // Prevent dragging if the target is a child element
//       return;
//     }

//     e = e || window.event;
//     e.preventDefault();

//     // Record the initial mouse cursor position
//     pos3 = e.clientX;
//     pos4 = e.clientY;

//     // Attach event listeners for mouse movement and release
//     document.onmouseup = closeDragElement;
//     document.onmousemove = elementDrag;
//   }

//   function dragTouchStart(e) {
//     if (e.target !== dragTarget && dragTarget.id == "board") {
//       // Prevent dragging if the target is a child element
//       return;
//     }

//     e = e || window.event;
//     // e.preventDefault();

//     // Record the initial mouse cursor position
//     pos3 = e.clientX;
//     pos4 = e.clientY;

//     // Attach event listeners for mouse movement and release

//     document.ontouchend = closeDragElement;
//     document.ontouchmove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     // e.preventDefault();

//     // Calculate new cursor position
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;

//     // Update the element's position
//     currentX -= pos1;
//     currentY -= pos2;

//     // Apply the new position using `transform: translate`
//     elmnt.style.transform = `translate(${currentX}px, ${currentY}px)`;
//   }

//   function closeDragElement() {
//     // Remove event listeners when dragging ends
//     document.onmouseup = null;
//     document.onmousemove = null;
//     document.ontouchend = null;
//     document.ontouchmove = null;

//   }
// }
