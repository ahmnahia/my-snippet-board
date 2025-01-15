"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaCode, FaFolder } from "react-icons/fa";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export default function FolderStructurePopup({
  currentFileDestination,
  folderAndFilesKeys,
  actions: { addANewFolderOrFile },
}) {
  const [currentSelectedFileOrFolder, setCurrentSelectedFileOrFolder] =
    useState(undefined);

  const ContextMenuWrapper = ({ children }) => {
    return (
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Edit</ContextMenuItem>
          <ContextMenuItem>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Dialog>
        <DialogTrigger asChild className="w-full">
          <Button variant="outline" className="w-full capitalize">
            {currentFileDestination}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] border ">
          <DialogHeader>
            <DialogTitle>Folder Structure</DialogTitle>
            <DialogDescription className="">
              {/* Make changes to your profile here. Click save when you're done. */}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className=" gap-4 border dark:border-zinc-100 rounded-lg p-2 flex flex-col">
              {folderAndFilesKeys.map((eachItem, idx) => {
                if (typeof eachItem == "object") {
                  return (
                    <ContextMenuWrapper key={eachItem + idx}>
                      <Button variant="outline" className="px-2 w-fit">
                        <FaFolder />
                        {eachItem.folderName}
                      </Button>
                    </ContextMenuWrapper>
                  );
                } else if (typeof eachItem == "string") {
                  return (
                    <ContextMenuWrapper key={eachItem + idx}>
                      <Button
                        variant="outline"
                        className="px-2 w-fit"
                        onClick={() => {
                          setCurrentSelectedFileOrFolder(eachItem);
                        }}
                      >
                        <FaCode />
                        {eachItem}
                      </Button>
                    </ContextMenuWrapper>
                  );
                }
              })}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                addANewFolderOrFile("New Folder");
              }}
            >
              New Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
