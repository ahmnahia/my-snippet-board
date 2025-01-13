"use client";
import { boardSize } from "@/constants";
import SnippetBox from "./SnippetBox";
import useBoardHook from "@/hooks/useBoardHook";
import BoardNavBar from "./BoardNavBar";

export default function Board() {
  const {
    state: { scale, snippets, boardDimensions },
    changeSnippetLanguage,
    deleteSnippet,
    updateSnippetTransform,
    updateWidthAndHeight,
  } = useBoardHook();

  if (!snippets || !boardDimensions) {
    return <h1> Loading ...</h1>;
  }

  return (
    <>
      <BoardNavBar />
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
        {/* <SnippetBox /> */}
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
          />
        ))}
      </div>
    </>
  );
}
