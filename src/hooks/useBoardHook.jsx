"use client";
import { useReducer, useEffect, useRef } from "react";
import { dragElement } from "@/scripts/dragAndDropToucnAndMouse";

const ACTIONS = {
  CHANGE_SCALE_VALUE: "CHANGE_SCALE_VALUE",
  ADD_A_NEW_SNIPPET: "ADD_A_NEW_SNIPPET",
  CHANGE_MOUSE_POSITION_VALUE: "CHANGE_MOUSE_POSITION_VALUE",
  CHANGE_SNIPPET_PRISM_LANGUAGE: "CHANGE_SNIPPET_PRISM_LANGUAGE",
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_SCALE_VALUE:
      let value = state.scale;
      if (
        (action.payload.scrollDirection == "up" && value.toFixed(1) == 1.8) ||
        (action.payload.scrollDirection == "down" && value.toFixed(1) == 0.5)
      )
        return state;
      action.payload.scrollDirection == "up" ? (value += 0.1) : (value -= 0.1);
      return { ...state, scale: value };

    case ACTIONS.ADD_A_NEW_SNIPPET:
      return { ...state, snippets: [...state.snippets, action.payload] };

    case ACTIONS.CHANGE_MOUSE_POSITION_VALUE:
      state.mousePosition.current = action.payload;
      return { ...state, mousePosition: state.mousePosition };
    case ACTIONS.CHANGE_SNIPPET_PRISM_LANGUAGE:
      const newSnippets = state.snippets.map((eachSnip) => {
        if (eachSnip.id == action.payload.snippetId)
          return { ...eachSnip, language: action.payload.prismKey };
        return eachSnip;
      });
      return { ...state, snippets: newSnippets };
    default:
      return state;
  }
};

// a snippet will consist of {title: string, content: code or whatever kind of text, language: prism key, position}

export default function useBoardHook() {
  const mousePosition = useRef({ x: undefined, y: undefined });

  const [state, dispatch] = useReducer(reducer, {
    snippets: [],
    scale: 1,
  });

  useEffect(() => {
    // to handle dragging the board
    document.querySelector("body").style.overflow = "hidden";
    dragElement(document.getElementById("board"));
  }, []);

  useEffect(() => {
    if (state.snippets && state.snippets.length > 0) {
      // add event listener to the snippet for dragging
      dragElement(
        document.getElementById(state.snippets[state.snippets.length - 1].id)
      );

      // save the snippet in local storage for persistence
    }
  }, [state.snippets]);

  useEffect(() => {
    // to handle zooming in & out
    const handleScroll = (event) => {
      if (!event.ctrlKey) {
        return;
      }

      event.preventDefault();
      const scrollDirection = event.deltaY > 0 ? "down" : "up";
      dispatch({
        type: ACTIONS.CHANGE_SCALE_VALUE,
        payload: { scrollDirection },
      });
    };

    const handleMouseMove = (event) => {
      mousePosition.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!state.snippets) {
      return;
    }
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey && event.key == "V") ||
        (event.ctrlKey && event.key == "v")
      ) {
        const boardDiv = document.querySelector("#board");
        const boardDims = boardDiv.getBoundingClientRect();

        navigator.clipboard
          .readText()
          .then((text) => {
            dispatch({
              type: ACTIONS.ADD_A_NEW_SNIPPET,
              payload: {
                id: "div-" + state.snippets.length,
                title: "Code #" + state.snippets.length,
                content: text,
                language: "javascript",
                position: {
                  top:
                    (boardDims.top * -1 + mousePosition.current.y) /
                    state.scale,
                  left:
                    (boardDims.left * -1 + mousePosition.current.x - 400) /
                    state.scale,
                },
              },
            });
          })
          .catch((err) => {
            console.error("Failed to read clipboard contents: ", err);
          });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.snippets, state.scale]);

  const changeSnippetLanguage = (snippetId, prismKey) => {
    dispatch({
      type: ACTIONS.CHANGE_SNIPPET_PRISM_LANGUAGE,
      payload: { snippetId, prismKey },
    });
  };

  return { state, dispatch, changeSnippetLanguage, mousePosition };
}
