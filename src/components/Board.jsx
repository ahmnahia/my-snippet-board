"use client";
import { boardSize } from "@/constants";
import SnippetBox from "./SnippetBox";
import useBoardHook from "@/hooks/useBoardHook";
import BoardNavBar from "./BoardNavBar";
import useUndoRedoHook from "@/hooks/useUndoRedoHook";
import EmptyFileGreeting from "./EmptyFileGreeting";
import MultipleTabPopup from "./MultipleTabPopup";
import { Loader2 } from "lucide-react";

export default function Board() {
  const {
    state: {
      scale,
      snippets,
      boardDimensions,
      currentFileDestination,
      folderAndFilesKeys,
      undoStack,
      redoStack,
      isMultipleTabsOpen,
    },
    dispatch,
    changeSnippetLanguage,
    deleteSnippet,
    updateSnippetTransform,
    updateWidthAndHeight,
    actions,
  } = useBoardHook();

  const { handleUndo, handleRedo } = useUndoRedoHook(
    dispatch,
    undoStack,
    redoStack,
    snippets
  );

  if (!snippets || !boardDimensions || !currentFileDestination) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-white dark:bg-zinc-800">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {isMultipleTabsOpen && <MultipleTabPopup />}
      <BoardNavBar
        currentFileDestination={currentFileDestination}
        folderAndFilesKeys={folderAndFilesKeys}
        actions={{ ...actions, handleUndo, handleRedo }}
        undoStack={undoStack}
        redoStack={redoStack}
        snippets={snippets}
        dispatch={dispatch}
      />

      <div
        className={`z-0 absolute board-bg hover:cursor-grab dark:board-bg-dark`}
        style={{
          left: boardDimensions.left,
          top: boardDimensions.top,
          width: boardSize,
          height: boardSize,
          scale: scale,
          transform: boardDimensions.transform,
        }}
        id="board"
      >
        {snippets.length == 0 && <EmptyFileGreeting />}
        {snippets.map((eachSnippet, idx) => (
          <SnippetBox
            key={eachSnippet.id + idx}
            id={eachSnippet.id}
            title={eachSnippet.title}
            content={eachSnippet.content}
            language={eachSnippet.language}
            dimensions={eachSnippet.dimensions}
            changeSnippetLanguage={changeSnippetLanguage}
            deleteSnippet={deleteSnippet}
            updateSnippetTransform={updateSnippetTransform}
            updateWidthAndHeight={updateWidthAndHeight}
            actions={actions}
          />
        ))}
      </div>
    </>
  );
}
