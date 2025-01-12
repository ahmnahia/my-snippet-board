import interact from "interactjs";
export const resizeDiv = (id, updateSnippetWidthAndHeight) => {
  interact("#" + id).resizable({
    // resize from all edges and corners
    edges: { left: true, bottom: true, right: true },
    listeners: {
      start() {
        // to prevent accidental highlighting of text while resizing a snippet
        document.querySelectorAll(".snippet").forEach((snippet) => {
          snippet.classList.add("resizing");
        });
      },
      move(event) {
        var target = event.target;

        const scale = Number(document.querySelector("#board").style.scale);
        const newWidth = event.rect.width / scale;
        const newHeight = event.rect.height / scale;
        // update the element's style
        target.style.width = newWidth + "px";
        target.style.height = newHeight + "px";
      },
      end(event) {
        document.querySelectorAll(".snippet").forEach((snippet) => {
          snippet.classList.remove("resizing");
        });

        // update state with snippet's new width&height
        const scale = Number(document.querySelector("#board").style.scale);
        const newWidth = event.rect.width / scale;
        const newHeight = event.rect.height / scale;
        updateSnippetWidthAndHeight(id, newWidth, newHeight);
      },
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: "parent",
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 320, height: 150 },
      }),
    ],

    inertia: true,
  });
};
