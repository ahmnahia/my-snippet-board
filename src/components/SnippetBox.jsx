"use client";
import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { RiDragMove2Fill } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { prismLanguagesSorted, prismLanguages } from "@/constants";
const firstEle = prismLanguagesSorted[0];
export default function Snippet({
  id,
  title,
  content,
  language,
  changeSnippetLanguage,
}) {
  useEffect(() => {
    Prism.highlightAll();
  }, [language]);

  return (
    <div
      className={`border flex flex-col  cursor-default border-zinc-400 z-10 bg-white rounded-lg shadow-xl  w-[400px] h-[200px] min-h-[200px] min-w-[200px] resize overflow-hidden hover:z-50 hover:outline-2 hover:outline hover:outline-blue-200 snippet`}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
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
              <DropdownMenuTrigger>{prismLanguages[language].name}</DropdownMenuTrigger>

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
                    // <DropdownMenuSeparator key={eachLng.prismKey + idx} />
                  );
                })}
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="cursor-move text-2xl " id={id + "header"} >
            <RiDragMove2Fill />
          </div>
        </div>
      </div>
      <div className="px-4 content overflow-auto">
        <span className="hover:cursor-text">
          <pre>
            <code className={`language-${language}`}>
              {content}
            </code>
          </pre>
        </span>
      </div>
    </div>
  );
}
