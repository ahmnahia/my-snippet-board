import { useEffect } from "react";

export default function useUndoRedoHook(
  dispatch,
  undoStack,
  redoStack,
  snippets
) {
  const handleUndo = () => {
    if (undoStack.length == 0) return;
    const action = undoStack.pop();
    dispatch({
      type: action.type,
      payload: { ...action.payload, isUndo: true, isRedo: false, undoStack },
    });
  };

  const handleRedo = () => {
    if (redoStack.length == 0) return;
    const action = redoStack.pop();
    dispatch({
      type: action.type,
      payload: { ...action.payload, isRedo: true, isUndo: false, redoStack },
    });
  };

  return { handleUndo, handleRedo };
}
