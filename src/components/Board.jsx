"use client";
import { boardSize } from "@/constants/sizes";
import SnippetBox from "./SnippetBox";
import useBoardHook from "@/hooks/useBoardHook";

export default function Board() {
  const {
    state: { scale, snippets, mousePosition },
  } = useBoardHook();
  console.log("SIPPETS ARRAY: ", mousePosition);

  return (
    <div
      className={`z-0 bg-pink-100 absolute board-bg hover:cursor-grab`}
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
        />
      ))}
    </div>
  );
}
