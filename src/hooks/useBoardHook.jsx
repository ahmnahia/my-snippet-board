"use client";
import React, { useReducer, useEffect } from "react";
import { dragElement } from "@/scripts/dragAndDropToucnAndMouse";

const ACTIONS = {
  CHANGE_SCALE_VALUE: "CHANGE_SCALE_VALUE",
  ADD_A_NEW_SNIPPET: "ADD_A_NEW_SNIPPET",
  CHANGE_MOUSE_POSITION_VALUE: "CHANGE_MOUSE_POSITION_VALUE",
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
      return { ...state, mousePosition: action.payload };
    default:
      return state;
  }
};

// a snippet will consist of {title: string, content: code or whatever kind of text}

export default function useBoardHook() {
  const [state, dispatch] = useReducer(reducer, {
    snippets: [],
    scale: 1,
    mousePosition: { x: undefined, y: undefined },
  });

  useEffect(() => {
    // to handle dragging the board & the snippets
    document.querySelector("body").style.overflow = "hidden";
    // dragElement(document.getElementById("div-1"));
    dragElement(document.getElementById("board"));
  }, []);

  useEffect(() => {
    if (state.snippets && state.snippets.length > 0) {
      dragElement(
        document.getElementById(state.snippets[state.snippets.length - 1].id)
      );
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
      dispatch({
        type: ACTIONS.CHANGE_MOUSE_POSITION_VALUE,
        payload: {
          x: event.clientX,
          y: event.clientY,
        },
      });
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
        navigator.clipboard
          .readText()
          .then((text) => {
            dispatch({
              type: ACTIONS.ADD_A_NEW_SNIPPET,
              payload: {
                id: "div-" + state.snippets.length,
                title: "Code #" + state.snippets.length,
                content: text,
                language: "javascript"
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
  }, [state.snippets]);

  return { state, dispatch };
}
