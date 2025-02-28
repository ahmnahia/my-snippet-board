"use client";
import { MdOutlineUndo, MdOutlineRedo } from "react-icons/md";
import { CgExport, CgImport } from "react-icons/cg";
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
import useExportImportFolderPopup from "@/hooks/useExportImportFolderPopup";
import { HelpPopup } from "./HelpPopup";
import { IoHome } from "react-icons/io5";

export default function BoardNavBar({
  currentFileDestination,
  folderAndFilesKeys,
  actions,
  redoStack,
  undoStack,
  snippets,
  dispatch,
}) {
  const {
    folderBtnRef,
    fileInputImportRef,
    isExport,
    isImport,
    handleExportOnClick,
    toggleImportState,
    handleDataToImport,
    handleFolderImportDestination,
  } = useExportImportFolderPopup(dispatch);

  return (
    <div className="z-50 w-full flex justify-center fixed top-10 pointer-events-none max-sm:px-4">
      <div className="w-[700px] h-[50px] bg-transparent border border-zinc-400 rounded-xl flex justify-between items-center px-2 pointer-events-auto">
        <div className="">
          <AppSidebar
            snippets={snippets}
            updateBoardView={actions.updateBoardView}
          />
          <div className="flex items-center">
            <SidebarTrigger className="relative" />
            <a // used <a> insead of Link cuz using Link won't show other sections of Homepage
              href="/"
              className="p-2 rounded-lg  hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <IoHome />
            </a>
          </div>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className=" rounded-lg hover:cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
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
                <div className=" rounded-lg hover:cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className=" rounded-lg hover:cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <CgExport
                    className="text-xl"
                    style={{}}
                    onClick={() => {
                      folderBtnRef.current && folderBtnRef.current.click();
                      handleExportOnClick();
                    }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className=" rounded-lg hover:cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <CgImport
                    className="text-xl"
                    style={{}}
                    onClick={() => {
                      fileInputImportRef.current.click();
                    }}
                  />
                  <input
                    type="file"
                    accept=".json"
                    hidden
                    ref={fileInputImportRef}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const data = JSON.parse(e.target.result);
                          handleDataToImport(data);
                        };
                        reader.readAsText(file); // needed to trigger onload above
                        folderBtnRef.current && folderBtnRef.current.click(); // open folder structure to select destination
                        toggleImportState(true);
                      }
                      e.target.value = "";
                    }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Import</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex gap-3 items-center">
          <HelpPopup />
          <div>
            <FolderStructurePopup
              currentFileDestination={currentFileDestination}
              folderAndFilesKeys={folderAndFilesKeys}
              actions={actions}
              folderBtnRef={folderBtnRef}
              isExport={isExport}
              handleExportOnClick={handleExportOnClick}
              toggleImportState={toggleImportState}
              isImport={isImport}
              handleFolderImportDestination={handleFolderImportDestination}
            />
          </div>
          <div className="rounded-lg hover:cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 p-1">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
