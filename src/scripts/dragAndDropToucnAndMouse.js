import { getTranslateXY } from ".";

export function dragElement(elmnt, updateSnippetTransform) {
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

    if (dragTarget.id === "board") {
      //this is to use current transform values instead of always starting from 0, 0
      const currentBoardTranslateXY = getTranslateXY(
        dragTarget.style.transform
      );
      currentX = currentBoardTranslateXY[0];
      currentY = currentBoardTranslateXY[1];
    }

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

    if (dragTarget.id === "board") {
      //this is to use current transform values instead of always starting from 0, 0
      const currentBoardTranslateXY = getTranslateXY(
        dragTarget.style.transform
      );
      currentX = currentBoardTranslateXY[0];
      currentY = currentBoardTranslateXY[1];
    }

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

    const scale = Number(document.querySelector("#board").style.scale);
    currentX -= pos1 / scale;
    currentY -= pos2 / scale;

    elmnt.style.transform = `translate(${currentX}px, ${currentY}px)`;
  }

  function closeDragElement() {
    // Removing the "dragging" class from all snippets
    document.querySelectorAll(".snippet").forEach((snippet) => {
      snippet.classList.remove("dragging");
    });

    updateSnippetTransform(elmnt.id, elmnt.style.transform);

    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
}

