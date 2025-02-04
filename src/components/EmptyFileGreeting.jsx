"use client";
import { boardSize } from "@/constants";

export default function EmptyFileGreeting() {
  return (
    <div
      className={`absolute z-[100] text-center text-zinc-500 select-none pointer-events-none`}
      style={{
        top: boardSize / 2 + innerHeight / 2 - 150,
        left: boardSize / 2 + innerWidth / 2 - 270,
      }}
    >
      <h1 className="text-4xl mb-5 ">👋 Welcome to MySnippetBoard! </h1>
      <h2 className="text-2xl mb-5">📝 Start organizing your code snippets!</h2>
      <ul className="">
        <li>💡 Press Ctrl + V to create your first snippet.</li>
        {/* <li>⚡ Snippets are autosaved locally.</li> */}
        <li>📎 You can import previously exported snippets.</li>
        <li>📖 Check out the Help (?) pop-up for more tips.</li>
      </ul>
    </div>
  );
}
