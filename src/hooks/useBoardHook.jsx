"use client";
import { useReducer, useEffect, useRef, use } from "react";
import { dragElement } from "@/scripts/dragAndDropToucnAndMouse";
import { boardSize } from "@/constants";
import {
  getTranslateXY,
  addNestedFolder,
  deleteNestedFolder,
  editNestedFolderName,
  getNestedFoldersNFilesIds,
} from "@/scripts";
import { set, get, del, } from "idb-keyval";
import { useToast } from "@/hooks/use-toast"
export const ACTIONS = {
  CHANGE_SCALE_VALUE: "CHANGE_SCALE_VALUE",
  ADD_A_NEW_SNIPPET: "ADD_A_NEW_SNIPPET",
  CHANGE_MOUSE_POSITION_VALUE: "CHANGE_MOUSE_POSITION_VALUE",
  CHANGE_SNIPPET_PRISM_LANGUAGE: "CHANGE_SNIPPET_PRISM_LANGUAGE",
  DELETE_SNIPPET: "DELETE_SNIPPET",
  UPDATE_WIDTH_AND_HEIGHT: "UPDATE_WIDTH_AND_HEIGHT",
  LOAD_DATA_FROM_LS: "LOAD_DATA_FROM_LS",
  UPDATE_SNIPPET_TRANSFORM: "UPDATE_SNIPPET_TRANSFORM",
  UPDATE_BOARD_TRANSFORM: "UPDATE_BOARD_TRANSFORM",
  ADD_A_NEW_FOLDER_OR_FILE: "ADD_A_NEW_FOLDER_OR_FILE",
  DELETE_A_FOLDER_OR_FILE: "DELETE_A_FOLDER_OR_FILE",
  EDIT_A_FOLDER_OR_FILE_NAME: "EDIT_A_FOLDER_OR_FILE_NAME",
  CHANGE_FILE_DESTINATION: "CHANGE_FILE_DESTINATION",
  UPDATE_SNIPPET_TITLE: "UPDATE_SNIPPET_TITLE",
  IMPORT_JSON_FILE: "IMPORT_JSON_FILE",
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
      let deletedSnippet = undefined;
      let deletedSnippetIdx = 0;
      return {
        ...state,
        snippets: action.payload.isUndo
          ? (() => {
              if (
                state.snippets[action.payload.deletedSnippetIdx]?.id ==
                action.payload.deletedSnippet?.id
              )
                return [...state.snippets];
              state.snippets.splice(
                action.payload.deletedSnippetIdx,
                0,
                action.payload.deletedSnippet
              ); // splice returns an array with the deleted elements not the updated array
              return [...state.snippets]; // Return the updated array as a new array to cause rerenders in useEffects
            })()
          : state.snippets.filter((eachSnippet, idx) => {
              if (
                eachSnippet.id ==
                (action.payload.isRedo
                  ? action.payload.deletedSnippetIdx
                  : action.payload)
              ) {
                deletedSnippet = eachSnippet;
                deletedSnippetIdx = idx;
              }
              return (
                eachSnippet.id !=
                (action.payload.isRedo
                  ? action.payload.deletedSnippetIdx
                  : action.payload)
              );
            }),
        undoStack: action.payload.isUndo
          ? action.payload.undoStack
          : [
              ...state.undoStack,
              {
                type: action.type,
                payload: { deletedSnippet, deletedSnippetIdx },
              },
            ],
        redoStack: action.payload.isUndo
          ? [
              ...state.redoStack,
              {
                type: action.type,
                payload: {
                  deletedSnippetIdx: action.payload.deletedSnippet.id,
                },
              },
            ]
          : action.payload.isRedo
          ? action.payload.redoStack
          : [],
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
      // adding transform to left and top and resseting transform to fix issues when dragging the board or a snippet
      return {
        ...state,
        snippets: action.payload.storedSnippets.map((eachSnippet) => {
          const transX = getTranslateXY(eachSnippet.dimensions.transform)[0];
          const transY = getTranslateXY(eachSnippet.dimensions.transform)[1];
          eachSnippet.dimensions = {
            ...eachSnippet.dimensions,
            top: eachSnippet.dimensions.top + transY,
            left: eachSnippet.dimensions.left + transX,
            transform: "translate(0px, 0px)",
          };
          return eachSnippet;
        }),
        boardDimensions: {
          ...action.payload.boardDimensions,
          left:
            action.payload.boardDimensions.left +
            getTranslateXY(action.payload.boardDimensions.transform)[0],
          top:
            action.payload.boardDimensions.top +
            getTranslateXY(action.payload.boardDimensions.transform)[1],
          transform: "translate(0px, 0px)",
        },
        folderAndFilesKeys: action.payload.folderAndFilesKeys,
        currentFileDestination: action.payload.currentFileDestination,
      };

    case ACTIONS.UPDATE_SNIPPET_TRANSFORM:
      let currentSnippetTransform = undefined;
      return {
        ...state,
        snippets: state.snippets.map((eachSnippet) => {
          if (eachSnippet.id == action.payload.snippetId) {
            currentSnippetTransform = eachSnippet.dimensions.transform;
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
        undoStack: action.payload.isUndo
          ? action.payload.undoStack
          : [
              ...state.undoStack,
              {
                type: action.type,
                payload: {
                  ...action.payload,
                  transformString: currentSnippetTransform,
                },
              },
            ],
        redoStack: action.payload.isUndo
          ? [
              ...state.redoStack,
              {
                type: action.type,
                payload: {
                  ...action.payload,
                  transformString: currentSnippetTransform,
                },
              },
            ]
          : action.payload.isRedo
          ? action.payload.redoStack
          : [],
      };
    case ACTIONS.UPDATE_BOARD_TRANSFORM:
      return {
        ...state,
        boardDimensions: {
          ...state.boardDimensions,
          transform: action.payload,
        },
      };
    case ACTIONS.ADD_A_NEW_FOLDER_OR_FILE:
      const newArr = addNestedFolder(
        state.folderAndFilesKeys,
        action.payload.folderId,
        {
          name: action.payload.name,
          id: Date.now() + Math.random(),
          isFile: action.payload.isFile,
          subFoldersAndFiles: action.payload.isFile ? undefined : [],
        }
      );
      // const newFoldersAndFilesKeys = state.folderAndFilesKeys;
      return { ...state, folderAndFilesKeys: newArr };

    case ACTIONS.DELETE_A_FOLDER_OR_FILE:
      return {
        ...state,
        folderAndFilesKeys: deleteNestedFolder(
          state.folderAndFilesKeys,
          action.payload.folderId
        ),
      };
    case ACTIONS.EDIT_A_FOLDER_OR_FILE_NAME:
      return {
        ...state,
        folderAndFilesKeys: editNestedFolderName(
          state.folderAndFilesKeys,
          action.payload.folderId,
          action.payload.name
        ),
      };

    case ACTIONS.CHANGE_FILE_DESTINATION:
      return { ...state, currentFileDestination: action.payload };

    case ACTIONS.UPDATE_SNIPPET_TITLE:
      let currentTitle = "";
      return {
        ...state,
        snippets: state.snippets.map((eachSnippet) => {
          if (eachSnippet.id == action.payload.snippetId) {
            currentTitle = eachSnippet.title;
            return {
              ...eachSnippet,
              title: action.payload.newTitle,
            };
          }
          return eachSnippet;
        }),
        undoStack: action.payload.isUndo
          ? action.payload.undoStack
          : [
              ...state.undoStack,
              {
                type: action.type,
                payload: { ...action.payload, newTitle: currentTitle },
              },
            ],
        redoStack: action.payload.isUndo
          ? [
              ...state.redoStack,
              {
                type: action.type,
                payload: { ...action.payload, newTitle: currentTitle },
              },
            ]
          : action.payload.isRedo
          ? action.payload.redoStack
          : [],
      };

    case ACTIONS.IMPORT_JSON_FILE:
      return {
        ...state,
        folderAndFilesKeys: JSON.parse(
          JSON.stringify(action.payload.folderAndFilesKeys) // needed to trigger useEffect, cuz of deep nested objects
        ),
      };

    default:
      return state;
  }
};

// a snippet will consist of {title: string, content: code or whatever kind of text, language: prism key, dimensions}

export default function useBoardHook() {
  const mousePosition = useRef({ x: undefined, y: undefined });
  const isBoardDragListenerSet = useRef(false);
  const isCurrentFileDestinationChanged = useRef(false);
  const { toast } = useToast()

  const [state, dispatch] = useReducer(reducer, {
    snippets: undefined,
    scale: 1,
    folderAndFilesKeys: undefined,
    currentFileDestination: undefined,
    undoStack: [],
    redoStack: [],
  });

  useEffect(() => {
    // Dealing with local storage when a file destination is changed
    const handleFileDestChange = async () => {
      if (
        state.currentFileDestination &&
        isCurrentFileDestinationChanged.current
      ) {
        // const prevFileDestination = JSON.parse(
        //   localStorage.getItem("currentFileDestination")
        // );
        // localStorage.setItem(
        //   "currentFileDestination",
        //   JSON.stringify(state.currentFileDestination)
        // );
        const prevFileDestination = await get("currentFileDestination"); //indexdb
        await set("currentFileDestination");

        // let allSnippets = JSON.parse(localStorage.getItem("allSnippets"));
        let allSnippets = await get("allSnippets"); //indexdb

        allSnippets = allSnippets ? allSnippets : {};
        allSnippets[prevFileDestination.id] = {
          snippets: state.snippets,
          boardDimensions: state.boardDimensions,
        };
        allSnippets[state.currentFileDestination.id]?.snippets
          ? // localStorage.setItem(
            //     "snippets",
            //     JSON.stringify(
            //       allSnippets[state.currentFileDestination.id].snippets
            //     )
            //   )
            await set(
              "snippets",
              allSnippets[state.currentFileDestination.id].snippets
            ) //indexeddb
          : // localStorage.removeItem("snippets")
            await del("snippets"); //indexeddb

        allSnippets[state.currentFileDestination.id]?.boardDimensions
          ? //  localStorage.setItem(
            //     "boardDimensions",
            //     JSON.stringify(
            //       allSnippets[state.currentFileDestination.id].boardDimensions
            //     )
            //   )
            await set(
              "boardDimensions",
              allSnippets[state.currentFileDestination.id].boardDimensions
            ) //indexeddb
          : // localStorage.removeItem("boardDimensions")
            await del("boardDimensions"); //indexeddb

        // localStorage.setItem("allSnippets", JSON.stringify(allSnippets));
        await set("allSnippets", allSnippets);
        window.location.reload();
      }
    };
    handleFileDestChange();
  }, [state.currentFileDestination]);

  useEffect(() => {
    // Handles getting saved data and loading them into the state
    const loadDataIntoState = async () => {
      let storedSnippets,
        boardDimensions,
        currentFileDestination,
        folderAndFilesKeys;
      // storedSnippets = JSON.parse(localStorage.getItem("snippets"));
      // boardDimensions = JSON.parse(localStorage.getItem("boardDimensions"));
      // folderAndFilesKeys = JSON.parse(localStorage.getItem("folderAndFilesKeys"));
      // currentFileDestination = JSON.parse(
      //   localStorage.getItem("currentFileDestination")
      // );
      storedSnippets = await get("snippets");
      boardDimensions = await get("boardDimensions");
      folderAndFilesKeys = await get("folderAndFilesKeys");
      currentFileDestination = await get("currentFileDestination");

      // if no stored values, then set some default values
      if (!storedSnippets) {
        storedSnippets = [];
      }
      if (!boardDimensions) {
        boardDimensions = {
          transform: "translate(0px, 0px)",
          width: boardSize,
          height: boardSize,
          top: -boardSize / 2,
          left: -boardSize / 2,
        };
      }
      if (!folderAndFilesKeys && !currentFileDestination) {
        const defaultFile = {
          name: "Default",
          id: Date.now() + Math.random(),
          isFile: true,
          subFoldersAndFiles: undefined,
        };
        folderAndFilesKeys = [defaultFile];
        currentFileDestination = defaultFile;
      }
      // if (!currentFileDestination) {
      //   currentFileDestination = "default";
      // }
      dispatch({
        type: ACTIONS.LOAD_DATA_FROM_LS,
        payload: {
          storedSnippets,
          boardDimensions,
          folderAndFilesKeys,
          currentFileDestination,
        },
      });
    };
    loadDataIntoState();
  }, []);

  useEffect(() => {
    // update ls whenever new folder/file created or curren opened file changed
    const handleFileChange = async () => {
      if (state.folderAndFilesKeys && state.currentFileDestination) {
        // localStorage.setItem(
        //   "folderAndFilesKeys",
        //   JSON.stringify(state.folderAndFilesKeys)
        // );
        // localStorage.setItem(
        //   "currentFileDestination",
        //   JSON.stringify(state.currentFileDestination)
        // );
        // setMany([
        //   ["folderAndFilesKeys", state.folderAndFilesKeys],
        //   ["currentFileDestination", state.currentFileDestination],
        // ]);
        await set("folderAndFilesKeys", state.folderAndFilesKeys);
        await set("currentFileDestination", state.currentFileDestination);
      }
    };
    handleFileChange();
  }, [state.folderAndFilesKeys, state.currentFileDestination]);

  useEffect(() => {
    // to handle dragging the board
    if (isBoardDragListenerSet.current) {
      return;
    }
    if (!state.snippets) {
      // this if statement is needed because board won't show unless there are snippets
      return;
    }
    document.querySelector("body").style.overflow = "hidden";
    dragElement(document.getElementById("board"), updateSnippetTransform);
    isBoardDragListenerSet.current = true;
  }, [state.snippets]);

  useEffect(() => {
    if (state.snippets) {
      // save the snippet in local storage (OLD) for persistence
      // localStorage.setItem("snippets", JSON.stringify(state.snippets));
      // save the snippet in indexedDB for persistence
      set("snippets", state.snippets);
    }
  }, [state.snippets]);

  useEffect(() => {
    if (!state.boardDimensions) {
      return;
    }
    // localStorage.setItem(
    //   "boardDimensions",
    //   JSON.stringify(state.boardDimensions)
    // );
    set("boardDimensions", state.boardDimensions); //indexed db
  }, [state.boardDimensions]);

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
                language: "plaintext",
                dimensions: {
                  top:
                    (boardDims.top * -1 + mousePosition.current.y) /
                    state.scale,
                  left:
                    (boardDims.left * -1 + mousePosition.current.x - 400) /
                    state.scale,
                  width: 400,
                  height: 200,
                  transform: "translate(0px, 0px)",
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

  const updateSnippetTitle = (snippetId, newTitle) => {
    dispatch({
      type: ACTIONS.UPDATE_SNIPPET_TITLE,
      payload: { snippetId, newTitle },
    });
  };

  const addANewFolderOrFile = (name, isFile, folderId) => {
    dispatch({
      type: ACTIONS.ADD_A_NEW_FOLDER_OR_FILE,
      payload: { name, isFile, folderId },
    });
  };

  const deleteAFolderOrFile = (folderId) => {
    // const allSnippets = JSON.parse(localStorage.getItem("allSnippets"));
    get("allSnippets")
      .then((allSnippets) => {
        allSnippets = allSnippets || [];
        const arrOfIds = [];
        getNestedFoldersNFilesIds(state.folderAndFilesKeys, folderId, arrOfIds);
        arrOfIds.forEach((eachId) => {
          if (eachId == state.currentFileDestination.id) {
            // user is trying to delete a file that he is currently has opened. If so, we should throw an error
            throw new Error("Cannot delete a file that is opened.");
          }
          if (allSnippets[eachId]) delete allSnippets[eachId];
        });
        // localStorage.setItem("allSnippets", JSON.stringify(allSnippets));
        set("allSnippets", allSnippets).then(() => {
          dispatch({
            type: ACTIONS.DELETE_A_FOLDER_OR_FILE,
            payload: { folderId },
          });
        });
      })
      .catch((e) => {
        // console.log("is this catched?!: ", e.message);
        toast({title: "ERROR!", description: e.message})
      });
  };

  const editAFolderOrFileName = (folderId, name) => {
    dispatch({
      type: ACTIONS.EDIT_A_FOLDER_OR_FILE_NAME,
      payload: { folderId, name },
    });
  };

  const changeFileDestination = (currentFileDestination) => {
    isCurrentFileDestinationChanged.current = true;
    dispatch({
      type: ACTIONS.CHANGE_FILE_DESTINATION,
      payload: currentFileDestination,
    });
  };

  const updateBoardView = (snippetDimensions) => {
    const snippetTransformXY = getTranslateXY(snippetDimensions.transform);
    const newBoardDimensions = {
      transform: `translate(${
        (snippetDimensions.left + snippetTransformXY[0]) * -1 -
        state.boardDimensions.left +
        window.innerWidth / 2 -
        snippetDimensions.width / 2
      }px, ${
        (snippetDimensions.top + snippetTransformXY[1]) * -1 -
        state.boardDimensions.top +
        window.innerHeight / 2 -
        snippetDimensions.height / 2
      }px)`,
    };
    dispatch({
      type: ACTIONS.UPDATE_BOARD_TRANSFORM,
      payload: newBoardDimensions.transform,
    });
  };

  return {
    state,
    dispatch,
    changeSnippetLanguage,
    mousePosition,
    deleteSnippet,
    updateSnippetTransform,
    updateWidthAndHeight,
    actions: {
      addANewFolderOrFile,
      deleteAFolderOrFile,
      editAFolderOrFileName,
      changeFileDestination,
      updateSnippetTitle,
      updateBoardView,
    },
  };
}
