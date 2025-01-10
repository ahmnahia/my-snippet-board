"use client";
import { boardSize } from "@/constants";
import SnippetBox from "./SnippetBox";
import useBoardHook from "@/hooks/useBoardHook";
import BoardNavBar from "./BoardNavBar";
import { ResizableSnippetBox } from "./ResizableSnippetBox";

export default function Board() {
  const {
    state: { scale, snippets },
    changeSnippetLanguage,
    deleteSnippet,
  } = useBoardHook();

  return (
    <>
      <BoardNavBar />
      <div
        className={`z-0 bg-pink-100 absolute board-bg hover:cursor-grab dark:board-bg-dark`}
        style={{
          left: -boardSize / 2,
          top: -boardSize / 2,
          width: boardSize,
          height: boardSize,
          scale: scale,
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
          />
        ))}
      </div>
    </>
  );
}
