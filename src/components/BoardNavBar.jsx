"use client";
import { MdOutlineUndo } from "react-icons/md";
import { MdOutlineRedo } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";
import FolderStructurePopup from "./FolderStructurePopup";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export default function BoardNavBar({
  currentFileDestination,
  folderAndFilesKeys,
  actions,
  redoStack,
  undoStack,
  snippets,
}) {

  return (
    <div className="z-50 w-full flex justify-center fixed top-10">
      <div className="w-[700px] h-[50px] bg-transparent border border-zinc-400 rounded-xl flex justify-between items-center px-2">
        <div className="">

          <AppSidebar snippets={snippets} updateBoardView={actions.updateBoardView}/>
          <SidebarTrigger className="relative"/>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="border border-zinc-200 rounded-lg hover:cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <MdOutlineUndo
                    disabled={undoStack.length == 0}
                    className="text-2xl"
                    onClick={() => {
                      actions.handleUndo();
                    }}
                    style={{ opacity: undoStack.length == 0 ? 0.5 : 1 }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Undo (CTRL + Z)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="border border-zinc-200 rounded-lg hover:cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <MdOutlineRedo
                    className="text-2xl"
                    disabled={redoStack.length == 0}
                    style={{ opacity: redoStack.length == 0 ? 0.5 : 1 }}
                    onClick={() => {
                      actions.handleRedo();
                    }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Redo (CTRL + Y)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex gap-3 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <FolderStructurePopup
                    currentFileDestination={currentFileDestination}
                    folderAndFilesKeys={folderAndFilesKeys}
                    actions={actions}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Current Opened File</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="border border-zinc-200 rounded-lg hover:cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 p-1">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
