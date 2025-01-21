"use client";
import { useEffect, useRef } from "react";

export default function useUndoRedoHook(
  dispatch,
  undoStack,
  redoStack,
) {
  const handleUndoRef = useRef();
  const handleRedoRef = useRef();

  // Keeping the latest version of handleUndo in the ref
  handleUndoRef.current = () => {
    if (undoStack.length === 0) return;
    if (undoStack.length > 20) {
      undoStack.shift();
    }
    const action = undoStack.pop();
    dispatch({
      type: action.type,
      payload: { ...action.payload, isUndo: true, isRedo: false, undoStack },
    });
  };

  handleRedoRef.current = () => {
    if (redoStack.length == 0) return;
    else if (redoStack.length > 20) {
      redoStack.shift();
    }
    const action = redoStack.pop();
    dispatch({
      type: action.type,
      payload: { ...action.payload, isRedo: true, isUndo: false, redoStack },
    });
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey && event.key == "Z") ||
        (event.ctrlKey && event.key == "z")
      ) {
        handleUndoRef.current();
      } else if (
        (event.ctrlKey && event.key == "Y") ||
        (event.ctrlKey && event.key == "y")
      ) {
        handleRedoRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    handleUndo: handleUndoRef.current,
    handleRedo: handleRedoRef.current,
  };
}
