"use client";
import { useState, useRef, useEffect } from "react";
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

const traverseNestedArray = (arr, level, flattenedArray) => {
  arr.forEach((eachItem) => {
    flattenedArray.push({ ...eachItem, level });
    if (eachItem.subFoldersAndFiles) {
      traverseNestedArray(eachItem.subFoldersAndFiles, level + 1, flattenedArray);
    }
  });
};
  
export default function FolderStructurePopup({
  currentFileDestination,
  folderAndFilesKeys,
  actions: { addANewFolderOrFile, deleteAFolderOrFile },
}) {
  const [currentSelectedFileOrFolder, setCurrentSelectedFileOrFolder] =
    useState(undefined);
  const [flattenedArray, setFlattenedArray] = useState([]);
  console.log("folderAndFilesKeys: ", folderAndFilesKeys);

  useEffect(() => {
    let temp = [];
    traverseNestedArray(folderAndFilesKeys, 0, temp);
    setFlattenedArray(temp);
  }, [folderAndFilesKeys]);

  const ContextMenuWrapper = ({
    children,
    handleClick,
    handleDelete,
    buttonStyles,
  }) => {
    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <Button
            style={buttonStyles}
            variant="outline"
            className="px-2 w-fit text-xs"
            onClick={handleClick}
          >
            {children}
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Edit</ContextMenuItem>
          <ContextMenuItem onClick={handleDelete}>Delete</ContextMenuItem>
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
            {currentFileDestination.name}
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px] border "
          onClick={() => {
            setCurrentSelectedFileOrFolder(undefined);
          }}
        >
          <DialogHeader>
            <DialogTitle>Folder Structure</DialogTitle>
            <DialogDescription className="">
              {/* Make changes to your profile here. Click save when you're done. */}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="gap-4 border border-zinc-400 dark:border-zinc-100 rounded-lg p-2 flex flex-col h-[300px] overflow-auto">
              {flattenedArray.map((eachItem, idx) => {
                return (
                  <ContextMenuWrapper
                    key={idx}
                    handleClick={(e) => {
                      e.stopPropagation();
                      setCurrentSelectedFileOrFolder(eachItem);
                    }}
                    handleDelete={() => {
                      deleteAFolderOrFile(eachItem.id);
                    }}
                    buttonStyles={{
                      backgroundColor:
                        eachItem.id == currentSelectedFileOrFolder?.id
                          ? "#a1a1aa"
                          : null,
                      marginLeft: 28 * eachItem.level,
                    }}
                  >
                    {eachItem.isFile ? <FaCode /> : <FaFolder />}
                    {eachItem.name}
                  </ContextMenuWrapper>
                );
              })}
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={!currentSelectedFileOrFolder?.isFile}
              variant="outline"
              onClick={(e) => {}}
            >
              Open File
            </Button>
            <Button
              disabled={currentSelectedFileOrFolder?.isFile}
              onClick={(e) => {
                addANewFolderOrFile(
                  "New Folder",
                  false,
                  currentSelectedFileOrFolder?.id
                );
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
