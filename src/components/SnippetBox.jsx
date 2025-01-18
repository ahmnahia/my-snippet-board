"use client";
import { useEffect, useState, useRef } from "react";
import { RiDragMove2Fill, RiFileCopyFill } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Prism from "prismjs";
import { prismLanguagesSorted, prismLanguages } from "@/constants/prismImports";
import { resizeDiv } from "@/scripts/resizing";
import { dragElement } from "@/scripts/dragAndDropToucnAndMouse";
import { snippetBoxHoverBorderColorLight } from "@/constants";
import { Input } from "@/components/ui/input";

export default function Snippet({
  id,
  title,
  content,
  language,
  dimensions,
  changeSnippetLanguage,
  deleteSnippet,
  updateSnippetTransform,
  updateWidthAndHeight,
  actions: { updateSnippetTitle },
}) {
  useEffect(() => {
    Prism.highlightAll();
  }, [language]);

  const [isHovered, setIsHovered] = useState(false);
  const [titleToEdit, setTitleToEdit] = useState({ id: undefined, string: "" });
  const isListenerSet = useRef(false);

  useEffect(() => {
    //listeners to resize and drag the snippet
    if (isListenerSet.current) {
      return;
    }

    resizeDiv(id, updateWidthAndHeight);
    dragElement(document.getElementById(id), updateSnippetTransform);
    isListenerSet.current = true;
  }, []);

  const handleKeyDown = (event) => {
    if (isHovered && event.key === "Delete") {
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
      className={`border-2 flex flex-col  cursor-default border-zinc-400 dark:border-zinc-800 z-10 bg-white dark:bg-zinc-800 rounded-lg shadow-xl resize-drag overflow-hidden hover:z-50 hover:outline-2 hover:outline hover:outline-blue-200 dark:outline-zinc-500  snippet`}
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
      style={{
        position: "absolute",
        top: dimensions.top,
        left: dimensions.left,
        width: dimensions.width,
        height: dimensions.height,
        transform: dimensions.transform,
      }}
      id={id}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="w-full flex justify-between bg-zinc-100 dark:bg-zinc-900 border-b-2 border-b-zinc-200 dark:border-b-zinc-700 px-5 py-2">
        <div>
          <h5
            className=""
            onDoubleClick={(e) => {
              e.stopPropagation();
              setTitleToEdit({ id, string: title });
            }}
          >
            {titleToEdit.id ? (
              <Input
                type="text"
                className="bg-transparent   w-fit h-[21px] font-bold dark:focus-visible:ring-0 dark:focus-visible:border-b-2 dark:focus-visible:border-b-zinc-300/95 rounded-none"
                value={titleToEdit.string}
                onChange={(e) => {
                  setTitleToEdit({ id: id, string: e.target.value });
                }}
                autoFocus
                onBlur={() => {
                  updateSnippetTitle(
                    id,
                    titleToEdit.string == "" ? "Snippet" : titleToEdit.string
                  );
                  setTitleToEdit({ id: undefined, string: "" });
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateSnippetTitle(
                      id,
                      titleToEdit.string == "" ? "Snippet" : titleToEdit.string
                    ); //needed cuz "Enter" doesn't trigger onBlur
                    setTitleToEdit({ id: undefined, string: "" });
                  }
                }}
              />
            ) : (
              <b>{title}</b>
            )}
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
          <div className="text-2xl cursor-pointer">
            <RiFileCopyFill
              onClick={() => {
                navigator.clipboard
                  .writeText(content)
                  .then(() => {})
                  .catch((e) => {
                    console.error("Error copying the snippet");
                  });
              }}
            />
          </div>
          <div className="cursor-move text-2xl " id={id + "header"}>
            <RiDragMove2Fill />
          </div>
        </div>
      </div>
      <div className="content flex overflow-auto">
        <span className="hover:cursor-text flex-1">
          <pre>
            <code className={`language-${language}`}>{content}</code>
          </pre>
        </span>
      </div>
    </div>
  );
}
