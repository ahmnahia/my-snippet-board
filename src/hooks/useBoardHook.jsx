"use client";
import React, { useReducer, useEffect } from "react";
import { dragElement } from "@/scripts/dragAndDropToucnAndMouse";

const ACTIONS = {
  CHANGE_SCALE_VALUE: "CHANGE_SCALE_VALUE",
  ADD_A_NEW_SNIPPET: "ADD_A_NEW_SNIPPET",
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
      return { ...state, snippets: [...snippets, action.payload] };
    default:
      return state;
  }
};

// a snippet will consist of {title: string, content: code or whatever kind of text}

export default function useBoardHook() {
  const [state, dispatch] = useReducer(reducer, {
    snippets: [
      {
        id: "div-1",
        title: "test #1",
        content: "Test test content coeeedededed",
      },
    ],
    scale: 1,
  });

  useEffect(() => {
    // to handle dragging the board & the snippets
    document.querySelector("body").style.overflow = "hidden";
    // dragElement(document.getElementById("div-1"));
    dragElement(document.getElementById("board"));
  }, []);

  useEffect(() => {
    if (state.snippets) {
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
    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
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
        console.log("CTRL + V detected!");
        navigator.clipboard
          .readText()
          .then((text) => {
            console.log("Pasted content: ", text);
            dispatch({
              type: ACTIONS.ADD_A_NEW_SNIPPET,
              payload: {
                id: "div-" + state.snippets.length,
                title: "Code #" + state.snippets.length,
                content: text,
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
