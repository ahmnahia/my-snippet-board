import { useEffect } from "react";

export default function useUndoRedoHook(
  dispatch,
  undoStack,
  redoStack,
  snippets
) {
  const handleUndo = () => {
    dispatch({...undoStack.pop(), isUndo: true});
    dispatch({});
  };

  return {};
}
