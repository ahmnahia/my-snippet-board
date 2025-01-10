"use client";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineUndo } from "react-icons/md";
import { MdOutlineRedo } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import ThemeToggle from "./ThemeToggle";

export default function BoardNavBar() {
  return (
    <div className="z-50 w-full flex justify-center fixed top-10">
      <div className="w-[1000px]  h-[50px] bg-transparent border border-zinc-400 rounded-xl flex justify-between items-center px-2">
        <div>
          <div className="my-1 flex items-center border-[1px] border-zinc-200 px-2 rounded-lg max-w-[300px] bg-zinc-50/60 dark:bg-zinc-800/60 ">
            <label htmlFor="search-input">
              <IoSearch className="text-xl me-2 max-sm:text-xl max-sm:me-0" />
            </label>
            <input
              id="search-input"
              type="text"
              className="p-3 bg-transparent outline-none text-xs"
              placeholder="Search for snippets."
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="border border-zinc-200 rounded-lg hover:cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <MdOutlineUndo className="text-4xl" />
          </div>
          <div className="border border-zinc-200 rounded-lg hover:cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <MdOutlineRedo className="text-4xl" />
          </div>
        </div>
        <div>
          <div className="border border-zinc-200 rounded-lg hover:cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2">
            {/* <MdOutlineDarkMode className="text-4xl" /> */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
