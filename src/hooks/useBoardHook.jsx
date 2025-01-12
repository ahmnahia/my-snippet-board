"use client";
import { useReducer, useEffect, useRef } from "react";
import { dragElement } from "@/scripts/dragAndDropToucnAndMouse";
import { resizeDiv } from "@/scripts/resizing";

const ACTIONS = {
  CHANGE_SCALE_VALUE: "CHANGE_SCALE_VALUE",
  ADD_A_NEW_SNIPPET: "ADD_A_NEW_SNIPPET",
  CHANGE_MOUSE_POSITION_VALUE: "CHANGE_MOUSE_POSITION_VALUE",
  CHANGE_SNIPPET_PRISM_LANGUAGE: "CHANGE_SNIPPET_PRISM_LANGUAGE",
  DELETE_SNIPPET: "DELETE_SNIPPET",
  UPDATE_WIDTH_AND_HEIGHT: "UPDATE_WIDTH_AND_HEIGHT",
  LOAD_DATA_FROM_LS: "LOAD_DATA_FROM_LS",
  UPDATE_SNIPPET_TRANSFORM: "UPDATE_SNIPPET_TRANSFORM",
  UPDATE_BOARD_TRANSFORM: "UPDATE_BOARD_TRANSFORM",
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
    case ACTIONS.DELETE_SNIPPET:
      return {
        ...state,
        snippets: state.snippets.filter(
          (eachSnippet) => eachSnippet.id != action.payload
        ),
      };

    case ACTIONS.UPDATE_WIDTH_AND_HEIGHT:
      return {
        ...state,
        snippets: state.snippets.map((eachSnippet) => {
          if (eachSnippet.id == action.payload.snippetId) {
            return {
              ...eachSnippet,
              dimensions: {
                ...eachSnippet.dimensions,
                width: action.payload.width,
                height: action.payload.height,
              },
            };
          }
          return eachSnippet;
        }),
      };
    case ACTIONS.LOAD_DATA_FROM_LS:
      return { ...state, snippets: action.payload.storedSnippets };

    case ACTIONS.UPDATE_SNIPPET_TRANSFORM:
      return {
        ...state,
        snippets: state.snippets.map((eachSnippet) => {
          if (eachSnippet.id == action.payload.snippetId) {
            return {
              ...eachSnippet,
              dimensions: {
                ...eachSnippet.dimensions,
                transform: action.payload.transformString,
              },
            };
          }
          return eachSnippet;
        }),
      };
    case ACTIONS.UPDATE_BOARD_TRANSFORM:
      return {
        ...state,
        boardDimensions: { ...state.boardDimensions, transform: action.payload },
      };
    default:
      return state;
  }
};

// a snippet will consist of {title: string, content: code or whatever kind of text, language: prism key, dimensions}

export default function useBoardHook() {
  const mousePosition = useRef({ x: undefined, y: undefined });

  const [state, dispatch] = useReducer(reducer, {
    snippets: undefined,
    scale: 1,
    boardDimensions: { transform: "translate(0,0)" },
  });

  useEffect(() => {
    let storedSnippets;
    storedSnippets = JSON.parse(localStorage.getItem("snippets"));
    // const boardDimensions = localStorage.getItem("boardDimensions");
    if (!storedSnippets) {
      storedSnippets = [];
    }
    dispatch({ type: ACTIONS.LOAD_DATA_FROM_LS, payload: { storedSnippets } });
  }, []);

  useEffect(() => {
    // to handle dragging the board
    if (!state.snippets) {
      // this if statement is needed because board won't show unless there are snippets
      return;
    }
    document.querySelector("body").style.overflow = "hidden";
    dragElement(document.getElementById("board"), updateSnippetTransform);
  }, [state.snippets]);

  //   useEffect(() => {
  //     if (state.snippets && state.snippets.length > 0) {
  //       // add event listener to the snippet for dragging - won't add new event listerns (will keep overriding)
  //       dragElement(
  //         document.getElementById(state.snippets[state.snippets.length - 1].id)
  //       );
  //       resizeDiv(
  //         state.snippets[state.snippets.length - 1].id,
  //         updateWidthAndHeight
  //       );
  //     }
  //   }, [state.snippets]);

  useEffect(() => {
    if (state.snippets) {
      // save the snippet in local storage for persistence
      localStorage.setItem("snippets", JSON.stringify(state.snippets));
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
    // Handle creating a new snippet (ctrl + v)
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

        const lastSnippet = state.snippets[state.snippets.length - 1];
        const nextIdNumber = lastSnippet
          ? Number(lastSnippet.id.split("-")[1]) + 1
          : 1;
        navigator.clipboard
          .readText()
          .then((text) => {
            dispatch({
              type: ACTIONS.ADD_A_NEW_SNIPPET,
              payload: {
                id: "snippet-" + nextIdNumber,
                title: "Snippet #" + nextIdNumber,
                content: text,
                language: "javascript",
                dimensions: {
                  top:
                    (boardDims.top * -1 + mousePosition.current.y) /
                    state.scale,
                  left:
                    (boardDims.left * -1 + mousePosition.current.x - 400) /
                    state.scale,
                  width: 400,
                  height: 200,
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

  const deleteSnippet = (snippetId) => {
    dispatch({ type: ACTIONS.DELETE_SNIPPET, payload: snippetId });
  };

  const updateWidthAndHeight = (snippetId, width, height) => {
    dispatch({
      type: ACTIONS.UPDATE_WIDTH_AND_HEIGHT,
      payload: { snippetId, width, height },
    });
  };

  const updateSnippetTransform = (snippetId, transformString) => {
    if (snippetId == "board") {
      dispatch({
        type: ACTIONS.UPDATE_BOARD_TRANSFORM,
        payload: transformString,
      });
    } else {
      dispatch({
        type: ACTIONS.UPDATE_SNIPPET_TRANSFORM,
        payload: { snippetId, transformString },
      });
    }
  };

  return {
    state,
    dispatch,
    changeSnippetLanguage,
    mousePosition,
    deleteSnippet,
    updateSnippetTransform,
    updateWidthAndHeight,
  };
}
