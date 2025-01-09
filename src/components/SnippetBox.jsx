"use client";
import { useEffect, useState } from "react";
import { RiDragMove2Fill } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Prism from "prismjs";
import { prismLanguagesSorted, prismLanguages } from "@/constants/prismImports";
import { snippetBoxHoverBorderColorLight } from "@/constants";

export default function Snippet({
  id,
  title,
  content,
  language,
  position,
  changeSnippetLanguage,
  deleteSnippet,
}) {
  useEffect(() => {
    Prism.highlightAll();
  }, [language]);

  const [isHovered, setIsHovered] = useState(false);

  const handleKeyDown = (event) => {
    if (isHovered && event.key === "Delete") {
      console.log("Delete key pressed while hovering!" + id);
      deleteSnippet(id);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isHovered]);

  return (
    <div
      className={`border flex flex-col  cursor-default border-zinc-400 z-10 bg-white rounded-lg shadow-xl  w-[400px] h-[200px] min-h-[200px] min-w-[200px] resize overflow-hidden hover:z-50 hover:outline-2 hover:outline hover:${snippetBoxHoverBorderColorLight} snippet`}
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
      style={{
        position: "absolute",
        // top: "50%",
        // left: "50%",
        top: position.top,
        left: position.left,
      }}
      id={id}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="w-full flex justify-between p-1 bg-zinc-50 border-b-2 border-b-zinc-200">
        <div>
          <h5 className="">
            <b>{title}</b>
          </h5>
        </div>
        <div className="flex gap-3">
          <div className="">
            <DropdownMenu className="">
              <DropdownMenuTrigger>
                {prismLanguages[language].name}
              </DropdownMenuTrigger>

              <DropdownMenuContent className="h-[300px] overflow-auto">
                {prismLanguagesSorted.map((eachLng, idx) => {
                  return (
                    <DropdownMenuItem
                      key={eachLng.prismKey}
                      onClick={() => {
                        changeSnippetLanguage(id, eachLng.prismKey);
                      }}
                    >
                      {eachLng.name}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="cursor-move text-2xl " id={id + "header"}>
            <RiDragMove2Fill />
          </div>
        </div>
      </div>
      <div className="px-4 content flex overflow-auto">
        <span className="hover:cursor-text flex-1">
          <pre>
            <code className={`language-${language}`}>{content}</code>
          </pre>
        </span>
      </div>
    </div>
  );
}
